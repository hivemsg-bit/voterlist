export interface AssemblyConstituency {
  id: string;
  name: string;
  number: number;
  lokSabhaName: string;
  dataYear: string; // Changed from totalVoters to dataYear
  partsCount: number; // Number of booths/parts
  price: number;
}

export interface StateData {
  id: string;
  name: string;
  code: string;
  totalSeats: number;
  acs: AssemblyConstituency[];
}

export type ViewState = 'HOME' | 'STATE_VIEW' | 'CONTACT';

export interface AIResponse {
  text: string;
  loading: boolean;
  error?: string;
}