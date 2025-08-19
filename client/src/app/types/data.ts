export type RetailTypes = 'Grocery' | 'Social media';

export interface Project2025 {
  _id: string;
  type: 'project2025';
  name: string;
  source: string;
}

export interface Oligarch {
  _id: string;
  type: 'oligarch';
  name: string;
  oligarchRating: number;
  description: string;
  sources: string[];
  companies: Company[];
}

export interface Politician {
  _id: string;
  type: 'politician';
  name: string;
  party: string;
  state: string;
  description: string;
  sources: string[];
}

export interface Product {
  _id: string;
  type: 'product';
  productName: string;
  productType: string;
  alternatives: string[];
  sources: string[];
  company: Company;
  isOligarchFree: boolean;
}

export interface Company {
  _id: string;
  type: 'company';
  companyName: string;
  isOligarchFree: boolean;
  products: string[] | Product[];
}
