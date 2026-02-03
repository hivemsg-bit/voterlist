import { StateData, AssemblyConstituency } from './types.ts';

export const APP_NAME = "VoterListExcel.in";
export const CONTACT_WHATSAPP = "918949656466"; 

const getProfessionalPrice = (no: number) => {
  // Base price set to 4500. Variance up to 500 ensures price is between 4500-5000.
  const base = 4500;
  const variance = (no * 23) % 501; 
  return base + variance;
};

// --- DATA SOURCE: PUNJAB (117) ---
const PB_DATA = [
  { no: 1, name: "Sujanpur" }, { no: 2, name: "Bhoa (SC)" }, { no: 3, name: "Pathankot" }, { no: 4, name: "Gurdaspur" }, { no: 5, name: "Dina Nagar (SC)" }, { no: 6, name: "Qadian" }, { no: 7, name: "Batala" }, { no: 8, name: "Sri Hargobindpur (SC)" }, { no: 9, name: "Fatehgarh Churian" }, { no: 10, name: "Dera Baba Nanak" }, 
  { no: 11, name: "Ajnala" }, { no: 12, name: "Raja Sansi" }, { no: 13, name: "Majitha" }, { no: 14, name: "Jandiala (SC)" }, { no: 15, name: "Amritsar North" }, { no: 16, name: "Amritsar West (SC)" }, { no: 17, name: "Amritsar Central" }, { no: 18, name: "Amritsar East" }, { no: 19, name: "Amritsar South" }, { no: 20, name: "Attari (SC)" }, 
  { no: 21, name: "Tarn Taran" }, { no: 22, name: "Khem Karan" }, { no: 23, name: "Patti" }, { no: 24, name: "Khadoor Sahib" }, { no: 25, name: "Baba Bakala (SC)" }, { no: 26, name: "Bholath" }, { no: 27, name: "Kapurthala" }, { no: 28, name: "Sultanpur Lodhi" }, { no: 29, name: "Phagwara (SC)" }, { no: 30, name: "Phillaura (SC)" }, 
  { no: 31, name: "Shahkot" }, { no: 32, name: "Kartarpur (SC)" }, { no: 33, name: "Jalandhar West (SC)" }, { no: 34, name: "Jalandhar Central" }, { no: 35, name: "Jalandhar North" }, { no: 36, name: "Jalandhar Cantt." }, { no: 37, name: "Adampur (SC)" }, { no: 38, name: "Mukerian" }, { no: 39, name: "Dasuya" }, { no: 40, name: "Urmar" }, 
  { no: 41, name: "Sham Chaurasi (SC)" }, { no: 42, name: "Hoshiarpur" }, { no: 43, name: "Chabbewal (SC)" }, { no: 44, name: "Garhshankar" }, { no: 45, name: "Banga (SC)" }, { no: 46, name: "Nawanshahr" }, { no: 47, name: "Balachaur" }, { no: 48, name: "Anandpur Sahib" }, { no: 49, name: "Rupnagar" }, { no: 50, name: "Chamkaur Sahib (SC)" }, 
  { no: 51, name: "Kharar" }, { no: 52, name: "S.A.S. Nagar" }, { no: 53, name: "Bassi Pathana (SC)" }, { no: 54, name: "Fatehgarh Sahib" }, { no: 55, name: "Amloh" }, { no: 56, name: "Khanna" }, { no: 57, name: "Samrala" }, { no: 58, name: "Sahnewal" }, { no: 59, name: "Ludhiana East" }, { no: 60, name: "Ludhiana South" }, 
  { no: 61, name: "Atam Nagar" }, { no: 62, name: "Ludhiana Central" }, { no: 63, name: "Ludhiana West" }, { no: 64, name: "Ludhiana North" }, { no: 65, name: "Gill (SC)" }, { no: 66, name: "Payal (SC)" }, { no: 67, name: "Dakha" }, { no: 68, name: "Raikot (SC)" }, { no: 69, name: "Jagraon (SC)" }, { no: 70, name: "Nihal Singhwala (SC)" }, 
  { no: 71, name: "Baghapurana" }, { no: 72, name: "Moga" }, { no: 73, name: "Dharamkot" }, { no: 74, name: "Zira" }, { no: 75, name: "Firozpur City" }, { no: 76, name: "Firozpur Rural (SC)" }, { no: 77, name: "Guru Har Sahai" }, { no: 78, name: "Jalalabad" }, { no: 79, name: "Fazilka" }, { no: 80, name: "Abohar" }, 
  { no: 81, name: "Balluana (SC)" }, { no: 82, name: "Malout (SC)" }, { no: 83, name: "Muktsar" }, { no: 84, name: "Gidderbaha" }, { no: 85, name: "Lambi" }, { no: 86, name: "Jaitu (SC)" }, { no: 87, name: "Kotkapura" }, { no: 88, name: "Faridkot" }, { no: 89, name: "Rampura Phul" }, { no: 90, name: "Bhucho Mandi (SC)" }, 
  { no: 91, name: "Bathinda Urban" }, { no: 92, name: "Bathinda Rural (SC)" }, { no: 93, name: "Talwandi Sabo" }, { no: 94, name: "Maur" }, { no: 95, name: "Mansa" }, { no: 96, name: "Sardulgarh" }, { no: 97, name: "Budhlada (SC)" }, { no: 98, name: "Lehragaga" }, { no: 99, name: "Dirba (SC)" }, { no: 100, name: "Sunam" }, 
  { no: 101, name: "Bhadaur (SC)" }, { no: 102, name: "Barnala" }, { no: 103, name: "Mehal Kalan (SC)" }, { no: 104, name: "Malerkotla" }, { no: 105, name: "Amargarh" }, { no: 106, name: "Dhuri" }, { no: 107, name: "Sangrur" }, { no: 108, name: "Nabha (SC)" }, { no: 109, name: "Patiala Rural" }, { no: 110, name: "Patiala" }, 
  { no: 111, name: "Rajpura" }, { no: 112, name: "Dera Bassi" }, { no: 113, name: "Ghanaur" }, { no: 114, name: "Sanour" }, { no: 115, name: "Patiala Urban" }, { no: 116, name: "Samana" }, { no: 117, name: "Shutrana (SC)" }
];

export const generateConstituencies = (stateCode: string, totalSeats: number): AssemblyConstituency[] => {
  const mapData = (dataArr: { no: number, name: string }[], label: string) => {
    return dataArr.map(d => ({
      id: `${stateCode.toLowerCase()}-${d.no}`,
      number: d.no,
      name: d.name,
      lokSabhaName: `${label} Node`,
      price: getProfessionalPrice(d.no),
      dataYear: "2025-26",
      partsCount: 200 + (d.no % 50)
    }));
  };

  let realData: { no: number, name: string }[] = [];
  if (stateCode === 'PB') realData = PB_DATA;

  const baseList = mapData(realData, stateCode);
  const existingNumbers = new Set(baseList.map(ac => ac.number));
  const fullList: AssemblyConstituency[] = [...baseList];

  for(let i = 1; i <= totalSeats; i++) {
    if (!existingNumbers.has(i)) {
      fullList.push({
        id: `${stateCode.toLowerCase()}-${i}`,
        number: i,
        name: `${stateCode} AC Segment ${i}`,
        lokSabhaName: "Verified Node",
        price: getProfessionalPrice(i),
        dataYear: "2025-26",
        partsCount: 220
      });
    }
  }

  return fullList.sort((a,b) => a.number - b.number);
};

export const INDIAN_STATES: StateData[] = [
  { id: 'pb', name: 'Punjab', code: 'PB', totalSeats: 117, acs: [] },
  { id: 'wb', name: 'West Bengal', code: 'WB', totalSeats: 294, acs: [] },
  { id: 'dl', name: 'Delhi', code: 'DL', totalSeats: 70, acs: [] },
  { id: 'up', name: 'Uttar Pradesh', code: 'UP', totalSeats: 403, acs: [] },
  { id: 'mp', name: 'Madhya Pradesh', code: 'MP', totalSeats: 230, acs: [] },
  { id: 'br', name: 'Bihar', code: 'BR', totalSeats: 243, acs: [] },
  { id: 'rj', name: 'Rajasthan', code: 'RJ', totalSeats: 200, acs: [] },
  { id: 'gj', name: 'Gujarat', code: 'GJ', totalSeats: 182, acs: [] },
  { id: 'od', name: 'Odisha', code: 'OD', totalSeats: 147, acs: [] },
  { id: 'ka', name: 'Karnataka', code: 'KA', totalSeats: 224, acs: [] },
];

INDIAN_STATES.forEach(s => s.acs = generateConstituencies(s.code, s.totalSeats));
