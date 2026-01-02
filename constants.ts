
import { StateData, AssemblyConstituency } from './types.ts';

export const APP_NAME = "VoterListExcel.in";
export const CONTACT_WHATSAPP = "919799479444"; 

const getProfessionalPrice = (no: number) => {
  const base = 4200;
  const variance = (no * 17) % 800; 
  return base + variance;
};

const DELHI_DATA = [
  { no: 1, name: "Narela" }, { no: 2, name: "Burari" }, { no: 3, name: "Timarpur" }, { no: 4, name: "Adarsh Nagar" }, { no: 5, name: "Badli" }, { no: 6, name: "Rithala" }, { no: 7, name: "Bawana (SC)" }, { no: 8, name: "Mundka" }, { no: 9, name: "Kirari" }, { no: 10, name: "Sultanpur Majra (SC)" }, { no: 11, name: "Nangloi Jat" }, { no: 12, name: "Mangolpuri (SC)" }, { no: 13, name: "Rohini" }, { no: 14, name: "Shalimar Bagh" }, { no: 15, name: "Shakur Basti" }, { no: 16, name: "Tri Nagar" }, { no: 17, name: "Wazirpur" }, { no: 18, name: "Model Town" }, { no: 19, name: "Sadar Bazar" }, { no: 20, name: "Chandni Chowk" }, { no: 21, name: "Matia Mahal" }, { no: 22, name: "Ballimaran" }, { no: 23, name: "Karol Bagh (SC)" }, { no: 24, name: "Patel Nagar (SC)" }, { no: 25, name: "Moti Nagar" }, { no: 26, name: "Madipur (SC)" }, { no: 27, name: "Rajouri Garden" }, { no: 28, name: "Hari Nagar" }, { no: 29, name: "Tilak Nagar" }, { no: 30, name: "Janakpuri" }, { no: 31, name: "Vikaspuri" }, { no: 32, name: "Uttam Nagar" }, { no: 33, name: "Dwarka" }, { no: 34, name: "Matiala" }, { no: 35, name: "Najafgarh" }, { no: 36, name: "Bijwasan" }, { no: 37, name: "Palam" }, { no: 38, name: "Delhi Cantonment" }, { no: 39, name: "Rajinder Nagar" }, { no: 40, name: "New Delhi" }, { no: 41, name: "Jangpura" }, { no: 42, name: "Kasturba Nagar" }, { no: 43, name: "Malviya Nagar" }, { no: 44, name: "R. K. Puram" }, { no: 45, name: "Mehrauli" }, { no: 46, name: "Chhatarpur" }, { no: 47, name: "Deoli (SC)" }, { no: 48, name: "Ambedkar Nagar (SC)" }, { no: 49, name: "Sangam Vihar" }, { no: 50, name: "Greater Kailash" }, { no: 51, name: "Kalkaji" }, { no: 52, name: "Tughlakabad" }, { no: 53, name: "Badarpur" }, { no: 54, name: "Okhla" }, { no: 55, name: "Trilokpuri (SC)" }, { no: 56, name: "Kondli (SC)" }, { no: 57, name: "Patparganj" }, { no: 58, name: "Laxmi Nagar" }, { no: 59, name: "Vishwas Nagar" }, { no: 60, name: "Krishna Nagar" }, { no: 61, name: "Gandhi Nagar" }, { no: 62, name: "Shahdara" }, { no: 63, name: "Seemapuri (SC)" }, { no: 64, name: "Rohtas Nagar" }, { no: 65, name: "Seelampur" }, { no: 66, name: "Ghonda" }, { no: 67, name: "Babarpur" }, { no: 68, name: "Gokalpur (SC)" }, { no: 69, name: "Mustafabad" }, { no: 70, name: "Karawal Nagar" }
];

const PUNJAB_DATA = [
  { no: 1, name: "Sujanpur" }, { no: 2, name: "Bhoa (SC)" }, { no: 3, name: "Pathankot" }, { no: 4, name: "Gurdaspur" }, { no: 5, name: "Dina Nagar (SC)" }, { no: 6, name: "Qadian" }, { no: 7, name: "Batala" }, { no: 8, name: "Sri Hargobindpur (SC)" }, { no: 9, name: "Fatehgarh Churian" }, { no: 10, name: "Dera Baba Nanak" }, { no: 11, name: "Ajnala" }, { no: 12, name: "Raja Sansi" }, { no: 13, name: "Majitha" }, { no: 14, name: "Jandiala (SC)" }, { no: 15, name: "Amritsar North" }, { no: 16, name: "Amritsar West (SC)" }, { no: 17, name: "Amritsar Central" }, { no: 18, name: "Amritsar East" }, { no: 19, name: "Amritsar South" }, { no: 20, name: "Attari (SC)" }, { no: 21, name: "Tarn Taran" }, { no: 22, name: "Khem Karan" }, { no: 23, name: "Patti" }, { no: 24, name: "Khadoor Sahib" }, { no: 25, name: "Baba Bakala (SC)" }, { no: 26, name: "Bholath" }, { no: 27, name: "Kapurthala" }, { no: 28, name: "Sultanpur Lodhi" }, { no: 29, name: "Phagwara (SC)" }, { no: 30, name: "Jalandhar Cantonment" }, { no: 31, name: "Jalandhar West (SC)" }, { no: 32, name: "Jalandhar Central" }, { no: 33, name: "Jalandhar North" }, { no: 34, name: "Nakodar" }, { no: 35, name: "Shahkot" }, { no: 36, name: "Kartarpur (SC)" }, { no: 37, name: "Jalandhar Cantt" }, { no: 38, name: "Adampur (SC)" }, { no: 39, name: "Mukerian" }, { no: 40, name: "Dasuya" }, { no: 41, name: "Urmar" }, { no: 42, name: "Sham Chaurasi (SC)" }, { no: 43, name: "Hoshiarpur" }, { no: 44, name: "Chabbewal (SC)" }, { no: 45, name: "Garhshankar" }, { no: 46, name: "Banga (SC)" }, { no: 47, name: "Nawanshahr" }, { no: 48, name: "Balachaur" }, { no: 49, name: "Anandpur Sahib" }, { no: 50, name: "Rupnagar" }, { no: 51, name: "Chamkaur Sahib (SC)" }, { no: 52, name: "Kharar" }, { no: 53, name: "S.A.S. Nagar" }, { no: 54, name: "Bassi Pathana (SC)" }, { no: 55, name: "Fatehgarh Sahib" }, { no: 56, name: "Amloh" }, { no: 57, name: "Khanna" }, { no: 58, name: "Samrala" }, { no: 59, name: "Sahnewal" }, { no: 60, name: "Ludhiana East" }, { no: 61, name: "Ludhiana South" }, { no: 62, name: "Atam Nagar" }, { no: 63, name: "Ludhiana Central" }, { no: 64, name: "Ludhiana West" }, { no: 65, name: "Ludhiana North" }, { no: 66, name: "Gill (SC)" }, { no: 67, name: "Payal (SC)" }, { no: 68, name: "Dakha" }, { no: 69, name: "Raikot (SC)" }, { no: 70, name: "Jagraon (SC)" }, { no: 71, name: "Nihal Singh Wala (SC)" }, { no: 72, name: "Bhagha Purana" }, { no: 73, name: "Moga" }, { no: 74, name: "Dharamkot" }, { no: 75, name: "Zira" }, { no: 76, name: "Firozpur City" }, { no: 77, name: "Firozpur Rural (SC)" }, { no: 78, name: "Guru Har Sahai" }, { no: 79, name: "Jalalabad" }, { no: 80, name: "Fazilka" }, { no: 81, name: "Abohar" }, { no: 82, name: "Balluana (SC)" }, { no: 83, name: "Lambi" }, { no: 84, name: "Gidderbaha" }, { no: 85, name: "Malout (SC)" }, { no: 86, name: "Muktsar" }, { no: 87, name: "Faridkot" }, { no: 88, name: "Kotkapura" }, { no: 89, name: "Jaitu (SC)" }, { no: 90, name: "Rampura Phul" }, { no: 91, name: "Bhucho Mandi (SC)" }, { no: 92, name: "Bathinda Urban" }, { no: 93, name: "Bathinda Rural (SC)" }, { no: 94, name: "Talwandi Sabo" }, { no: 95, name: "Maur" }, { no: 96, name: "Mansa" }, { no: 97, name: "Sardulgarh" }, { no: 98, name: "Budhlada (SC)" }, { no: 99, name: "Lehra" }, { no: 100, name: "Dirba (SC)" }, { no: 101, name: "Sunam" }, { no: 102, name: "Bhadaur (SC)" }, { no: 103, name: "Barnala" }, { no: 104, name: "Mehal Kalan (SC)" }, { no: 105, name: "Malerkotla" }, { no: 106, name: "Amargarh" }, { no: 107, name: "Dhuri" }, { no: 108, name: "Sangrur" }, { no: 109, name: "Nabha (SC)" }, { no: 110, name: "Patiala Rural" }, { no: 111, name: "Rajpura" }, { no: 112, name: "Dera Bassi" }, { no: 113, name: "Ghanaur" }, { no: 114, name: "Sanour" }, { no: 115, name: "Patiala" }, { no: 116, name: "Samana" }, { no: 117, name: "Shutrana (SC)" }
];

const ODISHA_DATA = [
  { no: 1, name: "Padmapur" }, { no: 2, name: "Bijepur" }, { no: 3, name: "Bargarh" }, { no: 4, name: "Attabira (SC)" }, { no: 5, name: "Bhatli" }, { no: 6, name: "Brajarajnagar" }, { no: 7, name: "Jharsuguda" }, { no: 8, name: "Talsara (ST)" }, { no: 9, name: "Sundargarh (ST)" }, { no: 10, name: "Biramitrapur (ST)" }, { no: 11, name: "Raghunathpali (SC)" }, { no: 12, name: "Rourkela" }, { no: 13, name: "Rajgangpur (ST)" }, { no: 14, name: "Bonai (ST)" }, { no: 15, name: "Kuchinda (ST)" }, { no: 16, name: "Rengali (SC)" }, { no: 17, name: "Sambalpur" }, { no: 18, name: "Rairakhol (Redhakhol)" }, { no: 19, name: "Debagarh" }, { no: 20, name: "Telkoi (ST)" }, { no: 21, name: "Ghasipura" }, { no: 22, name: "Anandapur (SC)" }, { no: 23, name: "Swampatana (ST)" }, { no: 24, name: "Keonjhar (ST)" }, { no: 25, name: "Champua" }, { no: 26, name: "Jashipur (ST)" }, { no: 27, name: "Saraskana (ST)" }, { no: 28, name: "Rairangpur (ST)" }, { no: 29, name: "Bangiriposi (ST)" }, { no: 30, name: "Karanjia (ST)" }, { no: 31, name: "Udala (ST)" }, { no: 32, name: "Betanoti (SC)" }, { no: 33, name: "Baripada (ST)" }, { no: 34, name: "Moroda" }, { no: 35, name: "Jaleswar" }, { no: 36, name: "Bhogorai" }, { no: 37, name: "Basta" }, { no: 38, name: "Baleswar" }, { no: 39, name: "Remuna (SC)" }, { no: 40, name: "Nilgiri" }, { no: 41, name: "Soro (SC)" }, { no: 42, name: "Simulia" }, { no: 43, name: "Bhandaripokhari" }, { no: 44, name: "Bhadrak" }, { no: 45, name: "Basudebapur" }, { no: 46, name: "Dhamanagar (SC)" }, { no: 47, name: "Chandabali" }, { no: 48, name: "Binjharpur (SC)" }, { no: 49, name: "Bari" }, { no: 50, name: "Barchana" }, { no: 51, name: "Dharmasala" }, { no: 52, name: "Jajapur" }, { no: 53, name: "Korei" }, { no: 54, name: "Sukinda" }, { no: 55, name: "Dhenkanal" }, { no: 56, name: "Hindol (SC)" }, { no: 57, name: "Kamakhyanagar" }, { no: 58, name: "Porjanga" }, { no: 59, name: "Pallahara" }, { no: 60, name: "Talcher" }, { no: 61, name: "Anugul" }, { no: 62, name: "Chhendipada (SC)" }, { no: 63, name: "Athmallik" }, { no: 64, name: "Birmaharajpur (SC)" }, { no: 65, name: "Subarnapur" }, { no: 66, name: "Loisinga (SC)" }, { no: 67, name: "Patanagarh" }, { no: 68, name: "Bolangir" }, { no: 69, name: "Titilagarh" }, { no: 70, name: "Kantabanji" }, { no: 71, name: "Nuapada" }, { no: 72, name: "Khariar" }, { no: 73, name: "Umerkote (ST)" }, { no: 74, name: "Jharigam (ST)" }, { no: 75, name: "Nabarangpur (ST)" }, { no: 76, name: "Dabugam (ST)" }, { no: 77, name: "Lanjigarh (ST)" }, { no: 78, name: "Junagarh" }, { no: 79, name: "Dharmagarh" }, { no: 80, name: "Bhabanipatana (SC)" }, { no: 81, name: "Narla" }, { no: 82, name: "Baliguda (ST)" }, { no: 83, name: "Ghumusur Udayagiri (ST)" }, { no: 84, name: "Phulbani (ST)" }, { no: 85, name: "Kantamal" }, { no: 86, name: "Boudh" }, { no: 87, name: "Baramba" }, { no: 88, name: "Banki" }, { no: 89, name: "Athagarh" }, { no: 90, name: "Cuttack City" }, { no: 91, name: "Choudwar-Cuttack" }, { no: 92, name: "Niali (SC)" }, { no: 93, name: "Cuttack Sadar (SC)" }, { no: 94, name: "Salipur" }, { no: 95, name: "Mahanga" }, { no: 96, name: "Patkura" }, { no: 97, name: "Kendrapara (SC)" }, { no: 98, name: "Aul" }, { no: 99, name: "Rajanagar" }, { no: 100, name: "Mahakalapada" }, { no: 101, name: "Paradeep" }, { no: 102, name: "Tirtol (SC)" }, { no: 103, name: "Balikuda-Erasama" }, { no: 104, name: "Jagatsinghpur" }, { no: 105, name: "Kakatapur (SC)" }, { no: 106, name: "Nimapara" }, { no: 107, name: "Puri" }, { no: 108, name: "Bramhagiri" }, { no: 109, name: "Satyabadi" }, { no: 110, name: "Pipili" }, { no: 111, name: "Jayadev (SC)" }, { no: 112, name: "Bhubaneswar Central" }, { no: 113, name: "Bhubaneswar North" }, { no: 114, name: "Ekamra Bhubaneswar" }, { no: 115, name: "Jatani" }, { no: 116, name: "Begunia" }, { no: 117, name: "Khorda" }, { no: 118, name: "Chilika" }, { no: 119, name: "Ranpur" }, { no: 120, name: "Khandapada" }, { no: 121, name: "Daspalla (SC)" }, { no: 122, name: "Nayagarh" }, { no: 123, name: "Bhanjanagar" }, { no: 124, name: "Polasara" }, { no: 125, name: "Kabisurjyanagar" }, { no: 126, name: "Khalikote" }, { no: 127, name: "Chhatapur" }, { no: 128, name: "Asika" }, { no: 129, name: "Surada" }, { no: 130, name: "Sanakhemundi" }, { no: 131, name: "Hinjili" }, { no: 132, name: "Gopalpur" }, { no: 133, name: "Berhampur" }, { no: 134, name: "Digapahandi" }, { no: 135, name: "Chikiti" }, { no: 136, name: "Mohana (ST)" }, { no: 137, name: "Paralakhemundi" }, { no: 138, name: "Gunupur (ST)" }, { no: 139, name: "Bissam-Cuttack (ST)" }, { no: 140, name: "Rayagada (ST)" }, { no: 141, name: "Lakhmipur (ST)" }, { no: 142, name: "Kotpad (ST)" }, { no: 143, name: "Jayapur" }, { no: 144, name: "Koraput (SC)" }, { no: 145, name: "Pottangi (ST)" }, { no: 146, name: "Malkangiri (ST)" }, { no: 147, name: "Chitrakonda (ST)" }
];

const MADHYA_PRADESH_DATA = [
  { no: 1, name: "Sheopur" }, { no: 2, name: "Vijaypur" }, { no: 3, name: "Sabalgarh" }, { no: 4, name: "Joura" }, { no: 5, name: "Sumawali" }, { no: 6, name: "Morena" }, { no: 7, name: "Dimani" }, { no: 8, name: "Ambah (SC)" }, { no: 9, name: "Ater" }, { no: 10, name: "Bhind" }, { no: 11, name: "Lahar" }, { no: 12, name: "Mehgaon" }, { no: 13, name: "Gohad (SC)" }, { no: 14, name: "Gwalior Rural" }, { no: 15, name: "Gwalior" }, { no: 16, name: "Gwalior East" }, { no: 17, name: "Gwalior South" }, { no: 18, name: "Bhitarwar" }, { no: 19, name: "Dabra (SC)" }, { no: 20, name: "Sewda" }, { no: 21, name: "Bhander (SC)" }, { no: 22, name: "Datia" }, { no: 23, name: "Karera (SC)" }, { no: 24, name: "Pohari" }, { no: 25, name: "Shivpuri" }, { no: 26, name: "Pichhore" }, { no: 27, name: "Kolaras" }, { no: 28, name: "Bamori" }, { no: 29, name: "Guna (SC)" }, { no: 30, name: "Chachoura" }, { no: 31, name: "Raghogarh" }, { no: 32, name: "Ashok Nagar (SC)" }, { no: 33, name: "Chanderi" }, { no: 34, name: "Mungaoli" }, { no: 35, name: "Bina (SC)" }, { no: 36, name: "Khurai" }, { no: 37, name: "Surkhi" }, { no: 38, name: "Deori" }, { no: 39, name: "Rehli" }, { no: 40, name: "Naryoli" }, { no: 41, name: "Sagar" }, { no: 42, name: "Banda" }, { no: 43, name: "Tikamgarh" }, { no: 44, name: "Jatara (SC)" }, { no: 45, name: "Prithvipur" }, { no: 46, name: "Niwari" }, { no: 47, name: "Khargapur" }, { no: 48, name: "Maharajpur" }, { no: 49, name: "Chandla (SC)" }, { no: 50, name: "Rajnagar" }, { no: 51, name: "Chhatarpur" }, { no: 52, name: "Bijawar" }, { no: 53, name: "Malhara" }, { no: 54, name: "Pathariya" }, { no: 55, name: "Damoh" }, { no: 56, name: "Jabera" }, { no: 57, name: "Hatta (SC)" }, { no: 58, name: "Pawai" }, { no: 59, name: "Gunnaor (SC)" }, { no: 60, name: "Panna" }, { no: 61, name: "Chitrakoot" }, { no: 62, name: "Raigaon (SC)" }, { no: 63, name: "Satna" }, { no: 64, name: "Nagod" }, { no: 65, name: "Maihar" }, { no: 66, name: "Amarpatan" }, { no: 67, name: "Rampur-Baghelan" }, { no: 68, name: "Sirmour" }, { no: 69, name: "Semariya" }, { no: 70, name: "Teonthar" }, { no: 71, name: "Mauganj" }, { no: 72, name: "Devtalab" }, { no: 73, name: "Mangawan (SC)" }, { no: 74, name: "Rewa" }, { no: 75, name: "Gurh" }, { no: 76, name: "Churhat" }, { no: 77, name: "Sidhi" }, { no: 78, name: "Sihawal" }, { no: 79, name: "Chitrangi (ST)" }, { no: 80, name: "Singrauli" }, { no: 81, name: "Devsar (SC)" }, { no: 82, name: "Dhauhani (ST)" }, { no: 83, name: "Beohari (ST)" }, { no: 84, name: "Jaisingnagar (ST)" }, { no: 85, name: "Jaitpur (ST)" }, { no: 86, name: "Kotma" }, { no: 87, name: "Anuppur (ST)" }, { no: 88, name: "Pushprajgarh (ST)" }, { no: 89, name: "Bandhavgarh (ST)" }, { no: 90, name: "Manpur (ST)" }, { no: 91, name: "Badwara (ST)" }, { no: 92, name: "Vijayraghavgarh" }, { no: 93, name: "Murwara" }, { no: 94, name: "Bahoriband" }, { no: 95, name: "Patan" }, { no: 96, name: "Bargi" }, { no: 97, name: "Jabalpur East (SC)" }, { no: 98, name: "Jabalpur North" }, { no: 100, name: "Jabalpur West" }, { no: 101, name: "Panagar" }, { no: 102, name: "Sihora (ST)" }, { no: 103, name: "Shahpura (ST)" }, { no: 104, name: "Dindori (ST)" }, { no: 105, name: "Bichhiya (ST)" }, { no: 106, name: "Niwas (ST)" }, { no: 107, name: "Mandla (ST)" }, { no: 108, name: "Baihar (ST)" }, { no: 109, name: "Lanji" }, { no: 110, name: "Paraswada" }, { no: 111, name: "Balaghat" }, { no: 112, name: "Waraseoni" }, { no: 113, name: "Katangi" }, { no: 114, name: "Barghat (ST)" }, { no: 115, name: "Seoni" }, { no: 116, name: "Keolari" }, { no: 117, name: "Lakhnadon (ST)" }, { no: 118, name: "Gotegaon (SC)" }, { no: 119, name: "Narsingpur" }, { no: 120, name: "Tendukheda" }, { no: 121, name: "Gadarwara" }, { no: 122, name: "Junnardeo (ST)" }
];

const generateConstituencies = (stateCode: string, totalSeats: number): AssemblyConstituency[] => {
  const list: AssemblyConstituency[] = [];
  
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

  if (stateCode === 'DL') return mapData(DELHI_DATA, "Delhi");
  if (stateCode === 'OD') return mapData(ODISHA_DATA, "Odisha");
  if (stateCode === 'MP') return mapData(MADHYA_PRADESH_DATA, "Madhya Pradesh");
  if (stateCode === 'PB') return mapData(PUNJAB_DATA, "Punjab");
  
  for (let i = 1; i <= totalSeats; i++) {
    list.push({
      id: `${stateCode.toLowerCase()}-${i}`,
      number: i,
      name: `${stateCode} AC ${i}`,
      lokSabhaName: "Excel Verified Data",
      price: getProfessionalPrice(i),
      dataYear: "2025 Final",
      partsCount: 250
    });
  }
  return list;
};

export const INDIAN_STATES: StateData[] = [
  { id: 'dl', name: 'Delhi', code: 'DL', totalSeats: 70, acs: [] },
  { id: 'pb', name: 'Punjab', code: 'PB', totalSeats: 117, acs: [] },
  { id: 'mp', name: 'Madhya Pradesh', code: 'MP', totalSeats: 230, acs: [] },
  { id: 'od', name: 'Odisha', code: 'OD', totalSeats: 147, acs: [] },
  { id: 'br', name: 'Bihar', code: 'BR', totalSeats: 243, acs: [] },
  { id: 'mh', name: 'Maharashtra', code: 'MH', totalSeats: 288, acs: [] },
  { id: 'up', name: 'Uttar Pradesh', code: 'UP', totalSeats: 403, acs: [] },
  { id: 'rj', name: 'Rajasthan', code: 'RJ', totalSeats: 200, acs: [] },
  { id: 'gj', name: 'Gujarat', code: 'GJ', totalSeats: 182, acs: [] },
  { id: 'hr', name: 'Haryana', code: 'HR', totalSeats: 90, acs: [] },
  { id: 'ut', name: 'Uttarakhand', code: 'UT', totalSeats: 70, acs: [] },
  { id: 'hp', name: 'Himachal Pradesh', code: 'HP', totalSeats: 68, acs: [] },
  { id: 'jh', name: 'Jharkhand', code: 'JH', totalSeats: 81, acs: [] },
  { id: 'ct', name: 'Chhattisgarh', code: 'CT', totalSeats: 90, acs: [] },
  { id: 'wb', name: 'West Bengal', code: 'WB', totalSeats: 294, acs: [] },
  { id: 'as', name: 'Assam', code: 'AS', totalSeats: 126, acs: [] },
  { id: 'ka', name: 'Karnataka', code: 'KA', totalSeats: 224, acs: [] },
  { id: 'tn', name: 'Tamil Nadu', code: 'TN', totalSeats: 234, acs: [] },
  { id: 'ap', name: 'Andhra Pradesh', code: 'AP', totalSeats: 175, acs: [] },
  { id: 'ts', name: 'Telangana', code: 'TS', totalSeats: 119, acs: [] },
  { id: 'kl', name: 'Kerala', code: 'KL', totalSeats: 140, acs: [] },
  { id: 'jk', name: 'Jammu & Kashmir', code: 'JK', totalSeats: 90, acs: [] },
  { id: 'ga', name: 'Goa', code: 'GA', totalSeats: 40, acs: [] },
  { id: 'mz', name: 'Mizoram', code: 'MZ', totalSeats: 40, acs: [] },
  { id: 'sk', name: 'Sikkim', code: 'SK', totalSeats: 32, acs: [] },
  { id: 'tr', name: 'Tripura', code: 'TR', totalSeats: 60, acs: [] },
  { id: 'ml', name: 'Meghalaya', code: 'ML', totalSeats: 60, acs: [] },
  { id: 'mn', name: 'Manipur', code: 'MN', totalSeats: 60, acs: [] },
  { id: 'nl', name: 'Nagaland', code: 'NL', totalSeats: 60, acs: [] },
  { id: 'py', name: 'Puducherry', code: 'PY', totalSeats: 30, acs: [] },
];

INDIAN_STATES.forEach(s => s.acs = generateConstituencies(s.code, s.totalSeats));
