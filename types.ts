export interface AssemblyConstituency {
  id: string;
  name: string;
  number: number;
  lokSabhaName: string;
  dataYear: string; 
  partsCount: number; 
  price: number;
}

export interface StateData {
  id: string;
  name: string;
  code: string;
  totalSeats: number;
  acs: AssemblyConstituency[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image?: string;
}

export type ViewState = 'HOME' | 'STATE_VIEW' | 'CONTACT' | 'NEWS' | 'PRINTING' | 'APP_DEV' | 'SURVEY' | 'DATA_CONVERSION';

export interface AIResponse {
  text: string;
  loading: boolean;
  error?: string;
}