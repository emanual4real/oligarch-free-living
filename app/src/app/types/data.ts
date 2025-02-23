export type RetailTypes = 'Grocery' | 'Social media';

export interface OligarchData {
  id: string;
  name: string;
  companies: string[];
  description: string;
  oligarchRating: number;
  sources: string[];
}
