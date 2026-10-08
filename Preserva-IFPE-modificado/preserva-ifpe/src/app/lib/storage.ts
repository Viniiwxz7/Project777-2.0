export interface Donor {
  id: string;
  name: string;
  school: string;
  grade: string;
  responsible: string;
  createdAt: string;
}

export interface SchoolMaterial {
  id: string;
  name: string;
  quantity: number;
  category: string;
  condition: string;
  createdAt: string;
}

export interface DonationItem {
  materialId: string;
  materialName: string;
  quantity: number;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  items: DonationItem[];
  date: string;
  createdAt: string;
}

const KEYS = {
  donors: 'preserva_donors',
  materials: 'preserva_materials',
  donations: 'preserva_donations',
};

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getDonors(): Donor[] {
  return read<Donor>(KEYS.donors);
}

export function saveDonor(data: Omit<Donor, 'id' | 'createdAt'> & { id?: string }): Donor {
  const list = getDonors();
  if (data.id) {
    const idx = list.findIndex((d) => d.id === data.id);
    if (idx >= 0) {
      const updated = { ...list[idx], ...data } as Donor;
      list[idx] = updated;
      write(KEYS.donors, list);
      return updated;
    }
  }
  const donor: Donor = {
    id: uid(),
    name: data.name,
    school: data.school,
    grade: data.grade,
    responsible: data.responsible,
    createdAt: new Date().toISOString(),
  };
  list.push(donor);
  write(KEYS.donors, list);
  return donor;
}

export function deleteDonor(id: string) {
  write(
    KEYS.donors,
    getDonors().filter((d) => d.id !== id)
  );
}

export function getMaterials(): SchoolMaterial[] {
  return read<SchoolMaterial>(KEYS.materials);
}

export function saveMaterial(
  data: Omit<SchoolMaterial, 'id' | 'createdAt'> & { id?: string }
): SchoolMaterial {
  const list = getMaterials();
  if (data.id) {
    const idx = list.findIndex((m) => m.id === data.id);
    if (idx >= 0) {
      const updated = { ...list[idx], ...data } as SchoolMaterial;
      list[idx] = updated;
      write(KEYS.materials, list);
      return updated;
    }
  }
  const material: SchoolMaterial = {
    id: uid(),
    name: data.name,
    quantity: Number(data.quantity) || 0,
    category: data.category,
    condition: data.condition,
    createdAt: new Date().toISOString(),
  };
  list.push(material);
  write(KEYS.materials, list);
  return material;
}

export function deleteMaterial(id: string) {
  write(
    KEYS.materials,
    getMaterials().filter((m) => m.id !== id)
  );
}

export function adjustMaterialStock(materialId: string, delta: number) {
  const list = getMaterials();
  const idx = list.findIndex((m) => m.id === materialId);
  if (idx < 0) return;
  list[idx] = {
    ...list[idx],
    quantity: Math.max(0, list[idx].quantity + delta),
  };
  write(KEYS.materials, list);
}

export function getDonations(): Donation[] {
  return read<Donation>(KEYS.donations);
}

export function saveDonation(
  data: Omit<Donation, 'id' | 'createdAt'>
): Donation {
  const donation: Donation = {
    ...data,
    id: uid(),
    createdAt: new Date().toISOString(),
  };
  const list = getDonations();
  list.unshift(donation);
  write(KEYS.donations, list);

  data.items.forEach((item) => {
    adjustMaterialStock(item.materialId, item.quantity);
  });

  return donation;
}

export function deleteDonation(id: string) {
  write(
    KEYS.donations,
    getDonations().filter((d) => d.id !== id)
  );
}
