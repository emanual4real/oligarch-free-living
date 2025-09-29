import { Company } from './data';

export interface Oligarch {
  _id: string;
  type: 'oligarch';
  name: string;
  oligarchRating: number;
  description: string;
  sources: string[];
  companies: Company[];
}

export interface OligarchPatch {
  name: string;
  oligarchRating?: number;
  description?: string;
  sources: string[];
  companies: string[];
}
