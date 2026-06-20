import { compareMBBSIndiaStateGroups } from "./mbbsIndiaAdmissionAccess";

export type MBBSIndiaCollege = {
  state: string;
  category: "Government" | "Private";
  collegeName: string;
  seatCapacity: number;
  establishmentYear: number | "N/A";
  fees: string;
};

export type MBBSIndiaStateGroup = {
  state: string;
  governmentCount: number;
  privateCount: number;
  totalSeats: number;
  governmentColleges: MBBSIndiaCollege[];
  privateColleges: MBBSIndiaCollege[];
};

export const mbbsIndiaColleges: MBBSIndiaCollege[] = [
  {
    state: "Andaman Nicobar Islands",
    category: "Government",
    collegeName: "Andaman & Nicobar Islands Institute of Medical Sciences, Port Blair",
    seatCapacity: 114,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Mangalagiri, Vijayawada",
    seatCapacity: 125,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "ACSR Government Medical College",
    seatCapacity: 175,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Alluri Sitaram Raju Academy of Medical Sciences, Eluru",
    seatCapacity: 250,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Andhra Medical College, Visakhapatnam",
    seatCapacity: 250,
    establishmentYear: 1923,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Anna Gowri Medical College and Hospital",
    seatCapacity: 150,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Apollo Institute of Medical Sciences and Research, Chittoor",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Dr. P.S.I. Medical College , Chinoutpalli",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Fathima Instt. of Medical Sciences, Kadapa",
    seatCapacity: 100,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Gayathri Vidya Parishad Institute of Health Care & Medical Technology, Visakhapatnam",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "GITAM Institute of Medical Sciences and Research, Visakhapatnam",
    seatCapacity: 150,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Ananthapuram",
    seatCapacity: 200,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Eluru",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Machilipatnam",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Nandyal",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Paderu",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Rajamahendravaram",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government medical college, vizianagaram",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Siddhartha Medical College, Vijaywada",
    seatCapacity: 175,
    establishmentYear: 1980,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Great Eastern Medical School and Hospital, Srikakulam",
    seatCapacity: 150,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "GSL Medical College, Rajahmundry",
    seatCapacity: 250,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Guntur Medical College, Guntur",
    seatCapacity: 250,
    establishmentYear: 1946,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Katuri Medical College, Guntur",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Konaseema Institute of Medical Sciences & Research Foundation, Amalapuram",
    seatCapacity: 200,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Kurnool Medical College, Kurnool",
    seatCapacity: 250,
    establishmentYear: 1957,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Maharajah Institute of Medical Sciences, Vizianagaram",
    seatCapacity: 200,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Narayana Medical College, Nellore",
    seatCapacity: 250,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Nimra Institute of Medical Sciences, Krishna Dist.",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "NRI Institute of Medical Sciences, Visakhapatnam",
    seatCapacity: 250,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "NRI Medical College, Guntur",
    seatCapacity: 200,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "P E S Institute Of Medical Sciences and Research, Kuppam",
    seatCapacity: 150,
    establishmentYear: 2001,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Kadapa ( previously Rajiv Gandhi Institute of Medical Sciences, Kadapa)",
    seatCapacity: 175,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Ongole (previously Rajiv Gandhi Institute of Medical Sciences, Ongole)",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Rajiv Gandhi Institute of Medical Sciences, Srikakulam",
    seatCapacity: 200,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "Rangaraya Medical College, Kakinada",
    seatCapacity: 250,
    establishmentYear: 1958,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "S V Medical College, Tirupati",
    seatCapacity: 240,
    establishmentYear: 1960,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Santhiram Medical College, Nandyal",
    seatCapacity: 250,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Sri Balaji Medical College, Hospital and Research Instiutute, Chittoor",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Government",
    collegeName: "SVIMS - Sri Padmavathi Medical College for Women, Alipiri Road, Tirupati",
    seatCapacity: 175,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Andhra Pradesh",
    category: "Private",
    collegeName: "Viswabharathi Medical College",
    seatCapacity: 250,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Arunachal Pradesh",
    category: "Government",
    collegeName: "Tomo Riba Institute of Health & Medical Sciences, Naharlagun",
    seatCapacity: 100,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Guwahati",
    seatCapacity: 100,
    establishmentYear: "N/A",
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Assam Medial College, Dibrugarh",
    seatCapacity: 250,
    establishmentYear: 1947,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Dhubri Medical College, Dhubri",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Diphu Medical College & Hospital, Diphu, Assam",
    seatCapacity: 100,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "ESIC Medical College and Hospital, Beltola",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Fakhruddin Ali Ahmed Medical College, Barpeta, Assam",
    seatCapacity: 125,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Gauhati Medical College, Guwahati",
    seatCapacity: 250,
    establishmentYear: 1960,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Jorhat Medical College & Hospital , Jorhat",
    seatCapacity: 125,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Kokrajhar Medical College",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Lakhimpur Medical College",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Nagaon Medical College",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Nalbari Medical College, Nalbari",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Pragjyotishpur Medical College",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Silchar Medical College, Silchar",
    seatCapacity: 150,
    establishmentYear: 1968,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Tezpur Medical College & Hospital, Tezpur",
    seatCapacity: 125,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Assam",
    category: "Government",
    collegeName: "Tinsukia Medical College - Assam Pin - 786146",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Patna",
    seatCapacity: 125,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Anugrah Narayan Magadh Medical College, Gaya",
    seatCapacity: 120,
    establishmentYear: 1970,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Darbhanga Medical College, Lehriasarai",
    seatCapacity: 120,
    establishmentYear: 1946,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Employees State Insurance Corporation Medical College, Patna",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Government Medical College, Bettiah",
    seatCapacity: 120,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Government Medical College, Purnea",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Himalaya Medical College and Hospital , Patna, Bihar",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Indira Gandhi Institute of Medical Sciences, Sheikhpura, Patna",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Jannayak Karpoori Thakur Medical College & Hospital, Madhepura, Bihar",
    seatCapacity: 100,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Jawaharlal Nehru Medical College, Bhagalpur",
    seatCapacity: 120,
    establishmentYear: 1971,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Katihar Medical College, Katihar",
    seatCapacity: 200,
    establishmentYear: 1987,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Lord Buddha Koshi Medical College and Hospital, Saharsa",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Madhubani Medical College, Madhubani",
    seatCapacity: 250,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "MAHABODHI MEDICAL COLLEGE & HOSPITAL",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Mata Gujri Memorial Medical College, Kishanganj",
    seatCapacity: 150,
    establishmentYear: 1990,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Nalanda Medical College, Patna",
    seatCapacity: 150,
    establishmentYear: 1970,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Narayan Medical College & Hospital, Sasaram",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Netaji Subhas Medical College & Hospital, Amhara, Bihta, Patna",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Patna Medical College, Patna",
    seatCapacity: 200,
    establishmentYear: 1925,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Radha Devi Jageshwari Memorial Medical College and Hospital",
    seatCapacity: 200,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "Shree Narayan Medical Institute and Hospital",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Shri Krishna Medical College, Muzzafarpur",
    seatCapacity: 120,
    establishmentYear: 1970,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "SHYAMLAL CHANDRASHEKHAR MEDICAL COLLEGE & S P N M HOPSITAL",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Government",
    collegeName: "Bhagwan Mahavir Institute of Medical Sciences, Pawapuri (formerly Vardhman Institute of Medical Sciences, Pawapuri, Nalanda)",
    seatCapacity: 120,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Bihar",
    category: "Private",
    collegeName: "VIRAAT RAMAYAN INSTITUTE OF MEDICAL SCIENCES",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Chandigarh",
    category: "Government",
    collegeName: "Government Medical College, Chandigarh",
    seatCapacity: 150,
    establishmentYear: 1991,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Raipur",
    seatCapacity: 125,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Private",
    collegeName: "Abhishek Mishra Memorial Medical College & RC Bhiali Distt. Durg CG",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Chandulal Chandrakar Memorial Medical College, Durg",
    seatCapacity: 200,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Chhattisgarh Institute of Medical Sciences, Bilaspur",
    seatCapacity: 150,
    establishmentYear: 2001,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Government Medical College (Bharat Ratna Shri Atal Bihari Vajpyee Memorial Med. Col.), Rajnandgaon",
    seatCapacity: 125,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Rajmata Shrimata Devendra Kumari Singhdeo Government Medical College, Ambikapur (Surguja), Chhattisgarh",
    seatCapacity: 125,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Government Medical College, Korba",
    seatCapacity: 125,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Government Medical College, Mahasamund",
    seatCapacity: 125,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Late Shri Baliram Kashyap Memorial NDMC Govt. Medical College, Jagdalpur",
    seatCapacity: 125,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Late Shri Lakhi Ram Agrawal Memorial Govt. Medical College, Raigarh",
    seatCapacity: 100,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Pt. J N M Medical College, Raipur",
    seatCapacity: 230,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Private",
    collegeName: "Raipur Institute of Medical Sciences (RIMS), Raipur",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Private",
    collegeName: "Shri Balaji Institute of Medical Science",
    seatCapacity: 250,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Private",
    collegeName: "Shri Rawatpura Sarkar Institute of Medical Sciences and Research Atal Nagar, Dist- Raipur (C.G.)",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Private",
    collegeName: "Shri Shankaracharya Institute of Medical Sciences, Bhilai",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Chattisgarh",
    category: "Government",
    collegeName: "Shrimati Indira Gandhi Memorial Govt. Medical College, Kanker, Chattisgarh (previously Government Medical College, Kanker)",
    seatCapacity: 125,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Dadra and Nagar Haveli",
    category: "Government",
    collegeName: "NAMO Medical Education and Research Institute, Silvassa (Formerly known as Shri Vinoba Bhave Institute of Medical Sciences, (Govt. Medical College) Silvassa, U.T)",
    seatCapacity: 177,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, New Delhi",
    seatCapacity: 132,
    establishmentYear: 1956,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Private",
    collegeName: "Army College of Medical Sciences, New Delhi",
    seatCapacity: 100,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "Dr. Baba Saheb Ambedkar Medical College, Rohini, Delhi",
    seatCapacity: 125,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "ESIC Medical College & Hospital, Basaidarapur, New Delhi",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Private",
    collegeName: "Hamdard Institute of Medical Sciences & Research, New Delhi",
    seatCapacity: 150,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "Maulana Azad Medical College, New Delhi",
    seatCapacity: 250,
    establishmentYear: 1958,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "North Delhi Muncipal Corporation Medical College, Delhi",
    seatCapacity: 60,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "Atal Bihari Vajpayee Institute of Medical Sciences and Dr. RML Hospital, New Delhi",
    seatCapacity: 100,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "Lady Hardinge Medical College, New Delhi",
    seatCapacity: 240,
    establishmentYear: 1916,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "Vardhman Mahavir Medical College & Safdarjung Hospital, Delhi",
    seatCapacity: 170,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Delhi",
    category: "Government",
    collegeName: "University College of Medical Sciences & GTB Hospital, New Delhi",
    seatCapacity: 170,
    establishmentYear: 1971,
    fees: "To be updated"
  },
  {
    state: "Goa",
    category: "Government",
    collegeName: "Goa Medical College, Panaji",
    seatCapacity: 200,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Rajkot",
    seatCapacity: 75,
    establishmentYear: "N/A",
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Narendra Modi Medical College, Ahmedabad ( previously Ahmedabad Municipal Coporation Medical Education Trust Medical College, Ahmedabad)",
    seatCapacity: 200,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Ananya College of Medicine & Research, Kalol",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "B J Medical College, Ahmedabad",
    seatCapacity: 250,
    establishmentYear: 1946,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Banas Medical College and Research Institute, Palanpur, Gujarat",
    seatCapacity: 200,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Bhagyoday Medical College",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "CU Shah Medical College, Surendra Nagar",
    seatCapacity: 100,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Dr. Kiran C.Patel Medical College and Research Institute",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Dr. M.K. Shah Medical College & Research Centre, Ahmedabad",
    seatCapacity: 250,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Dr. N.D. Desai Faculty of Medical Science and Research, Nadiad",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "ESIC MEDICAL COLLEGE NARODA BAPUNAGAR, AHMEDABAD",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "GCS Medical College, Ahmedabad",
    seatCapacity: 200,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Dharpur Patan",
    seatCapacity: 200,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Gandhinagar",
    seatCapacity: 200,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Gotri, Vadodara",
    seatCapacity: 200,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Hadiyol, Himmatnagar",
    seatCapacity: 200,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Junagadh",
    seatCapacity: 200,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Rajpipla",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Sola, Ahmedabad",
    seatCapacity: 200,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Vadnagar, Mehsana",
    seatCapacity: 200,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Valsad",
    seatCapacity: 200,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Government Medical College, Bhavnagar",
    seatCapacity: 200,
    establishmentYear: 1995,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Government Medical College, Morbi",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "GMERS Medical College, Navsari",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Government Medical College, Panchmahal Godhra",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Government Medical College, Porbandar",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Government Medical College, Surat",
    seatCapacity: 250,
    establishmentYear: 1964,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Gujarat Adani Institute of Medical Sciences, Bhuj",
    seatCapacity: 150,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Kiran Medical College",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Matushri prabhaben khodabhai boghara medical college & research centre",
    seatCapacity: 150,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Medical College, Baroda",
    seatCapacity: 250,
    establishmentYear: 1949,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "MP Shah Medical College, Jamnagar",
    seatCapacity: 250,
    establishmentYear: 1955,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Nootan Medical College and Research Centre, Mehsana",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Pandit Deendayal Upadhyay Medical College, Rajkot",
    seatCapacity: 200,
    establishmentYear: 1995,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Parul Institute of Medical Sciences & Research, Vadodara",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Pramukhswami Medical College, Karmsad",
    seatCapacity: 150,
    establishmentYear: 1987,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "SAL Institute of Medical Sciences, Ahmedabad",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "SBKS Medical Instt. & Research Centre, Vadodra",
    seatCapacity: 250,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Shantabaa Medical College, Amreli",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Smt. N.H.L.Municipal Medical College, Ahmedabad",
    seatCapacity: 250,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Government",
    collegeName: "Surat Municipal Institute of Medical Education & Research, Surat",
    seatCapacity: 250,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "SWAMIINARAYAN INSTITUTE OF MEDICAL SCIENCES & RESEARCH",
    seatCapacity: 200,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Gujarat",
    category: "Private",
    collegeName: "Zydus Medical College & Hospital, Dahod",
    seatCapacity: 200,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "Adesh Medical College and Hospital, Shahabad, Kurukshetra, Haryana",
    seatCapacity: 250,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "Al Falah School of Medical Sciences & Research Centre, Faridabad",
    seatCapacity: 200,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "Amrita School of Medicine",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "BPS Government Medical College for Women, Sonepat",
    seatCapacity: 120,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "Employees State Insurance Corporation Medical College, Faridabad",
    seatCapacity: 150,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "Faculty of Medicine and Health Sciences, Gurgaon (Formarly SGGST Medical College & R Centre,Gurgaon)",
    seatCapacity: 150,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "Kalpana Chawala Govt. Medical College, Karnal, Haryana",
    seatCapacity: 120,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "Maharaja Agrasen Medical College, Agroha",
    seatCapacity: 100,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "Maharishi Chyawan Medical College, Koriawas",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "Maharishi Markandeshwar College of Medical Sciences & Research, Sadopur",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "Maharishi Markandeshwar Institute Of Medical Sciences & Research, Mullana, Ambala",
    seatCapacity: 200,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "N.C. Medical College & Hospital, Panipat",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "PT NEKI RAM SHARMA GOVERNMENT MEDICAL COLLEGE, BHIWANI",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "Pt. B D Sharma Postgraduate Institute of Medical Sciences, Rohtak (Haryana)",
    seatCapacity: 250,
    establishmentYear: 1960,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "Shaheed Hasan Khan Mewati Government Medical College, Nalhar",
    seatCapacity: 120,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Government",
    collegeName: "Shri Atal Bihari Vajpayee Government Medical College, Faridabad",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Haryana",
    category: "Private",
    collegeName: "World College of Medical Sciences & Researc, Jhajjar, Haryana",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Bilaspur",
    seatCapacity: 100,
    establishmentYear: "N/A",
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Government",
    collegeName: "Dr. Radhakrishnan Government Medical College, Hamirpur, H.P",
    seatCapacity: 120,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Government",
    collegeName: "Dr. Rajendar Prasad Government Medical College, Tanda, H.P",
    seatCapacity: 120,
    establishmentYear: 1996,
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Nahan, Sirmour H.P.",
    seatCapacity: 120,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Government",
    collegeName: "Indira Gandhi Medical College, Shimla",
    seatCapacity: 120,
    establishmentYear: 1966,
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Private",
    collegeName: "Maharishi Markandeshwar Medical College & Hospital, Solan",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Government",
    collegeName: "Pt. Jawahar Lal Nehru Government Medical College, Chamba",
    seatCapacity: 120,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Himachal Pradesh",
    category: "Government",
    collegeName: "Shri Lal Bahadur Shastri Government Medical College, Mandi, HP",
    seatCapacity: 120,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Vijaypur",
    seatCapacity: 100,
    establishmentYear: "N/A",
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Private",
    collegeName: "Acharya Shri Chander College of Medical Sciences, Jammu",
    seatCapacity: 150,
    establishmentYear: 1996,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College Handwara",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College Udhampur",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College, Anantnag",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College, Baramulla",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College, Jammu",
    seatCapacity: 201,
    establishmentYear: 1972,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College, Kathua",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College, Rajouri, J&K",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Government Medical College, Srinagar",
    seatCapacity: 200,
    establishmentYear: 1959,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Govt. Medical College, Doda, Kashmir",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Government",
    collegeName: "Sher-I-Kashmir Instt. Of Medical Sciences, Srinagar",
    seatCapacity: 125,
    establishmentYear: 1988,
    fees: "To be updated"
  },
  {
    state: "Jammu & Kashmir",
    category: "Private",
    collegeName: "SHRI MATA VAISHNO DEVI INSTITUTE OF MEDICAL EXCELLENCE",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Deoghar",
    seatCapacity: 125,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Government",
    collegeName: "Dumka Medical College, Dighi Dumka",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Government",
    collegeName: "Hazaribagh Medical College, Hazaribagh",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Private",
    collegeName: "Laxmi Chandravansi Medical College & Hospital",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Government",
    collegeName: "M G M Medical College, Jamshedpur",
    seatCapacity: 150,
    establishmentYear: 1961,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Private",
    collegeName: "Manipal Tata Medical College,Baridih Jameshedpur",
    seatCapacity: 200,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Private",
    collegeName: "NETAJI SUBHAS MEDICAL COLLEGE AND HOSPITAL",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Government",
    collegeName: "Palamu Medical College, Palamu",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Government",
    collegeName: "Rajendra Institute of Medical Sciences, Ranchi",
    seatCapacity: 180,
    establishmentYear: 1960,
    fees: "To be updated"
  },
  {
    state: "Jharkhand",
    category: "Government",
    collegeName: "Shaheed Nirmal Mahto Medical College & Hospital, Dhanbad (formely known as Patliputra Medical College, Dhanbad)",
    seatCapacity: 100,
    establishmentYear: 1969,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "G R Medical College Hospital & Research Centre",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "A J Institute of Medical Sciences & Research Centre, Mangalore",
    seatCapacity: 250,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Adichunchanagiri Institute of Medical Sciences, Bellur",
    seatCapacity: 250,
    establishmentYear: 1985,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Akash Institute of Medical Sciences & Research Centre, Devanhalli, Bengaluru, Karnataka",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Al-Ameen Medical College, Bijapur",
    seatCapacity: 150,
    establishmentYear: 1984,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Bengaluru Medical College and Research Institute, Bengaluru",
    seatCapacity: 250,
    establishmentYear: 1955,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Basaveswara Medical College and Hospital, Chitradurga",
    seatCapacity: 150,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Belagavi Institute of Medical Sciences, Belagavi",
    seatCapacity: 200,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "BGS Global Institute of Medical Sciences, Bengaluru",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "BGS Medical College and Hospital Bengaluru, Karnataka",
    seatCapacity: 250,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Bidar Institute of Medical Sciences, Bidar",
    seatCapacity: 200,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Chamrajanagar Institute of Medical Sciences, Karnataka",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Nandi Medical College and Research Institute Chikkaballapura (Chikkaballapura Institute of Medical Sciences Chikkaballapura )",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Chikkamagaluru Institute of Medical Sciences, Chikkamagaluru",
    seatCapacity: 150,
    establishmentYear: "N/A",
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Chitradurga Medical College and Research Institute",
    seatCapacity: 149,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Dr BR Ambedkar Medical College, Bengaluru",
    seatCapacity: 150,
    establishmentYear: 1980,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Dr. Chandramma Dayananda Sagar Instt. of Medical Education & Research, Harohalli, Hubli",
    seatCapacity: 200,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "East Point College of Medical Sciences & Research Centre, Bengaluru",
    seatCapacity: 200,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Employees State Insurance Corporation Medical College, Bengaluru",
    seatCapacity: 150,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Employees State Insurance Corporation Medical College, Gulbarga",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "FAROOKH ACADEMY OF MEDICAL EDUCATION HOSPITAL AND RESEARCH INSTITUTE",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Father Mullers Medical College, Mangalore",
    seatCapacity: 150,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Gulbarga Institute of Medical Sciences, Gulbarga",
    seatCapacity: 200,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Hassan Institute of Medical Sciences, Hassan",
    seatCapacity: 200,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Haveri Institute of Medical Sciences, Haveri",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Jagadguru Gangadhar Mahaswamigalu Moorusavirmath Medical College JGMMMC",
    seatCapacity: 200,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Jawaharlal Nehru Medical College, Belgaum",
    seatCapacity: 250,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "JJM Medical College, Davangere",
    seatCapacity: 245,
    establishmentYear: 1965,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "JSS Medical College, Mysore",
    seatCapacity: 250,
    establishmentYear: 1984,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "K S Hegde Medical Academy, Mangalore",
    seatCapacity: 250,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "K V G Medical College, Sullia",
    seatCapacity: 150,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "K.H. Patil Institute of Medical Sciences (previously Gadag Institute of Medical Sciences, Mallasamudra, Mulgund Road, Gadag)",
    seatCapacity: 150,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Kanachur Institute of Medical Sciences, Mangalore",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Karnataka Medical College and Research Institute, Hubballi, Karnataka",
    seatCapacity: 200,
    establishmentYear: 1957,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Karwar Institute of Medical Sciences, Karwar",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Kasturba Medical College, Mangalore",
    seatCapacity: 250,
    establishmentYear: 1955,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Kasturba Medical College, Manipal",
    seatCapacity: 250,
    establishmentYear: 1953,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Kempegowda Institute of Medical Sciences, Bengaluru",
    seatCapacity: 250,
    establishmentYear: 1980,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Khaja Bandanawaz University - Faculty of Medical Sciences, Gulbarga",
    seatCapacity: 150,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Kodagu Institute of Medical Sciences, Kodagu",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Koppal Institute of Medical Sciences, Koppal",
    seatCapacity: 150,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "M S Ramaiah Medical College, Bengaluru",
    seatCapacity: 150,
    establishmentYear: 1979,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Mahadevappa Rampure Medical College, Kalaburagi, Gulbarga",
    seatCapacity: 200,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Mandya Institute of Medical Sciences, Mandya",
    seatCapacity: 150,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "MVJ Medical College and Research Hospital, Bengaluru",
    seatCapacity: 250,
    establishmentYear: 1997,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Mysore Medical College and Research Instt. (Prev.name Government Medical College), Mysore",
    seatCapacity: 250,
    establishmentYear: 1924,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Navodaya Medical College, Raichur",
    seatCapacity: 200,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "PES University Institute of Medical Sciences and Reseach Bengaluru",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Raichur Institute of Medical Sciences, Raichur",
    seatCapacity: 200,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Raja Rajeswari Medical College & Hospital, Bengaluru",
    seatCapacity: 250,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "S S Institute of Medical Sciences& Research Centre, Davangere",
    seatCapacity: 200,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "S. Nijalingappa Medical College & HSK Hospital & Research Centre, Bagalkot",
    seatCapacity: 250,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Sapthagiri Institute of Medical Sciences & Research Centre, Bengaluru",
    seatCapacity: 250,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "SDM College of Medical Sciences & Hospital, Sattur, Dharwad",
    seatCapacity: 150,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Shimoga Institute of Medical Sciences, Shimoga",
    seatCapacity: 150,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Shri Atal Bihari Vajpayee Medical College & Research Institute",
    seatCapacity: 200,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Shri B M Patil Medical College, Hospital & Research Centre, Vijayapura (Bijapur",
    seatCapacity: 250,
    establishmentYear: 1986,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Shridevi Institute of Medical Sciences & Research Hospital, Tumkur",
    seatCapacity: 250,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Siddaganga Medical College and Research Institute, Tumakuru",
    seatCapacity: 200,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "SR Patil Medical College and Hospital Distt Bagalkot",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Sri Chamundeshwari Medical College Hospital & Research Institute",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Sri Devaraj URS Medical College, Kolar",
    seatCapacity: 200,
    establishmentYear: 1986,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Sri Madhusudan Sai Institute of Medical Sciences & Research, Chikballapur",
    seatCapacity: 50,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Sri siddhartha Institute of Medical Sciences & Research Centre, Bengaluru",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Sri Siddhartha Medical College, Tumkur",
    seatCapacity: 250,
    establishmentYear: 1988,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Srinivas Institute of Medical Research Centre, Srinivasnagar, Mangalore",
    seatCapacity: 250,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "St. Johns Medical College, Bengaluru",
    seatCapacity: 150,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Subbaiah Institute of Medical Sciences, Shimoga, Karnataka",
    seatCapacity: 250,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "The Oxford Medical College, Hospital & Research Centre, Bengaluru",
    seatCapacity: 200,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Vijaynagar Institute of Medical Sciences, Bellary",
    seatCapacity: 250,
    establishmentYear: 1961,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Vydehi Institute Of Medical Sciences & Research Centre, Bengaluru",
    seatCapacity: 250,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Government",
    collegeName: "Yadgiri Institute of Medical Sciences, Yadgiri",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Yenepoya Medical College, Mangalore",
    seatCapacity: 250,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Karnataka",
    category: "Private",
    collegeName: "Sambharam Institute of Medical Sciences & Research, Kolar",
    seatCapacity: 0,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Kannur Medical College, Kannur",
    seatCapacity: 150,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Al-Azhar Medical College and Super Speciality Hospital, Thodupuzha",
    seatCapacity: 250,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Amala Institute of Medical Sciences, Thrissur",
    seatCapacity: 100,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Amrita School of Medicine, Elamkara, Kochi",
    seatCapacity: 149,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Azeezia Instt of Medical Science,Meeyannoor, Kollam",
    seatCapacity: 100,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Believers Church Medical College Hospital, Thiruvalla, Kerala",
    seatCapacity: 100,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Dr. Moopen Medical College Wayanad, Kerala",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Dr. Somervel Memorial CSI Hospital & Medical College, Karakonam, Thiruvananthapuram",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College (Institute of Integrated Medical Sciences), Yakkara, Palakkad",
    seatCapacity: 100,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College Kasaragod",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Ernakulam",
    seatCapacity: 110,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Idukki",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Konni",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Kottayam",
    seatCapacity: 175,
    establishmentYear: 1960,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Kozhikode, Calicut",
    seatCapacity: 250,
    establishmentYear: 1957,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Manjeri, Malapuram Dist.",
    seatCapacity: 110,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Parippally, Kollam",
    seatCapacity: 110,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Thrissur",
    seatCapacity: 175,
    establishmentYear: 1981,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Government Medical College, Wayanad",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Govt. Medical College,Pariyaram, Kannur (Prev. Known as Academy of Medical Sciences)",
    seatCapacity: 100,
    establishmentYear: 1995,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Jubilee Mission Medical College & Research Institute, Thrissur",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Karuna Medical College, Palakkad",
    seatCapacity: 150,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Kerala Medical College, Mangode",
    seatCapacity: 150,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "KMCT Medical College, Kozhikode, Calicut",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "M E S Medical College , Perintalmanna Malappuram Distt.Kerala",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Malabar Medical College, Kozhikode, Calicut",
    seatCapacity: 250,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Malankara Orthodox Syrian Church Medical College, Kolenchery",
    seatCapacity: 100,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "Medical College, Thiruvananthapuram",
    seatCapacity: 250,
    establishmentYear: 1951,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Mount Zion Medical College, Chayalode, Ezhamkulam Adoor, Pathanamthitta",
    seatCapacity: 150,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "P K Das Institute of Medical Sciences, Palakkad, Kerala",
    seatCapacity: 250,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Palakkad Institute of Medical Sciences, Palakkad",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Pushpagiri Institute Of Medical Sciences and Research Centre, Tiruvalla",
    seatCapacity: 100,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Sree Gokulam Medical College Trust & Research Foundation, Trivandrum",
    seatCapacity: 150,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Sree Narayana Instt. of Medical Sciences, Chalakka, Ernakulam",
    seatCapacity: 150,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Sree Uthradom Thiurnal Academy of Medical Sciences, Trivandrum",
    seatCapacity: 250,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Government",
    collegeName: "T D Medical College, Alleppey (Allappuzha)",
    seatCapacity: 175,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Kerala",
    category: "Private",
    collegeName: "Travancore Medical College, Kollam",
    seatCapacity: 200,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Bhopal",
    seatCapacity: 125,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Amaltas Institute of Medical Sciences, Dewas",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Bundelkhand Medical College, Sagar",
    seatCapacity: 150,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Chirayu Medical College and Hospital, Bairagarh, Bhopal",
    seatCapacity: 250,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "ESIC MEDICAL COLLEGE AND HOSPITAL,INDORE",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Gajra Raja Medical College, Gwalior",
    seatCapacity: 200,
    establishmentYear: 1946,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Gandhi Medical College, Bhopal",
    seatCapacity: 250,
    establishmentYear: 1955,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "GOVERMENT MEDICAL COLLEGE, SHEOPUR",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "GOVERNMENT MEDICAL COLLEGE SINGRAULI",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Chhindwara, MP",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Datia, MP",
    seatCapacity: 120,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Khandwa, MP",
    seatCapacity: 120,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Dr. Laxminarayan Pandey Government Medical College, Ratlam (M.P.)",
    seatCapacity: 180,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Satna",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Seoni",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Shahdol, MP",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Shivpuri, MP",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Vidisha, MP",
    seatCapacity: 180,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Index Medical College Hospital & Research Centre, Indore",
    seatCapacity: 250,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "L.N. Medical College and Research Centre, Bhopal",
    seatCapacity: 250,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "LNCT Medical College & Sewakunj Hospital, Indore",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "M G M Medical College, Indore",
    seatCapacity: 250,
    establishmentYear: 1948,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Mahaveer Institute of Medical Sciences & Research, Bhopal",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "MANSAROVAR MEDICAL COLLEGE AND MGU HOSPITAL",
    seatCapacity: 150,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Netaji Subhash Chandra Bose Medical College, Jabalpur",
    seatCapacity: 250,
    establishmentYear: 1955,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Peoples College of Medical Sciences & Research Centre, Bhanpur, Bhopal",
    seatCapacity: 250,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Ram Krishna College Hospital & Research Centre, Bhopal",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "RKDF Medical College Hospital & Research Centre, Jatkhedi, Bhopal",
    seatCapacity: 150,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Ruxmaniben Deepchand Gardi Medical College, Ujjain",
    seatCapacity: 150,
    establishmentYear: 2001,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "School of Medical Sciences, Sri Satya Sai University of Technology and Medical Sciences",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Shyam Shah Medical College, Rewa",
    seatCapacity: 150,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Sri Aurobindo Medical College and Post Graduate Institute , Indore",
    seatCapacity: 250,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Private",
    collegeName: "Sukh Sagar Medical College & Hospital, Jabalpur",
    seatCapacity: 200,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Sundarlal Patwa Govt. Medical College",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Madhya Pradesh",
    category: "Government",
    collegeName: "Virendra Kumar Sakhlecha Government Medical College",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Nagpur",
    seatCapacity: 125,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "ACPM Medical College, Dhule",
    seatCapacity: 100,
    establishmentYear: 1990,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Armed Forces Medical College, Pune",
    seatCapacity: 150,
    establishmentYear: 1962,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Ashwini Rural Medical College, Hospital & Research Centre, Solapur",
    seatCapacity: 150,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "B. J. Govt. Medical College, Pune",
    seatCapacity: 250,
    establishmentYear: 1964,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "B.K.L. Walawalkar Rural Medical College, Ratnagiri",
    seatCapacity: 150,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Bharati Vidyapeeth Deemed University Medical College & Hospital, Sangli",
    seatCapacity: 250,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Bharati Vidyapeeth University Medical College, Pune",
    seatCapacity: 250,
    establishmentYear: 1989,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Bharatratna Atal Bihari Vajpayee Medical College, Pune",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Datta Meghe Medical College, Nagpur",
    seatCapacity: 250,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Dr Vaishampayan Memorial Medical College, Solapur",
    seatCapacity: 200,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. D Y Patil Medical College, Hospital and Research Centre, Pimpri, Pune",
    seatCapacity: 250,
    establishmentYear: 1995,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. D Y Patil Medical College, Kolhapur",
    seatCapacity: 150,
    establishmentYear: 1989,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. N Y Tasgaonkar Institute of Medical Science",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. Panjabrao Alias Bhausaheb Deshmukh Memorial Medical College, Amravati",
    seatCapacity: 150,
    establishmentYear: 1984,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. Rajendra Gode Medical College, Amravati",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Dr. Shankarrao Chavan Govt. Medical College, Nanded",
    seatCapacity: 150,
    establishmentYear: 1988,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. Ulhas Patil Medical College & Hospital, Jalgaon",
    seatCapacity: 200,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. Vasantrao Pawar Med. Col. Hosp. & Research Centre, Nasik (Prev. NDMVP Samaj Medical College)",
    seatCapacity: 150,
    establishmentYear: 1990,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Dr. Vithalrao Vikhe Patil Foundations Medical College & Hospital, Ahmednagar",
    seatCapacity: 200,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "DY Patil University, School of Medicine",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "ESIC MEDICAL COLLEGE AND HOSPITAL, ANDHERI",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College & Hospital, Baramati",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical college and District Hospital, Ratnagiri",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College L.T. Marg, Near L.T. Marg Police Station, Mumbai - 400001",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Akola",
    seatCapacity: 200,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Alibag",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Ambernath",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Amravati",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Aurangabad",
    seatCapacity: 200,
    establishmentYear: 1956,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Bhandara",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Buldhana",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Chandrapur",
    seatCapacity: 150,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Gadchiroli",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Gondia",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Hingoli",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Jalgaon",
    seatCapacity: 150,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Jalna",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Latur",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Miraj",
    seatCapacity: 200,
    establishmentYear: 1962,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Nagpur",
    seatCapacity: 250,
    establishmentYear: 1947,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Nandurbar",
    seatCapacity: 100,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Osmanabad",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Parbhani",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Satara",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Sindhudurg",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College, Washim",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Government Medical College,Nashik",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Grant Medical College, Mumbai",
    seatCapacity: 250,
    establishmentYear: 1845,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "H.B.T. Medical College & Dr. R.N. Cooper Municipal General Hospital, Juhu, Mumbai",
    seatCapacity: 200,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Indian Institute of Medical Science & Research, Jalna",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Indira Gandhi Medical College & Hospital, Nagpur",
    seatCapacity: 200,
    establishmentYear: 1968,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Jawaharlal Nehru Medical College, Sawangi (Meghe), Wardha",
    seatCapacity: 250,
    establishmentYear: 1990,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "KJ Somaiyya Medical College & Research Centre, Mumbai",
    seatCapacity: 100,
    establishmentYear: 1991,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Krishna Institute of Medical Sciences, Karad",
    seatCapacity: 250,
    establishmentYear: 1984,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Lokmanya Tilak Municipal Medical College, Sion, Mumbai",
    seatCapacity: 200,
    establishmentYear: 1964,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Maharashtra Institute of Medical Education & Research, Talegaon, Pune",
    seatCapacity: 150,
    establishmentYear: 1994,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Maharashtra Institute of Medical Sciences & Research, Latur",
    seatCapacity: 150,
    establishmentYear: 1990,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Mahatma Gandhi Institute of Medical Sciences, Sevagram, Wardha",
    seatCapacity: 100,
    establishmentYear: 1969,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Mahatma Gandhi Mission Medical College, Vashi",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Mahatma Gandhi Missions Medical College, Aurangabad",
    seatCapacity: 250,
    establishmentYear: 1989,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Mahatma Gandhi Missions Medical College, Navi Mumbai",
    seatCapacity: 200,
    establishmentYear: 1989,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Mahatma Gandhi Missions Medical College, Nerul, Navi Mumbai",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Mahatma Gandhi Missions Medical College, Panvel",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "MALATI MULTISPECIALITY HOSPITAL AND MEDICAL COLLEGE",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "N. K. P. Salve Instt. of Medical Sciences and Research Centre and Lata Mangeshkar Hospital, Nagpur",
    seatCapacity: 250,
    establishmentYear: 1990,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Padmashree Dr. D.Y.Patil Medical College, Navi Mumbai",
    seatCapacity: 250,
    establishmentYear: 1989,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Parbhani Medical College",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Prakash Institute of Medical Sciences & Research, Sangli",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Rajashree Chatrapati Shahu Maharaj Government Medical College, Kolhapur",
    seatCapacity: 150,
    establishmentYear: 2001,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Rajiv Gandhi Medical College and Chhatrapati Shivaji Maharaj Hospital, Thane",
    seatCapacity: 100,
    establishmentYear: 1992,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "R K Damani Medical College ShriRamchandra Institute of Medical Sciences, Chhatrapati Sambhajinagar",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Rural Medical College, Loni",
    seatCapacity: 200,
    establishmentYear: 1984,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Seth GS Medical College, Mumbai",
    seatCapacity: 250,
    establishmentYear: 1925,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Shri Vasant Rao Naik Govt. Medical College, Yavatmal",
    seatCapacity: 200,
    establishmentYear: 1989,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Sindhudurg Shikshan Prasarak Mandal (SSPM) Medical College & Lifetime Hospital, Padave, Sindhudurg",
    seatCapacity: 149,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "SMBT Institute of Medical Sciences & Research Centre, Nandihills, Nashik",
    seatCapacity: 150,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Smt Sakhubai Narayanrao Katkade Medical College and Research Center",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Smt. Kashibai Navale Medical College and General Hospital, Pune",
    seatCapacity: 150,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Sri Bhausaheb Hire Government Medical College, Dhule",
    seatCapacity: 150,
    establishmentYear: 1988,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "SRTR Medical College, Ambajogai",
    seatCapacity: 150,
    establishmentYear: 1974,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Symbiosis Medical College for Women, Pune",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Terna Medical College, Navi Mumbai",
    seatCapacity: 150,
    establishmentYear: 1991,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Government",
    collegeName: "Topiwala National Medical College, Mumbai",
    seatCapacity: 150,
    establishmentYear: 1964,
    fees: "To be updated"
  },
  {
    state: "Maharashtra",
    category: "Private",
    collegeName: "Vedantaa Institute of Medical Sciences, Palghar, Maharashtra",
    seatCapacity: 150,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Manipur",
    category: "Government",
    collegeName: "Government Medical College, Churachandpur",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Manipur",
    category: "Government",
    collegeName: "Jawaharlal Nehru Institute of Medical Sciences, Porompet, Imphal",
    seatCapacity: 150,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Manipur",
    category: "Government",
    collegeName: "Regional Institute of Medical Sciences, Imphal",
    seatCapacity: 125,
    establishmentYear: 1972,
    fees: "To be updated"
  },
  {
    state: "Manipur",
    category: "Private",
    collegeName: "Shija Academy of Health Sciences",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Meghalaya",
    category: "Government",
    collegeName: "North Eastern Indira Gandhi Regional Instt. of Health and Medical Sciences, Shillong",
    seatCapacity: 50,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Meghalaya",
    category: "Private",
    collegeName: "PA Sangama International Medical College and Hospital",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Meghalaya",
    category: "Government",
    collegeName: "Shillong Medical College",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Mizoram",
    category: "Government",
    collegeName: "Zoram Medical College, Mizoram",
    seatCapacity: 100,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Nagaland",
    category: "Government",
    collegeName: "Nagaland Institute of Medical Sciences & Research",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Bhubaneswar",
    seatCapacity: 125,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Government Medical College & Hospital (Renamed as Bhima Bhoi Medical College & Hospital), Balangir",
    seatCapacity: 100,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Private",
    collegeName: "DRIEMS Institute of Health Sciences and Hospital, Kairapari",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Government Medical College & Hospital (Renamed as Fakir Mohan Medical College & Hospital), Balasore",
    seatCapacity: 100,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "GOVERNMENT MEDICAL COLLEGE PHULBANI , KANDHAMAL",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Saheed Rendo Majhi Medical College and Hospital, Bhawanipatna, Kalahandi, Odisha (erstwhile Government Medical College, Bhawanipatna)",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Dharanidhar Medical College and Hospital (previously Government Medical College, Keonjhar)",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Government Medical College, Sundargarh",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Private",
    collegeName: "Hi-Tech Medical College & Hospital, Bhubaneswar",
    seatCapacity: 150,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Private",
    collegeName: "Hi-Tech Medical College & Hospital, Rourkela",
    seatCapacity: 100,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Private",
    collegeName: "Institute of Medical Sciences and SUM Hospital, Campus-II, Phulnakhara, Bhubaneswar",
    seatCapacity: 250,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Private",
    collegeName: "Institute Of Medical Sciences & SUM Hospital, Bhubaneswar",
    seatCapacity: 250,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Private",
    collegeName: "Kalinga Institute of Medical Sciences, Bhubaneswar",
    seatCapacity: 250,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Mahraja Jajati Keshari Medical College (previously Government Medical College and Hospital, Jajpur Odhisha)",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "MKCG Medical College, Berhampur",
    seatCapacity: 250,
    establishmentYear: 1962,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "PABITRA MOHAN PRADHAN MEDICAL COLLEGE, TALCHER",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Pt. Raghunath Murmu Medical College and Hospital, Baripada, Odisha",
    seatCapacity: 125,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Saheed Laxman Nayak Medical College & Hospital, Koraput",
    seatCapacity: 125,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "SCB Medical College, Cuttack",
    seatCapacity: 250,
    establishmentYear: 1944,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Sri Jagannath Medical College & Hospital, Puri",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Orissa",
    category: "Government",
    collegeName: "Veer Surendra Sai Institute of Medical Sciences and Research, Burla",
    seatCapacity: 200,
    establishmentYear: 1959,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Government",
    collegeName: "Jawaharlal Institute of Postgraduate Medical Education & Research, Puducherry",
    seatCapacity: 243,
    establishmentYear: 1956,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Private",
    collegeName: "Aarupadai Veedu Medical College, Pondicherry",
    seatCapacity: 150,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Government",
    collegeName: "Indira Gandhi Medical College & Research Institute, Puducherry",
    seatCapacity: 180,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Private",
    collegeName: "Mahatma Gandhi Medical College & Research Institute, Pondicherry",
    seatCapacity: 250,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Private",
    collegeName: "Puducherry Institute of Medical Sciences & Research, Pondicherry",
    seatCapacity: 150,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Private",
    collegeName: "Sri Lakshmi Narayana Institute of Medical Sciences, Pondicherry",
    seatCapacity: 250,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Private",
    collegeName: "Sri Manakula Vinayagar Medical College & Hospital, Pondicherry",
    seatCapacity: 250,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Private",
    collegeName: "Sri Venkateswaraa Medical College, Hospital & Research Centre, Pondicherry",
    seatCapacity: 250,
    establishmentYear: 2007,
    fees: "To be updated"
  },
  {
    state: "Pondicherry",
    category: "Private",
    collegeName: "Vinayaka Missions Medical College, Karaikal, Pondicherry",
    seatCapacity: 150,
    establishmentYear: 1997,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Bathinda",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "Chintpurni Medical College, Pathankot, Gurdaspur",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "Adesh Institute of Medical Sciences & Research, Bhatinda",
    seatCapacity: 150,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "Christian Medical College, Ludhiana",
    seatCapacity: 100,
    establishmentYear: 1953,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "Dayanand Medical College & Hospital, Ludhiana",
    seatCapacity: 150,
    establishmentYear: 1963,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Government",
    collegeName: "Dr B R Ambedkar State Institute of Medical Sciences, SAS Nagar , Mohali",
    seatCapacity: 99,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Government",
    collegeName: "ESIC Medical College Ludhiana",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "Gian Sagar Medical College & Hospital, Patiala",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Government",
    collegeName: "Government Medical College, Amritsar",
    seatCapacity: 250,
    establishmentYear: 1943,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Government",
    collegeName: "Government Medical College, Patiala",
    seatCapacity: 250,
    establishmentYear: 1953,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Government",
    collegeName: "Guru Govind Singh Medical College, Faridkot",
    seatCapacity: 250,
    establishmentYear: 1973,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "Punjab Institute of Medical Sciences, Jalandhar",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "RIMT Medical College and Hospital",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Punjab",
    category: "Private",
    collegeName: "Sri Guru Ram Das Institute of Medical Sciences and Research, Sri Amritsar",
    seatCapacity: 150,
    establishmentYear: 1997,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Jodhpur",
    seatCapacity: 150,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Sawai Madhopur",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "American International Institute of Medical Sciences, Bedwas",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Ananta Institute of Medical Sciences & Research Centre, Rajsamand",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Arya Medical College and Hospital",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Balvir Singh Tomar Institute of Medical Sciences and Research",
    seatCapacity: 150,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Dr S S Tantia Medical College Hospital & Research Centre",
    seatCapacity: 250,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Dr SN Medical College, Jodhpur",
    seatCapacity: 250,
    establishmentYear: 1965,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Employees State Insurance Corporation Medical College,Alwar",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "ESIC MEDICAL COLLEGE AND HOSPITAL, JAIPUR",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "GEETANJALI INSTITUTE OF MEDICAL SCIENCES",
    seatCapacity: 150,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Geetanjali Medical College & Hospital,Udaipur",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Alwar",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Banswara",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Baran",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Barmer",
    seatCapacity: 130,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Bharatpur, Rajasthan",
    seatCapacity: 150,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Bhilwara, Rajasthan",
    seatCapacity: 150,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Bundi",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Chittorgarh",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Churu",
    seatCapacity: 150,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Dausa",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Dholpur",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Dungarpur",
    seatCapacity: 150,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Hanumangarh",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Jaisalmer",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Jhunjhunu",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Karauli",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Kota",
    seatCapacity: 250,
    establishmentYear: 1992,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Nagaur",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Pali, Rajasthan",
    seatCapacity: 150,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Sirohi",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government Medical College, Sri Ganganagar",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Government medical college, tonk",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Jaipur National University Institute for Medical Sciences and Research Centre, Jagatpura, Jaipur",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Jawaharlal Nehru Medical College, Ajmer",
    seatCapacity: 250,
    establishmentYear: 1965,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Jhalawar Medical College, Jhalawar",
    seatCapacity: 200,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "JIET Medical College and Hospital",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Mahatma Gandhi Medical College and Hospital, Sitapur, Jaipur",
    seatCapacity: 250,
    establishmentYear: 2001,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "National Institute of Medical Science & Research, Jaipur",
    seatCapacity: 250,
    establishmentYear: 2004,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Pacific Institute of Medical Sciences, Umarda, Udaipur",
    seatCapacity: 250,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Pacific Medical College & Hospital, Bhilo Ka Bedla, Udaipur",
    seatCapacity: 200,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "R N T Medical College, Udaipur",
    seatCapacity: 250,
    establishmentYear: 1961,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "RUHS College of Medical Sciences, Jaipur",
    seatCapacity: 150,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Sardar Patel Medical College, Bikaner",
    seatCapacity: 250,
    establishmentYear: 1959,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "Shri Kalyan Govt. Medical College, Sikar, Rajasthan",
    seatCapacity: 100,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Government",
    collegeName: "SMS Medical College, Jaipur",
    seatCapacity: 250,
    establishmentYear: 1947,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Sudha Medical College, Kota, Rajasthan",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Rajasthan",
    category: "Private",
    collegeName: "Vyas Medical College & Hospital Jodhpur, Rajasthan",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Sikkim",
    category: "Private",
    collegeName: "Sikkim Manipal Institute of Medical Sciences, Gangtok",
    seatCapacity: 150,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Madurai",
    seatCapacity: 50,
    establishmentYear: "N/A",
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "ACS Medical College and Hospital, Chennai",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Rajalakshmi Medical College Hospital and Research Institute",
    seatCapacity: 200,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Annapoorna Medical College & Hospital, Salem",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Arunai Medical College And Hospital",
    seatCapacity: 200,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Bhaarat Medical College & Hospital",
    seatCapacity: 250,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Chengalpattu Medical College, Chengalpattu",
    seatCapacity: 100,
    establishmentYear: 1965,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Chettinad Hospital & Research Institute, Kanchipuram",
    seatCapacity: 250,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Christian Medical College, Vellore",
    seatCapacity: 100,
    establishmentYear: 1942,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Coimbatore Medical College, Coimbatore",
    seatCapacity: 200,
    establishmentYear: 1966,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Dhanalakshmi Srinivasan Institute of Medical Sciences and Hospital - Thuraiyur Road, Perambalur",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Dhanalakshmi Srinivasan Medical College and Hospital, Perambalur",
    seatCapacity: 250,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "ESIC Medical College & PGIMSR, K.K Nagar, Chennai",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Faculty of Medicine , Sri Lalithambigai Medical College and Hospital",
    seatCapacity: 200,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Dharmapuri Medical College, Dharmapuri",
    seatCapacity: 100,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Erode Medical College & Hospital, Perundurai (Formerly IRT Perundurai Medical College)",
    seatCapacity: 100,
    establishmentYear: 1992,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College & ESIC Hospital, Coimbatore, Tamil Nadu.",
    seatCapacity: 100,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Ariyalur",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Dindigul",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Kallakurichi",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Karur",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Krishnagiri",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Nagapattinam",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Namakkal",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Omandurar",
    seatCapacity: 100,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Pudukottai, Tamil Nadu",
    seatCapacity: 150,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Ramanathapuram",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, The Nilgiris",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Thiruvallur",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Tiruppur",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College, Virudhunagar",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Sivagangai Medical College, Sivaganga",
    seatCapacity: 100,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Thiruvannamalai Medical College, Thiruvannamalai",
    seatCapacity: 100,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Vellore Medical College, Vellore",
    seatCapacity: 100,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Villupuram Medical College, Villupuram",
    seatCapacity: 100,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Govt. Mohan Kumaramangalam Medical College, Salem",
    seatCapacity: 100,
    establishmentYear: 1986,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Indira Medical College & Hospitals, Thiruvallur",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "J R Medical College and Hospital Villupuram District, Tamilnadu",
    seatCapacity: 200,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "K A P Viswanathan Government Medical College, Trichy",
    seatCapacity: 150,
    establishmentYear: 1998,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "KanyaKumari Government Medical College, Asaripallam",
    seatCapacity: 150,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Kanyakumari Medical Mission Research Centre, Kanyakumari District",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Karpaga Vinayaga Institute of Medical Sciences, Maduranthagam",
    seatCapacity: 150,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Karpagam Faculty of Medical Sciences & Research, Coimbatore",
    seatCapacity: 150,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Kilpauk Medical College, Chennai",
    seatCapacity: 150,
    establishmentYear: 1960,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "KMCH Institute of Health Sciences and Research, Coimbatore",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Madha Medical College and Hospital, Thandalam, Chennai",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Madras Medical College, Chennai",
    seatCapacity: 250,
    establishmentYear: 1835,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Madurai Medical College, Madurai",
    seatCapacity: 250,
    establishmentYear: 1954,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Meenakshi Medical College and Research Institute, Enathur",
    seatCapacity: 250,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Melmaruvathur Adiparasakthi Instt. Medical Sciences and Research",
    seatCapacity: 150,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Nandha Medical College & Hospital Erode",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Panimalar Medical College Hospital & Research Institute, Chennai,Tamil Nadu",
    seatCapacity: 200,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "PSG Institute of Medical Sciences, Coimbatore",
    seatCapacity: 250,
    establishmentYear: 1985,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "PSP Medical College Hospital and Research Institute, Chennai",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Government Medical College & Hospital Cuddalore, Since- 09-05-2025 (erstwhile Rajah Muthiah Medical College, cuddalore, T.N)",
    seatCapacity: 150,
    establishmentYear: 1985,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Saveetha Medical College and Hospital, Kanchipuram",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Shri Sathya Sai Medical College and Research Institute, Kancheepuram",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Sree Balaji Medical College and Hospital, Chennai",
    seatCapacity: 250,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Sree Mookambika Institute of Medical Sciences, Kanyakumari",
    seatCapacity: 150,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Sri Muthukumaran Medical College,Chennai",
    seatCapacity: 150,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Sri Ramachandra Medical College & Research Institute, Chennai",
    seatCapacity: 250,
    establishmentYear: 1985,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Sri Venkateswaraa Medical College Hospital and Research Institute, Chennai",
    seatCapacity: 250,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Srinivasan Medical College and Hospital",
    seatCapacity: 250,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "SRM Medical College Hospital & Research Centre, Kancheepuram SRM Institute of Science & Technology",
    seatCapacity: 250,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "ST Peters Medical College, Hospital & Research Institute",
    seatCapacity: 250,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Stanley Medical College, Chennai",
    seatCapacity: 250,
    establishmentYear: 1838,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Swamy Vivekanandha Medical College Hospital And Research Institute",
    seatCapacity: 200,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Tagore Medical College and Hospital, Chennai",
    seatCapacity: 250,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "TAKSHASHILA MEDICAL COLLEGE TAKSHASHILA UNIVERSITY",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Thanjavur Medical College, Thanjavur",
    seatCapacity: 150,
    establishmentYear: 1959,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Theni Government Medical College, Theni",
    seatCapacity: 100,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Thiruvarur Govt. Medical College, Thiruvarur",
    seatCapacity: 100,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Thoothukudi Medical College, Thoothukudi",
    seatCapacity: 150,
    establishmentYear: 2000,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Government",
    collegeName: "Tirunelveli Medical College, Tirunelveli",
    seatCapacity: 250,
    establishmentYear: 1965,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Trichy SRM Medical College Hospital & Research Centre, Trichy",
    seatCapacity: 250,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Velammal Medical College Hospital and Research Institute, Madurai",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "VELS Medical College & Hospital",
    seatCapacity: 250,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Tamil Nadu",
    category: "Private",
    collegeName: "Vinayaka Missions Kirupananda Variyar Medical College, Salem",
    seatCapacity: 150,
    establishmentYear: 1996,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Bibinagar",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Apollo Institute of Medical Sciences and Research, Hyderabad",
    seatCapacity: 150,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Arundathi Institute of Medical Sciences, Medchal",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Yadadri",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Ayaan Institute of Medical Sciences, Teaching Hospital & Research Centre, Kanaka Mamidi, R.R. Dist",
    seatCapacity: 150,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Bhaskar Medical College, Yenkapally",
    seatCapacity: 150,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Chalmeda Anand Rao Institute Of Medical Sciences, Karimnagar",
    seatCapacity: 200,
    establishmentYear: 2003,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "CMR Institute of Medical Science",
    seatCapacity: 250,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Deccan College of Medical Sciences",
    seatCapacity: 150,
    establishmentYear: 1985,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Dr. Patnam Mahender Reddy Institute of Medical Sciences, Chevella, Rangareddy",
    seatCapacity: 200,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Dr. VRK Womens Medical College, Aziznagar",
    seatCapacity: 100,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Employees State Insurance Coporation Medical College, Sanath Nagar, Hyderabad",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Father Colombo Institute of Medical Sciences, Warangal",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Gandhi Medical College, Secunderabad",
    seatCapacity: 250,
    establishmentYear: 1954,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "GOVERNMENT MEDICAL COLLEGE JANGAON",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "GOVERNMENT MEDICAL COLLEGE KHAMMAM",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "GOVERNMENT MEDICAL COLLEGE KUMURAM BHEEM ASIFAFABAD",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College Medak",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "GOVERNMENT MEDICAL COLLEGE VIKARABAD",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Bhadradri Kothagudem",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Jagtial",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Jayashankar Bhupalpally",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Jogulumba Gadwal",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Kamareddy",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Karimnagar",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "GOVERNMENT MEDICAL COLLEGE, KODANGAL",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Mahabubabad",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Mahabubnagar",
    seatCapacity: 175,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Maheshwaram",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Mancherial",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Mulugu",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Nagarkurnool",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Nalgonda",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Narayanpet",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Narsampet",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Nirmal",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Nizamabad",
    seatCapacity: 120,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government medical College, Quthbullapur",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Rajanna Sircilla",
    seatCapacity: 100,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Ramagundam",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Sangareddy",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Siddipet",
    seatCapacity: 175,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Suryapet",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Government Medical College, Wanaparthy",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Kakatiya Medical College, Warangal",
    seatCapacity: 250,
    establishmentYear: 1959,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Kamineni Academy of Medical Sciences & Research Center, Hyderabad",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Kamineni Institute of Medical Sciences, Narketpally",
    seatCapacity: 200,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Mahavir Institute of Medical Sciences, Vikarabad, Telengana",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Maheshwara Medical College, Chitkul, Patancheru, Medak",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Malla Reddy Institute of Medical Sciences, Hyderabad",
    seatCapacity: 200,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Mallareddy Medical College for Women, Hyderabad",
    seatCapacity: 200,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Mamata Academy of Medical Sciences, Bachupally",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Mamata Medical College, Khammam",
    seatCapacity: 200,
    establishmentYear: 1998,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Mediciti Institute Of Medical Sciences, Ghanpur",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "MNR Medical College & Hospital, Sangareddy",
    seatCapacity: 150,
    establishmentYear: 2002,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "NEELIMA INSTITUTE OF MEDICAL SCIENCES ANURAG UNIVERSITY",
    seatCapacity: 200,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Nova Institute of Medical Sciences and Research Centre",
    seatCapacity: 250,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Osmania Medical College, Hyderabad",
    seatCapacity: 250,
    establishmentYear: 1946,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Prathima Institute Of Medical Sciences, Karimnagar",
    seatCapacity: 250,
    establishmentYear: 2001,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Prathima Relief Institute of Medical Sciences, Warangal",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "R.V.M. Institute of Medical Sciences and Research Centre, Siddipet",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Government",
    collegeName: "Rajiv Gandhi Institute of Medical Sciences, adilabad",
    seatCapacity: 120,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "S V S Medical College, Mehboobnagar",
    seatCapacity: 150,
    establishmentYear: 1999,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Shadan Institute of Medical Sciences,Research Centre and Teaching Hospital, Peerancheru",
    seatCapacity: 150,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "Surabhi Institute of Medical Sciences, Siddipet, Telangana",
    seatCapacity: 200,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Telangana",
    category: "Private",
    collegeName: "TRR Institute of Medical Sciences, patancheru",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Tripura",
    category: "Government",
    collegeName: "Agartala Government Medical College,Agartala",
    seatCapacity: 150,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Tripura",
    category: "Private",
    collegeName: "Tripura Medical College and Dr. B R A M Teaching Hospital, Agartala",
    seatCapacity: 150,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Tripura",
    category: "Private",
    collegeName: "Tripura Santiniketan Medical College, Dist- West Tripura",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Rishikesh",
    seatCapacity: 125,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Government",
    collegeName: "Doon Medical College, Dehradun, Uttarakhand",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Private",
    collegeName: "Gautam Buddha Chikitsa Mahavidyalaya, Dehradum",
    seatCapacity: 150,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Government",
    collegeName: "Government Medical College (Prev.Uttarakhand Forest Hospital Trust Med.Col.), Haldwani",
    seatCapacity: 125,
    establishmentYear: 2001,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Government",
    collegeName: "Government Medical College, Haridwar",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Private",
    collegeName: "Graphic Era Institute of Medical Sciences Dehradun, Uttrakhand",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Private",
    collegeName: "Himalayan Institute of Medical Sciences, Dehradun",
    seatCapacity: 150,
    establishmentYear: 1995,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Private",
    collegeName: "Shri Guru Ram Rai Institute of Medical & Health Sciences, Dehradun",
    seatCapacity: 250,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Government",
    collegeName: "Soban Singh jeena Government institute of Medical science & Research, Almora",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttarakhand",
    category: "Government",
    collegeName: "Veer Chandra Singh Garhwali Govt. Medical Sc. & Research Instt, Srinagar, Pauri Garhwal",
    seatCapacity: 150,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Gorakhpur",
    seatCapacity: 125,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Rae Bareli",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Ajay Sangaal Institute of Medical Sciences and Ayushman Hospital Shamli (UP)",
    seatCapacity: 200,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Sultanpur",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous state medical college Amethi",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Punyashloka Lokmata Devi Ahilyabai Holkar Autonomous State Medical College, Auraiya (U.P.)",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College and Hospital Gonda",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College and Hospital Kaushambi",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College and Hospital Lakhimpuri kheri",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Kushinagar",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Lalitpur",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Pilibhit",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Pratapgarh",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Society Ghazipur",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Society, Etah, Uttar Pradesh",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Society, Fatehpur",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College Society, Hardoi",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College, Akbarpur, Kanpur",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College, Siddharthnagar",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Medical College, Sonebhadra",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Autonomous State Society Medical College Mirzapur",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Baba Kina Ram Autonomous State Medical College and Hospital Chandauli",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "BRD Medical College, Gorakhpur",
    seatCapacity: 150,
    establishmentYear: 1972,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Career Instt. Of Medical Sciences & Hospital, Lucknow",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Dr. B.S. Kushwah Medical College, Kanpur",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Dr. Ram Manohar Lohia Institute of Medical Sciences,Lucknow Dr. Ram Manohar Lohia Institute of Medical Sciences, Lucknow (deemed)",
    seatCapacity: 200,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Era Lucknow Medical College , Lucknow",
    seatCapacity: 250,
    establishmentYear: 1997,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "ESIC MEDICAL COLLEGE AND HOSPITAL, NOIDA",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "ESIC Medical College and Hospital, VARANASI",
    seatCapacity: 50,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "F.H. Medical College & Hospital, Etamdapur, Agra",
    seatCapacity: 250,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "G.S. Medical College & Hospital, Hapur, UP",
    seatCapacity: 250,
    establishmentYear: 2017,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Allopathic Medical College, Banda, UP",
    seatCapacity: 100,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Institute of Medical Sciences, Kasna, Greater Noida",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Medical College & Super facility Hospital, Azamgarh",
    seatCapacity: 100,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Badaun, U.P.",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Faizabad",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Firozabad",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Dr. Bhimrao Ramji Ambedkar Government Medical College, Kannauj ,Uttar Pradesh",
    seatCapacity: 100,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Rampur, Basti",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Government Medical College, Shahjahanpur, UP",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "GSVM Medical College, Kanpur",
    seatCapacity: 250,
    establishmentYear: 1955,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Heritage Institute of Medical Sciences, Varanasi Mahatma Gandhi Kashi Vidyapith, Varanasi",
    seatCapacity: 200,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Hind Institute of Medical Sciences , Barabanki",
    seatCapacity: 100,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Hind Institute of Medical Sciences, Sitapur",
    seatCapacity: 150,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Institute of Medical Sciences, BHU, Varansi",
    seatCapacity: 100,
    establishmentYear: 1960,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Integral Institute of Medical Sciences & Research, Lucknow",
    seatCapacity: 200,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Jawaharlal Nehru Medical College, Aligarh",
    seatCapacity: 150,
    establishmentYear: 1961,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "K.D. Medical College Hospital & Research Centre, Mathura",
    seatCapacity: 250,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Kalyan Singh Government Medical College",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "King George Medical University, Lucknow",
    seatCapacity: 250,
    establishmentYear: 1911,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "KMC Medical College & Hospital, Maharajganj, Uttar Pradesh",
    seatCapacity: 200,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Krishna Mohan Medical College & Hospital, Mathura",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "LLRM Medical College, Meerut",
    seatCapacity: 150,
    establishmentYear: 1966,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Mahamaya Rajkiya Allopathic Medical College, Ambedkarnagar",
    seatCapacity: 100,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Maharani Laxmi Bai Medical College, Jhansi",
    seatCapacity: 150,
    establishmentYear: 1968,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Maharshi Devraha Baba Autonomous State Medical College, Deoria",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Mahatma Vidur Autonomous State Medical College",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Dr. KNS Memorial Institute of Medical Sciences ( Formerly Known as Mayo Institute of Medical Sciences), Lucknow-Ayodhya Road",
    seatCapacity: 250,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Moti Lal Nehru Medical College, Allahabad",
    seatCapacity: 200,
    establishmentYear: 1961,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Muzaffarnagar Medical College, Muzaffarnagar",
    seatCapacity: 200,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Naraina Medical College & Research Centre",
    seatCapacity: 250,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "National Capital Region Institute of Medical Sciences, Meerut",
    seatCapacity: 200,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Noida International Institute Of Medical Sciences",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Prasad Institute of Medical Sciences, Lucknow",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Rajkiya Allopathic Medical College, Bahraich, UP",
    seatCapacity: 100,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Rajkiya Medical College Jalaun, Orai, Uttar Pradesh",
    seatCapacity: 100,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Rajshree Medical Research Institute, Bareilly",
    seatCapacity: 250,
    establishmentYear: 2014,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Rama Medical College and Hospital , Kanpur",
    seatCapacity: 150,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Rama Medical College Hospital and Research Centre, Hapur",
    seatCapacity: 250,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Rohilkhand Medical College & Hospital, Bareilly",
    seatCapacity: 250,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "S N Medical College, Agra",
    seatCapacity: 200,
    establishmentYear: 1939,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Santosh Medical College, Ghaziabad",
    seatCapacity: 150,
    establishmentYear: 1996,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Saraswati Institute of Medical Sciences, Hapur",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Saraswati Medical College, Unnao, U.P.",
    seatCapacity: 150,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Sharda School of Medical Sciences & Research ( previously School of Medical Sciences & Research,Greater Noida)",
    seatCapacity: 250,
    establishmentYear: 2009,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Shaikh-UL-Hind Maulana Mahmood Hasan Medical College, Saharanpur",
    seatCapacity: 100,
    establishmentYear: 2015,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Shri Gorakshnath Medical College Hospital & Arogya Dham Gorakhpur (UP)",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Shri Ram Murti Smarak Institute of Medical Sciences, Bareilly",
    seatCapacity: 200,
    establishmentYear: 2005,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Shri Siddhi Vinayak Medical College & Hospital Sambhal (UP) 244302",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "SKS Hospital Medical College & Research Centre",
    seatCapacity: 200,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Subharti Medical College, Meerut",
    seatCapacity: 200,
    establishmentYear: 1996,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "T S Misra Medical College & Hospital, Amusi, Lucknow",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Teerthanker Mahaveer Medical College, Moradabad",
    seatCapacity: 250,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Uma Nath Singh Autonomous State Medical College Society Jaunpur",
    seatCapacity: 100,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "United Institute of Medical Sciences, Allahabad",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Government",
    collegeName: "Uttar Pradesh University of Medical Sciences, (Prev. UP Rural Inst.of Med.Sc&R) Etawah",
    seatCapacity: 200,
    establishmentYear: 2006,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Varun Arjun Medical College, Banthra, Shahjahanpur",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "Uttar Pradesh",
    category: "Private",
    collegeName: "Venkateshwara Institute of Medical Sciences, Gajraula",
    seatCapacity: 250,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "All India Institute of Medical Sciences, Kalyani, Nadia",
    seatCapacity: 125,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Bankura Sammilani Medical College, Bankura",
    seatCapacity: 200,
    establishmentYear: 1956,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Barasat Government Medical College & Hospital",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Burdwan Medical College, Burdwan",
    seatCapacity: 200,
    establishmentYear: 1969,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Calcutta National Medical College, Kolkata",
    seatCapacity: 250,
    establishmentYear: 1948,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "College of Medicine and JNM Hospital, Kalyani, Nadia",
    seatCapacity: 125,
    establishmentYear: 2010,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "College of Medicine and Sagore Dutta Hospital, Kolkata",
    seatCapacity: 125,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Coochbehar Government Medical College & Hospital, Coochbehar, WB",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Diamond Harbour Government Medical College and Hospital, West Bengal",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "East West Institute of Medical Sciences and Research, Burdwan",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Employees State Insurance Corporation Medical College, Joka, Kolkata",
    seatCapacity: 150,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "Gouri Devi Institute of Medical Sciences and Hospital, Durgapur",
    seatCapacity: 200,
    establishmentYear: 2016,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Govt. Medical College, Kolkata",
    seatCapacity: 250,
    establishmentYear: 1838,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "ICARE Institute of Medical Sciences & Research, Haldia, Purba Midanpore",
    seatCapacity: 150,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Institute of Postgraduate Medical Education & Research, Kolkata",
    seatCapacity: 200,
    establishmentYear: 1957,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "IQ-City Medical College, Burdwan",
    seatCapacity: 250,
    establishmentYear: 2013,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "Jagannath Gupta Institute of Medical Sciences & Hospital, Kolkata",
    seatCapacity: 250,
    establishmentYear: 2018,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "Jagannath Gupta Institute of Medical Sciences and Hospital",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "Jakir Hossain Medical College, Burdwan",
    seatCapacity: 100,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Jalpaiguri Government Medical College",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Jhargram Government Medical College & Hospital, Jhargram",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "JIS School of Medical Science & Research, Howrah",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "JMN Medical College, Nadia",
    seatCapacity: 150,
    establishmentYear: 2023,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "KPC Medical College, Jadavpur, Kolkata",
    seatCapacity: 200,
    establishmentYear: 2008,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "Krishnanagar Institute of Medical Sciences Pvt. Ltd Krishnanagar, Nadia (WB)",
    seatCapacity: 150,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Malda Medical College & Hospital, Malda",
    seatCapacity: 125,
    establishmentYear: 2011,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Midnapore Medical College, Midnapore",
    seatCapacity: 200,
    establishmentYear: 2004,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Murshidabad Medical College & Hospitals, Murshidabad",
    seatCapacity: 125,
    establishmentYear: 2012,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Nilratan Sircar Medical College, Kolkata",
    seatCapacity: 250,
    establishmentYear: 1948,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "North Bengal Medical College, Darjeeling",
    seatCapacity: 200,
    establishmentYear: 1968,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "PKG Medical College & Hospital",
    seatCapacity: 50,
    establishmentYear: 2024,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Prafulla Chandra Sen Government Medical College & Hospital",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Purulia Government Medical College & Hospital",
    seatCapacity: 150,
    establishmentYear: 2020,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Raiganj Government Medical College & Hospital, Raiganj",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Rampurhat Government Medical College & Hospital, Rampurhat",
    seatCapacity: 150,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "RANIGANJ INSTITUTE OF MEDICAL SCIENCE",
    seatCapacity: 100,
    establishmentYear: 2025,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "RG Kar Medical College, Kolkata",
    seatCapacity: 249,
    establishmentYear: 1916,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "Santiniketan Medical College, Bolpur, West Bengal",
    seatCapacity: 150,
    establishmentYear: 2021,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Sarat Chandra Chattopadhyay Government Medical College & Hospital",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Private",
    collegeName: "Shri Ramkrishna Institute of Medical Sciences & Sanaka Hospitals, Durgapur",
    seatCapacity: 250,
    establishmentYear: 2019,
    fees: "To be updated"
  },
  {
    state: "West Bengal",
    category: "Government",
    collegeName: "Tamralipto Government Medical College & Hospital",
    seatCapacity: 100,
    establishmentYear: 2022,
    fees: "To be updated"
  }
];

export const mbbsIndiaCollegesByState: MBBSIndiaStateGroup[] = Object.values(
  mbbsIndiaColleges.reduce<Record<string, MBBSIndiaStateGroup>>((groups, college) => {
    groups[college.state] ??= {
      state: college.state,
      governmentCount: 0,
      privateCount: 0,
      totalSeats: 0,
      governmentColleges: [],
      privateColleges: [],
    };

    const group = groups[college.state];
    group.totalSeats += college.seatCapacity;

    if (college.category === "Government") {
      group.governmentCount += 1;
      group.governmentColleges.push(college);
    } else {
      group.privateCount += 1;
      group.privateColleges.push(college);
    }

    return groups;
  }, {})
).sort(compareMBBSIndiaStateGroups);

const expectedCollegeCount = 823;
const expectedTotalSeats = 129602;
const actualTotalSeats = mbbsIndiaColleges.reduce((sum, college) => sum + college.seatCapacity, 0);

if (process.env.NODE_ENV === "development" && (mbbsIndiaColleges.length !== expectedCollegeCount || actualTotalSeats !== expectedTotalSeats)) {
  console.warn(
    `MBBS India NMC data validation mismatch: expected ${expectedCollegeCount} colleges / ${expectedTotalSeats} seats, got ${mbbsIndiaColleges.length} colleges / ${actualTotalSeats} seats.`
  );
}

