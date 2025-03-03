export type RetailTypes = 'Grocery' | 'Social media';

export interface OligarchData {
  id: string;
  name: string;
  companies: string[];
  description: string;
  oligarchRating: number;
  sources: string[];
}

export interface Project2025 {
  name: string;
  source: string;
}

export interface Products {
  id: string;
  productName: string;
  productType: string;
  company: string;
  alternatives: string[];
  sources: string[];
}
