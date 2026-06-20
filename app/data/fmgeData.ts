export type FMGECollege = {
  name: string;
  appeared: number;
  passed: number;
  passRate: string;
};

export type FmgeCountry = {
  country: string;
  appeared: number;
  passed: number;
  passRate: string;
  colleges: FMGECollege[];
};

export const fmgeCountries: FmgeCountry[] =
[
  {
    "country": "ANTIGUA AND BARBUDA",
    "appeared": 1,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "ATLANTIC UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "ARMENIA",
    "appeared": 2689,
    "passed": 362,
    "passRate": "13.46%",
    "colleges": [
      {
        "name": "ARMENIAN RUSSIAN INTERNATIONAL UNIVERSITY MKHITAR GOSH",
        "appeared": 614,
        "passed": 52,
        "passRate": "8.47%"
      },
      {
        "name": "EREBUNI MEDICAL ACADEMY FOUNDATION",
        "appeared": 182,
        "passed": 16,
        "passRate": "8.79%"
      },
      {
        "name": "MKHITAR GOSH ARMENIAN RUSSIAN INTERNATIONAL UNIVERSITY",
        "appeared": 5,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "PROGRESS UNIVERSITY OF GYUMRI FACULTY OF MEDICINE",
        "appeared": 120,
        "passed": 16,
        "passRate": "13.33%"
      },
      {
        "name": "REPUBLIC OF ARMENIA EREBUNI MEDICAL ACADEMY FOUNDATION",
        "appeared": 7,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "REPUBLIC OF ARMENIA MEDICAL UNIVERSITY NAMED AFTER ST TEREZA",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "REPUBLIC OF ARMENIA UNIVERSITY OF GYUMRI",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "ST TEREZA MEDICAL UNIVERSITY",
        "appeared": 447,
        "passed": 25,
        "passRate": "5.59%"
      },
      {
        "name": "THE UNIVERSITY OF TRADITIONAL MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "YEREVAN GLADZOR UNIVERSITY",
        "appeared": 14,
        "passed": 3,
        "passRate": "21.43%"
      },
      {
        "name": "YEREVAN HAYBUSAK UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 684,
        "passed": 126,
        "passRate": "18.42%"
      },
      {
        "name": "YEREVAN MEDICAL UNIVERSITY NAMED AFTER ST TEREZA",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "YEREVAN STATE MEDICAL UNIVERSITY NAMED FOR MKHITAR HERATSI",
        "appeared": 377,
        "passed": 88,
        "passRate": "23.34%"
      },
      {
        "name": "YEREVAN UNIVERSITY OF TRADITIONAL MEDICINE",
        "appeared": 228,
        "passed": 36,
        "passRate": "15.79%"
      },
      {
        "name": "ARMENIAN MEDICAL INSTITUTE FACULTY OF MEDICINE",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "ARUBA",
    "appeared": 2,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "XAVIER UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "AZERBAIJAN",
    "appeared": 68,
    "passed": 28,
    "passRate": "41.18%",
    "colleges": [
      {
        "name": "AZERBAIJAN MEDICAL UNIVERSITY",
        "appeared": 54,
        "passed": 27,
        "passRate": "50.00%"
      },
      {
        "name": "KHAZAR UNIVERSITY SCHOOL OF MEDICINE DENTISTRY AND PUBLIC HEALTH",
        "appeared": 14,
        "passed": 1,
        "passRate": "7.14%"
      }
    ]
  },
  {
    "country": "BANGLADESH",
    "appeared": 3688,
    "passed": 1222,
    "passRate": "33.13%",
    "colleges": [
      {
        "name": "AD DIN SAKINA MEDICAL COLLEGE",
        "appeared": 30,
        "passed": 10,
        "passRate": "33.33%"
      },
      {
        "name": "AD DIN WOMEN S MEDICAL COLLEGE",
        "appeared": 128,
        "passed": 59,
        "passRate": "46.09%"
      },
      {
        "name": "ANWER KHAN MODERN MEDICAL COLLEGE",
        "appeared": 58,
        "passed": 30,
        "passRate": "51.72%"
      },
      {
        "name": "ARMED FORCES MEDICAL COLLEGE AFMC",
        "appeared": 7,
        "passed": 1,
        "passRate": "14.29%"
      },
      {
        "name": "ASHIYAN MEDICAL COLLEGE",
        "appeared": 33,
        "passed": 9,
        "passRate": "27.27%"
      },
      {
        "name": "B G C TRUST MEDICAL COLLEGE",
        "appeared": 33,
        "passed": 7,
        "passRate": "21.21%"
      },
      {
        "name": "BANGLADESH MEDICAL COLLEGE BMSRI",
        "appeared": 86,
        "passed": 52,
        "passRate": "60.47%"
      },
      {
        "name": "BARIND MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 81,
        "passed": 15,
        "passRate": "18.52%"
      },
      {
        "name": "BASHUNDHARA AD DIN MEDICAL COLLEGE",
        "appeared": 9,
        "passed": 5,
        "passRate": "55.56%"
      },
      {
        "name": "BRAHMANBARIA MEDICAL COLLEGE",
        "appeared": 3,
        "passed": 2,
        "passRate": "66.67%"
      },
      {
        "name": "CENTRAL MEDICAL COLLEGE COMILLA",
        "appeared": 27,
        "passed": 6,
        "passRate": "22.22%"
      },
      {
        "name": "CITY MEDICAL COLLEGE",
        "appeared": 11,
        "passed": 2,
        "passRate": "18.18%"
      },
      {
        "name": "COMMUNITY BASED MEDICAL COLLEGE BANGLADESH CBMCB",
        "appeared": 108,
        "passed": 48,
        "passRate": "44.44%"
      },
      {
        "name": "DELTA MEDICAL COLLEGE",
        "appeared": 50,
        "passed": 17,
        "passRate": "34.00%"
      },
      {
        "name": "DHAKA CENTRAL INTERNATIONAL MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 49,
        "passed": 25,
        "passRate": "51.02%"
      },
      {
        "name": "DHAKA COMMUNITY MEDICAL COLLEGE",
        "appeared": 69,
        "passed": 26,
        "passRate": "37.68%"
      },
      {
        "name": "DHAKA MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 11,
        "passed": 2,
        "passRate": "18.18%"
      },
      {
        "name": "DHAKA NATIONAL MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 153,
        "passed": 73,
        "passRate": "47.71%"
      },
      {
        "name": "DHAKA UNIVERSITY",
        "appeared": 5,
        "passed": 1,
        "passRate": "20.00%"
      },
      {
        "name": "DIABETIC ASSOCIATION MEDICAL COLLEGE",
        "appeared": 9,
        "passed": 1,
        "passRate": "11.11%"
      },
      {
        "name": "DR SIRAJUL ISLAM MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 83,
        "passed": 30,
        "passRate": "36.14%"
      },
      {
        "name": "EAST WEST MEDICAL COLLEGE",
        "appeared": 117,
        "passed": 35,
        "passRate": "29.91%"
      },
      {
        "name": "EASTERN MEDICAL COLLEGE COMILLA",
        "appeared": 121,
        "passed": 31,
        "passRate": "25.62%"
      },
      {
        "name": "ENAM MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 126,
        "passed": 46,
        "passRate": "36.51%"
      },
      {
        "name": "FARIDPUR MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "GAZI MEDICAL COLLEGE",
        "appeared": 124,
        "passed": 26,
        "passRate": "20.97%"
      },
      {
        "name": "GONOSHASTHAYA SAMAJ VITTIK MEDICAL COLLEGE",
        "appeared": 4,
        "passed": 1,
        "passRate": "25.00%"
      },
      {
        "name": "GREEN LIFE MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 34,
        "passed": 9,
        "passRate": "26.47%"
      },
      {
        "name": "HOLY FAMILY RED CRESCENT MEDICAL COLLEGE",
        "appeared": 65,
        "passed": 28,
        "passRate": "43.08%"
      },
      {
        "name": "IBN SINA MEDICAL COLLEGE",
        "appeared": 14,
        "passed": 11,
        "passRate": "78.57%"
      },
      {
        "name": "IBRAHIM MEDICAL COLLEGE",
        "appeared": 5,
        "passed": 2,
        "passRate": "40.00%"
      },
      {
        "name": "INSTITUTE OF APPLIED HEALTH SCIENCES IAHS",
        "appeared": 111,
        "passed": 11,
        "passRate": "9.91%"
      },
      {
        "name": "INTERNATIONAL MEDICAL COLLEGE",
        "appeared": 127,
        "passed": 37,
        "passRate": "29.13%"
      },
      {
        "name": "ISLAMI BANK MEDICAL COLLEGE",
        "appeared": 8,
        "passed": 2,
        "passRate": "25.00%"
      },
      {
        "name": "JAHURUL ISLAM MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 61,
        "passed": 35,
        "passRate": "57.38%"
      },
      {
        "name": "JALALABAD RAGIB RABEYA MEDICAL COLLEGE",
        "appeared": 93,
        "passed": 29,
        "passRate": "31.18%"
      },
      {
        "name": "KHWAJA YUNUS ALI MEDICAL COLLEGE",
        "appeared": 87,
        "passed": 43,
        "passRate": "49.43%"
      },
      {
        "name": "KUMUDINI WOMEN S MEDICAL COLLEGE",
        "appeared": 165,
        "passed": 60,
        "passRate": "36.36%"
      },
      {
        "name": "M ABDUR RAHIM MEDICAL COLLEGE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "M H SAMORITA HOSPITAL AND MEDICAL COLLEGE",
        "appeared": 45,
        "passed": 10,
        "passRate": "22.22%"
      },
      {
        "name": "MAINAMOTI MEDICAL COLLEGE",
        "appeared": 70,
        "passed": 16,
        "passRate": "22.86%"
      },
      {
        "name": "MARKS MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 80,
        "passed": 11,
        "passRate": "13.75%"
      },
      {
        "name": "MEDICAL COLLEGE FOR WOMEN AND HOSPITAL",
        "appeared": 43,
        "passed": 18,
        "passRate": "41.86%"
      },
      {
        "name": "MONNO MEDICAL COLLEGE",
        "appeared": 86,
        "passed": 37,
        "passRate": "43.02%"
      },
      {
        "name": "MYMENSINGH MEDICAL COLLEGE",
        "appeared": 5,
        "passed": 5,
        "passRate": "100.00%"
      },
      {
        "name": "NORTH BENGAL MEDICAL COLLEGE",
        "appeared": 17,
        "passed": 7,
        "passRate": "41.18%"
      },
      {
        "name": "NORTH EAST MEDICAL COLLEGE",
        "appeared": 9,
        "passed": 1,
        "passRate": "11.11%"
      },
      {
        "name": "NORTHERN INTERNATIONAL MEDICAL COLLEGE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "PARKVIEW MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 11,
        "passed": 3,
        "passRate": "27.27%"
      },
      {
        "name": "POPULAR MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 28,
        "passed": 16,
        "passRate": "57.14%"
      },
      {
        "name": "PRESIDENT ABDUL HAMID MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 13,
        "passed": 6,
        "passRate": "46.15%"
      },
      {
        "name": "PRIME MEDICAL COLLEGE",
        "appeared": 164,
        "passed": 43,
        "passRate": "26.22%"
      },
      {
        "name": "RAJSHAHI MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 5,
        "passed": 1,
        "passRate": "20.00%"
      },
      {
        "name": "RANGPUR COMMUNITY MEDICAL COLLEGE",
        "appeared": 149,
        "passed": 22,
        "passRate": "14.77%"
      },
      {
        "name": "RANGPUR MEDICAL COLLEGE",
        "appeared": 2,
        "passed": 1,
        "passRate": "50.00%"
      },
      {
        "name": "SHAHABUDDIN MEDICAL COLLEGE",
        "appeared": 47,
        "passed": 6,
        "passRate": "12.77%"
      },
      {
        "name": "SHAHEED MONSUR ALI MEDICAL COLLEGE",
        "appeared": 19,
        "passed": 11,
        "passRate": "57.89%"
      },
      {
        "name": "SHAHEED SUHRAWARDY MEDICAL COLLEGE",
        "appeared": 9,
        "passed": 8,
        "passRate": "88.89%"
      },
      {
        "name": "SIR SALIMULLAH MEDICAL COLLEGE",
        "appeared": 10,
        "passed": 6,
        "passRate": "60.00%"
      },
      {
        "name": "SOUTHERN MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 29,
        "passed": 7,
        "passRate": "24.14%"
      },
      {
        "name": "SYLHET M A G OSMANI MEDICAL COLLEGE",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SYLHET WOMEN S MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 66,
        "passed": 30,
        "passRate": "45.45%"
      },
      {
        "name": "T M S S MEDICAL COLLEGE",
        "appeared": 137,
        "passed": 33,
        "passRate": "24.09%"
      },
      {
        "name": "TAIRUNNESSA MEMORIAL MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 182,
        "passed": 59,
        "passRate": "32.42%"
      },
      {
        "name": "UNIVERSAL MEDICAL COLLEGE",
        "appeared": 4,
        "passed": 3,
        "passRate": "75.00%"
      },
      {
        "name": "UNIVERSITY OF DHAKA",
        "appeared": 7,
        "passed": 2,
        "passRate": "28.57%"
      },
      {
        "name": "UNIVERSITY OF RAJSHAHI",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "UNIVERSITY OF SCIENCE AND TECHNOLOGY CHITTAGONG",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "US BANGLA MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 5,
        "passed": 2,
        "passRate": "40.00%"
      },
      {
        "name": "UTTARA ADHUNIK MEDICAL COLLEGE",
        "appeared": 6,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "ZAINUL HAQUE SIKDER WOMEN S MEDICAL COLLEGE AND HOSPITAL",
        "appeared": 122,
        "passed": 30,
        "passRate": "24.59%"
      },
      {
        "name": "JASHORE MEDICAL COLLEGE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "BARBADOS",
    "appeared": 53,
    "passed": 18,
    "passRate": "33.96%",
    "colleges": [
      {
        "name": "AMERICAN UNIVERSITY OF BARBADOS SCHOOL OF MEDICINE",
        "appeared": 44,
        "passed": 15,
        "passRate": "34.09%"
      },
      {
        "name": "BRIDGETOWN INTERNATIONAL UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 5,
        "passed": 2,
        "passRate": "40.00%"
      },
      {
        "name": "INTERNATIONAL UNIVERSITY OF BARBADOS SCHOOL OF MEDICINE",
        "appeared": 4,
        "passed": 1,
        "passRate": "25.00%"
      }
    ]
  },
  {
    "country": "BELARUS",
    "appeared": 534,
    "passed": 150,
    "passRate": "28.09%",
    "colleges": [
      {
        "name": "BELARUSIAN STATE MEDICAL UNIVERSITY",
        "appeared": 192,
        "passed": 71,
        "passRate": "36.98%"
      },
      {
        "name": "GOMEL STATE MEDICAL UNIVERSITY",
        "appeared": 251,
        "passed": 65,
        "passRate": "25.90%"
      },
      {
        "name": "GRODNO STATE MEDICAL UNIVERSITY",
        "appeared": 54,
        "passed": 7,
        "passRate": "12.96%"
      },
      {
        "name": "VITEBSK STATE MEDICAL UNIVERSITY",
        "appeared": 37,
        "passed": 7,
        "passRate": "18.92%"
      }
    ]
  },
  {
    "country": "BELIZE",
    "appeared": 518,
    "passed": 60,
    "passRate": "11.58%",
    "colleges": [
      {
        "name": "CENTRAL AMERICA HEALTH SCIENCES UNIVERSITY",
        "appeared": 52,
        "passed": 6,
        "passRate": "11.54%"
      },
      {
        "name": "CENTRAL AMERICA HEALTH SCIENCES UNIVERSITY BELIZE MEDICAL COLLEGE",
        "appeared": 193,
        "passed": 20,
        "passRate": "10.36%"
      },
      {
        "name": "COLUMBUS CENTRAL UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 210,
        "passed": 26,
        "passRate": "12.38%"
      },
      {
        "name": "WASHINGTON UNIVERSITY OF HEALTH AND SCIENCES",
        "appeared": 63,
        "passed": 8,
        "passRate": "12.70%"
      }
    ]
  },
  {
    "country": "BULGARIA",
    "appeared": 73,
    "passed": 21,
    "passRate": "28.77%",
    "colleges": [
      {
        "name": "MEDICAL UNIVERSITY OF PLOVDIV FACULTY OF MEDICINE",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "MEDICAL UNIVERSITY OF SOFIA FACULTY OF MEDICINE",
        "appeared": 4,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "MEDICAL UNIVERSITY PROF DR PARASKEV STOYANOV VARNA FACULTY OF MEDICINE",
        "appeared": 15,
        "passed": 5,
        "passRate": "33.33%"
      },
      {
        "name": "PLEVEN MEDICAL UNIVERSITY",
        "appeared": 45,
        "passed": 16,
        "passRate": "35.56%"
      },
      {
        "name": "SOFIA UNIVERSITY ST KLIMENT OHRIDSKI FACULTY OF MEDICINE",
        "appeared": 4,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "TRAKIA UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "CHINA",
    "appeared": 13652,
    "passed": 1975,
    "passRate": "14.47%",
    "colleges": [
      {
        "name": "ANHUI MEDICAL UNIVERSITY",
        "appeared": 89,
        "passed": 19,
        "passRate": "21.35%"
      },
      {
        "name": "BEIHUA UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 331,
        "passed": 25,
        "passRate": "7.55%"
      },
      {
        "name": "BINZHOU MEDICAL UNIVERSITY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "CAPITAL MEDICAL UNIVERSITY",
        "appeared": 173,
        "passed": 23,
        "passRate": "13.29%"
      },
      {
        "name": "CHANGCHUN UNIVERSITY OF TRADITIONAL CHINESE MEDICINE",
        "appeared": 20,
        "passed": 2,
        "passRate": "10.00%"
      },
      {
        "name": "CHANGSHA MEDICAL UNIVERSITY",
        "appeared": 43,
        "passed": 6,
        "passRate": "13.95%"
      },
      {
        "name": "CHENGDE MEDICAL UNIVERSITY",
        "appeared": 21,
        "passed": 2,
        "passRate": "9.52%"
      },
      {
        "name": "CHENGDU UNIVERSITY OF TRADITIONAL CHINESE MEDICINE",
        "appeared": 20,
        "passed": 4,
        "passRate": "20.00%"
      },
      {
        "name": "CHINA MEDICAL UNIVERSITY",
        "appeared": 379,
        "passed": 42,
        "passRate": "11.08%"
      },
      {
        "name": "CHONGQING MEDICAL UNIVERSITY",
        "appeared": 494,
        "passed": 68,
        "passRate": "13.77%"
      },
      {
        "name": "COLLEGE OF BASIC MEDICAL SCIENCES OF JILIN UNIVERSITY",
        "appeared": 77,
        "passed": 26,
        "passRate": "33.77%"
      },
      {
        "name": "DALI UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 363,
        "passed": 35,
        "passRate": "9.64%"
      },
      {
        "name": "DALIAN MEDICAL UNIVERSITY",
        "appeared": 77,
        "passed": 5,
        "passRate": "6.49%"
      },
      {
        "name": "FUJIAN MEDICAL UNIVERSITY",
        "appeared": 113,
        "passed": 19,
        "passRate": "16.81%"
      },
      {
        "name": "GANNAN MEDICAL UNIVERSITY",
        "appeared": 56,
        "passed": 7,
        "passRate": "12.50%"
      },
      {
        "name": "GUANGDONG PHARMACEUTICAL UNIVERSITY",
        "appeared": 12,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "GUANGXI MEDICAL UNIVERSITY",
        "appeared": 371,
        "passed": 56,
        "passRate": "15.09%"
      },
      {
        "name": "GUANGXI UNIVERSITY OF CHINESE MEDICINE",
        "appeared": 110,
        "passed": 10,
        "passRate": "9.09%"
      },
      {
        "name": "GUANGZHOU MEDICAL UNIVERSITY",
        "appeared": 104,
        "passed": 21,
        "passRate": "20.19%"
      },
      {
        "name": "GUILIN MEDICAL UNIVERSITY",
        "appeared": 23,
        "passed": 5,
        "passRate": "21.74%"
      },
      {
        "name": "GUIZHOU MEDICAL UNIVERSITY",
        "appeared": 51,
        "passed": 4,
        "passRate": "7.84%"
      },
      {
        "name": "HAINAN MEDICAL UNIVERSITY",
        "appeared": 107,
        "passed": 18,
        "passRate": "16.82%"
      },
      {
        "name": "HARBIN MEDICAL UNIVERSITY",
        "appeared": 190,
        "passed": 29,
        "passRate": "15.26%"
      },
      {
        "name": "HEBEI MEDICAL UNIVERSITY",
        "appeared": 266,
        "passed": 33,
        "passRate": "12.41%"
      },
      {
        "name": "HEBEI NORTH UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 5,
        "passed": 1,
        "passRate": "20.00%"
      },
      {
        "name": "HUBEI MEDICAL UNIVERSITY",
        "appeared": 4,
        "passed": 1,
        "passRate": "25.00%"
      },
      {
        "name": "HUBEI POLYTECHNIC UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 9,
        "passed": 1,
        "passRate": "11.11%"
      },
      {
        "name": "HUBEI UNIVERSITY OF CHINESE MEDICINE",
        "appeared": 16,
        "passed": 2,
        "passRate": "12.50%"
      },
      {
        "name": "HUBEI UNIVERSITY OF CHINESE MEDICINE FIRST CLINICAL COLLEGE",
        "appeared": 57,
        "passed": 7,
        "passRate": "12.28%"
      },
      {
        "name": "HUBEI UNIVERSITY OF MEDICINE",
        "appeared": 181,
        "passed": 21,
        "passRate": "11.60%"
      },
      {
        "name": "HUBEI UNIVERSITY OF SCIENCE AND TECHNOLOGY FACULTY OF MEDICINE",
        "appeared": 29,
        "passed": 9,
        "passRate": "31.03%"
      },
      {
        "name": "HUNAN NORMAL UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 16,
        "passed": 2,
        "passRate": "12.50%"
      },
      {
        "name": "INNER MONGOLIA UNIVERSITY FOR THE NATIONALITIES",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "JIAMUSI UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 314,
        "passed": 15,
        "passRate": "4.78%"
      },
      {
        "name": "JIANGHAN UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 68,
        "passed": 7,
        "passRate": "10.29%"
      },
      {
        "name": "JIANGSU UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 114,
        "passed": 21,
        "passRate": "18.42%"
      },
      {
        "name": "JIANGXI MEDICAL COLLEGE",
        "appeared": 69,
        "passed": 2,
        "passRate": "2.90%"
      },
      {
        "name": "JIANGXI MEDICAL COLLEGE OF NANCHANG UNIVERSITY",
        "appeared": 194,
        "passed": 24,
        "passRate": "12.37%"
      },
      {
        "name": "JIANGXI UNIVERSITY OF CHINESE MEDICINE",
        "appeared": 239,
        "passed": 16,
        "passRate": "6.69%"
      },
      {
        "name": "JIANGXI UNIVERSITY OF TRADITIONAL CHINESE MEDICINE",
        "appeared": 93,
        "passed": 2,
        "passRate": "2.15%"
      },
      {
        "name": "JILIN MEDICAL UNIVERSITY",
        "appeared": 241,
        "passed": 32,
        "passRate": "13.28%"
      },
      {
        "name": "JILIN UNIVERSITY COLLEGE OF BASIC MEDICAL SCIENCES",
        "appeared": 5,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "JINAN UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 207,
        "passed": 27,
        "passRate": "13.04%"
      },
      {
        "name": "JINGGANGSHAN UNIVERSITY MEDICAL SCHOOL",
        "appeared": 63,
        "passed": 3,
        "passRate": "4.76%"
      },
      {
        "name": "JINGZHOU MEDICAL UNIVERSITY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "JINZHOU MEDICAL UNIVERSITY",
        "appeared": 297,
        "passed": 54,
        "passRate": "18.18%"
      },
      {
        "name": "JIUJIANG UNIVERSITY MEDICAL COLLEGE",
        "appeared": 61,
        "passed": 2,
        "passRate": "3.28%"
      },
      {
        "name": "KUNMING MEDICAL UNIVERSITY",
        "appeared": 262,
        "passed": 58,
        "passRate": "22.14%"
      },
      {
        "name": "MEDICAL COLLEGE OF CHINA THREE GORGES UNIVERSITY",
        "appeared": 221,
        "passed": 18,
        "passRate": "8.14%"
      },
      {
        "name": "MEDICAL COLLEGE OF HENAN UNIVERSITY OF SCIENCE AND TECHNOLOGY",
        "appeared": 156,
        "passed": 24,
        "passRate": "15.38%"
      },
      {
        "name": "NANCHANG UNIVERSITY",
        "appeared": 48,
        "passed": 8,
        "passRate": "16.67%"
      },
      {
        "name": "NANJING MEDICAL UNIVERSITY",
        "appeared": 171,
        "passed": 44,
        "passRate": "25.73%"
      },
      {
        "name": "NANJING UNIVERSITY OF CHINESE MEDICINE",
        "appeared": 258,
        "passed": 40,
        "passRate": "15.50%"
      },
      {
        "name": "NANTONG MEDICAL COLLEGE",
        "appeared": 59,
        "passed": 7,
        "passRate": "11.86%"
      },
      {
        "name": "NANTONG UNIVERSITY MEDICAL SCHOOL",
        "appeared": 234,
        "passed": 45,
        "passRate": "19.23%"
      },
      {
        "name": "NINGBO UNIVERSITY MEDICAL SCHOOL",
        "appeared": 222,
        "passed": 57,
        "passRate": "25.68%"
      },
      {
        "name": "NINGXIA MEDICAL UNIVERSITY",
        "appeared": 173,
        "passed": 25,
        "passRate": "14.45%"
      },
      {
        "name": "NORMAN BETHUNE HEALTH SCIENCE CENTER OF JILIN UNIVERSITY",
        "appeared": 93,
        "passed": 4,
        "passRate": "4.30%"
      },
      {
        "name": "NORMAN BETHUNE UNIVERSITY OF MEDICAL SCIENCES",
        "appeared": 18,
        "passed": 1,
        "passRate": "5.56%"
      },
      {
        "name": "NORTH SICHUAN MEDICAL COLLEGE",
        "appeared": 190,
        "passed": 30,
        "passRate": "15.79%"
      },
      {
        "name": "QINGDAO UNIVERSITY COLLEGE OF MEDICAL SCIENCE",
        "appeared": 199,
        "passed": 37,
        "passRate": "18.59%"
      },
      {
        "name": "QIQIHAR MEDICAL UNIVERSITY",
        "appeared": 370,
        "passed": 49,
        "passRate": "13.24%"
      },
      {
        "name": "SANQUAN MEDICAL COLLEGE",
        "appeared": 26,
        "passed": 5,
        "passRate": "19.23%"
      },
      {
        "name": "SHANDONG FIRST MEDICAL UNIVERSITY",
        "appeared": 165,
        "passed": 13,
        "passRate": "7.88%"
      },
      {
        "name": "SHANDONG SECOND MEDICAL UNIVERSITY",
        "appeared": 9,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SHANDONG UNIVERSITY CHEELOO COLLEGE OF MEDICINE",
        "appeared": 67,
        "passed": 11,
        "passRate": "16.42%"
      },
      {
        "name": "SHANGHAI JIAO TONG UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SHANXI MEDICAL UNIVERSITY",
        "appeared": 40,
        "passed": 5,
        "passRate": "12.50%"
      },
      {
        "name": "SHENYANG MEDICAL COLLEGE",
        "appeared": 43,
        "passed": 4,
        "passRate": "9.30%"
      },
      {
        "name": "SHIHEZI UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 151,
        "passed": 26,
        "passRate": "17.22%"
      },
      {
        "name": "SOOCHOW UNIVERSITY MEDICAL COLLEGE",
        "appeared": 326,
        "passed": 52,
        "passRate": "15.95%"
      },
      {
        "name": "SOUTHEAST UNIVERSITY MEDICAL COLLEGE",
        "appeared": 220,
        "passed": 35,
        "passRate": "15.91%"
      },
      {
        "name": "SOUTHERN MEDICAL UNIVERSITY",
        "appeared": 254,
        "passed": 39,
        "passRate": "15.35%"
      },
      {
        "name": "SOUTHWEST MEDICAL UNIVERSITY",
        "appeared": 245,
        "passed": 35,
        "passRate": "14.29%"
      },
      {
        "name": "SUN YAT SEN UNIVERSITY",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SUZHOU MEDICAL COLLEGE",
        "appeared": 6,
        "passed": 1,
        "passRate": "16.67%"
      },
      {
        "name": "TAIAN MEDICAL COLLEGE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "TAISHAN MEDICAL UNIVERSITY",
        "appeared": 9,
        "passed": 1,
        "passRate": "11.11%"
      },
      {
        "name": "TIANJIN MEDICAL UNIVERSITY CLINICAL MEDICAL COLLEGE",
        "appeared": 79,
        "passed": 8,
        "passRate": "10.13%"
      },
      {
        "name": "TIANJIN MEDICAL UNIVERSITY SCHOOL OF BASIC MEDICAL SCIENCES",
        "appeared": 195,
        "passed": 26,
        "passRate": "13.33%"
      },
      {
        "name": "TIANJIN UNIVERSITY OF TRADITIONAL CHINESE MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "TONGJI MEDICAL COLLEGE OF HUAZHONG UNIVERSITY OF SCIENCE AND TECHNOLOGY",
        "appeared": 22,
        "passed": 3,
        "passRate": "13.64%"
      },
      {
        "name": "TONGJI UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 6,
        "passed": 2,
        "passRate": "33.33%"
      },
      {
        "name": "UNIVERSITY OF SOUTH CHINA FACULTY OF MEDICINE",
        "appeared": 113,
        "passed": 18,
        "passRate": "15.93%"
      },
      {
        "name": "WEIFANG MEDICAL UNIVERSITY",
        "appeared": 303,
        "passed": 25,
        "passRate": "8.25%"
      },
      {
        "name": "WENZHOU MEDICAL UNIVERSITY",
        "appeared": 145,
        "passed": 43,
        "passRate": "29.66%"
      },
      {
        "name": "WEST CHINA COLLEGE OF MEDICINE SICHUAN UNIVERSITY",
        "appeared": 339,
        "passed": 91,
        "passRate": "26.84%"
      },
      {
        "name": "WUHAN UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 285,
        "passed": 35,
        "passRate": "12.28%"
      },
      {
        "name": "XI AN JIAOTONG UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 176,
        "passed": 54,
        "passRate": "30.68%"
      },
      {
        "name": "XIAMEN UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 182,
        "passed": 40,
        "passRate": "21.98%"
      },
      {
        "name": "XINJIANG MEDICAL UNIVERSITY",
        "appeared": 430,
        "passed": 71,
        "passRate": "16.51%"
      },
      {
        "name": "XINXIANG MEDICAL UNIVERSITY",
        "appeared": 94,
        "passed": 11,
        "passRate": "11.70%"
      },
      {
        "name": "XUZHOU MEDICAL UNIVERSITY",
        "appeared": 195,
        "passed": 33,
        "passRate": "16.92%"
      },
      {
        "name": "YANGZHOU UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 327,
        "passed": 51,
        "passRate": "15.60%"
      },
      {
        "name": "YICHUN UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 22,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "YOUJIANG MEDICAL COLLEGE FOR NATIONALITIES",
        "appeared": 48,
        "passed": 7,
        "passRate": "14.58%"
      },
      {
        "name": "YUNNAN UNIVERSITY OF CHINESE MEDICINE",
        "appeared": 72,
        "passed": 7,
        "passRate": "9.72%"
      },
      {
        "name": "ZHEJIANG CHINESE MEDICAL UNIVERSITY",
        "appeared": 138,
        "passed": 23,
        "passRate": "16.67%"
      },
      {
        "name": "ZHEJIANG UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 19,
        "passed": 2,
        "passRate": "10.53%"
      },
      {
        "name": "ZHENGZHOU UNIVERSITY MEDICAL SCHOOL",
        "appeared": 411,
        "passed": 39,
        "passRate": "9.49%"
      },
      {
        "name": "ZHENJIANG MEDICAL COLLEGE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "ZHONGSHAN SCHOOL OF MEDICINE SUN YAT SEN UNIVERSITY",
        "appeared": 26,
        "passed": 4,
        "passRate": "15.38%"
      },
      {
        "name": "MEDICAL COLLEGE OF NANCHANG UNIVERSITY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "NORTH CHINA UNIVERSITY OF SCIENCE AND TECHNOLOGY COLLEGE OF MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "CURACAO",
    "appeared": 91,
    "passed": 19,
    "passRate": "20.88%",
    "colleges": [
      {
        "name": "AVALON UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 13,
        "passed": 3,
        "passRate": "23.08%"
      },
      {
        "name": "JOHN F KENNEDY UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 14,
        "passed": 4,
        "passRate": "28.57%"
      },
      {
        "name": "ST MARTINUS UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 64,
        "passed": 12,
        "passRate": "18.75%"
      }
    ]
  },
  {
    "country": "CZECH REPUBLIC",
    "appeared": 7,
    "passed": 5,
    "passRate": "71.43%",
    "colleges": [
      {
        "name": "1 LEKARSKA FAKULTA UNIVERZITY KARLOVY",
        "appeared": 6,
        "passed": 5,
        "passRate": "83.33%"
      },
      {
        "name": "UNIVERZITY PALACKEHO V OLOMOUCI LEKARSKA FAKULTA",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "EGYPT",
    "appeared": 8,
    "passed": 5,
    "passRate": "62.50%",
    "colleges": [
      {
        "name": "AIN SHAMS UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 6,
        "passed": 4,
        "passRate": "66.67%"
      },
      {
        "name": "CAIRO UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 2,
        "passed": 1,
        "passRate": "50.00%"
      }
    ]
  },
  {
    "country": "GEORGIA",
    "appeared": 5103,
    "passed": 1548,
    "passRate": "30.34%",
    "colleges": [
      {
        "name": "AKAKI TSERETELI STATE UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 216,
        "passed": 56,
        "passRate": "25.93%"
      },
      {
        "name": "ALTE UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 222,
        "passed": 103,
        "passRate": "46.40%"
      },
      {
        "name": "AVICENNA BATUMI MEDICAL UNIVERSITY",
        "appeared": 10,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "BATUMI SHOTA RUSTAVELI STATE UNIVERSITY FACULTY OF NATURAL SCIENCES AND HEALTH CARE",
        "appeared": 294,
        "passed": 57,
        "passRate": "19.39%"
      },
      {
        "name": "BAU INTERNATIONAL UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 173,
        "passed": 69,
        "passRate": "39.88%"
      },
      {
        "name": "CAUCASUS INTERNATIONAL UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 262,
        "passed": 97,
        "passRate": "37.02%"
      },
      {
        "name": "CAUCASUS UNIVERSITY SCHOOL OF MEDICINE AND HEALTHCARE MANAGEMENT",
        "appeared": 302,
        "passed": 122,
        "passRate": "40.40%"
      },
      {
        "name": "DAVID TVILDIANI MEDICAL UNIVERSITY AIETI MEDICAL SCHOOL",
        "appeared": 104,
        "passed": 41,
        "passRate": "39.42%"
      },
      {
        "name": "EAST EUROPEAN UNIVERSITY FACULTY OF HEALTHCARE SCIENCES",
        "appeared": 135,
        "passed": 34,
        "passRate": "25.19%"
      },
      {
        "name": "EAST WEST UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 32,
        "passed": 6,
        "passRate": "18.75%"
      },
      {
        "name": "EUROPEAN UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 315,
        "passed": 76,
        "passRate": "24.13%"
      },
      {
        "name": "GEORGIAN AMERICAN UNIVERSITY",
        "appeared": 240,
        "passed": 129,
        "passRate": "53.75%"
      },
      {
        "name": "GEORGIAN NATIONAL UNIVERSITY SEU FACULTY OF MEDICINE",
        "appeared": 509,
        "passed": 211,
        "passRate": "41.45%"
      },
      {
        "name": "GRIGOL ROBAKIDZE UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 565,
        "passed": 89,
        "passRate": "15.75%"
      },
      {
        "name": "IVANE JAVAKHISHVILI TBILISI STATE UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 139,
        "passed": 50,
        "passRate": "35.97%"
      },
      {
        "name": "KUTAISI UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 9,
        "passed": 7,
        "passRate": "77.78%"
      },
      {
        "name": "LLC ALTE UNIVERSITY",
        "appeared": 10,
        "passed": 3,
        "passRate": "30.00%"
      },
      {
        "name": "LLC EAST WEST UNIVERSITY",
        "appeared": 69,
        "passed": 4,
        "passRate": "5.80%"
      },
      {
        "name": "NEW VISION UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 253,
        "passed": 86,
        "passRate": "33.99%"
      },
      {
        "name": "PETRE SHOTADZE TBILISI MEDICAL ACADEMY FACULTY OF MEDICINE",
        "appeared": 274,
        "passed": 71,
        "passRate": "25.91%"
      },
      {
        "name": "TBILISI OPEN TEACHING UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 30,
        "passed": 5,
        "passRate": "16.67%"
      },
      {
        "name": "TBILISI STATE MEDICAL UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 638,
        "passed": 148,
        "passRate": "23.20%"
      },
      {
        "name": "TEACHING UNIVERSITY GEOMEDI FACULTY OF MEDICINE",
        "appeared": 276,
        "passed": 75,
        "passRate": "27.17%"
      },
      {
        "name": "UNIVERSITY OF GEORGIA SCHOOL OF HEALTH SCIENCES AND PUBLIC HEALTH",
        "appeared": 26,
        "passed": 9,
        "passRate": "34.62%"
      }
    ]
  },
  {
    "country": "GRENADA",
    "appeared": 1,
    "passed": 1,
    "passRate": "100.00%",
    "colleges": [
      {
        "name": "ST GEORGE S UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "GUYANA",
    "appeared": 218,
    "passed": 38,
    "passRate": "17.43%",
    "colleges": [
      {
        "name": "AMERICAN INTERNATIONAL SCHOOL OF MEDICINE",
        "appeared": 8,
        "passed": 3,
        "passRate": "37.50%"
      },
      {
        "name": "LINCOLN AMERICAN UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 115,
        "passed": 26,
        "passRate": "22.61%"
      },
      {
        "name": "TEXILA AMERICAN UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 92,
        "passed": 9,
        "passRate": "9.78%"
      },
      {
        "name": "GREENHEART MEDICAL UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "RAJIV GANDHI UNIVERSITY OF SCIENCE AND TECHNOLOGY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "HUNGARY",
    "appeared": 10,
    "passed": 9,
    "passRate": "90.00%",
    "colleges": [
      {
        "name": "SEMMELWEIS UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 7,
        "passed": 6,
        "passRate": "85.71%"
      },
      {
        "name": "UNIVERSITY OF DEBRECEN FACULTY OF MEDICINE",
        "appeared": 2,
        "passed": 2,
        "passRate": "100.00%"
      },
      {
        "name": "UNIVERSITY OF SZEGED FACULTY OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "IRAN ISLAMIC REPUBLIC OF IRAN",
    "appeared": 85,
    "passed": 36,
    "passRate": "42.35%",
    "colleges": [
      {
        "name": "GOLESTAN UNIVERSITY OF MEDICAL SCIENCES MEDICAL SCHOOL",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "ISFAHAN UNIVERSITY OF MEDICAL SCIENCES FACULTY OF MEDICINE",
        "appeared": 12,
        "passed": 6,
        "passRate": "50.00%"
      },
      {
        "name": "SHIRAZ UNIVERSITY OF MEDICAL SCIENCES SCHOOL OF MEDICINE",
        "appeared": 37,
        "passed": 14,
        "passRate": "37.84%"
      },
      {
        "name": "TEHRAN UNIVERSITY OF MEDICAL SCIENCES SCHOOL OF MEDICINE",
        "appeared": 34,
        "passed": 15,
        "passRate": "44.12%"
      },
      {
        "name": "IRAN UNIVERSITY OF MEDICAL SCIENCES",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "IRELAND",
    "appeared": 1,
    "passed": 1,
    "passRate": "100.00%",
    "colleges": [
      {
        "name": "ROYAL COLLEGE OF SURGEONS IN IRELAND SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "JAMAICA",
    "appeared": 18,
    "passed": 13,
    "passRate": "72.22%",
    "colleges": [
      {
        "name": "ALL AMERICAN INSTITUTE OF MEDICAL SCIENCES",
        "appeared": 18,
        "passed": 13,
        "passRate": "72.22%"
      }
    ]
  },
  {
    "country": "KAZAKHSTAN",
    "appeared": 5827,
    "passed": 1427,
    "passRate": "24.49%",
    "colleges": [
      {
        "name": "AL FARABI KAZAKH NATIONAL UNIVERSITY FACULTY OF MEDICINE AND HEALTH CARE",
        "appeared": 163,
        "passed": 57,
        "passRate": "34.97%"
      },
      {
        "name": "ASFENDIYAROV KAZAKH NATIONAL MEDICAL UNIVERSITY",
        "appeared": 82,
        "passed": 13,
        "passRate": "15.85%"
      },
      {
        "name": "ASTANA MEDICAL UNIVERSITY",
        "appeared": 3,
        "passed": 3,
        "passRate": "100.00%"
      },
      {
        "name": "CASPIAN UNIVERSITY INTERNATIONAL SCHOOL OF MEDICINE",
        "appeared": 360,
        "passed": 42,
        "passRate": "11.67%"
      },
      {
        "name": "INTERNATIONAL MEDICAL SCHOOL UNIVERSITY OF INTERNATIONAL BUSINESS",
        "appeared": 56,
        "passed": 29,
        "passRate": "51.79%"
      },
      {
        "name": "JSC NATIONAL MEDICAL UNIVERSITY",
        "appeared": 1222,
        "passed": 432,
        "passRate": "35.35%"
      },
      {
        "name": "JSC SOUTH KAZAKHSTAN MEDICAL ACADEMY",
        "appeared": 8,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "KARAGANDA MEDICAL UNIVERSITY",
        "appeared": 1128,
        "passed": 209,
        "passRate": "18.53%"
      },
      {
        "name": "KAZAKH MEDICAL UNIVERSITY OF CONTINUING EDUCATION MEDICAL COLLEGE",
        "appeared": 14,
        "passed": 2,
        "passRate": "14.29%"
      },
      {
        "name": "KAZAKH NATIONAL MEDICAL UNIVERSITY",
        "appeared": 23,
        "passed": 1,
        "passRate": "4.35%"
      },
      {
        "name": "KAZAKH RUSSIAN MEDICAL UNIVERSITY",
        "appeared": 380,
        "passed": 73,
        "passRate": "19.21%"
      },
      {
        "name": "KAZAKH STATE MEDICAL UNIVERSITY",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "MANASH KOZYBAYEV NORTH KAZAKHSTAN UNIVERSITY",
        "appeared": 139,
        "passed": 58,
        "passRate": "41.73%"
      },
      {
        "name": "NJSC ASTANA MEDICAL UNIVERSITY",
        "appeared": 444,
        "passed": 132,
        "passRate": "29.73%"
      },
      {
        "name": "NORTH KAZAKHSTAN UNIVERSITY NAMED AFTER M KOZYBAYEV",
        "appeared": 64,
        "passed": 13,
        "passRate": "20.31%"
      },
      {
        "name": "S D ASFENDIYAROV KAZAKH NATIONAL MEDICAL UNIVERSITY",
        "appeared": 2,
        "passed": 1,
        "passRate": "50.00%"
      },
      {
        "name": "SEMEY MEDICAL UNIVERSITY",
        "appeared": 28,
        "passed": 5,
        "passRate": "17.86%"
      },
      {
        "name": "SEMEY STATE MEDICAL UNIVERSITY KAZAKHSTAN",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SHUKAN UALIKHANOV KOKSHETAU STATE UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 100,
        "passed": 15,
        "passRate": "15.00%"
      },
      {
        "name": "SOUTH KAZAKHSTAN MEDICAL ACADEMY",
        "appeared": 621,
        "passed": 140,
        "passRate": "22.54%"
      },
      {
        "name": "STATE MEDICAL UNIVERSITY SEMEY",
        "appeared": 697,
        "passed": 146,
        "passRate": "20.95%"
      },
      {
        "name": "WEST KAZAKHSTAN STATE MEDICAL UNIVERSITY NAMED AFTER MARAT OSPANOV",
        "appeared": 288,
        "passed": 56,
        "passRate": "19.44%"
      }
    ]
  },
  {
    "country": "KYRGYZSTAN",
    "appeared": 13730,
    "passed": 2479,
    "passRate": "18.06%",
    "colleges": [
      {
        "name": "ALTAMIMI INTERNATIONAL UNIVERSITY",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "ASIAN MEDICAL INSTITUTE",
        "appeared": 11,
        "passed": 1,
        "passRate": "9.09%"
      },
      {
        "name": "AVICENNA INTERNATIONAL MEDICAL UNIVERSITY",
        "appeared": 33,
        "passed": 7,
        "passRate": "21.21%"
      },
      {
        "name": "BATUMI SHOTA RUSTAVELI STATE UNIVERSITY GEORGIA",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "BISHKEK INTERNATIONAL MEDICAL INSTITUTE",
        "appeared": 168,
        "passed": 27,
        "passRate": "16.07%"
      },
      {
        "name": "CENTRAL ASIAN INTERNATIONAL MEDICAL UNIVERSITY",
        "appeared": 47,
        "passed": 9,
        "passRate": "19.15%"
      },
      {
        "name": "EURASIAN INTERNATIONAL MEDICAL UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 55,
        "passed": 4,
        "passRate": "7.27%"
      },
      {
        "name": "I K AKHUNBAEV KYRGYZ STATE MEDICAL ACADEMY FACULTY OF GENERAL MEDICINE",
        "appeared": 1038,
        "passed": 237,
        "passRate": "22.83%"
      },
      {
        "name": "INTERNATIONAL EUROPEAN UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 4,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "INTERNATIONAL HIGHER SCHOOL OF MEDICINE",
        "appeared": 3816,
        "passed": 698,
        "passRate": "18.29%"
      },
      {
        "name": "INTERNATIONAL MEDICAL INSTITUTE INTERNATIONAL UNIVERSITY OF SCIENCE AND BUSINESS",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "INTERNATIONAL MEDICAL UNIVERSITY",
        "appeared": 868,
        "passed": 135,
        "passRate": "15.55%"
      },
      {
        "name": "INTERNATIONAL SCHOOL OF MEDICINE INTERNATIONAL UNIVERSITY OF KYRGYZSTAN EASTERN MEDICAL CAMPUS",
        "appeared": 200,
        "passed": 14,
        "passRate": "7.00%"
      },
      {
        "name": "INTERNATIONAL UNIVERSITY OF SCIENCE AND MEDICINE IUSM",
        "appeared": 253,
        "passed": 18,
        "passRate": "7.11%"
      },
      {
        "name": "JALAL ABAD INTERNATIONAL UNIVERSITY",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "JALAL ABAD PEOPLE S FRIENDSHIP UNIVERSITY A BATIROV MEDICAL FACULTY",
        "appeared": 5,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "JALAL ABAD STATE UNIVERSITY MEDICAL FACULTY",
        "appeared": 1863,
        "passed": 354,
        "passRate": "19.00%"
      },
      {
        "name": "JALAL ABAD STATE UNIVERSITY NAMED AFTER B OSMONOV",
        "appeared": 7,
        "passed": 2,
        "passRate": "28.57%"
      },
      {
        "name": "KYRGYZ RUSSIAN SLAVIC STATE UNIVERSITY KRSU MEDICAL FACULTY",
        "appeared": 176,
        "passed": 45,
        "passRate": "25.57%"
      },
      {
        "name": "OSH INTERNATIONAL MEDICAL UNIVERSITY",
        "appeared": 162,
        "passed": 13,
        "passRate": "8.02%"
      },
      {
        "name": "OSH STATE UNIVERSITY MEDICAL FACULTY",
        "appeared": 2664,
        "passed": 542,
        "passRate": "20.35%"
      },
      {
        "name": "ROYAL METROPOLITAN UNIVERSITY",
        "appeared": 87,
        "passed": 6,
        "passRate": "6.90%"
      },
      {
        "name": "S TENTISHEV ASIAN MEDICAL INSTITUTE",
        "appeared": 2223,
        "passed": 352,
        "passRate": "15.83%"
      },
      {
        "name": "SALYMBEKOV UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 29,
        "passed": 13,
        "passRate": "44.83%"
      },
      {
        "name": "SCIENTIFIC RESEARCH MEDICAL SOCIAL INSTITUTE",
        "appeared": 9,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "TENTISHEV SATKYNBAY MEMORIAL ASAIN MEDICAL INSTITUTE",
        "appeared": 3,
        "passed": 1,
        "passRate": "33.33%"
      },
      {
        "name": "KYRGYZ NATIONAL UNIVERSITY NAMED AFTER JUSUP BALASAGYN",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "KYRGYZ UZBEK UNIVERSITY MEDICAL FACULTY",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "LATVIA",
    "appeared": 6,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "RIGA STRADINS UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 6,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "LITHUANIA",
    "appeared": 4,
    "passed": 1,
    "passRate": "25.00%",
    "colleges": [
      {
        "name": "LITHUANIAN UNIVERSITY OF HEALTH SCIENCES FACULTY OF MEDICINE",
        "appeared": 4,
        "passed": 1,
        "passRate": "25.00%"
      }
    ]
  },
  {
    "country": "MALAYSIA",
    "appeared": 283,
    "passed": 76,
    "passRate": "26.86%",
    "colleges": [
      {
        "name": "LINCOLN UNIVERSITY COLLEGE FACULTY OF MEDICINE",
        "appeared": 116,
        "passed": 29,
        "passRate": "25.00%"
      },
      {
        "name": "MAHSA UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 97,
        "passed": 19,
        "passRate": "19.59%"
      },
      {
        "name": "QUEST INTERNATIONAL UNIVERSITY PERAK FACULTY OF MEDICINE",
        "appeared": 23,
        "passed": 7,
        "passRate": "30.43%"
      },
      {
        "name": "SEGI UNIVERSITY",
        "appeared": 5,
        "passed": 2,
        "passRate": "40.00%"
      },
      {
        "name": "TAYLORS UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "UNIVERSITI SAINS MALAYSIA SCHOOL OF MEDICAL SCIENCES",
        "appeared": 14,
        "passed": 4,
        "passRate": "28.57%"
      },
      {
        "name": "UNIVERSITY OF CYBERJAYA FACULTY OF MEDICINE",
        "appeared": 24,
        "passed": 12,
        "passRate": "50.00%"
      },
      {
        "name": "ASIAN INSTITUTE OF MEDICINE SCIENCE AND TECHNOLOGY AIMST",
        "appeared": 3,
        "passed": 2,
        "passRate": "66.67%"
      }
    ]
  },
  {
    "country": "MAURITIUS",
    "appeared": 385,
    "passed": 153,
    "passRate": "39.74%",
    "colleges": [
      {
        "name": "ANNA MEDICAL COLLEGE",
        "appeared": 248,
        "passed": 86,
        "passRate": "34.68%"
      },
      {
        "name": "SSR MEDICAL COLLEGE",
        "appeared": 137,
        "passed": 67,
        "passRate": "48.91%"
      }
    ]
  },
  {
    "country": "NEPAL",
    "appeared": 1898,
    "passed": 441,
    "passRate": "23.23%",
    "colleges": [
      {
        "name": "B P KOIRALA INSTITUTE OF HEALTH SCIENCES",
        "appeared": 64,
        "passed": 43,
        "passRate": "67.19%"
      },
      {
        "name": "BIRAT MEDICAL COLLEGE",
        "appeared": 97,
        "passed": 25,
        "passRate": "25.77%"
      },
      {
        "name": "CHITWAN MEDICAL COLLEGE",
        "appeared": 9,
        "passed": 6,
        "passRate": "66.67%"
      },
      {
        "name": "COLLEGE OF MEDICAL SCIENCES BHARATPUR",
        "appeared": 320,
        "passed": 59,
        "passRate": "18.44%"
      },
      {
        "name": "DEVDAHA MEDICAL COLLEGE AND RESARCH INSTITUTE",
        "appeared": 32,
        "passed": 3,
        "passRate": "9.38%"
      },
      {
        "name": "GANDAKI MEDICAL COLLEGE",
        "appeared": 4,
        "passed": 2,
        "passRate": "50.00%"
      },
      {
        "name": "INSTITUTE OF MEDICINE TRIBHUVAN UNIVERSITY",
        "appeared": 47,
        "passed": 21,
        "passRate": "44.68%"
      },
      {
        "name": "JANAKI MEDICAL COLLEGE",
        "appeared": 123,
        "passed": 13,
        "passRate": "10.57%"
      },
      {
        "name": "KATHMANDU MEDICAL COLLEGE",
        "appeared": 117,
        "passed": 32,
        "passRate": "27.35%"
      },
      {
        "name": "KATHMANDU UNIVERSITY SCHOOL OF MEDICAL SCIENCES",
        "appeared": 30,
        "passed": 14,
        "passRate": "46.67%"
      },
      {
        "name": "KIST MEDICAL COLLEGE",
        "appeared": 2,
        "passed": 2,
        "passRate": "100.00%"
      },
      {
        "name": "LUMBINI MEDICAL COLLEGE AND TEACHING HOSPITAL",
        "appeared": 71,
        "passed": 14,
        "passRate": "19.72%"
      },
      {
        "name": "MANIPAL COLLEGE OF MEDICAL SCIENCES MCOMS",
        "appeared": 138,
        "passed": 36,
        "passRate": "26.09%"
      },
      {
        "name": "NATIONAL MEDICAL COLLEGE BIRGUNJ",
        "appeared": 279,
        "passed": 26,
        "passRate": "9.32%"
      },
      {
        "name": "NEPAL MEDICAL COLLEGE",
        "appeared": 55,
        "passed": 21,
        "passRate": "38.18%"
      },
      {
        "name": "NEPALESE ARMY INSTITUTE OF HEALTH SCIENCES COLLEGE OF MEDICINE",
        "appeared": 4,
        "passed": 4,
        "passRate": "100.00%"
      },
      {
        "name": "NEPALGUNJ MEDICAL COLLEGE",
        "appeared": 151,
        "passed": 49,
        "passRate": "32.45%"
      },
      {
        "name": "NOBEL MEDICAL COLLEGE",
        "appeared": 176,
        "passed": 39,
        "passRate": "22.16%"
      },
      {
        "name": "PATAN ACADEMY OF HEALTH SCIENCES SCHOOL OF MEDICINE",
        "appeared": 2,
        "passed": 2,
        "passRate": "100.00%"
      },
      {
        "name": "TRIBHUVAN UNIVERSITY",
        "appeared": 6,
        "passed": 1,
        "passRate": "16.67%"
      },
      {
        "name": "UNIVERSAL COLLEGE OF MEDICAL SCIENCES",
        "appeared": 171,
        "passed": 29,
        "passRate": "16.96%"
      }
    ]
  },
  {
    "country": "NETHERLANDS",
    "appeared": 1,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "XAVIER UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "PAKISTAN",
    "appeared": 10,
    "passed": 9,
    "passRate": "90.00%",
    "colleges": [
      {
        "name": "AYUB MEDICAL COLLEGE",
        "appeared": 2,
        "passed": 2,
        "passRate": "100.00%"
      },
      {
        "name": "FAISALABAD MEDICAL UNIVERSITY",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "FATIMA JINNAH MEDICAL UNIVERSITY",
        "appeared": 2,
        "passed": 2,
        "passRate": "100.00%"
      },
      {
        "name": "JINNAH SINDH MEDICAL UNIVERSITY",
        "appeared": 3,
        "passed": 3,
        "passRate": "100.00%"
      },
      {
        "name": "KHYBER MEDICAL COLLEGE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "LIAQUAT UNIVERSITY OF MEDICAL AND HEALTH SCIENCES JAMSHORO",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "PAPUA NEW GUINEA",
    "appeared": 1,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "UNIVERSITY OF PAPUA NEW GUINEA SCHOOL OF MEDICINE AND HEALTH SCIENCES",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "PHILIPPINES",
    "appeared": 9519,
    "passed": 1787,
    "passRate": "18.77%",
    "colleges": [
      {
        "name": "AMA SCHOOL OF MEDICINE",
        "appeared": 1179,
        "passed": 210,
        "passRate": "17.81%"
      },
      {
        "name": "ANGELES UNIVERSITY FOUNDATION SCHOOL OF MEDICINE",
        "appeared": 23,
        "passed": 10,
        "passRate": "43.48%"
      },
      {
        "name": "BICOL CHRISTIAN COLLEGE OF MEDICINE",
        "appeared": 609,
        "passed": 56,
        "passRate": "9.20%"
      },
      {
        "name": "BICOL UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 3,
        "passed": 1,
        "passRate": "33.33%"
      },
      {
        "name": "CAGAYAN STATE UNIVERSITY COLLEGE OF MEDICINE AND SURGERY",
        "appeared": 11,
        "passed": 1,
        "passRate": "9.09%"
      },
      {
        "name": "CEBU INSTITUTE OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "DAVAO MEDICAL SCHOOL FOUNDATION COLLEGE OF MEDICINE",
        "appeared": 2424,
        "passed": 399,
        "passRate": "16.46%"
      },
      {
        "name": "DR FRANCISCO Q DUQUE MEDICAL FOUNDATION COLLEGE OF MEDICINE",
        "appeared": 336,
        "passed": 81,
        "passRate": "24.11%"
      },
      {
        "name": "EMILIO AGUINALDO COLLEGE SCHOOL OF MEDICINE",
        "appeared": 250,
        "passed": 72,
        "passRate": "28.80%"
      },
      {
        "name": "MANILA CENTRAL UNIVERSITY FILEMON D TANCHOCO FOUNDATION COLLEGE OF MEDICINE",
        "appeared": 12,
        "passed": 4,
        "passRate": "33.33%"
      },
      {
        "name": "MATIAS H AZNAR MEMORIAL COLLEGE OF MEDICINE",
        "appeared": 12,
        "passed": 5,
        "passRate": "41.67%"
      },
      {
        "name": "OUR LADY OF FATIMA UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 291,
        "passed": 49,
        "passRate": "16.84%"
      },
      {
        "name": "PLT COLLEGE INC COLLEGE OF MEDICINE",
        "appeared": 46,
        "passed": 14,
        "passRate": "30.43%"
      },
      {
        "name": "REMEDIOS T ROMUALDEZ MEDICAL FOUNDATION COLLEGE OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SOUTHWESTERN UNIVERSITY",
        "appeared": 11,
        "passed": 5,
        "passRate": "45.45%"
      },
      {
        "name": "SOUTHWESTERN UNIVERSITY MATIAS H AZNAR MEMORIAL COLLEGE OF MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SOUTHWESTERN UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 60,
        "passed": 14,
        "passRate": "23.33%"
      },
      {
        "name": "ST LOUIS UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "ST PAUL UNIVERSITY PHILIPPINES SCHOOL OF MEDICINE",
        "appeared": 4,
        "passed": 1,
        "passRate": "25.00%"
      },
      {
        "name": "UNIVERSITY OF CEBU COLLEGE OF MEDICINE",
        "appeared": 18,
        "passed": 4,
        "passRate": "22.22%"
      },
      {
        "name": "UNIVERSITY OF NORTHERN PHILIPPINES COLLEGE OF MEDICINE",
        "appeared": 248,
        "passed": 41,
        "passRate": "16.53%"
      },
      {
        "name": "UNIVERSITY OF PERPETUAL HELP SYSTEM DALTA JONELTA FOUNDATION SCHOOL OF MEDICINE",
        "appeared": 2310,
        "passed": 441,
        "passRate": "19.09%"
      },
      {
        "name": "UNIVERSITY OF THE VISAYAS",
        "appeared": 6,
        "passed": 2,
        "passRate": "33.33%"
      },
      {
        "name": "UV GULLAS COLLEGE OF MEDICINE",
        "appeared": 1621,
        "passed": 374,
        "passRate": "23.07%"
      },
      {
        "name": "VIRGEN MILAGROSA UNIVERSITY FOUNDATION COLLEGE OF MEDICINE",
        "appeared": 37,
        "passed": 2,
        "passRate": "5.41%"
      },
      {
        "name": "XAVIER SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "CEBU DOCTORS UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "ST LOUIS UNIVERSITY",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "POLAND",
    "appeared": 18,
    "passed": 11,
    "passRate": "61.11%",
    "colleges": [
      {
        "name": "COLLEGIUM MEDICUM IM LUDWIKA RYDYGIERA UNIWERSYTET MIKOLAJA KOPERNIKA W TORUNIU",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "MEDICAL UNIVERSITY OF GDANSK FACULTY OF MEDICINE",
        "appeared": 10,
        "passed": 7,
        "passRate": "70.00%"
      },
      {
        "name": "MEDICAL UNIVERSITY OF LUBLIN",
        "appeared": 3,
        "passed": 2,
        "passRate": "66.67%"
      },
      {
        "name": "MEDICAL UNIVERSITY OF WARSAW FACULTY OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "POZNAN UNIVERSITY OF MEDICAL SCIENCES CENTER FOR MEDICAL EDUCATION IN ENGLISH",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "UNIVERSITY OF WARMIA AND MAZURY IN OLSZTYN COLLEGIUM MEDICUM SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "REPUBLIC OF MOLDOVA",
    "appeared": 376,
    "passed": 144,
    "passRate": "38.30%",
    "colleges": [
      {
        "name": "NICOLAE TESTEMITANU STATE UNIVERSITY OF MEDICINE AND PHARMACY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "STATE UNIVERSITY OF MEDICINE AND PHARMACY NICOLAE TESTEMITANU",
        "appeared": 374,
        "passed": 144,
        "passRate": "38.50%"
      }
    ]
  },
  {
    "country": "ROMANIA",
    "appeared": 16,
    "passed": 3,
    "passRate": "18.75%",
    "colleges": [
      {
        "name": "OVIDIUS UNIVERSITY OF CONSTANTA ROMANIA",
        "appeared": 3,
        "passed": 1,
        "passRate": "33.33%"
      },
      {
        "name": "UNIVERSITATEA DE MEDICINA FARMACIE STIINTE SI TEHNOLOGIE GEORGE EMIL PALADE TARGU MURES",
        "appeared": 2,
        "passed": 1,
        "passRate": "50.00%"
      },
      {
        "name": "UNIVERSITATEA DE MEDICINA SI FARMACIE GRIGORE T POPA FACULTATEA DE MEDICINA",
        "appeared": 2,
        "passed": 1,
        "passRate": "50.00%"
      },
      {
        "name": "UNIVERSITATEA DE MEDICINA SI FARMACIE VICTOR BABES FACULTATEA DE MEDICINA",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "UNIVERSITATEA DIN ORADEA FACULTATEA DE MEDICINA SI FARMACIE",
        "appeared": 5,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "UNIVERSITATEA DE MEDICINA SI FARMACIE CAROL DAVILA FACULTATEA DE MEDICINA",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "RUSSIAN FEDERATION",
    "appeared": 11428,
    "passed": 2950,
    "passRate": "25.81%",
    "colleges": [
      {
        "name": "ALTAI STATE MEDICAL UNIVERSITY",
        "appeared": 240,
        "passed": 52,
        "passRate": "21.67%"
      },
      {
        "name": "ASTRAKHAN STATE MEDICAL UNIVERSITY",
        "appeared": 37,
        "passed": 7,
        "passRate": "18.92%"
      },
      {
        "name": "BASHKIR STATE MEDICAL UNIVERSITY",
        "appeared": 296,
        "passed": 70,
        "passRate": "23.65%"
      },
      {
        "name": "BELGOROD NATIONAL RESEARCH UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 84,
        "passed": 3,
        "passRate": "3.57%"
      },
      {
        "name": "CHUVASH STATE UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 104,
        "passed": 33,
        "passRate": "31.73%"
      },
      {
        "name": "CRIMEAN FEDERAL UNIVERSITY NAMED AFTER V I VERNADSKY",
        "appeared": 368,
        "passed": 187,
        "passRate": "50.82%"
      },
      {
        "name": "DAGESTAN STATE MEDICAL UNIVERSITY",
        "appeared": 115,
        "passed": 12,
        "passRate": "10.43%"
      },
      {
        "name": "FAR EASTERN FEDERAL UNIVERSITY SCHOOL OF BIOMEDICINE",
        "appeared": 189,
        "passed": 64,
        "passRate": "33.86%"
      },
      {
        "name": "FIRST MOSCOW STATE MEDICAL UNIVERSITY NAMED AFTER I M SECHENOV",
        "appeared": 59,
        "passed": 8,
        "passRate": "13.56%"
      },
      {
        "name": "IMMANUEL KANT BALTIC FEDERAL UNIVERSITY INSTITUTE OF MEDICINE",
        "appeared": 64,
        "passed": 34,
        "passRate": "53.12%"
      },
      {
        "name": "IRKUTSK STATE MEDICAL UNIVERSITY",
        "appeared": 57,
        "passed": 13,
        "passRate": "22.81%"
      },
      {
        "name": "IVANOVO STATE MEDICAL ACADEMY",
        "appeared": 48,
        "passed": 8,
        "passRate": "16.67%"
      },
      {
        "name": "IZHEVSK STATE MEDICAL ACADEMY ISMA",
        "appeared": 25,
        "passed": 4,
        "passRate": "16.00%"
      },
      {
        "name": "KABARDINO BALKARIAN STATE UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 458,
        "passed": 123,
        "passRate": "26.86%"
      },
      {
        "name": "KAZAN FEDERAL UNIVERSITY INSTITUTE OF FUNDAMENTAL MEDICINE AND BIOLOGY",
        "appeared": 29,
        "passed": 23,
        "passRate": "79.31%"
      },
      {
        "name": "KAZAN STATE MEDICAL UNIVERSITY",
        "appeared": 387,
        "passed": 107,
        "passRate": "27.65%"
      },
      {
        "name": "KEMEROVO STATE MEDICAL UNIVERSITY",
        "appeared": 104,
        "passed": 29,
        "passRate": "27.88%"
      },
      {
        "name": "KUBAN STATE MEDICAL UNIVERSITY",
        "appeared": 84,
        "passed": 26,
        "passRate": "30.95%"
      },
      {
        "name": "KURSK STATE MEDICAL UNIVERSITY",
        "appeared": 511,
        "passed": 116,
        "passRate": "22.70%"
      },
      {
        "name": "MARI STATE UNIVERSITY MEDICAL FACULTY",
        "appeared": 1004,
        "passed": 288,
        "passRate": "28.69%"
      },
      {
        "name": "MAYKOP STATE TECHNOLOGICAL UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "MEDICAL INSTITUTE OF TAMBOV STATE UNIVERSITY NAMED AFTER G R DERZHAVIN",
        "appeared": 245,
        "passed": 72,
        "passRate": "29.39%"
      },
      {
        "name": "NATIONAL NUCLEAR RESEARCH UNIVERSITY MEPHI ENGINEERING PHYSICS INSTITUTE OF BIOMEDICINE",
        "appeared": 9,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "NATIONAL RESEARCH OGAREV MORDOVIA STATE UNIVERSITY MEDICAL FACULTY",
        "appeared": 379,
        "passed": 142,
        "passRate": "37.47%"
      },
      {
        "name": "NORTH CAUCASIAN STATE HUMANITARIAN TECHNOLOGICAL ACADEMY",
        "appeared": 179,
        "passed": 40,
        "passRate": "22.35%"
      },
      {
        "name": "NORTH OSSETIAN STATE MEDICAL ACADEMY",
        "appeared": 226,
        "passed": 50,
        "passRate": "22.12%"
      },
      {
        "name": "NORTH WESTERN STATE MEDICAL UNIVERSITY I I MECHNIKOV",
        "appeared": 56,
        "passed": 1,
        "passRate": "1.79%"
      },
      {
        "name": "NORTHERN STATE MEDICAL UNIVERSITY",
        "appeared": 799,
        "passed": 172,
        "passRate": "21.53%"
      },
      {
        "name": "OBNINSK INSTITUTE OF ATOMIC ENERGY NATIONAL NUCLEAR RESEARCH UNIVERSITY MEPI MEDICAL FACULTY",
        "appeared": 30,
        "passed": 9,
        "passRate": "30.00%"
      },
      {
        "name": "OMSK STATE MEDICAL UNIVERSITY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "OREL STATE UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 158,
        "passed": 30,
        "passRate": "18.99%"
      },
      {
        "name": "ORENBURG STATE MEDICAL UNIVERSITY",
        "appeared": 467,
        "passed": 180,
        "passRate": "38.54%"
      },
      {
        "name": "PACIFIC STATE MEDICAL UNIVERSITY",
        "appeared": 14,
        "passed": 3,
        "passRate": "21.43%"
      },
      {
        "name": "PAVLOV FIRST SAINT PETERSBURG STATE MEDICAL UNIVERSITY",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "PENZA STATE UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 266,
        "passed": 85,
        "passRate": "31.95%"
      },
      {
        "name": "PEOPLE S FRIENDSHIP UNIVERSITY OF RUSSIA FACULTY OF MEDICINE",
        "appeared": 25,
        "passed": 14,
        "passRate": "56.00%"
      },
      {
        "name": "PERM STATE MEDICAL UNIVERSITY NAMED AFTER ACADEMICIAN E A WAGNER",
        "appeared": 826,
        "passed": 201,
        "passRate": "24.33%"
      },
      {
        "name": "PITIRIM SOROKIN SYKTYVKAR STATE UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 10,
        "passed": 1,
        "passRate": "10.00%"
      },
      {
        "name": "PRIVOLZHSKY RESEARCH MEDICAL UNIVERSITY",
        "appeared": 201,
        "passed": 64,
        "passRate": "31.84%"
      },
      {
        "name": "PSKOV STATE UNIVERSITY INSTITUTE OF MEDICINE AND EXPERIMENTAL BIOLOGY",
        "appeared": 34,
        "passed": 7,
        "passRate": "20.59%"
      },
      {
        "name": "ROSTOV STATE MEDICAL UNIVERSITY",
        "appeared": 155,
        "passed": 41,
        "passRate": "26.45%"
      },
      {
        "name": "RUSSIAN NATIONAL RESEARCH MEDICAL UNIVERSITY NAMED AFTER N I PIROGOV",
        "appeared": 28,
        "passed": 12,
        "passRate": "42.86%"
      },
      {
        "name": "RUSSIAN STATE MEDICAL UNIVERSITY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "RYAZAN STATE IVAN PETROVICH PAVLOV MEDICAL UNIVERSITY MEDICAL FACULTY",
        "appeared": 40,
        "passed": 7,
        "passRate": "17.50%"
      },
      {
        "name": "SAINT PETERSBURG MEDICO SOCIAL INSTITUTE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SAINT PETERSBURG PAVLOV STATE MEDICAL UNIVERSITY",
        "appeared": 10,
        "passed": 3,
        "passRate": "30.00%"
      },
      {
        "name": "SAINT PETERSBURG STATE PEDIATRIC MEDICAL UNIVERSITY",
        "appeared": 18,
        "passed": 3,
        "passRate": "16.67%"
      },
      {
        "name": "SAMARA STATE MEDICAL UNIVERSITY",
        "appeared": 4,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SARATOV STATE MEDICAL UNIVERSITY NAMED AFTER V I RAZUMOVSKY",
        "appeared": 57,
        "passed": 8,
        "passRate": "14.04%"
      },
      {
        "name": "SIBERIAN STATE MEDICAL UNIVERSITY",
        "appeared": 78,
        "passed": 26,
        "passRate": "33.33%"
      },
      {
        "name": "SMOLENSK STATE MEDICAL UNIVERSITY",
        "appeared": 679,
        "passed": 241,
        "passRate": "35.49%"
      },
      {
        "name": "STAVROPOL STATE MEDICAL UNIVERSITY",
        "appeared": 722,
        "passed": 87,
        "passRate": "12.05%"
      },
      {
        "name": "TULA STATE UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 3,
        "passed": 1,
        "passRate": "33.33%"
      },
      {
        "name": "TVER STATE MEDICAL UNIVERSITY",
        "appeared": 337,
        "passed": 32,
        "passRate": "9.50%"
      },
      {
        "name": "TYUMEN STATE MEDICAL UNIVERSITY",
        "appeared": 12,
        "passed": 2,
        "passRate": "16.67%"
      },
      {
        "name": "ULYANOVSK STATE UNIVERSITY MEDICAL FACULTY NAMED AFTER T Z BIKTIMIROV",
        "appeared": 441,
        "passed": 111,
        "passRate": "25.17%"
      },
      {
        "name": "VOLGOGRAD STATE MEDICAL UNIVERSITY",
        "appeared": 467,
        "passed": 66,
        "passRate": "14.13%"
      },
      {
        "name": "VORONEZH STATE MEDICAL UNIVERSITY NAMED AFTER N N BURDENKO",
        "appeared": 166,
        "passed": 29,
        "passRate": "17.47%"
      },
      {
        "name": "YAROSLAV THE WISE NOVGOROD STATE UNIVERSITY INSTITUTE OF MEDICAL EDUCATION",
        "appeared": 11,
        "passed": 3,
        "passRate": "27.27%"
      },
      {
        "name": "YAROSLAVL STATE MEDICAL UNIVERSITY",
        "appeared": 5,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "PETROZAVODSK STATE UNIVERSITY INSTITUTE OF MEDICINE PETRSU",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "SAINT KITTS AND NEVIS",
    "appeared": 22,
    "passed": 3,
    "passRate": "13.64%",
    "colleges": [
      {
        "name": "INTERNATIONAL UNIVERSITY OF THE HEALTH SCIENCES IUHS",
        "appeared": 15,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "WINDSOR UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 7,
        "passed": 3,
        "passRate": "42.86%"
      }
    ]
  },
  {
    "country": "SAINT LUCIA",
    "appeared": 102,
    "passed": 14,
    "passRate": "13.73%",
    "colleges": [
      {
        "name": "AMERICAN INTERNATIONAL MEDICAL UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 84,
        "passed": 7,
        "passRate": "8.33%"
      },
      {
        "name": "INTERNATIONAL AMERICAN UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 3,
        "passed": 1,
        "passRate": "33.33%"
      },
      {
        "name": "SPARTAN HEALTH SCIENCES UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 15,
        "passed": 6,
        "passRate": "40.00%"
      }
    ]
  },
  {
    "country": "SAUDI ARABIA",
    "appeared": 2,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "ALFAISAL UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "SERBIA",
    "appeared": 97,
    "passed": 42,
    "passRate": "43.30%",
    "colleges": [
      {
        "name": "UNIVERSITY OF BELGRADE FACULTY OF MEDICINE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "UNIVERSITY OF KRAGUJEVAC FACULTY OF MEDICAL SCIENCES",
        "appeared": 52,
        "passed": 21,
        "passRate": "40.38%"
      },
      {
        "name": "UNIVERSITY OF NIS FACULTY OF MEDICINE",
        "appeared": 42,
        "passed": 20,
        "passRate": "47.62%"
      },
      {
        "name": "UNIVERSITY OF NOVI SAD FACULTY OF MEDICINE",
        "appeared": 2,
        "passed": 1,
        "passRate": "50.00%"
      }
    ]
  },
  {
    "country": "TAJIKISTAN",
    "appeared": 1013,
    "passed": 186,
    "passRate": "18.36%",
    "colleges": [
      {
        "name": "AVICENNA TAJIK STATE MEDICAL UNIVERSITY",
        "appeared": 1013,
        "passed": 186,
        "passRate": "18.36%"
      }
    ]
  },
  {
    "country": "UKRAINE",
    "appeared": 5903,
    "passed": 1184,
    "passRate": "20.06%",
    "colleges": [
      {
        "name": "BOGOMOLETS NATIONAL MEDICAL UNIVERSITY",
        "appeared": 379,
        "passed": 105,
        "passRate": "27.70%"
      },
      {
        "name": "BUKOVINIAN STATE MEDICAL UNIVERSITY",
        "appeared": 494,
        "passed": 110,
        "passRate": "22.27%"
      },
      {
        "name": "CRIMEA STATE MEDICAL UNIVERSITY NAMED AFTER S I GEORGIEVSKY",
        "appeared": 3,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "DANYLO HALYTSKY LVIV NATIONAL MEDICAL UNIVERSITY",
        "appeared": 181,
        "passed": 91,
        "passRate": "50.28%"
      },
      {
        "name": "DNIPRO MEDICAL INSTITUTE OF TRADITIONAL AND NON TRADITIONAL MEDICINE",
        "appeared": 12,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "DNIPRO STATE MEDICAL UNIVERSITY",
        "appeared": 201,
        "passed": 26,
        "passRate": "12.94%"
      },
      {
        "name": "DNIPROPETROVSK MEDICAL ACADEMY OF THE MINISTRY OF HEALTH OF UKRAINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "DONETSK NATIONAL MEDICAL UNIVERSITY",
        "appeared": 41,
        "passed": 1,
        "passRate": "2.44%"
      },
      {
        "name": "DONETSK NATIONAL MEDICAL UNIVERSITY FACULTY OF GENERAL MEDICINE",
        "appeared": 10,
        "passed": 3,
        "passRate": "30.00%"
      },
      {
        "name": "I YA HORBACHEVSKY TERNOPIL NATIONAL MEDICAL UNIVERSITY",
        "appeared": 268,
        "passed": 93,
        "passRate": "34.70%"
      },
      {
        "name": "INTERNATIONAL ACADEMY OF ECOLOGY AND MEDICINE",
        "appeared": 9,
        "passed": 1,
        "passRate": "11.11%"
      },
      {
        "name": "IVANO FRANKIVSK NATIONAL MEDICAL UNIVERSITY",
        "appeared": 477,
        "passed": 142,
        "passRate": "29.77%"
      },
      {
        "name": "KHARKIV INSTITUTE OF MEDICINE AND BIOMEDICAL SCIENCES FACULTY OF MEDICINE",
        "appeared": 18,
        "passed": 4,
        "passRate": "22.22%"
      },
      {
        "name": "KHARKIV INTERNATIONAL MEDICAL UNIVERSITY",
        "appeared": 5,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "KHARKIV NATIONAL MEDICAL UNIVERSITY",
        "appeared": 425,
        "passed": 53,
        "passRate": "12.47%"
      },
      {
        "name": "KYIV INTERNATIONAL UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "KYIV MEDICAL UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 279,
        "passed": 55,
        "passRate": "19.71%"
      },
      {
        "name": "LUGANSK STATE MEDICAL UNIVERSITY",
        "appeared": 467,
        "passed": 20,
        "passRate": "4.28%"
      },
      {
        "name": "M GORKY DONETSK NATIONAL MEDICAL UNIVERSITY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "MEDICAL ACADEMY NAMED AFTER S I GEORGIEVSKY OF VERNADSKY CFU",
        "appeared": 87,
        "passed": 5,
        "passRate": "5.75%"
      },
      {
        "name": "NATIONAL PIROGOV MEMORIAL MEDICAL UNIVERSITY",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "ODESSA NATIONAL MEDICAL UNIVERSITY",
        "appeared": 592,
        "passed": 86,
        "passRate": "14.53%"
      },
      {
        "name": "PETRO MOHYLA BLACK SEA NATIONAL UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 14,
        "passed": 3,
        "passRate": "21.43%"
      },
      {
        "name": "POLTAVA STATE MEDICAL UNIVERSITY",
        "appeared": 115,
        "passed": 19,
        "passRate": "16.52%"
      },
      {
        "name": "SUMY STATE UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 113,
        "passed": 22,
        "passRate": "19.47%"
      },
      {
        "name": "TARAS SHEVCHENKO NATIONAL UNIVERSITY OF KYIV INSTITUTE OF BIOLOGY AND MEDICINE",
        "appeared": 44,
        "passed": 13,
        "passRate": "29.55%"
      },
      {
        "name": "UZHHOROD NATIONAL UNIVERSITY FACULTY OF MEDICINE",
        "appeared": 444,
        "passed": 103,
        "passRate": "23.20%"
      },
      {
        "name": "V N KARAZIN KHARKIV NATIONAL UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 361,
        "passed": 46,
        "passRate": "12.74%"
      },
      {
        "name": "VINNITSA NATIONAL PIROGOV MEMORIAL MEDICAL UNIVERSITY",
        "appeared": 448,
        "passed": 147,
        "passRate": "32.81%"
      },
      {
        "name": "ZAPORIZHZHIA STATE MEDICAL AND PHARMACEUTICAL UNIVERSITY",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "ZAPORIZHZHIA STATE MEDICAL UNIVERSITY",
        "appeared": 407,
        "passed": 34,
        "passRate": "8.35%"
      },
      {
        "name": "LESYA UKRAINKA VOLYN NATIONAL UNIVERSITY MEDICAL INSTITUTE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "UNITED ARAB EMIRATES",
    "appeared": 32,
    "passed": 15,
    "passRate": "46.88%",
    "colleges": [
      {
        "name": "DUBAI MEDICAL COLLEGE FOR GIRLS",
        "appeared": 6,
        "passed": 5,
        "passRate": "83.33%"
      },
      {
        "name": "GULF MEDICAL UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 8,
        "passed": 2,
        "passRate": "25.00%"
      },
      {
        "name": "RAK COLLEGE OF MEDICAL SCIENCES",
        "appeared": 18,
        "passed": 8,
        "passRate": "44.44%"
      }
    ]
  },
  {
    "country": "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND",
    "appeared": 2,
    "passed": 2,
    "passRate": "100.00%",
    "colleges": [
      {
        "name": "UNIVERSITY OF DUNDEE SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      },
      {
        "name": "UNIVERSITY OF CENTRAL LANCASHIRE SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "UNITED REPUBLIC OF TANZANIA",
    "appeared": 2,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "INTERNATIONAL MEDICAL AND TECHNOLOGICAL UNIVERSITY COLLEGE OF MEDICINE",
        "appeared": 2,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "UZBEKISTAN",
    "appeared": 1405,
    "passed": 533,
    "passRate": "37.94%",
    "colleges": [
      {
        "name": "ANDIZHAN STATE MEDICAL INSTITUTE",
        "appeared": 8,
        "passed": 1,
        "passRate": "12.50%"
      },
      {
        "name": "BUKHARA STATE MEDICAL INSTITUTE NAMED AFTER ABU ALI IBN SINO",
        "appeared": 504,
        "passed": 166,
        "passRate": "32.94%"
      },
      {
        "name": "FERGANA MEDICAL INSTITUTE OF PUBLIC HEALTH",
        "appeared": 123,
        "passed": 63,
        "passRate": "51.22%"
      },
      {
        "name": "FERGANA STATE UNIVERSITY MEDICAL CENTRE",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      },
      {
        "name": "SAMARKAND STATE MEDICAL INSTITUTE",
        "appeared": 169,
        "passed": 58,
        "passRate": "34.32%"
      },
      {
        "name": "TASHKENT MEDICAL ACADEMY",
        "appeared": 221,
        "passed": 95,
        "passRate": "42.99%"
      },
      {
        "name": "TASHKENT STATE DENTAL INSTITUTE FACULTY OF MEDICINE",
        "appeared": 80,
        "passed": 21,
        "passRate": "26.25%"
      },
      {
        "name": "URGENCH BRANCH OF TASHKENT MEDICAL ACADEMY",
        "appeared": 299,
        "passed": 129,
        "passRate": "43.14%"
      }
    ]
  },
  {
    "country": "ITALY",
    "appeared": 1,
    "passed": 0,
    "passRate": "0.00%",
    "colleges": [
      {
        "name": "HUMANITAS UNIVERSITY MEDICAL SCHOOL",
        "appeared": 1,
        "passed": 0,
        "passRate": "0.00%"
      }
    ]
  },
  {
    "country": "OMAN",
    "appeared": 1,
    "passed": 1,
    "passRate": "100.00%",
    "colleges": [
      {
        "name": "OMAN MEDICAL COLLEGE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  },
  {
    "country": "SABA",
    "appeared": 1,
    "passed": 1,
    "passRate": "100.00%",
    "colleges": [
      {
        "name": "SABA UNIVERSITY SCHOOL OF MEDICINE",
        "appeared": 1,
        "passed": 1,
        "passRate": "100.00%"
      }
    ]
  }
];
