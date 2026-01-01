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

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
}

export type ViewState = 'HOME' | 'STATE_VIEW' | 'CONTACT' | 'ADMIN';

export interface AIResponse {
  text: string;
  loading: boolean;
  error?: string;
}