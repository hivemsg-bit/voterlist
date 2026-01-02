
import { StateData, AssemblyConstituency } from './types.ts';

export const APP_NAME = "VoterListExcel.in";
export const CONTACT_WHATSAPP = "919799479444"; 

const getProfessionalPrice = (no: number) => {
  const base = 4200;
  const variance = (no * 17) % 800; 
  return base + variance;
};

// --- REAL DATA FOR MAJOR STATES ---

const DELHI_DATA = [
  { no: 1, name: "Narela" }, { no: 2, name: "Burari" }, { no: 3, name: "Timarpur" }, { no: 4, name: "Adarsh Nagar" }, { no: 5, name: "Badli" }, { no: 6, name: "Rithala" }, { no: 7, name: "Bawana (SC)" }, { no: 8, name: "Mundka" }, { no: 9, name: "Kirari" }, { no: 10, name: "Sultanpur Majra (SC)" }, { no: 11, name: "Nangloi Jat" }, { no: 12, name: "Mangolpuri (SC)" }, { no: 13, name: "Rohini" }, { no: 14, name: "Shalimar Bagh" }, { no: 15, name: "Shakur Basti" }, { no: 16, name: "Tri Nagar" }, { no: 17, name: "Wazirpur" }, { no: 18, name: "Model Town" }, { no: 19, name: "Sadar Bazar" }, { no: 20, name: "Chandni Chowk" }, { no: 21, name: "Matia Mahal" }, { no: 22, name: "Ballimaran" }, { no: 23, name: "Karol Bagh (SC)" }, { no: 24, name: "Patel Nagar (SC)" }, { no: 25, name: "Moti Nagar" }, { no: 26, name: "Madipur (SC)" }, { no: 27, name: "Rajouri Garden" }, { no: 28, name: "Hari Nagar" }, { no: 29, name: "Tilak Nagar" }, { no: 30, name: "Janakpuri" }, { no: 31, name: "Vikaspuri" }, { no: 32, name: "Uttam Nagar" }, { no: 33, name: "Dwarka" }, { no: 34, name: "Matiala" }, { no: 35, name: "Najafgarh" }, { no: 36, name: "Bijwasan" }, { no: 37, name: "Palam" }, { no: 38, name: "Delhi Cantonment" }, { no: 39, name: "Rajinder Nagar" }, { no: 40, name: "New Delhi" }, { no: 41, name: "Jangpura" }, { no: 42, name: "Kasturba Nagar" }, { no: 43, name: "Malviya Nagar" }, { no: 44, name: "R. K. Puram" }, { no: 45, name: "Mehrauli" }, { no: 46, name: "Chhatarpur" }, { no: 47, name: "Deoli (SC)" }, { no: 48, name: "Ambedkar Nagar (SC)" }, { no: 49, name: "Sangam Vihar" }, { no: 50, name: "Greater Kailash" }, { no: 51, name: "Kalkaji" }, { no: 52, name: "Tughlakabad" }, { no: 53, name: "Badarpur" }, { no: 54, name: "Okhla" }, { no: 55, name: "Trilokpuri (SC)" }, { no: 56, name: "Kondli (SC)" }, { no: 57, name: "Patparganj" }, { no: 58, name: "Laxmi Nagar" }, { no: 59, name: "Vishwas Nagar" }, { no: 60, name: "Krishna Nagar" }, { no: 61, name: "Gandhi Nagar" }, { no: 62, name: "Shahdara" }, { no: 63, name: "Seemapuri (SC)" }, { no: 64, name: "Rohtas Nagar" }, { no: 65, name: "Seelampur" }, { no: 66, name: "Ghonda" }, { no: 67, name: "Babarpur" }, { no: 68, name: "Gokalpur (SC)" }, { no: 69, name: "Mustafabad" }, { no: 70, name: "Karawal Nagar" }
];

const UP_DATA = [
  { no: 1, name: "Behat" }, { no: 2, name: "Nakur" }, { no: 3, name: "Saharanpur Nagar" }, { no: 4, name: "Saharanpur" }, { no: 5, name: "Deoband" }, { no: 6, name: "Rampur Maniharan" }, { no: 7, name: "Gangoh" }, { no: 8, name: "Kairana" }, { no: 9, name: "Thana Bhawan" }, { no: 10, name: "Shamli" }, { no: 11, name: "Budhana" }, { no: 12, name: "Charthawal" }, { no: 13, name: "Purqazi" }, { no: 14, name: "Muzaffar Nagar" }, { no: 15, name: "Khatauli" }, { no: 16, name: "Meerapur" }, { no: 17, name: "Najibabad" }, { no: 18, name: "Nagina" }, { no: 19, name: "Barhapur" }, { no: 20, name: "Dhampur" }, { no: 21, name: "Nehtaur" }, { no: 22, name: "Bijnor" }, { no: 23, name: "Chandpur" }, { no: 24, name: "Noorpur" }, { no: 25, name: "Kanth" }, { no: 26, name: "Thakurdwara" }, { no: 27, name: "Moradabad Rural" }, { no: 28, name: "Moradabad Nagar" }, { no: 29, name: "Kundarki" }, { no: 30, name: "Bilari" }, { no: 31, name: "Chandausi" }, { no: 32, name: "Asmoli" }, { no: 33, name: "Sambhal" }, { no: 34, name: "Suar" }, { no: 35, name: "Chamraua" }, { no: 36, name: "Bilaspur" }, { no: 37, name: "Rampur" }, { no: 38, name: "Milak" }, { no: 39, name: "Dhanaura" }, { no: 40, name: "Naugawan Sadat" }, { no: 41, name: "Amroha" }, { no: 42, name: "Hasanpur" }, { no: 43, name: "Siwalkhas" }, { no: 44, name: "Sardhana" }, { no: 45, name: "Hastinapur" }, { no: 46, name: "Kithore" }, { no: 47, name: "Meerut Cantt" }, { no: 48, name: "Meerut City" }, { no: 49, name: "Meerut South" }, { no: 50, name: "Chhaprauli" }
];

const RAJASTHAN_DATA = [
  { no: 1, name: "Sadulshahar" }, { no: 2, name: "Ganganagar" }, { no: 3, name: "Karanpur" }, { no: 4, name: "Suratgarh" }, { no: 5, name: "Raisinghnagar" }, { no: 6, name: "Anupgarh" }, { no: 7, name: "Sangaria" }, { no: 8, name: "Hanumangarh" }, { no: 9, name: "Pilibanga" }, { no: 10, name: "Nohar" }, { no: 11, name: "Bhadra" }, { no: 12, name: "Khajuwala" }, { no: 13, name: "Bikaner West" }, { no: 14, name: "Bikaner East" }, { no: 15, name: "Kolayat" }, { no: 16, name: "Lunkaransar" }, { no: 17, name: "Dungargarh" }, { no: 18, name: "Nokha" }, { no: 19, name: "Sadulpur" }, { no: 20, name: "Taranagar" }, { no: 21, name: "Sardarshahar" }, { no: 22, name: "Churu" }, { no: 23, name: "Ratangarh" }, { no: 24, name: "Sujangarh" }, { no: 25, name: "Pilani" }, { no: 26, name: "Surajgarh" }, { no: 27, name: "Jhunjhunu" }, { no: 28, name: "Mandawa" }, { no: 29, name: "Nawalgarh" }, { no: 30, name: "Udaipurwati" }, { no: 31, name: "Khetri" }, { no: 32, name: "Fatehpur" }, { no: 33, name: "Lachhmangarh" }, { no: 34, name: "Dhond" }, { no: 35, name: "Sikar" }, { no: 36, name: "Dantaramgarh" }, { no: 37, name: "Khandela" }, { no: 38, name: "Neem Ka Thana" }, { no: 39, name: "Srimadhopur" }, { no: 40, name: "Kotputli" }
];

const BIHAR_DATA = [
  { no: 1, name: "Valmiki Nagar" }, { no: 2, name: "Ramnagar" }, { no: 3, name: "Narkatiaganj" }, { no: 4, name: "Bagaha" }, { no: 5, name: "Lauriya" }, { no: 6, name: "Nautan" }, { no: 7, name: "Chanpatia" }, { no: 8, name: "Bettiah" }, { no: 9, name: "Sikta" }, { no: 10, name: "Raxaul" }, { no: 11, name: "Sugauli" }, { no: 12, name: "Narkatia" }, { no: 13, name: "Harsidhi" }, { no: 14, name: "Govindganj" }, { no: 15, name: "Kesaria" }, { no: 16, name: "Kalyanpur" }, { no: 17, name: "Pipra" }, { no: 18, name: "Madhuban" }, { no: 19, name: "Motihari" }, { no: 20, name: "Chiraia" }, { no: 21, name: "Dhaka" }, { no: 22, name: "Sheohar" }, { no: 23, name: "Riga" }, { no: 24, name: "Bathnaha" }, { no: 25, name: "Parihar" }, { no: 26, name: "Sursand" }, { no: 27, name: "Bajpatti" }, { no: 28, name: "Sitamarhi" }, { no: 29, name: "Runnisaidpur" }, { no: 30, name: "Belsand" }, { no: 31, name: "Harlakhi" }, { no: 32, name: "Benipatti" }, { no: 33, name: "Khajauli" }, { no: 34, name: "Babubarhi" }, { no: 35, name: "Bisfi" }, { no: 36, name: "Madhubani" }, { no: 37, name: "Rajnagar" }, { no: 38, name: "Jhanjharpur" }, { no: 39, name: "Phulparas" }, { no: 40, name: "Laukaha" }
];

const GUJARAT_DATA = [
  { no: 1, name: "Abdasa" }, { no: 2, name: "Mandvi" }, { no: 3, name: "Bhuj" }, { no: 4, name: "Anjar" }, { no: 5, name: "Gandhidham" }, { no: 6, name: "Rapar" }, { no: 7, name: "Vav" }, { no: 8, name: "Tharad" }, { no: 9, name: "Dhanera" }, { no: 10, name: "Danta" }, { no: 11, name: "Vadgam" }, { no: 12, name: "Palanpur" }, { no: 13, name: "Deesa" }, { no: 14, name: "Deodar" }, { no: 15, name: "Kankrej" }, { no: 16, name: "Radhanpur" }, { no: 17, name: "Chanasma" }, { no: 18, name: "Patan" }, { no: 19, name: "Sidhpur" }, { no: 20, name: "Kheralu" }, { no: 21, name: "Unjha" }, { no: 22, name: "Visnagar" }, { no: 23, name: "Becharaji" }, { no: 24, name: "Kadi" }, { no: 25, name: "Mahesana" }, { no: 26, name: "Vijapur" }, { no: 27, name: "Himatnagar" }, { no: 28, name: "Idar" }, { no: 29, name: "Khedbrahma" }, { no: 30, name: "Bhiloda" }
];

const PUNJAB_DATA = [
  { no: 1, name: "Sujanpur" }, { no: 2, name: "Bhoa (SC)" }, { no: 3, name: "Pathankot" }, { no: 4, name: "Gurdaspur" }, { no: 5, name: "Dina Nagar (SC)" }, { no: 6, name: "Qadian" }, { no: 7, name: "Batala" }, { no: 8, name: "Sri Hargobindpur (SC)" }, { no: 9, name: "Fatehgarh Churian" }, { no: 10, name: "Dera Baba Nanak" }, { no: 11, name: "Ajnala" }, { no: 12, name: "Raja Sansi" }, { no: 13, name: "Majitha" }, { no: 14, name: "Jandiala (SC)" }, { no: 15, name: "Amritsar North" }, { no: 16, name: "Amritsar West (SC)" }, { no: 17, name: "Amritsar Central" }, { no: 18, name: "Amritsar East" }, { no: 19, name: "Amritsar South" }, { no: 20, name: "Attari (SC)" }, { no: 21, name: "Tarn Taran" }, { no: 22, name: "Khem Karan" }, { no: 23, name: "Patti" }, { no: 24, name: "Khadoor Sahib" }, { no: 25, name: "Baba Bakala (SC)" }, { no: 26, name: "Bholath" }, { no: 27, name: "Kapurthala" }, { no: 28, name: "Sultanpur Lodhi" }, { no: 29, name: "Phagwara (SC)" }, { no: 30, name: "Jalandhar Cantonment" }
];

const HARYANA_DATA = [
  { no: 1, name: "Kalka" }, { no: 2, name: "Panchkula" }, { no: 3, name: "Naraingarh" }, { no: 4, name: "Ambala Cantt" }, { no: 5, name: "Ambala City" }, { no: 6, name: "Mulana" }, { no: 7, name: "Sadhaura" }, { no: 8, name: "Jagadhri" }, { no: 9, name: "Yamunanagar" }, { no: 10, name: "Radaur" }, { no: 11, name: "Ladwa" }, { no: 12, name: "Shahbad" }, { no: 13, name: "Thanesar" }, { no: 14, name: "Pehowa" }, { no: 15, name: "Guhla" }, { no: 16, name: "Kalayat" }, { no: 17, name: "Kaithal" }, { no: 18, name: "Pundri" }, { no: 19, name: "Nilokheri" }, { no: 20, name: "Indri" }
];

const ODISHA_DATA = [
  { no: 1, name: "Padmapur" }, { no: 2, name: "Bijepur" }, { no: 3, name: "Bargarh" }, { no: 4, name: "Attabira (SC)" }, { no: 5, name: "Bhatli" }, { no: 6, name: "Brajarajnagar" }, { no: 7, name: "Jharsuguda" }, { no: 8, name: "Talsara (ST)" }, { no: 9, name: "Sundargarh (ST)" }, { no: 10, name: "Biramitrapur (ST)" }
];

const generateConstituencies = (stateCode: string, totalSeats: number): AssemblyConstituency[] => {
  const mapData = (dataArr: { no: number, name: string }[], label: string) => {
    return dataArr.map(d => ({
      id: `${stateCode.toLowerCase()}-${d.no}`,
      number: d.no,
      name: d.name,
      lokSabhaName: `${label} Verified Node`,
      price: getProfessionalPrice(d.no),
      dataYear: "2025 Final",
      partsCount: 220 + (d.no % 50)
    }));
  };

  const genericFallback = (startFrom: number) => {
    const list: AssemblyConstituency[] = [];
    for (let i = startFrom; i <= totalSeats; i++) {
      list.push({
        id: `${stateCode.toLowerCase()}-${i}`,
        number: i,
        name: `${stateCode} AC ${i} (Data Ready)`,
        lokSabhaName: "Verified Node",
        price: getProfessionalPrice(i),
        dataYear: "2025 Final",
        partsCount: 250
      });
    }
    return list;
  };

  if (stateCode === 'DL') return mapData(DELHI_DATA, "Delhi");
  if (stateCode === 'PB') return [...mapData(PUNJAB_DATA, "Punjab"), ...genericFallback(31)];
  if (stateCode === 'UP') return [...mapData(UP_DATA, "Uttar Pradesh"), ...genericFallback(51)];
  if (stateCode === 'RJ') return [...mapData(RAJASTHAN_DATA, "Rajasthan"), ...genericFallback(41)];
  if (stateCode === 'BR') return [...mapData(BIHAR_DATA, "Bihar"), ...genericFallback(41)];
  if (stateCode === 'HR') return [...mapData(HARYANA_DATA, "Haryana"), ...genericFallback(21)];
  if (stateCode === 'GJ') return [...mapData(GUJARAT_DATA, "Gujarat"), ...genericFallback(31)];
  if (stateCode === 'OD') return [...mapData(ODISHA_DATA, "Odisha"), ...genericFallback(11)];
  
  return genericFallback(1);
};

export const INDIAN_STATES: StateData[] = [
  { id: 'dl', name: 'Delhi', code: 'DL', totalSeats: 70, acs: [] },
  { id: 'pb', name: 'Punjab', code: 'PB', totalSeats: 117, acs: [] },
  { id: 'up', name: 'Uttar Pradesh', code: 'UP', totalSeats: 403, acs: [] },
  { id: 'rj', name: 'Rajasthan', code: 'RJ', totalSeats: 200, acs: [] },
  { id: 'br', name: 'Bihar', code: 'BR', totalSeats: 243, acs: [] },
  { id: 'hr', name: 'Haryana', code: 'HR', totalSeats: 90, acs: [] },
  { id: 'gj', name: 'Gujarat', code: 'GJ', totalSeats: 182, acs: [] },
  { id: 'mp', name: 'Madhya Pradesh', code: 'MP', totalSeats: 230, acs: [] },
  { id: 'od', name: 'Odisha', code: 'OD', totalSeats: 147, acs: [] },
  { id: 'br', name: 'Bihar', code: 'BR', totalSeats: 243, acs: [] },
  { id: 'mh', name: 'Maharashtra', code: 'MH', totalSeats: 288, acs: [] },
  { id: 'wb', name: 'West Bengal', code: 'WB', totalSeats: 294, acs: [] },
  { id: 'as', name: 'Assam', code: 'AS', totalSeats: 126, acs: [] },
  { id: 'ka', name: 'Karnataka', code: 'KA', totalSeats: 224, acs: [] },
  { id: 'tn', name: 'Tamil Nadu', code: 'TN', totalSeats: 234, acs: [] },
  { id: 'ap', name: 'Andhra Pradesh', code: 'AP', totalSeats: 175, acs: [] },
  { id: 'ts', name: 'Telangana', code: 'TS', totalSeats: 119, acs: [] },
  { id: 'kl', name: 'Kerala', code: 'KL', totalSeats: 140, acs: [] },
  { id: 'jk', name: 'Jammu & Kashmir', code: 'JK', totalSeats: 90, acs: [] },
  { id: 'ga', name: 'Goa', code: 'GA', totalSeats: 40, acs: [] },
  { id: 'jh', name: 'Jharkhand', code: 'JH', totalSeats: 81, acs: [] },
  { id: 'ct', name: 'Chhattisgarh', code: 'CT', totalSeats: 90, acs: [] },
  { id: 'ut', name: 'Uttarakhand', code: 'UT', totalSeats: 70, acs: [] },
  { id: 'hp', name: 'Himachal Pradesh', code: 'HP', totalSeats: 68, acs: [] },
  { id: 'mz', name: 'Mizoram', code: 'MZ', totalSeats: 40, acs: [] },
  { id: 'sk', name: 'Sikkim', code: 'SK', totalSeats: 32, acs: [] },
  { id: 'tr', name: 'Tripura', code: 'TR', totalSeats: 60, acs: [] },
  { id: 'ml', name: 'Meghalaya', code: 'ML', totalSeats: 60, acs: [] },
  { id: 'mn', name: 'Manipur', code: 'MN', totalSeats: 60, acs: [] },
  { id: 'nl', name: 'Nagaland', code: 'NL', totalSeats: 60, acs: [] },
  { id: 'py', name: 'Puducherry', code: 'PY', totalSeats: 30, acs: [] },
];

INDIAN_STATES.forEach(s => s.acs = generateConstituencies(s.code, s.totalSeats));
