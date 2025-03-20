export type RetailTypes = 'Grocery' | 'Social media';

export interface Project2025 {
  name: string;
  source: string;
}

export interface Oligarch {
  _id: string;
  name: string;
  oligarchRating: number;
  description: string;
  sources: string[];
  companies: string[] | Company[];
}

export interface Product {
  _id: string;
  productName: string;
  productType: string;
  alternatives: string[];
  sources: string[];
  company: Company;
}

export interface Company {
  _id: string;
  companyName: string;
  products: string[] | Product[];
}
