export interface ICompany {
  id: string;
  name: string;
  size: string;
  description: string;
  createdAt: string;
}

export interface ICreateCompany {
  name: string;
  size: string;
  description: string;
}
