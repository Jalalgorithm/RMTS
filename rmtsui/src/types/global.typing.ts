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

export interface IJob {
  id: string;
  title: string;
  level: string;
  companyName: string;
  jobDescription: string;
  companyId: string;
}

export interface ICreateJob {
  title: string;
  level: string;
  jobDescription: string;
  companyId: string;
}
