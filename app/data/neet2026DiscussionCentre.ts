export type Neet2026DiscussionSubject = "Physics" | "Chemistry" | "Biology";

export type Neet2026DiscussionOption = {
  number: string;
  text: string;
};

export type Neet2026DiscussionQuestion = {
  id: number;
  subject: Neet2026DiscussionSubject;
  sourcePage: number;
  slug: string;
  questionText: string;
  rawSourceText: string;
  options: Neet2026DiscussionOption[];
  answerOption: string | null;
  answerLabel: string;
  answerOptionText: string | null;
  answerSourceText: string;
};

export const neet2026DiscussionMeta = {
  "title": "NEET 2026 Discussions Centre",
  "description": "Crawlable Re-NEET 2026 question and answer key discussion centre for Physics, Chemistry and Biology.",
  "sourcePdfName": "re NEET_2026_Clean_Questions_Answers_Analysis_Ilmalink_Mumtaz.pdf",
  "sourcePdfPages": 34,
  "totalQuestions": 180,
  "extractionNote": "Generated from the embedded text layer of the supplied PDF. Some source lines may preserve PDF column-order artifacts, so each item keeps a source-page reference for verification."
} as const;

export const neet2026DiscussionQuestions = [
  {
    "id": 1,
    "subject": "Physics",
    "sourcePage": 4,
    "slug": "neet-2026-question-1",
    "questionText": "1. A particle of mass M moves along a horizontal x axis |",
    "rawSourceText": "1. A particle of mass M moves along a horizontal x axis |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 2,
    "subject": "Physics",
    "sourcePage": 4,
    "slug": "neet-2026-question-2",
    "questionText": "2. The mean free path of molecules in an ideal gas , ; ; is half that of another ideal gas B. The diameter of",
    "rawSourceText": "2. The mean free path of molecules in an ideal gas , ; ; is half that of another ideal gas B. The diameter of",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 3,
    "subject": "Physics",
    "sourcePage": 4,
    "slug": "neet-2026-question-3",
    "questionText": "3. Two identical inductors are connected in two whose position as a function of time is given by different configurations P and Q, where a time _ op h \u2014 1 ms\u2019. B= 6 me and varying current I(t) I flowing, as shown in the figure. s(t) = at! - Bt + 7, where @ = 1 ms\u201d, B = 6 ms\u201d an The induced emf between points a and b for y = 5m. The average speed of the particle, in ms\u201d, configuration P is E, and that for configuration Q is fromt =O tot=6sis : Ep. The ratio E/E, is : (1) 12 (2) 6 (Neglect an effect of mata inductance (3) 3 (4) 0 a a = =",
    "rawSourceText": "3. Two identical inductors are connected in two whose position as a function of time is given by different configurations P and Q, where a time _ op h \u2014 1 ms\u2019. B= 6 me and varying current I(t) I flowing, as shown in the figure. s(t) = at! - Bt + 7, where @ = 1 ms\u201d, B = 6 ms\u201d an The induced emf between points a and b for y = 5m. The average speed of the particle, in ms\u201d, configuration P is E, and that for configuration Q is fromt =O tot=6sis : Ep. The ratio E/E, is : (1) 12 (2) 6 (Neglect an effect of mata inductance (3) 3 (4) 0 a a Ans. (3) = =",
    "options": [
      {
        "number": "1",
        "text": "12"
      },
      {
        "number": "2",
        "text": "6 (Neglect an effect of mata inductance"
      },
      {
        "number": "4",
        "text": "0 a a"
      },
      {
        "number": "3",
        "text": "= ="
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - = =",
    "answerOptionText": "= =",
    "answerSourceText": "Ans. (3) = ="
  },
  {
    "id": 4,
    "subject": "Physics",
    "sourcePage": 4,
    "slug": "neet-2026-question-4",
    "questionText": "4. For sound waves, if the number of nodes for the 5\u201d from x=0 to x = L. The coefficient of kinetic friction harmonic of an open-ended pipe is n and that for varies as a function of x as H,(x) = H)\u2014 ox, where Hp, the 9\u201d harmonic of the same pipe with one of its a are constants of appropriate dimensions, so that u,(L}=0. The total work done by the frictional force ends closed is m, the ratio Dis: during the motion is ny,MgL, where g is the m acceleration due to gravity. The value of n is : (1) 5 (2) 9 (1) 3 (2) 1 9 5 1 1 3 3) = 4) \u2014 = @) 5 a) (3) 1 a) = a t. f h of molecul deal gas A | \u00a9)",
    "rawSourceText": "4. For sound waves, if the number of nodes for the 5\u201d from x=0 to x = L. The coefficient of kinetic friction harmonic of an open-ended pipe is n and that for varies as a function of x as H,(x) = H)\u2014 ox, where Hp, the 9\u201d harmonic of the same pipe with one of its a are constants of appropriate dimensions, so that u,(L}=0. The total work done by the frictional force ends closed is m, the ratio Dis: during the motion is ny,MgL, where g is the m acceleration due to gravity. The value of n is : (1) 5 (2) 9 (1) 3 (2) 1 9 5 1 1 3 3) = 4) \u2014 = @) 5 a) (3) 1 a) = a t. f h of molecul deal gas A | \u00a9)",
    "options": [
      {
        "number": "2",
        "text": "1 9 5 1 1 3 3) = 4) \u2014 = @) 5 a)"
      },
      {
        "number": "3",
        "text": "1 a) = a t. f h of molecul deal gas A | \u00a9)"
      }
    ],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 5,
    "subject": "Physics",
    "sourcePage": 4,
    "slug": "neet-2026-question-5",
    "questionText": "5. Consider a long solenoid of length | and radius r. If the spherical molecules of gas A is twice the n is the number of turns per unit length and py is the diameter of the molecules of B. If number densities permeability of free space, the inductance of the of the gases A and B are n, and n,, respectively, solenoid is : then the correct option is : (1) pga\u2019 (2) yn\u2019 (1) m=, (2) ny = 2n, oo 7 1 1 (3) (u,/2a)n'r'l (4) 2y,nn\u2018r'l (3) ng = qu (4) ng = Me",
    "rawSourceText": "5. Consider a long solenoid of length | and radius r. If the spherical molecules of gas A is twice the n is the number of turns per unit length and py is the diameter of the molecules of B. If number densities permeability of free space, the inductance of the of the gases A and B are n, and n,, respectively, solenoid is : then the correct option is : (1) pga\u2019 (2) yn\u2019 (1) m=, (2) ny = 2n, oo 7 1 1 (3) (u,/2a)n'r'l (4) 2y,nn\u2018r'l (3) ng = qu (4) ng = Me Ans. (1) Ans. (4)",
    "options": [
      {
        "number": "1",
        "text": "pga\u2019"
      },
      {
        "number": "2",
        "text": "yn\u2019"
      },
      {
        "number": "3",
        "text": "(u,/2a)n'r'l"
      },
      {
        "number": "4",
        "text": "2y,nn\u2018r'l"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - 2y,nn\u2018r'l",
    "answerOptionText": "2y,nn\u2018r'l",
    "answerSourceText": "Ans. (4)"
  },
  {
    "id": 6,
    "subject": "Physics",
    "sourcePage": 4,
    "slug": "neet-2026-question-6",
    "questionText": "6. Consider a particle moving along a straight line,",
    "rawSourceText": "6. Consider a particle moving along a straight line,",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 7,
    "subject": "Physics",
    "sourcePage": 4,
    "slug": "neet-2026-question-7",
    "questionText": "7. Consider the following nuclear reaction : = 2 2 5 Tha He b T T Take masses of \u201c\u00b0U, \u201cTh and \u201cHe as 238.050 u, 234.043 u and 4.003 u, respectively. The Q value @ for the reaction, in keV, is : P (Given : 1 u = 931.5 MeV c>J (1) 3726 (2) 3730 (1) 1/4 (2) 1/2 (3) 3736 (4) 3740 (3) 1 (4) 2 PHYSICS | NEET 2026 Questions with Answers PHYSICS page 1",
    "rawSourceText": "7. Consider the following nuclear reaction : = 2 2 5 Tha He b T T Take masses of \u201c\u00b0U, \u201cTh and \u201cHe as 238.050 u, 234.043 u and 4.003 u, respectively. The Q value @ for the reaction, in keV, is : P (Given : 1 u = 931.5 MeV c>J (1) 3726 (2) 3730 (1) 1/4 (2) 1/2 (3) 3736 (4) 3740 (3) 1 (4) 2 Ans. (1) Ans. (4) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 1",
    "options": [
      {
        "number": "1",
        "text": "3726"
      },
      {
        "number": "2",
        "text": "3730"
      },
      {
        "number": "3",
        "text": "3736"
      },
      {
        "number": "4",
        "text": "3740"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - 3740",
    "answerOptionText": "3740",
    "answerSourceText": "Ans. (4) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 1"
  },
  {
    "id": 8,
    "subject": "Physics",
    "sourcePage": 10,
    "slug": "neet-2026-question-8",
    "questionText": "8. Which of the following options option that describes the variation of current in ? represents the correct plot ? these circuits is - Nie) 1 V4 Vo4 10\u00b0 10\u00b0 10\u00b0 R (1-aAT) (1) 1\u00b0 R,(1-cAT) R,(1+0.AT) 10\u00b0 MoT eo oo reo go aon dearee) R (1+0.T) (A) (B) Ne) (1) I, remains constant while |, increases ae (2) |, decreases while |, increases o (3) I, increases while I, decreases 10\" (4) both I, and I, remain constant (2) 1 ol SEP in legree",
    "rawSourceText": "8. Which of the following options option that describes the variation of current in ? represents the correct plot ? these circuits is - Nie) 1 V4 Vo4 10\u00b0 10\u00b0 10\u00b0 R (1-aAT) (1) 1\u00b0 R,(1-cAT) R,(1+0.AT) 10\u00b0 MoT eo oo reo go aon dearee) R (1+0.T) (A) (B) Ne) (1) I, remains constant while |, increases ae (2) |, decreases while |, increases o (3) I, increases while I, decreases 10\" (4) both I, and I, remain constant (2) 1 Ans. (1) ol SEP in legree",
    "options": [
      {
        "number": "1",
        "text": "1\u00b0 R,(1-cAT) R,(1+0.AT) 10\u00b0 MoT eo oo reo go aon dearee) R (1+0.T) (A) (B) Ne)"
      },
      {
        "number": "2",
        "text": "|, decreases while |, increases o"
      },
      {
        "number": "3",
        "text": "I, increases while I, decreases 10\""
      },
      {
        "number": "4",
        "text": "both I, and I, remain constant"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - 1\u00b0 R,(1-cAT) R,(1+0.AT) 10\u00b0 MoT eo oo reo go aon dearee) R (1+0.T) (A) (B) Ne)",
    "answerOptionText": "1\u00b0 R,(1-cAT) R,(1+0.AT) 10\u00b0 MoT eo oo reo go aon dearee) R (1+0.T) (A) (B) Ne)",
    "answerSourceText": "Ans. (1) ol SEP in legree"
  },
  {
    "id": 9,
    "subject": "Physics",
    "sourcePage": 11,
    "slug": "neet-2026-question-9",
    "questionText": "9. If the car travels at a Qfoves fi foe speed 10 ms\u201d, then the wear and tear on its tyres is For AM and EM minimum. Taking the acceleration due to gravity to Gamma rays communication be 10 ms\u201d, the value of 0 is : systems afl For treating the (1) tan (2) S_ |Radio wave IV 8 Cancer cells (2) tan [ 2 } The correct option is : 5 (1) P-, Ql, Rell, SIV (3) tan? (v3 J 2) (2) P-l, QV, R-II, S-Ill (3) P-Il, Q1, RAV, Sl (4) tan* (23) (4) PA, QUY, Bull, S41 PHYSICS | NEET 2026 Questions with Answers PHYSICS page 8",
    "rawSourceText": "9. If the car travels at a Qfoves fi foe speed 10 ms\u201d, then the wear and tear on its tyres is For AM and EM minimum. Taking the acceleration due to gravity to Gamma rays communication be 10 ms\u201d, the value of 0 is : systems afl For treating the (1) tan (2) S_ |Radio wave IV 8 Cancer cells (2) tan [ 2 } The correct option is : 5 (1) P-, Ql, Rell, SIV (3) tan? (v3 J 2) (2) P-l, QV, R-II, S-Ill (3) P-Il, Q1, RAV, Sl (4) tan* (23) (4) PA, QUY, Bull, S41 Ans. (1) Ans. (3) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 8",
    "options": [
      {
        "number": "1",
        "text": "tan"
      },
      {
        "number": "2",
        "text": "S_ |Radio wave IV 8 Cancer cells"
      },
      {
        "number": "3",
        "text": "tan? (v3 J 2)"
      },
      {
        "number": "4",
        "text": "tan* (23)"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - tan? (v3 J 2)",
    "answerOptionText": "tan? (v3 J 2)",
    "answerSourceText": "Ans. (3) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 8"
  },
  {
    "id": 10,
    "subject": "Physics",
    "sourcePage": 5,
    "slug": "neet-2026-question-10",
    "questionText": "10. Water flows in a streamline motion through a photo-electrons are generated. If power of the light horizontal pipe of circular cross-section as shown in source starts to decrease linearly with time t, then the figure. The pressure difference of water between variation of the photocurrent I and magnitude of the P and Q is 15 Nm\u201d. The area of cross-section at P F : : + A and Q are 40 cm\u2019 and 20 cm\u2019, respectively. The stopping potential |VI with time is best \u00bb Tesps v represented by : rate of flow of water through the pipe, in cm\u2019s\", is : : (Take density of water = 1000 kg mJ P \u2014\u2014\u2014\u2014__ 9 (1) i. TE. \u2014___\u2014_. \u2014_ err t t (1) 100 (2) 200 (3) 300 (4) 400 (2) IVI",
    "rawSourceText": "10. Water flows in a streamline motion through a photo-electrons are generated. If power of the light horizontal pipe of circular cross-section as shown in source starts to decrease linearly with time t, then the figure. The pressure difference of water between variation of the photocurrent I and magnitude of the P and Q is 15 Nm\u201d. The area of cross-section at P F : : + A and Q are 40 cm\u2019 and 20 cm\u2019, respectively. The stopping potential |VI with time is best \u00bb Tesps v represented by : rate of flow of water through the pipe, in cm\u2019s\", is : : (Take density of water = 1000 kg mJ P \u2014\u2014\u2014\u2014__ 9 (1) i. TE. \u2014___\u2014_. \u2014_ err t t (1) 100 (2) 200 (3) 300 (4) 400 Ans. (4) (2) IVI",
    "options": [
      {
        "number": "1",
        "text": "i. TE. \u2014___\u2014_. \u2014_ err t t"
      },
      {
        "number": "2",
        "text": "200"
      },
      {
        "number": "3",
        "text": "300"
      },
      {
        "number": "4",
        "text": "400"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - 400",
    "answerOptionText": "400",
    "answerSourceText": "Ans. (4) (2) IVI"
  },
  {
    "id": 11,
    "subject": "Physics",
    "sourcePage": 5,
    "slug": "neet-2026-question-11",
    "questionText": "11. A current J, flows through a metallic circular loop of radius r as shown in the figure. Resistance of the segment ABC is half that of ADC. Magnitude of t t magnetic field at the centre O of the loop is : I, t t Cc I, if Hol, y) boo 2) Holo (4) I TE. () 12r 2) 4r Holo Holo ; ; 3) 2r @) 2nr",
    "rawSourceText": "11. A current J, flows through a metallic circular loop of radius r as shown in the figure. Resistance of the segment ABC is half that of ADC. Magnitude of t t magnetic field at the centre O of the loop is : I, t t Cc I, if Hol, y) boo 2) Holo (4) I TE. () 12r 2) 4r Holo Holo ; ; 3) 2r @) 2nr Ans. (1) Ans. (1)",
    "options": [
      {
        "number": "4",
        "text": "I TE. () 12r 2) 4r Holo Holo ; ; 3) 2r @) 2nr"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - option text is present in the source question block for this item.",
    "answerOptionText": null,
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 12,
    "subject": "Physics",
    "sourcePage": 5,
    "slug": "neet-2026-question-12",
    "questionText": "12. In the measurement of viscosity of liquids using",
    "rawSourceText": "12. In the measurement of viscosity of liquids using",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 13,
    "subject": "Physics",
    "sourcePage": 6,
    "slug": "neet-2026-question-13",
    "questionText": "13. Two planets P, and P, with equal mass have radii R, |",
    "rawSourceText": "13. Two planets P, and P, with equal mass have radii R, |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 14,
    "subject": "Physics",
    "sourcePage": 6,
    "slug": "neet-2026-question-14",
    "questionText": "Question 14 source text could not be isolated cleanly from the embedded PDF text layer. Review the source-page excerpt for crawlable context.",
    "rawSourceText": "13. Two planets P, and P, with equal mass have radii R, | 17. In an adiabatic expansion, tne temperature of one and R,, respectively, where R, Ry The escape mole of an ideal monatomic gas (y=5/3) decreases 2 from 60 K to 50 K. The work done by the gas in speeds of P, and P, are v, and v,, respectively. Then the process is : Ve, (Take the universal gas constant as R = 8.3 J mol\u201d \u2014 is: 4 vy K) 1 (1) 41.5d (2) 83 J 5 (2) 1 (3) 124.54 (4) 1664 Ans. (3 (3) V2 (4) 2 @) . ; sei Ans. (3) 18. A ray of light with wavelength 2 is incident on three 14 In a solar system, the time-period of revolution of a different photoelectric cells namely 1, 2 and 3. The \u00b0 lant t ? \u2014 ; P bit of radius Ri threshold wavelength of these photo-electric cells Plane tt sin a cremar oron OF racns 8 are i,, 4, and A, respectively and the magnitude of (I pi ronan ne: (2) RY\u201d? stopping potentials of these cells are V,, V, and V,, (3) R\u00b0 (4) R\u00ae respectively. The relation between 4 and threshold Ans. (2) wavelengths are A, < A, 4, > A and 4, >> A. The correct option is : 15. Two infinitely long parallel conducting wires A and (1) V,=0,V,<V. (2) V.=0,V,>V \u2018 : 17 >) V2 3 1 V9 V2 3 B carry currents and 21, respectively, in the same (3) V,>Vp V,=0 (4) V, <V,V,=0 direction. The wire A has uniform mass per unit Ans. (1) length % and lies on an insulated floor. The wire B is 19 \u00b0 A photon and an electron, each of 20 eV energy kept fixed at a height h ab the floor. Th \u00b0 , , ep mea & @ eg move ne . oor \u00b0 move in free space. The ratio of linear momentum minimum magnitude of h so that the wire A does not rise from the floor is : of electron p, to that of photon Ppp ee is : [g is the acceleration due to gravity and y, is the Pen permeability of free space] (Take speed of light = 3 x 10\u00b0 ms\u2019, charge of nol? ul? electron = -1.6 x 10\u00b0 C and mass of electron 1) 2) = 3 (1) 2nkg (2) mg ox kg) 1 2 2 1 \u2014 2; \u2014 (3) 2h (4) fuoF a) 450 2) 250 ms ms (3) 225 (4) 275 16. An ideal Zener diode with breakdown voltage of 20. Which of\u2026",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 15,
    "subject": "Physics",
    "sourcePage": 6,
    "slug": "neet-2026-question-15",
    "questionText": "15. Two infinitely long parallel conducting wires A and (1) V,=0,V,<V. (2) V.=0,V,>V \u2018 : 17 >) V2 3 1 V9 V2 3 B carry currents and 21, respectively, in the same (3) V,>Vp V,=0 (4) V, <V,V,=0 direction. The wire A has uniform mass per unit length % and lies on an insulated floor. The wire B is 19 \u00b0 A photon and an electron, each of 20 eV energy kept fixed at a height h ab the floor. Th \u00b0 , , ep mea & @ eg move ne . oor \u00b0 move in free space. The ratio of linear momentum minimum magnitude of h so that the wire A does not rise from the floor is : of electron p, to that of photon Ppp ee is : [g is the acceleration due to gravity and y, is the Pen permeability of free space] (Take speed of light = 3 x 10\u00b0 ms\u2019, charge of nol? ul? electron = -1.6 x 10\u00b0 C and mass of electron 1) 2) = 3 (1) 2nkg (2) mg ox kg) 1 2 2 1 \u2014 2; \u2014 (3) 2h (4) fuoF a) 450 2) 250 ms ms (3) 225 (4) 275",
    "rawSourceText": "15. Two infinitely long parallel conducting wires A and (1) V,=0,V,<V. (2) V.=0,V,>V \u2018 : 17 >) V2 3 1 V9 V2 3 B carry currents and 21, respectively, in the same (3) V,>Vp V,=0 (4) V, <V,V,=0 direction. The wire A has uniform mass per unit Ans. (1) length % and lies on an insulated floor. The wire B is 19 \u00b0 A photon and an electron, each of 20 eV energy kept fixed at a height h ab the floor. Th \u00b0 , , ep mea & @ eg move ne . oor \u00b0 move in free space. The ratio of linear momentum minimum magnitude of h so that the wire A does not rise from the floor is : of electron p, to that of photon Ppp ee is : [g is the acceleration due to gravity and y, is the Pen permeability of free space] (Take speed of light = 3 x 10\u00b0 ms\u2019, charge of nol? ul? electron = -1.6 x 10\u00b0 C and mass of electron 1) 2) = 3 (1) 2nkg (2) mg ox kg) 1 2 2 1 \u2014 2; \u2014 (3) 2h (4) fuoF a) 450 2) 250 ms ms (3) 225 (4) 275",
    "options": [
      {
        "number": "1",
        "text": "V,=0,V,<V."
      },
      {
        "number": "2",
        "text": "V.=0,V,>V \u2018 : 17 >) V2 3 1 V9 V2 3 B carry currents and 21, respectively, in the same"
      },
      {
        "number": "3",
        "text": "V,>Vp V,=0"
      },
      {
        "number": "4",
        "text": "V, <V,V,=0 direction. The wire A has uniform mass per unit"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - V,=0,V,<V.",
    "answerOptionText": "V,=0,V,<V.",
    "answerSourceText": "Ans. (1) length % and lies on an insulated floor. The wire B is 19 \u00b0 A photon and an electron, each of 20 eV energy kept fixed at a height h ab the floor. Th \u00b0 , , ep mea & @ eg move ne . oor \u00b0 move in free space. The ratio of linear momentum minimum magnitude of h so that the wire A does not rise from the floor is : of electron p, to that of photon Ppp ee is : [g is the acceleration due to gravity and y, is the Pen permeability of free space] (Take speed of light = 3 x 10\u00b0 ms\u2019, charge of nol? ul? electron = -1.6 x 10\u00b0 C and mass of electron 1) 2) = 3 (1) 2nkg (2) mg ox kg) 1 2 2 1 \u2014 2; \u2014 (3) 2h (4) fuoF a) 450 2) 250 ms ms (3) 225 (4) 275"
  },
  {
    "id": 16,
    "subject": "Physics",
    "sourcePage": 6,
    "slug": "neet-2026-question-16",
    "questionText": "16. An ideal Zener diode with breakdown voltage of",
    "rawSourceText": "16. An ideal Zener diode with breakdown voltage of",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 17,
    "subject": "Physics",
    "sourcePage": 6,
    "slug": "neet-2026-question-17",
    "questionText": "17. In an adiabatic expansion, tne temperature of one and R,, respectively, where R, Ry The escape mole of an ideal monatomic gas (y=5/3) decreases 2 from 60 K to 50 K. The work done by the gas in speeds of P, and P, are v, and v,, respectively. Then the process is : Ve, (Take the universal gas constant as R = 8.3 J mol\u201d \u2014 is: 4 vy K) 1 (1) 41.5d (2) 83 J 5 (2) 1 (3) 124.54 (4) 1664 V2 (4) 2 @) . ; sei",
    "rawSourceText": "17. In an adiabatic expansion, tne temperature of one and R,, respectively, where R, Ry The escape mole of an ideal monatomic gas (y=5/3) decreases 2 from 60 K to 50 K. The work done by the gas in speeds of P, and P, are v, and v,, respectively. Then the process is : Ve, (Take the universal gas constant as R = 8.3 J mol\u201d \u2014 is: 4 vy K) 1 (1) 41.5d (2) 83 J 5 (2) 1 (3) 124.54 (4) 1664 Ans. (3 (3) V2 (4) 2 @) . ; sei Ans. (3)",
    "options": [
      {
        "number": "1",
        "text": "41.5d"
      },
      {
        "number": "2",
        "text": "83 J 5"
      },
      {
        "number": "3",
        "text": "124.54"
      },
      {
        "number": "4",
        "text": "1664"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - 124.54",
    "answerOptionText": "124.54",
    "answerSourceText": "Ans. (3)"
  },
  {
    "id": 18,
    "subject": "Physics",
    "sourcePage": 6,
    "slug": "neet-2026-question-18",
    "questionText": "18. A ray of light with wavelength 2 is incident on three 14 In a solar system, the time-period of revolution of a different photoelectric cells namely 1, 2 and",
    "rawSourceText": "18. A ray of light with wavelength 2 is incident on three 14 In a solar system, the time-period of revolution of a different photoelectric cells namely 1, 2 and",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 19,
    "subject": "Physics",
    "sourcePage": 7,
    "slug": "neet-2026-question-19",
    "questionText": "Question 19 source text could not be isolated cleanly from the embedded PDF text layer. Review the source-page excerpt for crawlable context.",
    "rawSourceText": "21. A unit positive point charge is taken slowly through | 22. Consider three media P, Q and K with refractive an infinitesimally thin tube that is inside a charged indices 1, 1.25, and 1.5, respectively. The medium dielectric sphere of radius R, having uniform Q having a thickness of 5 cm is placed between . ; , , extended media P and R as shown in the figure. An positive charge density p, as shown in the figure. object O is placed at the centre of medium Q. If The initial and final positions of the charge are viewed from medium P near the normal direction marked by A and B at distances 2R and 3R the apparent depth of O is h,. For similar respectively, from the centre of the sphere. In this observation from medium R, the apparent depth is process, the magnitude of the total work done on h,. The value of |h, -h,1, in cm, is : 2 i the point charge is pr\u2019 H I nS i n,=1 The value of n is : i ' (\u20ac, is the permittivity of vacuum) Bem Ov Ny = 1.25 seen eee Loe ew\" n, = 1.5} 3R i 1 (1) 0 (2) 1 (3) 2 (1) 2 (4) 3 (2) 6 Ans. (2) (3) 9 (4) 18 Ans. (4) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 4",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 20,
    "subject": "Physics",
    "sourcePage": 6,
    "slug": "neet-2026-question-20",
    "questionText": "20. Which of the following measurements require \u2018index -3V is reverse biased with a negative input voltage correction\u2019? V, = -5V. The magnitude of voltage difference (1) Measurement of resistance of a wire using meter between points B and A is : bridge \u00a2 BA (2) Measurement of gravitational acceleration using simple pendulum (3) Measurement of focal length of lenses using optical bench ()3V (2) 2V (4) Measurement of speed of sound using (3) 1V (4) OV resonance tube S- PHYSICS | NEET 2026 Questions with Answers PHYSICS page 3",
    "rawSourceText": "20. Which of the following measurements require \u2018index -3V is reverse biased with a negative input voltage correction\u2019? V, = -5V. The magnitude of voltage difference (1) Measurement of resistance of a wire using meter between points B and A is : bridge \u00a2 BA (2) Measurement of gravitational acceleration using simple pendulum (3) Measurement of focal length of lenses using optical bench ()3V (2) 2V (4) Measurement of speed of sound using (3) 1V (4) OV ans. (3) resonance tube Ans. (2) S- PHYSICS | NEET 2026 Questions with Answers PHYSICS page 3",
    "options": [
      {
        "number": "1",
        "text": "Measurement of resistance of a wire using meter between points B and A is : bridge \u00a2 BA"
      },
      {
        "number": "2",
        "text": "Measurement of gravitational acceleration using simple pendulum"
      },
      {
        "number": "3",
        "text": "Measurement of focal length of lenses using optical bench ()3V"
      },
      {
        "number": "4",
        "text": "Measurement of speed of sound using"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Measurement of gravitational acceleration using simple pendulum",
    "answerOptionText": "Measurement of gravitational acceleration using simple pendulum",
    "answerSourceText": "Ans. (2) S- PHYSICS | NEET 2026 Questions with Answers PHYSICS page 3"
  },
  {
    "id": 21,
    "subject": "Physics",
    "sourcePage": 7,
    "slug": "neet-2026-question-21",
    "questionText": "21. A unit positive point charge is taken slowly through |",
    "rawSourceText": "21. A unit positive point charge is taken slowly through |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 22,
    "subject": "Physics",
    "sourcePage": 7,
    "slug": "neet-2026-question-22",
    "questionText": "22. Consider three media P, Q and K with refractive an infinitesimally thin tube that is inside a charged indices 1, 1.25, and 1.5, respectively. The medium dielectric sphere of radius R, having uniform Q having a thickness of 5 cm is placed between . ; , , extended media P and R as shown in the figure. An positive charge density p, as shown in the figure. object O is placed at the centre of medium Q. If The initial and final positions of the charge are viewed from medium P near the normal direction marked by A and B at distances 2R and 3R the apparent depth of O is h,. For similar respectively, from the centre of the sphere. In this observation from medium R, the apparent depth is process, the magnitude of the total work done on h,. The value of |h, -h,1, in cm, is : 2 i the point charge is pr\u2019 H I nS i n,=1 The value of n is : i ' (\u20ac, is the permittivity of vacuum) Bem Ov Ny = 1.25 seen eee Loe ew\" n, = 1.5} 3R i 1 (1) 0 (2) 1 (3) 2 (1) 2 (4) 3 (2) 6 (3) 9 (4) 18 PHYSICS | NEET 2026 Questions with Answers PHYSICS page 4",
    "rawSourceText": "22. Consider three media P, Q and K with refractive an infinitesimally thin tube that is inside a charged indices 1, 1.25, and 1.5, respectively. The medium dielectric sphere of radius R, having uniform Q having a thickness of 5 cm is placed between . ; , , extended media P and R as shown in the figure. An positive charge density p, as shown in the figure. object O is placed at the centre of medium Q. If The initial and final positions of the charge are viewed from medium P near the normal direction marked by A and B at distances 2R and 3R the apparent depth of O is h,. For similar respectively, from the centre of the sphere. In this observation from medium R, the apparent depth is process, the magnitude of the total work done on h,. The value of |h, -h,1, in cm, is : 2 i the point charge is pr\u2019 H I nS i n,=1 The value of n is : i ' (\u20ac, is the permittivity of vacuum) Bem Ov Ny = 1.25 seen eee Loe ew\" n, = 1.5} 3R i 1 (1) 0 (2) 1 (3) 2 (1) 2 (4) 3 (2) 6 Ans. (2) (3) 9 (4) 18 Ans. (4) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 4",
    "options": [
      {
        "number": "2",
        "text": "(3) 9"
      },
      {
        "number": "4",
        "text": "18"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - 18",
    "answerOptionText": "18",
    "answerSourceText": "Ans. (4) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 4"
  },
  {
    "id": 23,
    "subject": "Physics",
    "sourcePage": 8,
    "slug": "neet-2026-question-23",
    "questionText": "23. A trictionless circular wire of unit radius is fixed on |",
    "rawSourceText": "23. A trictionless circular wire of unit radius is fixed on |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 24,
    "subject": "Physics",
    "sourcePage": 8,
    "slug": "neet-2026-question-24",
    "questionText": "24. The temperature of a metallic sphere of radius R is | increased by a small amount AT. If the linear |",
    "rawSourceText": "24. The temperature of a metallic sphere of radius R is | Ans. (2) increased by a small amount AT. If the linear |",
    "options": [
      {
        "number": "2",
        "text": "increased by a small amount AT. If the linear |"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - increased by a small amount AT. If the linear |",
    "answerOptionText": "increased by a small amount AT. If the linear |",
    "answerSourceText": "Ans. (2) increased by a small amount AT. If the linear |"
  },
  {
    "id": 25,
    "subject": "Physics",
    "sourcePage": 8,
    "slug": "neet-2026-question-25",
    "questionText": "25. Acylindrical cork of uniform density floats in a liquid if the graph of v as a function of x is a circle, then of density p,. If the cork is depressed slightly and the correct option is : released, it oscillates harmonically with time period 1 T. If the same cork floats in another liquid of density (1) k= m (2) k=m p,, then the similar oscillation has time period 2T. The value of p,/p, is : (3) k=m? (4) k=vm 1) 4 2) 2 ia 1/2 ia 1/4 PHYSICS | NEET 2026 Questions with Answers PHYSICS page 5",
    "rawSourceText": "25. Acylindrical cork of uniform density floats in a liquid if the graph of v as a function of x is a circle, then of density p,. If the cork is depressed slightly and the correct option is : released, it oscillates harmonically with time period 1 T. If the same cork floats in another liquid of density (1) k= m (2) k=m p,, then the similar oscillation has time period 2T. The value of p,/p, is : (3) k=m? (4) k=vm 1) 4 2) 2 ia 1/2 ia 1/4 Ans. (2) Ans. (4) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 5",
    "options": [
      {
        "number": "1",
        "text": "k= m"
      },
      {
        "number": "2",
        "text": "k=m p,, then the similar oscillation has time period 2T. The value of p,/p, is :"
      },
      {
        "number": "3",
        "text": "k=m?"
      },
      {
        "number": "4",
        "text": "k=vm 1) 4 2) 2 ia 1/2 ia 1/4"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - k=vm 1) 4 2) 2 ia 1/2 ia 1/4",
    "answerOptionText": "k=vm 1) 4 2) 2 ia 1/2 ia 1/4",
    "answerSourceText": "Ans. (4) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 5"
  },
  {
    "id": 26,
    "subject": "Physics",
    "sourcePage": 8,
    "slug": "neet-2026-question-26",
    "questionText": "26. One main scale division of a Vernier calliper is equal the horizontal plane. Two point particles of unit to 1 mm and the number of divisions on the Vernier mass start moving simultaneously from point scale is",
    "rawSourceText": "26. One main scale division of a Vernier calliper is equal the horizontal plane. Two point particles of unit to 1 mm and the number of divisions on the Vernier mass start moving simultaneously from point scale is",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 27,
    "subject": "Physics",
    "sourcePage": 8,
    "slug": "neet-2026-question-27",
    "questionText": "27. A solid sphere A of radius R and mass M is attached _ {so -. at a point to a smaller solid sphere B of radius r << R and mass m < M. Assume that the line joining their 5 centres lies along the horizontal. The moment of inertia of the system calculated about a vertical axis P P passing through the centre of A is I, and that calculated about a vertical axis passing through the (1) (2) centre of B is I,. The difference I,\u2014 I, is : H il, 2 nfo 2S i P p A \u00a2 B A iB 0 0 n/2 \u2014n/2 n/2 \u2014n/2 (1) (M-m)(R+1 (2) (m-M)(R +17 (3) (m-M)R-1% (4) 0",
    "rawSourceText": "27. A solid sphere A of radius R and mass M is attached _ {so -. at a point to a smaller solid sphere B of radius r << R and mass m < M. Assume that the line joining their 5 centres lies along the horizontal. The moment of inertia of the system calculated about a vertical axis P P passing through the centre of A is I, and that calculated about a vertical axis passing through the (1) (2) centre of B is I,. The difference I,\u2014 I, is : H il, 2 nfo 2S i P p A \u00a2 B A iB 0 0 n/2 \u2014n/2 n/2 \u2014n/2 (1) (M-m)(R+1 (2) (m-M)(R +17 Ans. (3) (3) (m-M)R-1% (4) 0",
    "options": [
      {
        "number": "1",
        "text": "(2) centre of B is I,. The difference I,\u2014 I, is : H il, 2 nfo 2S i P p A \u00a2 B A iB 0 0 n/2 \u2014n/2 n/2 \u2014n/2"
      },
      {
        "number": "2",
        "text": "(m-M)(R +17"
      },
      {
        "number": "3",
        "text": "(3) (m-M)R-1%"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - (3) (m-M)R-1%",
    "answerOptionText": "(3) (m-M)R-1%",
    "answerSourceText": "Ans. (3) (3) (m-M)R-1% (4) 0"
  },
  {
    "id": 28,
    "subject": "Physics",
    "sourcePage": 8,
    "slug": "neet-2026-question-28",
    "questionText": "28. Consider a spring mass simple harmonic oscillator coefficient of thermal expansion of the metal is a, , ; , oo. the approximate increase in the volume of the in one dimension. The mass of the particle is m kg sphere is : and the spring constant is k Nm\u2018. At a given (1) 2nR\u2019oAT (2) 3nR\u2019aAT instant, the extension of the spring is x meter and ) 4nR'oAT (4) 6nR\u2019aAT the speed of the particle is v ms\u2019. On the x-v plane,",
    "rawSourceText": "28. Consider a spring mass simple harmonic oscillator coefficient of thermal expansion of the metal is a, , ; , oo. the approximate increase in the volume of the in one dimension. The mass of the particle is m kg sphere is : and the spring constant is k Nm\u2018. At a given (1) 2nR\u2019oAT (2) 3nR\u2019aAT instant, the extension of the spring is x meter and Ans. 3) 4nR'oAT (4) 6nR\u2019aAT the speed of the particle is v ms\u2019. On the x-v plane,",
    "options": [
      {
        "number": "1",
        "text": "2nR\u2019oAT"
      },
      {
        "number": "2",
        "text": "3nR\u2019aAT instant, the extension of the spring is x meter and"
      },
      {
        "number": "4",
        "text": "6nR\u2019aAT the speed of the particle is v ms\u2019. On the x-v plane,"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - option text is present in the source question block for this item.",
    "answerOptionText": null,
    "answerSourceText": "Ans. 3) 4nR'oAT (4) 6nR\u2019aAT the speed of the particle is v ms\u2019. On the x-v plane,"
  },
  {
    "id": 29,
    "subject": "Physics",
    "sourcePage": 9,
    "slug": "neet-2026-question-29",
    "questionText": "29. The lens combination as shown in the figure, consists of two lenses, L, and L,, of the focal lengths P, +10 cm and -10 cm, respectively. The position of the image formed is : (1) aval (2) L, L, 0 t 0 t a 30cm 3em 3) (4) (1) 20 cm to the left of the concave lens 0 t 0 t (2) 60 cm to the left of the concave lens (3) 30 cm to the right of the concave lens",
    "rawSourceText": "29. The lens combination as shown in the figure, consists of two lenses, L, and L,, of the focal lengths P, +10 cm and -10 cm, respectively. The position of the image formed is : (1) aval (2) L, L, 0 t 0 t a 30cm 3em 3) (4) (1) 20 cm to the left of the concave lens 0 t 0 t (2) 60 cm to the left of the concave lens Ans. (2) (3) 30 cm to the right of the concave lens",
    "options": [
      {
        "number": "1",
        "text": "aval"
      },
      {
        "number": "2",
        "text": "L, L, 0 t 0 t a 30cm 3em 3)"
      },
      {
        "number": "4",
        "text": "(1) 20 cm to the left of the concave lens 0 t 0 t"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - L, L, 0 t 0 t a 30cm 3em 3)",
    "answerOptionText": "L, L, 0 t 0 t a 30cm 3em 3)",
    "answerSourceText": "Ans. (2) (3) 30 cm to the right of the concave lens"
  },
  {
    "id": 30,
    "subject": "Physics",
    "sourcePage": 9,
    "slug": "neet-2026-question-30",
    "questionText": "30. An ac voltage V=220 sin (2 x 10\u00b0) Volt is applied B and C as shown in the figure, where the to a series LCR circuit. Then the current amplitude magnitudes of the electric fields are E,, F, and E,, in this circuit is : respectively. The points B and C are at the same (Given :-L=10 mH, C= 25uF, R=100 Q) distance from the center of the solid sphere. The (1) 2.2A (2) 5.5 A correct option is : (3) 11.0A (4) 220A",
    "rawSourceText": "30. An ac voltage V=220 sin (2 x 10\u00b0) Volt is applied B and C as shown in the figure, where the to a series LCR circuit. Then the current amplitude magnitudes of the electric fields are E,, F, and E,, in this circuit is : respectively. The points B and C are at the same (Given :-L=10 mH, C= 25uF, R=100 Q) distance from the center of the solid sphere. The (1) 2.2A (2) 5.5 A correct option is : (3) 11.0A (4) 220A Ans. (1)",
    "options": [
      {
        "number": "1",
        "text": "2.2A"
      },
      {
        "number": "2",
        "text": "5.5 A correct option is :"
      },
      {
        "number": "3",
        "text": "11.0A"
      },
      {
        "number": "4",
        "text": "220A"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - 2.2A",
    "answerOptionText": "2.2A",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 31,
    "subject": "Physics",
    "sourcePage": 9,
    "slug": "neet-2026-question-31",
    "questionText": "31. A thin horizontal disc is rotating about a vertical axis Cc B passing through its fixed centre O. Its angular ee -\u2014\u2014-\u20acB)- Te momentum is L, and L, computed about points A and B, respectively, with OB = 2 x OA. The value L, , of Te is: (1) E, = 0, E,=E, \u00ae (2) E, #0, E, = E, (3) E,= 0, E> E, (4) E,#0,E,<E, ---@---------------@ A B",
    "rawSourceText": "31. A thin horizontal disc is rotating about a vertical axis Cc B passing through its fixed centre O. Its angular ee -\u2014\u2014-\u20acB)- Te momentum is L, and L, computed about points A and B, respectively, with OB = 2 x OA. The value L, , of Te is: (1) E, = 0, E,=E, \u00ae (2) E, #0, E, = E, (3) E,= 0, E> E, (4) E,#0,E,<E, ---@---------------@ Ans. (2) A B",
    "options": [
      {
        "number": "1",
        "text": "E, = 0, E,=E, \u00ae"
      },
      {
        "number": "2",
        "text": "E, #0, E, = E,"
      },
      {
        "number": "3",
        "text": "E,= 0, E> E,"
      },
      {
        "number": "4",
        "text": "E,#0,E,<E, ---@---------------@"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - E, #0, E, = E,",
    "answerOptionText": "E, #0, E, = E,",
    "answerSourceText": "Ans. (2) A B"
  },
  {
    "id": 32,
    "subject": "Physics",
    "sourcePage": 9,
    "slug": "neet-2026-question-32",
    "questionText": "32. A conducting loop of finite resistance lies on the x-y gravitational forces). plane. There is a constant magnetic field in the z 3Qq 20q direction. The area of the loop varies with time t, as (1) laze oR (2) la oR A = A, (1 + sin t) in appropriate units. The figure \u00b0 \u00b0 that correctly indicates the qualitative behaviour of (3) | Qq (4) Qq the power P dissipated in the loop as a function of 3ne, mR 4xe, mR time is : PHYSICS | NEET 2026 Questions with Answers PHYSICS page 6",
    "rawSourceText": "32. A conducting loop of finite resistance lies on the x-y gravitational forces). plane. There is a constant magnetic field in the z 3Qq 20q direction. The area of the loop varies with time t, as (1) laze oR (2) la oR A = A, (1 + sin t) in appropriate units. The figure \u00b0 \u00b0 that correctly indicates the qualitative behaviour of (3) | Qq (4) Qq the power P dissipated in the loop as a function of 3ne, mR 4xe, mR time is : Ans. (3) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 6",
    "options": [
      {
        "number": "1",
        "text": "laze oR"
      },
      {
        "number": "2",
        "text": "la oR A = A, (1 + sin t) in appropriate units. The figure \u00b0 \u00b0 that correctly indicates the qualitative behaviour of"
      },
      {
        "number": "3",
        "text": "| Qq"
      },
      {
        "number": "4",
        "text": "Qq the power P dissipated in the loop as a function of 3ne, mR 4xe, mR time is :"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - | Qq",
    "answerOptionText": "| Qq",
    "answerSourceText": "Ans. (3) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 6"
  },
  {
    "id": 33,
    "subject": "Physics",
    "sourcePage": 9,
    "slug": "neet-2026-question-33",
    "questionText": "33. A point ch is placed insid ity withi (4) 60 cm to the right of the concave lens . point charge Q is placed inside a cavity within a solid isolated conducting sphere. Consider points A,",
    "rawSourceText": "33. A point ch is placed insid ity withi (4) 60 cm to the right of the concave lens . point charge Q is placed inside a cavity within a Ans. (2) solid isolated conducting sphere. Consider points A,",
    "options": [
      {
        "number": "4",
        "text": "60 cm to the right of the concave lens . point charge Q is placed inside a cavity within a"
      },
      {
        "number": "2",
        "text": "solid isolated conducting sphere. Consider points A,"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - solid isolated conducting sphere. Consider points A,",
    "answerOptionText": "solid isolated conducting sphere. Consider points A,",
    "answerSourceText": "Ans. (2) solid isolated conducting sphere. Consider points A,"
  },
  {
    "id": 34,
    "subject": "Physics",
    "sourcePage": 9,
    "slug": "neet-2026-question-34",
    "questionText": "34. Consider a fixed uniformly charged insulating sphere with radius R and total charge +Q. A point charge -q (q<<Q) with mass m is released from rest (1) 1 (2) 1 at a distance of 3R from the centre of the charged 4 2 sphere. when the point charge reaches the surface (3) 1 (4) 2 of the sphere, its speed is : (e, is the permittivity of vacuum, neglect",
    "rawSourceText": "34. Consider a fixed uniformly charged insulating sphere with radius R and total charge +Q. A point charge -q (q<<Q) with mass m is released from rest (1) 1 (2) 1 at a distance of 3R from the centre of the charged 4 2 sphere. when the point charge reaches the surface (3) 1 (4) 2 of the sphere, its speed is : Ans. (3) (e, is the permittivity of vacuum, neglect",
    "options": [
      {
        "number": "2",
        "text": "1 at a distance of 3R from the centre of the charged 4 2 sphere. when the point charge reaches the surface"
      },
      {
        "number": "4",
        "text": "2 of the sphere, its speed is :"
      },
      {
        "number": "3",
        "text": "(e, is the permittivity of vacuum, neglect"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - (e, is the permittivity of vacuum, neglect",
    "answerOptionText": "(e, is the permittivity of vacuum, neglect",
    "answerSourceText": "Ans. (3) (e, is the permittivity of vacuum, neglect"
  },
  {
    "id": 35,
    "subject": "Physics",
    "sourcePage": 10,
    "slug": "neet-2026-question-35",
    "questionText": "35. In Geiger-Marsden experiment, the number of temperature, the resistance of the two resistors is scattered a-particles N(6) is plotted as a function of R,. As the temperature is increased, the correct scattering angle",
    "rawSourceText": "35. In Geiger-Marsden experiment, the number of temperature, the resistance of the two resistors is scattered a-particles N(6) is plotted as a function of R,. As the temperature is increased, the correct scattering angle",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 36,
    "subject": "Physics",
    "sourcePage": 10,
    "slug": "neet-2026-question-36",
    "questionText": "36. Consider two circuits, (A) and (B), each having two ; - speed of the electromagnetic wave inside the resistors. One of them has a positive temperature i medium fficient of resist hile the oth coefficient of resistance, +a, while the other one (4) The direction of propagation of the has a negative temperature of coefficient, \u2014 a, as . F electromagnetic wave is along +z shown in the figure. The current through these A (2,3) circuits are denoted by [, and |. At initial , PHYSICS | NEET 2026 Questions with Answers PHYSICS page 7",
    "rawSourceText": "36. Consider two circuits, (A) and (B), each having two ; - speed of the electromagnetic wave inside the resistors. One of them has a positive temperature i medium fficient of resist hile the oth coefficient of resistance, +a, while the other one (4) The direction of propagation of the has a negative temperature of coefficient, \u2014 a, as . F electromagnetic wave is along +z shown in the figure. The current through these A (2,3) circuits are denoted by [, and |. At initial , PHYSICS | NEET 2026 Questions with Answers PHYSICS page 7",
    "options": [
      {
        "number": "4",
        "text": "The direction of propagation of the has a negative temperature of coefficient, \u2014 a, as . F electromagnetic wave is along +z shown in the figure. The current through these A (2,3) circuits are denoted by [, and |. At initial , PHYSICS | NEET 2026 Questions with Answers PHYSICS page 7"
      }
    ],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 37,
    "subject": "Physics",
    "sourcePage": 10,
    "slug": "neet-2026-question-37",
    "questionText": "37. Consider that o,, k,, b represent Stefan-Boltzmann constant, Boltzmann constant and Wien's displacement law constant, respectively. The Ne) dimension of o,k,\" b is : w (1) oTK| (2) (LK) 1 (3) (L\"T\"K*] (4) (L\"T'K4] 10\u00b0 1 (3) 1",
    "rawSourceText": "37. Consider that o,, k,, b represent Stefan-Boltzmann constant, Boltzmann constant and Wien's displacement law constant, respectively. The Ne) dimension of o,k,\" b is : w (1) oTK| (2) (LK) 1 (3) (L\"T\"K*] (4) (L\"T'K4] 10\u00b0 1 Ans. (1) (3) 1",
    "options": [
      {
        "number": "1",
        "text": "oTK|"
      },
      {
        "number": "2",
        "text": "(LK) 1"
      },
      {
        "number": "3",
        "text": "(L\"T\"K*]"
      },
      {
        "number": "4",
        "text": "(L\"T'K4] 10\u00b0 1"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - oTK|",
    "answerOptionText": "oTK|",
    "answerSourceText": "Ans. (1) (3) 1"
  },
  {
    "id": 38,
    "subject": "Physics",
    "sourcePage": 10,
    "slug": "neet-2026-question-38",
    "questionText": "38. An electromagnetic wave travelling in a lossless 2 Olin degree) dielectric medium having a dielectric constant \u20ac, = 9, 030 \"60 90 120 150 180 8 erty has the electric field, E, = E, sin (kz \u2014 2x x 10%) Vr\" where E, is the amplitude and k is the wave vector. Ni) Among the following options, the incorrect choice 10\" is : \u2018 (1) The speed of the electromagnetic wave inside 1 the medium is 10\u00b0 ms* 10\u00b0 (2) The wavelength of the electromagnetic wave (4) 10\u00b0 atin degree) inside the medium is 300 m \u00b0 30 609 120 150180 (3) The magnetic field is given by the relation B, = Bo sin (ke -2nx10F t) where v is the v",
    "rawSourceText": "38. An electromagnetic wave travelling in a lossless 2 Olin degree) dielectric medium having a dielectric constant \u20ac, = 9, 030 \"60 90 120 150 180 8 erty has the electric field, E, = E, sin (kz \u2014 2x x 10%) Vr\" where E, is the amplitude and k is the wave vector. Ni) Among the following options, the incorrect choice 10\" is : \u2018 (1) The speed of the electromagnetic wave inside 1 the medium is 10\u00b0 ms* 10\u00b0 (2) The wavelength of the electromagnetic wave (4) 10\u00b0 atin degree) inside the medium is 300 m \u00b0 30 609 120 150180 (3) The magnetic field is given by the relation Ans. (3) B, = Bo sin (ke -2nx10F t) where v is the v",
    "options": [
      {
        "number": "1",
        "text": "The speed of the electromagnetic wave inside 1 the medium is 10\u00b0 ms* 10\u00b0"
      },
      {
        "number": "2",
        "text": "The wavelength of the electromagnetic wave"
      },
      {
        "number": "4",
        "text": "10\u00b0 atin degree) inside the medium is 300 m \u00b0 30 609 120 150180"
      },
      {
        "number": "3",
        "text": "The magnetic field is given by the relation"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - The magnetic field is given by the relation",
    "answerOptionText": "The magnetic field is given by the relation",
    "answerSourceText": "Ans. (3) B, = Bo sin (ke -2nx10F t) where v is the v"
  },
  {
    "id": 39,
    "subject": "Physics",
    "sourcePage": 11,
    "slug": "neet-2026-question-39",
    "questionText": "39. One mole of an ideal monatomic gas undergoes a |",
    "rawSourceText": "39. One mole of an ideal monatomic gas undergoes a |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 40,
    "subject": "Physics",
    "sourcePage": 11,
    "slug": "neet-2026-question-40",
    "questionText": "40. Consider that an electron is revolving in an excited (1) W, > W, > W, (2) W, = W, > W, state of Hydrogen atom with velocity (3) W, > W, > W, (4) W, > W, = W, /25.610\u00b0 ms. The radius of the orbit is x x10\u00b0 | m. The value of x is :",
    "rawSourceText": "40. Consider that an electron is revolving in an excited (1) W, > W, > W, (2) W, = W, > W, state of Hydrogen atom with velocity (3) W, > W, > W, (4) W, > W, = W, /25.610\u00b0 ms. The radius of the orbit is x x10\u00b0 | Ans. (3) m. The value of x is :",
    "options": [
      {
        "number": "1",
        "text": "W, > W, > W,"
      },
      {
        "number": "2",
        "text": "W, = W, > W, state of Hydrogen atom with velocity"
      },
      {
        "number": "3",
        "text": "W, > W, > W,"
      },
      {
        "number": "4",
        "text": "W, > W, = W, /25.610\u00b0 ms. The radius of the orbit is x x10\u00b0 |"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - W, > W, > W,",
    "answerOptionText": "W, > W, > W,",
    "answerSourceText": "Ans. (3) m. The value of x is :"
  },
  {
    "id": 41,
    "subject": "Physics",
    "sourcePage": 11,
    "slug": "neet-2026-question-41",
    "questionText": "41. A car travels on a circular racetrack of radius 50 m, For warming the which is banked at an angle",
    "rawSourceText": "41. A car travels on a circular racetrack of radius 50 m, For warming the which is banked at an angle",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 42,
    "subject": "Physics",
    "sourcePage": 11,
    "slug": "neet-2026-question-42",
    "questionText": "42. Three identical pn junction diodes D,, D, and D, cyclic process as shown in the figure. The total heat are connected across a battery as shown in the supplied to the gas is : figure. If the width of the depletion regions of D,, D, Pf ND and D, are W,, W, and W,, respectively, then the m correct option is : 300 a b 100 d c > 2 5 vim\u2019) Pb (1) 400 J (2) 500 J <] (3) 600 J (4) 800 J 5V",
    "rawSourceText": "42. Three identical pn junction diodes D,, D, and D, cyclic process as shown in the figure. The total heat are connected across a battery as shown in the supplied to the gas is : figure. If the width of the depletion regions of D,, D, Pf ND and D, are W,, W, and W,, respectively, then the m correct option is : 300 a b 100 d c > 2 5 vim\u2019) Pb (1) 400 J (2) 500 J <] (3) 600 J (4) 800 J Ans. (3) 5V",
    "options": [
      {
        "number": "1",
        "text": "400 J"
      },
      {
        "number": "2",
        "text": "500 J <]"
      },
      {
        "number": "3",
        "text": "600 J"
      },
      {
        "number": "4",
        "text": "800 J"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - 600 J",
    "answerOptionText": "600 J",
    "answerSourceText": "Ans. (3) 5V"
  },
  {
    "id": 43,
    "subject": "Physics",
    "sourcePage": 11,
    "slug": "neet-2026-question-43",
    "questionText": "43. The following table presents the part of the (Take the mass of electron to be 9 x 10\u201d kg, electromagnetic spectrum and their corresponding charge of electron = - 1.6 x 10\u201d C and major applications. 7 =9x10Nm\u2019 C4 Part of the \u2122Eo electromagnetic Applications (1)4 (2) 3 spectrum (3)2 (4) 1 Mi For purifying the icrowave water",
    "rawSourceText": "43. The following table presents the part of the (Take the mass of electron to be 9 x 10\u201d kg, electromagnetic spectrum and their corresponding charge of electron = - 1.6 x 10\u201d C and major applications. 7 =9x10Nm\u2019 C4 Part of the \u2122Eo electromagnetic Applications (1)4 (2) 3 spectrum (3)2 (4) 1 Mi For purifying the icrowave Ans. (4) water",
    "options": [
      {
        "number": "2",
        "text": "3 spectrum (3)2"
      },
      {
        "number": "4",
        "text": "1 Mi For purifying the icrowave"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - 1 Mi For purifying the icrowave",
    "answerOptionText": "1 Mi For purifying the icrowave",
    "answerSourceText": "Ans. (4) water"
  },
  {
    "id": 44,
    "subject": "Physics",
    "sourcePage": 12,
    "slug": "neet-2026-question-44",
    "questionText": "44. Bob B of mass m at rest is hanging vertically from |",
    "rawSourceText": "44. Bob B of mass m at rest is hanging vertically from |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 45,
    "subject": "Physics",
    "sourcePage": 12,
    "slug": "neet-2026-question-45",
    "questionText": "45. An ideal gas is made of polyatomic molecules. Each the ceiling via a massless string of length 10 m, as of the molecules has three translational, three shown in the figure. Point mass A of mass m rotational and f number of vibrational modes. If the travelling horizontally with speed 10 ms\u201d hits bob B ratio of heat capacities C,/C, of the gas is 8/7, elastically. The bob B rises h meter after the then the value of fis : collision. Taking the acceleration due to gravity (1)4 (2) 3 g = 10 ms\u201d and neglecting the size of the bob, the (3) 3 (4) 1 value of h is : ml 10 ms* (1)8 (2)7 (3)5 (4) 2.5 PHYSICS | NEET 2026 Questions with Answers PHYSICS page 9",
    "rawSourceText": "45. An ideal gas is made of polyatomic molecules. Each the ceiling via a massless string of length 10 m, as of the molecules has three translational, three shown in the figure. Point mass A of mass m rotational and f number of vibrational modes. If the travelling horizontally with speed 10 ms\u201d hits bob B ratio of heat capacities C,/C, of the gas is 8/7, elastically. The bob B rises h meter after the then the value of fis : collision. Taking the acceleration due to gravity (1)4 (2) 3 g = 10 ms\u201d and neglecting the size of the bob, the (3) 3 (4) 1 value of h is : Ans. (1) ml 10 ms* (1)8 (2)7 (3)5 (4) 2.5 Ans. (3) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 9",
    "options": [
      {
        "number": "2",
        "text": "3 g = 10 ms\u201d and neglecting the size of the bob, the"
      },
      {
        "number": "4",
        "text": "1 value of h is :"
      },
      {
        "number": "1",
        "text": "ml 10 ms* (1)8 (2)7 (3)5"
      },
      {
        "number": "3",
        "text": "PHYSICS | NEET 2026 Questions with Answers PHYSICS page 9"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - PHYSICS | NEET 2026 Questions with Answers PHYSICS page 9",
    "answerOptionText": "PHYSICS | NEET 2026 Questions with Answers PHYSICS page 9",
    "answerSourceText": "Ans. (3) PHYSICS | NEET 2026 Questions with Answers PHYSICS page 9"
  },
  {
    "id": 46,
    "subject": "Chemistry",
    "sourcePage": 14,
    "slug": "neet-2026-question-46",
    "questionText": "46. For the following reaction sequence, choose the |",
    "rawSourceText": "46. For the following reaction sequence, choose the |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 47,
    "subject": "Chemistry",
    "sourcePage": 14,
    "slug": "neet-2026-question-47",
    "questionText": "47. Given below are two statements: intramolecular hydrogen bonds. Statement-I : [Fe(ox),]\u201d is chiral. Statement-II : trans-{Cr(H,O),{ox),J is chiral.",
    "rawSourceText": "47. Given below are two statements: intramolecular hydrogen bonds. Statement-I : [Fe(ox),]\u201d is chiral. Ans. (3) Statement-II : trans-{Cr(H,O),{ox),J is chiral.",
    "options": [
      {
        "number": "3",
        "text": "Statement-II : trans-{Cr(H,O),{ox),J is chiral."
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Statement-II : trans-{Cr(H,O),{ox),J is chiral.",
    "answerOptionText": "Statement-II : trans-{Cr(H,O),{ox),J is chiral.",
    "answerSourceText": "Ans. (3) Statement-II : trans-{Cr(H,O),{ox),J is chiral."
  },
  {
    "id": 48,
    "subject": "Chemistry",
    "sourcePage": 14,
    "slug": "neet-2026-question-48",
    "questionText": "48. The following carbocation is stabilized by the aa interaction of the empty p orbital with Zn(O), 1.0 x10\" \u00ae Hg,Cl, 13x10\" CH, (1) Hg,Cl, > Zn(OH), > AgBr (1) filled o and filled x orbitals (2) AgBr > Zn(OH), > Hg,Cl, (2) empty o and empty x* orbitals (3) Hg,Cl, > AgBr > Zn(OH), (3) empty o* and filled x orbitals (4) empty o* and empty n* orbitals (4) Zn(OH), > AgBr > Hg,Cl, CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 1",
    "rawSourceText": "48. The following carbocation is stabilized by the aa interaction of the empty p orbital with Zn(O), 1.0 x10\" \u00ae Hg,Cl, 13x10\" CH, (1) Hg,Cl, > Zn(OH), > AgBr (1) filled o and filled x orbitals (2) AgBr > Zn(OH), > Hg,Cl, (2) empty o and empty x* orbitals (3) Hg,Cl, > AgBr > Zn(OH), (3) empty o* and filled x orbitals (4) empty o* and empty n* orbitals (4) Zn(OH), > AgBr > Hg,Cl, Ans. (1) Ans. (4) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 1",
    "options": [
      {
        "number": "1",
        "text": "Hg,Cl, > Zn(OH), > AgBr"
      },
      {
        "number": "2",
        "text": "AgBr > Zn(OH), > Hg,Cl,"
      },
      {
        "number": "3",
        "text": "Hg,Cl, > AgBr > Zn(OH),"
      },
      {
        "number": "4",
        "text": "empty o* and empty n* orbitals"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - empty o* and empty n* orbitals",
    "answerOptionText": "empty o* and empty n* orbitals",
    "answerSourceText": "Ans. (4) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 1"
  },
  {
    "id": 49,
    "subject": "Chemistry",
    "sourcePage": 14,
    "slug": "neet-2026-question-49",
    "questionText": "49. In potash alum, the ratio of K* and soz ions is correct option (1) 1:2 (2) 2:1 O i. CH,COCI, AICI, (3) 2:3 (4) 3:2 \u2014\u2014\u2014> P+Q ii, NaOCl (1) If P is the sodium salt of a carboxylic acid, Q is",
    "rawSourceText": "49. In potash alum, the ratio of K* and soz ions is correct option (1) 1:2 (2) 2:1 O i. CH,COCI, AICI, (3) 2:3 (4) 3:2 \u2014\u2014\u2014> P+Q ii, NaOCl Ans. (1) (1) If P is the sodium salt of a carboxylic acid, Q is",
    "options": [
      {
        "number": "1",
        "text": "1:2"
      },
      {
        "number": "2",
        "text": "2:1 O i. CH,COCI, AICI,"
      },
      {
        "number": "3",
        "text": "2:3"
      },
      {
        "number": "4",
        "text": "3:2 \u2014\u2014\u2014> P+Q ii, NaOCl"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - 1:2",
    "answerOptionText": "1:2",
    "answerSourceText": "Ans. (1) (1) If P is the sodium salt of a carboxylic acid, Q is"
  },
  {
    "id": 50,
    "subject": "Chemistry",
    "sourcePage": 14,
    "slug": "neet-2026-question-50",
    "questionText": "50. The correct statement about peptides and proteins is a primary alcohol. (1) Tertiary structure of proteins has two or more (2) P.and Q are aromatic compounds. polypeptide subunits (3) If P gives a carboxylic acid on acidification, Q (2) Only the proteins having a quaternary structure gives a poisonous gas on exposure to air and are biologically active. light. (3) In B-pleated sheet structures, peptide chains are (4) Both P and Q are carbonyl compounds. held together by intermolecular hydrogen bonds. (4) In a-helices, the polypeptide chain is twisted . into a left-handed screw (helix) through",
    "rawSourceText": "50. The correct statement about peptides and proteins is a primary alcohol. (1) Tertiary structure of proteins has two or more (2) P.and Q are aromatic compounds. polypeptide subunits (3) If P gives a carboxylic acid on acidification, Q (2) Only the proteins having a quaternary structure gives a poisonous gas on exposure to air and are biologically active. light. (3) In B-pleated sheet structures, peptide chains are (4) Both P and Q are carbonyl compounds. held together by intermolecular hydrogen bonds. Ans. (3) (4) In a-helices, the polypeptide chain is twisted . into a left-handed screw (helix) through",
    "options": [
      {
        "number": "1",
        "text": "Tertiary structure of proteins has two or more"
      },
      {
        "number": "2",
        "text": "P.and Q are aromatic compounds. polypeptide subunits"
      },
      {
        "number": "3",
        "text": "If P gives a carboxylic acid on acidification, Q"
      },
      {
        "number": "4",
        "text": "Both P and Q are carbonyl compounds. held together by intermolecular hydrogen bonds."
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - If P gives a carboxylic acid on acidification, Q",
    "answerOptionText": "If P gives a carboxylic acid on acidification, Q",
    "answerSourceText": "Ans. (3) (4) In a-helices, the polypeptide chain is twisted . into a left-handed screw (helix) through"
  },
  {
    "id": 51,
    "subject": "Chemistry",
    "sourcePage": 14,
    "slug": "neet-2026-question-51",
    "questionText": "51. The numbers 17.0145 and 21.0235 were rounded (Given : oxH, = HOOC - COOH) to three figures after the decimal point. The In light of the above statements, choose the most resulting numbers, respectively, are appropriate answer from the options given (1) 17.014 and 21.023 (2) 17.015 and 21.023 below: (3) 17.014 and 21.024 (1) Both Statement-I and Statement-II are correct. (4) 17.015 and 21.024 (2) Both Statement-I and Statement-II are incorrect. (3) Statement+l is comect but Statement] is incorrect",
    "rawSourceText": "51. The numbers 17.0145 and 21.0235 were rounded (Given : oxH, = HOOC - COOH) to three figures after the decimal point. The In light of the above statements, choose the most resulting numbers, respectively, are appropriate answer from the options given (1) 17.014 and 21.023 (2) 17.015 and 21.023 below: (3) 17.014 and 21.024 (1) Both Statement-I and Statement-II are correct. (4) 17.015 and 21.024 (2) Both Statement-I and Statement-II are incorrect. Ans. (3) (3) Statement+l is comect but Statement] is incorrect",
    "options": [
      {
        "number": "1",
        "text": "17.014 and 21.023"
      },
      {
        "number": "2",
        "text": "17.015 and 21.023 below:"
      },
      {
        "number": "3",
        "text": "17.014 and 21.024"
      },
      {
        "number": "4",
        "text": "17.015 and 21.024"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - 17.014 and 21.024",
    "answerOptionText": "17.014 and 21.024",
    "answerSourceText": "Ans. (3) (3) Statement+l is comect but Statement] is incorrect"
  },
  {
    "id": 52,
    "subject": "Chemistry",
    "sourcePage": 14,
    "slug": "neet-2026-question-52",
    "questionText": "52. The correct order of solubility of the given salts in (4) Statement-l is incorrect but Statement-II is correct. water at 298 K is Ans: @) AgB 50x10\"",
    "rawSourceText": "52. The correct order of solubility of the given salts in (4) Statement-l is incorrect but Statement-II is correct. water at 298 K is Ans: @) AgB 50x10\"",
    "options": [
      {
        "number": "4",
        "text": "Statement-l is incorrect but Statement-II is correct. water at 298 K is Ans: @) AgB 50x10\""
      }
    ],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 53,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-53",
    "questionText": "Question 53 source text could not be isolated cleanly from the embedded PDF text layer. Review the source-page excerpt for crawlable context.",
    "rawSourceText": "93. Among the following options, the correct trend in | 97. [nan acidic medium, 10 mL otf 0.25 M oxalic acid is the electron gain enthalpy is titrated with KmnO, solution. If the volume of (1) F>Cl>Br>1 KMnO, solution required to reach end point is (2) Br> Cl>F>I 10 mL, the strength of the KMnO, solution is (3) Cl>F>Br>1 (1) 0.10 M (4) [> Br>Cl>F (2) 0.20 M Ans. (3) (3) 0.25 M 54. Assertion A: (4)0.15M For an ideal solution formed by mixing liquids P and Ans. (1) QA, H =O and A, V=0 58. According to crystal field theory, the correct order Reason R: of ligands with respect to their decreasing order of No interactions occur between P and Q field strength is In the light of the above statements, choose the (1) CO > NH, > H,0 > CI most appropriate answer from the options given (2) CO > H,O > NH, > CI below. (3) Cl > H,O > NH, > CO (1) Both A and R are correct and R is the correct (4) Cr > NH, > H,O > CO explanation of A Ans. (1) (2) Both A and R are correct but R is NOT the 59. Two moles of an ideal gas undergo free expansion correct explanation of A from 10 L to 100 L at 300 K. The values of AS. (3) Ais correct but R is not correct and AS... ouning4e (R is universal gas constant) (4) Ais not correct but R is correct (1) AS soy = O: ASgroang = 0 Ans. (3) (2) AS sytem = 4-606R; AS s.a.undngs = \u20144-606R 55. The amino acid that gives a red-blood colour on treating its sodium fusion extract with sodium (3) AS sion = O5 AS ssranings = 4-606 R nitroprusside is (4) AS gem = 4-606R; AS. ounangs = 0 (1) leucine (2) threonine Ans. (4) (3) methionine (4) serine k | . Ans. (3) 60. 2A\u2014*->B isa zero-order reaction, where k = 1.0 mol L\" min\u201d. If the initial concentration of 56. The strandard electrode potential (E\u00b0) for the half- A is 2M, then the time taken to complete 75% of cell reaction Fe* + e\u00b0 > Fe\u201d at 298 K is the reaction will be (Given : E(Fe*/Fe) = -0.04 V and (1) 1.5 min E\u00b0(Fe\u2019*/Fe) = -0.44 V at 298 K) (2) 0.75 min (1) +0.40 V (2) +0.76 V (3) 1.0 min (3) -0.48 V (4) +0.92 V\u2026",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 54,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-54",
    "questionText": "54. Assertion A: (4)0.15M For an ideal solution formed by mixing liquids P and QA, H =O and A, V=0",
    "rawSourceText": "54. Assertion A: (4)0.15M For an ideal solution formed by mixing liquids P and Ans. (1) QA, H =O and A, V=0",
    "options": [
      {
        "number": "4",
        "text": "0.15M For an ideal solution formed by mixing liquids P and"
      },
      {
        "number": "1",
        "text": "QA, H =O and A, V=0"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - QA, H =O and A, V=0",
    "answerOptionText": "QA, H =O and A, V=0",
    "answerSourceText": "Ans. (1) QA, H =O and A, V=0"
  },
  {
    "id": 55,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-55",
    "questionText": "55. The amino acid that gives a red-blood colour on treating its sodium fusion extract with sodium (3) AS sion = O5 AS ssranings = 4-606 R nitroprusside is (4) AS gem = 4-606R; AS. ounangs = 0 (1) leucine (2) threonine (3) methionine (4) serine k | .",
    "rawSourceText": "55. The amino acid that gives a red-blood colour on treating its sodium fusion extract with sodium (3) AS sion = O5 AS ssranings = 4-606 R nitroprusside is (4) AS gem = 4-606R; AS. ounangs = 0 (1) leucine (2) threonine Ans. (4) (3) methionine (4) serine k | . Ans. (3)",
    "options": [
      {
        "number": "3",
        "text": "AS sion = O5 AS ssranings = 4-606 R nitroprusside is"
      },
      {
        "number": "4",
        "text": "AS gem = 4-606R; AS. ounangs = 0"
      },
      {
        "number": "1",
        "text": "leucine"
      },
      {
        "number": "2",
        "text": "threonine"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - AS sion = O5 AS ssranings = 4-606 R nitroprusside is",
    "answerOptionText": "AS sion = O5 AS ssranings = 4-606 R nitroprusside is",
    "answerSourceText": "Ans. (3)"
  },
  {
    "id": 56,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-56",
    "questionText": "56. The strandard electrode potential (E\u00b0) for the half- A is 2M, then the time taken to complete 75% of cell reaction Fe* + e\u00b0 > Fe\u201d at 298 K is the reaction will be (Given : E(Fe*/Fe) = -0.04 V and (1) 1.5 min E\u00b0(Fe\u2019*/Fe) = -0.44 V at 298 K) (2) 0.75 min (1) +0.40 V (2) +0.76 V (3) 1.0 min (3) -0.48 V (4) +0.92 V (4) 2.0 min CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 2",
    "rawSourceText": "56. The strandard electrode potential (E\u00b0) for the half- A is 2M, then the time taken to complete 75% of cell reaction Fe* + e\u00b0 > Fe\u201d at 298 K is the reaction will be (Given : E(Fe*/Fe) = -0.04 V and (1) 1.5 min E\u00b0(Fe\u2019*/Fe) = -0.44 V at 298 K) (2) 0.75 min (1) +0.40 V (2) +0.76 V (3) 1.0 min (3) -0.48 V (4) +0.92 V (4) 2.0 min Ans. (2) Ans. (2) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 2",
    "options": [
      {
        "number": "1",
        "text": "1.5 min E\u00b0(Fe\u2019*/Fe) = -0.44 V at 298 K)"
      },
      {
        "number": "2",
        "text": "0.75 min"
      },
      {
        "number": "3",
        "text": "1.0 min"
      },
      {
        "number": "4",
        "text": "+0.92 V"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - 0.75 min",
    "answerOptionText": "0.75 min",
    "answerSourceText": "Ans. (2) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 2"
  },
  {
    "id": 57,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-57",
    "questionText": "Question 57 source text could not be isolated cleanly from the embedded PDF text layer. Review the source-page excerpt for crawlable context.",
    "rawSourceText": "93. Among the following options, the correct trend in | 97. [nan acidic medium, 10 mL otf 0.25 M oxalic acid is the electron gain enthalpy is titrated with KmnO, solution. If the volume of (1) F>Cl>Br>1 KMnO, solution required to reach end point is (2) Br> Cl>F>I 10 mL, the strength of the KMnO, solution is (3) Cl>F>Br>1 (1) 0.10 M (4) [> Br>Cl>F (2) 0.20 M Ans. (3) (3) 0.25 M 54. Assertion A: (4)0.15M For an ideal solution formed by mixing liquids P and Ans. (1) QA, H =O and A, V=0 58. According to crystal field theory, the correct order Reason R: of ligands with respect to their decreasing order of No interactions occur between P and Q field strength is In the light of the above statements, choose the (1) CO > NH, > H,0 > CI most appropriate answer from the options given (2) CO > H,O > NH, > CI below. (3) Cl > H,O > NH, > CO (1) Both A and R are correct and R is the correct (4) Cr > NH, > H,O > CO explanation of A Ans. (1) (2) Both A and R are correct but R is NOT the 59. Two moles of an ideal gas undergo free expansion correct explanation of A from 10 L to 100 L at 300 K. The values of AS. (3) Ais correct but R is not correct and AS... ouning4e (R is universal gas constant) (4) Ais not correct but R is correct (1) AS soy = O: ASgroang = 0 Ans. (3) (2) AS sytem = 4-606R; AS s.a.undngs = \u20144-606R 55. The amino acid that gives a red-blood colour on treating its sodium fusion extract with sodium (3) AS sion = O5 AS ssranings = 4-606 R nitroprusside is (4) AS gem = 4-606R; AS. ounangs = 0 (1) leucine (2) threonine Ans. (4) (3) methionine (4) serine k | . Ans. (3) 60. 2A\u2014*->B isa zero-order reaction, where k = 1.0 mol L\" min\u201d. If the initial concentration of 56. The strandard electrode potential (E\u00b0) for the half- A is 2M, then the time taken to complete 75% of cell reaction Fe* + e\u00b0 > Fe\u201d at 298 K is the reaction will be (Given : E(Fe*/Fe) = -0.04 V and (1) 1.5 min E\u00b0(Fe\u2019*/Fe) = -0.44 V at 298 K) (2) 0.75 min (1) +0.40 V (2) +0.76 V (3) 1.0 min (3) -0.48 V (4) +0.92 V\u2026",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 58,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-58",
    "questionText": "58. According to crystal field theory, the correct order Reason R: of ligands with respect to their decreasing order of No interactions occur between P and Q field strength is In the light of the above statements, choose the (1) CO > NH, > H,0 > CI most appropriate answer from the options given (2) CO > H,O > NH, > CI below. (3) Cl > H,O > NH, > CO (1) Both A and R are correct and R is the correct (4) Cr > NH, > H,O > CO explanation of A (2) Both A and R are correct but R is NOT the",
    "rawSourceText": "58. According to crystal field theory, the correct order Reason R: of ligands with respect to their decreasing order of No interactions occur between P and Q field strength is In the light of the above statements, choose the (1) CO > NH, > H,0 > CI most appropriate answer from the options given (2) CO > H,O > NH, > CI below. (3) Cl > H,O > NH, > CO (1) Both A and R are correct and R is the correct (4) Cr > NH, > H,O > CO explanation of A Ans. (1) (2) Both A and R are correct but R is NOT the",
    "options": [
      {
        "number": "1",
        "text": "CO > NH, > H,0 > CI most appropriate answer from the options given"
      },
      {
        "number": "2",
        "text": "CO > H,O > NH, > CI below."
      },
      {
        "number": "3",
        "text": "Cl > H,O > NH, > CO"
      },
      {
        "number": "4",
        "text": "Cr > NH, > H,O > CO explanation of A"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - CO > NH, > H,0 > CI most appropriate answer from the options given",
    "answerOptionText": "CO > NH, > H,0 > CI most appropriate answer from the options given",
    "answerSourceText": "Ans. (1) (2) Both A and R are correct but R is NOT the"
  },
  {
    "id": 59,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-59",
    "questionText": "59. Two moles of an ideal gas undergo free expansion correct explanation of A from 10 L to 100 L at 300 K. The values of AS. (3) Ais correct but R is not correct and AS... ouning4e (R is universal gas constant) (4) Ais not correct but R is correct (1) AS soy = O: ASgroang = 0 (2) AS sytem = 4-606R; AS s.a.undngs = \u20144-606R",
    "rawSourceText": "59. Two moles of an ideal gas undergo free expansion correct explanation of A from 10 L to 100 L at 300 K. The values of AS. (3) Ais correct but R is not correct and AS... ouning4e (R is universal gas constant) (4) Ais not correct but R is correct (1) AS soy = O: ASgroang = 0 Ans. (3) (2) AS sytem = 4-606R; AS s.a.undngs = \u20144-606R",
    "options": [
      {
        "number": "3",
        "text": "Ais correct but R is not correct and AS... ouning4e (R is universal gas constant)"
      },
      {
        "number": "4",
        "text": "Ais not correct but R is correct"
      },
      {
        "number": "1",
        "text": "AS soy = O: ASgroang = 0"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Ais correct but R is not correct and AS... ouning4e (R is universal gas constant)",
    "answerOptionText": "Ais correct but R is not correct and AS... ouning4e (R is universal gas constant)",
    "answerSourceText": "Ans. (3) (2) AS sytem = 4-606R; AS s.a.undngs = \u20144-606R"
  },
  {
    "id": 60,
    "subject": "Chemistry",
    "sourcePage": 15,
    "slug": "neet-2026-question-60",
    "questionText": "60. 2A\u2014*->B isa zero-order reaction, where k = 1.0 mol L\" min\u201d. If the initial concentration of",
    "rawSourceText": "60. 2A\u2014*->B isa zero-order reaction, where k = 1.0 mol L\" min\u201d. If the initial concentration of",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 61,
    "subject": "Chemistry",
    "sourcePage": 16,
    "slug": "neet-2026-question-61",
    "questionText": "61. Given below are two statements : one is labelled as (Given Aye =74.0 S cm\u2019 mol ) Assertion A and the other is labelled as Reason R. (1) 80.0 (2) 100.0 Assertion A : Generally,3d transition metals have (3) 90.0 (4) 76.0 high melting points. Reason R : Involvement of 3d-electrons in addition",
    "rawSourceText": "61. Given below are two statements : one is labelled as (Given Aye =74.0 S cm\u2019 mol ) Assertion A and the other is labelled as Reason R. (1) 80.0 (2) 100.0 Assertion A : Generally,3d transition metals have (3) 90.0 (4) 76.0 high melting points. Ans. (1) Reason R : Involvement of 3d-electrons in addition",
    "options": [
      {
        "number": "1",
        "text": "80.0"
      },
      {
        "number": "2",
        "text": "100.0 Assertion A : Generally,3d transition metals have"
      },
      {
        "number": "3",
        "text": "90.0"
      },
      {
        "number": "4",
        "text": "76.0 high melting points."
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - 80.0",
    "answerOptionText": "80.0",
    "answerSourceText": "Ans. (1) Reason R : Involvement of 3d-electrons in addition"
  },
  {
    "id": 62,
    "subject": "Chemistry",
    "sourcePage": 16,
    "slug": "neet-2026-question-62",
    "questionText": "62. Fora salt XY, which is a strong electrolyte, the plot of 2 \u2018A,, versus 4c has a slope of -90.0 S cm? mol*? L'\u201d > 1/T . If the energy of activation is 6.64 kJ mol\u2019 and t 298 K. At 0.01 M trati f XY, th a concentration vine R = 8.3 J K' mol\", the temperature at which the values of A,, is 145.S cm\u2019 mol\". The limiting molar rate constant becomes e\u201d min\u2019, is conductivity of \u00a5 ion (2$., in S cm\u2019 mol\u2019) at 298 K 3 too x a te x will be CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 3",
    "rawSourceText": "62. Fora salt XY, which is a strong electrolyte, the plot of 2 \u2018A,, versus 4c has a slope of -90.0 S cm? mol*? L'\u201d > 1/T . If the energy of activation is 6.64 kJ mol\u2019 and t 298 K. At 0.01 M trati f XY, th a concentration vine R = 8.3 J K' mol\", the temperature at which the values of A,, is 145.S cm\u2019 mol\". The limiting molar rate constant becomes e\u201d min\u2019, is conductivity of \u00a5 ion (2$., in S cm\u2019 mol\u2019) at 298 K 3 too x a te x will be Ans. (3) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 3",
    "options": [
      {
        "number": "3",
        "text": "CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 3"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 3",
    "answerOptionText": "CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 3",
    "answerSourceText": "Ans. (3) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 3"
  },
  {
    "id": 63,
    "subject": "Chemistry",
    "sourcePage": 16,
    "slug": "neet-2026-question-63",
    "questionText": "63. The amount of carbon dioxide evolved upon to 4s-electrons in the interatomic metallic bonding. complete combustion of 116 g of n-butane is In light of the above statements, choose the most (Given : atomic mass in amu H = 1, C = 12 and appropriate answer from the options given 0 = 16) below: (1) 352g (2) 322 \u00a2 (3) 176g (4) 362 g (1) Both A and R are correct and R is the correct explanation of A",
    "rawSourceText": "63. The amount of carbon dioxide evolved upon to 4s-electrons in the interatomic metallic bonding. complete combustion of 116 g of n-butane is In light of the above statements, choose the most (Given : atomic mass in amu H = 1, C = 12 and appropriate answer from the options given 0 = 16) below: (1) 352g (2) 322 \u00a2 (3) 176g (4) 362 g (1) Both A and R are correct and R is the correct Ans. (1) explanation of A",
    "options": [
      {
        "number": "1",
        "text": "352g"
      },
      {
        "number": "2",
        "text": "322 \u00a2"
      },
      {
        "number": "3",
        "text": "176g"
      },
      {
        "number": "4",
        "text": "362 g"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - 352g",
    "answerOptionText": "352g",
    "answerSourceText": "Ans. (1) explanation of A"
  },
  {
    "id": 64,
    "subject": "Chemistry",
    "sourcePage": 16,
    "slug": "neet-2026-question-64",
    "questionText": "64. For an elementary chemical reaction, the Arrhenius (2) Both A and R are correct and R is NOT the plot is given below. correct explanation of A 8 (3) Ais correct but R is not correct 6 (4) Ais not correct but R is correct rs 4 t",
    "rawSourceText": "64. For an elementary chemical reaction, the Arrhenius (2) Both A and R are correct and R is NOT the plot is given below. correct explanation of A 8 (3) Ais correct but R is not correct 6 (4) Ais not correct but R is correct rs 4 Ans. (1) t",
    "options": [
      {
        "number": "2",
        "text": "Both A and R are correct and R is NOT the plot is given below. correct explanation of A 8"
      },
      {
        "number": "3",
        "text": "Ais correct but R is not correct 6"
      },
      {
        "number": "4",
        "text": "Ais not correct but R is correct rs 4"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - option text is present in the source question block for this item.",
    "answerOptionText": null,
    "answerSourceText": "Ans. (1) t"
  },
  {
    "id": 65,
    "subject": "Chemistry",
    "sourcePage": 17,
    "slug": "neet-2026-question-65",
    "questionText": "Question 65 source text could not be isolated cleanly from the embedded PDF text layer. Review the source-page excerpt for crawlable context.",
    "rawSourceText": "69. Given below are two statements: 69. Consider the reversible processes for 1.0 mol of an Statement-I : Heating NaCl with conentrated ideal gas as shown in the figure. H,SO, and MnO, results in oxidation of Mn. Statement-II_ : Heating Nal with concentrated Pr Vel, H,SO, and MnO, results in reduction of Mn. + 1 Py VT, In light of the above statements, choose the most \u00bb 4 appropriate answer from the options given F 2 . & Ip,: V,.T, below: a Nate S De VaT, (1) Both Statement-I and Statement-II are Processes 2 and 4 are adiabatic correct. (2) Both Statement-I and Statement-II are Volume \u2014> incorrect. (3) Statement-I is correct but Statement-Il is W,, W,, W; and w, represent work done (in calories) incorrect. in the processes 1, 2, 3 and 4, respectively; AU, (4) Statement-I is incorrect but Statement-II is and AU, are changes in the internal energy for the correct. processes 2 and 4, respectively. Ans. (4) (use R = 2 cal K? mot\u2019) 66. Among the species given below, the spin only The correct option is magnetic moment is highest for Vy Va (Given : Atomic number of Ti = 22, Mn = 25, (1) w, +w, =-2T, Ing -2T, ny 1 3 Fe = 26 and Co = 27) (1) (Ma(CN)P (2) Fe(CNY 2) wa +Wa = AU2\u2014 AU (3) [Co(NHy),* (4) (TW(H,O)\" 3) w, =, -2T,in\u00a5 Ans. (1) v, 67. The lanthanide ion having four unpaired electrons is (4) w, + w, + w; + w, = 0 (Given : Atomic number of Ce = 58, Nd = 60, | Ans. (1) Tb = 65 and Ho = 67) 70. Given below are two statements : One is labelled as 3 3+ (1) Nd (2) Ce Assertion A and the other is labelled as 3 3+ (3) Te (4) Ho Reason R. Ans. (4) Assertion A : The first ionization enthalpy of O is 68. The formula of tetraammineaquachloridocobalt(lll) lower than that of N and F. chloride is (1) [Co(NH), Ch] xH,0 Reason R : The loss of an electron from O leads to (2)[ColNH),JCl, xH,O stable half-filled p orbital. IqI-ly, (3) [Co(NH,),(H,O)CIICI In light of the above statements, choose the most (4) (Co(NH,),(H,O)CIJC1, appropriate answer from the options given Ans. (4) below: CH\u2026",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 66,
    "subject": "Chemistry",
    "sourcePage": 17,
    "slug": "neet-2026-question-66",
    "questionText": "66. Among the species given below, the spin only The correct option is magnetic moment is highest for Vy Va (Given : Atomic number of Ti = 22, Mn = 25, (1) w, +w, =-2T, Ing -2T, ny 1 3 Fe = 26 and Co = 27) (1) (Ma(CN)P (2) Fe(CNY 2) wa +Wa = AU2\u2014 AU (3) [Co(NHy),* (4) (TW(H,O)\" 3) w, =, -2T,in\u00a5 v,",
    "rawSourceText": "66. Among the species given below, the spin only The correct option is magnetic moment is highest for Vy Va (Given : Atomic number of Ti = 22, Mn = 25, (1) w, +w, =-2T, Ing -2T, ny 1 3 Fe = 26 and Co = 27) (1) (Ma(CN)P (2) Fe(CNY 2) wa +Wa = AU2\u2014 AU (3) [Co(NHy),* (4) (TW(H,O)\" 3) w, =, -2T,in\u00a5 Ans. (1) v,",
    "options": [
      {
        "number": "1",
        "text": "w, +w, =-2T, Ing -2T, ny 1 3 Fe = 26 and Co = 27)"
      },
      {
        "number": "2",
        "text": "Fe(CNY 2) wa +Wa = AU2\u2014 AU"
      },
      {
        "number": "3",
        "text": "[Co(NHy),*"
      },
      {
        "number": "4",
        "text": "(TW(H,O)\" 3) w, =, -2T,in\u00a5"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - w, +w, =-2T, Ing -2T, ny 1 3 Fe = 26 and Co = 27)",
    "answerOptionText": "w, +w, =-2T, Ing -2T, ny 1 3 Fe = 26 and Co = 27)",
    "answerSourceText": "Ans. (1) v,"
  },
  {
    "id": 67,
    "subject": "Chemistry",
    "sourcePage": 17,
    "slug": "neet-2026-question-67",
    "questionText": "67. The lanthanide ion having four unpaired electrons is (4) w, + w, + w; + w, = 0 (Given : Atomic number of Ce = 58, Nd = 60, | Tb = 65 and Ho = 67)",
    "rawSourceText": "67. The lanthanide ion having four unpaired electrons is (4) w, + w, + w; + w, = 0 (Given : Atomic number of Ce = 58, Nd = 60, | Ans. (1) Tb = 65 and Ho = 67)",
    "options": [
      {
        "number": "4",
        "text": "w, + w, + w; + w, = 0 (Given : Atomic number of Ce = 58, Nd = 60, |"
      },
      {
        "number": "1",
        "text": "Tb = 65 and Ho = 67)"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Tb = 65 and Ho = 67)",
    "answerOptionText": "Tb = 65 and Ho = 67)",
    "answerSourceText": "Ans. (1) Tb = 65 and Ho = 67)"
  },
  {
    "id": 68,
    "subject": "Chemistry",
    "sourcePage": 17,
    "slug": "neet-2026-question-68",
    "questionText": "68. The formula of tetraammineaquachloridocobalt(lll) lower than that of N and F. chloride is (1) [Co(NH), Ch] xH,0 Reason R : The loss of an electron from O leads to (2)[ColNH),JCl, xH,O stable half-filled p orbital. IqI-ly, (3) [Co(NH,),(H,O)CIICI In light of the above statements, choose the most (4) (Co(NH,),(H,O)CIJC1, appropriate answer from the options given below: CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 4",
    "rawSourceText": "68. The formula of tetraammineaquachloridocobalt(lll) lower than that of N and F. chloride is (1) [Co(NH), Ch] xH,0 Reason R : The loss of an electron from O leads to (2)[ColNH),JCl, xH,O stable half-filled p orbital. IqI-ly, (3) [Co(NH,),(H,O)CIICI In light of the above statements, choose the most (4) (Co(NH,),(H,O)CIJC1, appropriate answer from the options given Ans. (4) below: CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 4",
    "options": [
      {
        "number": "1",
        "text": "[Co(NH), Ch] xH,0 Reason R : The loss of an electron from O leads to (2)[ColNH),JCl, xH,O stable half-filled p orbital. IqI-ly,"
      },
      {
        "number": "3",
        "text": "[Co(NH,),(H,O)CIICI In light of the above statements, choose the most"
      },
      {
        "number": "4",
        "text": "(Co(NH,),(H,O)CIJC1, appropriate answer from the options given"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - (Co(NH,),(H,O)CIJC1, appropriate answer from the options given",
    "answerOptionText": "(Co(NH,),(H,O)CIJC1, appropriate answer from the options given",
    "answerSourceText": "Ans. (4) below: CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 4"
  },
  {
    "id": 69,
    "subject": "Chemistry",
    "sourcePage": 17,
    "slug": "neet-2026-question-69",
    "questionText": "69. Consider the reversible processes for 1.0 mol of an Statement-I : Heating NaCl with conentrated ideal gas as shown in the figure. H,SO, and MnO, results in oxidation of Mn. Statement-II_ : Heating Nal with concentrated Pr Vel, H,SO, and MnO, results in reduction of Mn. + 1 Py VT, In light of the above statements, choose the most \u00bb 4 appropriate answer from the options given F 2 . & Ip,: V,.T, below: a Nate S De VaT, (1) Both Statement-I and Statement-II are Processes 2 and 4 are adiabatic correct. (2) Both Statement-I and Statement-II are Volume \u2014> incorrect. (3) Statement-I is correct but Statement-Il is W,, W,, W; and w, represent work done (in calories) incorrect. in the processes 1, 2, 3 and 4, respectively; AU, (4) Statement-I is incorrect but Statement-II is and AU, are changes in the internal energy for the correct. processes 2 and 4, respectively. (use R = 2 cal K? mot\u2019)",
    "rawSourceText": "69. Consider the reversible processes for 1.0 mol of an Statement-I : Heating NaCl with conentrated ideal gas as shown in the figure. H,SO, and MnO, results in oxidation of Mn. Statement-II_ : Heating Nal with concentrated Pr Vel, H,SO, and MnO, results in reduction of Mn. + 1 Py VT, In light of the above statements, choose the most \u00bb 4 appropriate answer from the options given F 2 . & Ip,: V,.T, below: a Nate S De VaT, (1) Both Statement-I and Statement-II are Processes 2 and 4 are adiabatic correct. (2) Both Statement-I and Statement-II are Volume \u2014> incorrect. (3) Statement-I is correct but Statement-Il is W,, W,, W; and w, represent work done (in calories) incorrect. in the processes 1, 2, 3 and 4, respectively; AU, (4) Statement-I is incorrect but Statement-II is and AU, are changes in the internal energy for the correct. processes 2 and 4, respectively. Ans. (4) (use R = 2 cal K? mot\u2019)",
    "options": [
      {
        "number": "1",
        "text": "Both Statement-I and Statement-II are Processes 2 and 4 are adiabatic correct."
      },
      {
        "number": "2",
        "text": "Both Statement-I and Statement-II are Volume \u2014> incorrect."
      },
      {
        "number": "3",
        "text": "Statement-I is correct but Statement-Il is W,, W,, W; and w, represent work done (in calories) incorrect. in the processes 1, 2, 3 and 4, respectively; AU,"
      },
      {
        "number": "4",
        "text": "Statement-I is incorrect but Statement-II is and AU, are changes in the internal energy for the correct. processes 2 and 4, respectively."
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Statement-I is incorrect but Statement-II is and AU, are changes in the internal energy for the correct. processes 2 and 4, respectively.",
    "answerOptionText": "Statement-I is incorrect but Statement-II is and AU, are changes in the internal energy for the correct. processes 2 and 4, respectively.",
    "answerSourceText": "Ans. (4) (use R = 2 cal K? mot\u2019)"
  },
  {
    "id": 70,
    "subject": "Chemistry",
    "sourcePage": 17,
    "slug": "neet-2026-question-70",
    "questionText": "70. Given below are two statements : One is labelled as 3 3+ (1) Nd (2) Ce Assertion A and the other is labelled as 3 3+ (3) Te (4) Ho Reason R. Assertion A : The first ionization enthalpy of O is",
    "rawSourceText": "70. Given below are two statements : One is labelled as 3 3+ (1) Nd (2) Ce Assertion A and the other is labelled as 3 3+ (3) Te (4) Ho Reason R. Ans. (4) Assertion A : The first ionization enthalpy of O is",
    "options": [
      {
        "number": "1",
        "text": "Nd"
      },
      {
        "number": "2",
        "text": "Ce Assertion A and the other is labelled as 3 3+"
      },
      {
        "number": "3",
        "text": "Te"
      },
      {
        "number": "4",
        "text": "Ho Reason R."
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Ho Reason R.",
    "answerOptionText": "Ho Reason R.",
    "answerSourceText": "Ans. (4) Assertion A : The first ionization enthalpy of O is"
  },
  {
    "id": 71,
    "subject": "Chemistry",
    "sourcePage": 18,
    "slug": "neet-2026-question-71",
    "questionText": "71. Consider the following statements about the denaturation from its initial state N to denatured solutions formed by mixing two liquids. A. An ideal solution thus formed obeys Raoult's law state D according to N \u2014\u2014= D. At 60 \u00b0C, the throughout the composition range. concentrations of both N and D are equal at B. Mixture of chloroform and acetone shows, equilibrium, and the standard enthalpy change negative deviation from Raoult\u2019 law. of denaturation is 666 kJ mol\u201d. The standard C. Mixture of aniline and phenol shows positive deviation from Raoult\u2019s law. entropy change (AS? in kJ K* mol\") of the protein (1) A and B only upon denaturation at 60\u00b0C is closest to (2) B and C only (1) 2.0 (2) 2000.0 (3) A only (3) 333.0 (4) 11.1 (4) A and C only",
    "rawSourceText": "71. Consider the following statements about the denaturation from its initial state N to denatured solutions formed by mixing two liquids. A. An ideal solution thus formed obeys Raoult's law state D according to N \u2014\u2014= D. At 60 \u00b0C, the throughout the composition range. concentrations of both N and D are equal at B. Mixture of chloroform and acetone shows, equilibrium, and the standard enthalpy change negative deviation from Raoult\u2019 law. of denaturation is 666 kJ mol\u201d. The standard C. Mixture of aniline and phenol shows positive deviation from Raoult\u2019s law. entropy change (AS? in kJ K* mol\") of the protein (1) A and B only upon denaturation at 60\u00b0C is closest to (2) B and C only (1) 2.0 (2) 2000.0 (3) A only (3) 333.0 (4) 11.1 (4) A and C only Ans. (1) Ans. (1)",
    "options": [
      {
        "number": "1",
        "text": "A and B only upon denaturation at 60\u00b0C is closest to"
      },
      {
        "number": "2",
        "text": "B and C only"
      },
      {
        "number": "3",
        "text": "A only"
      },
      {
        "number": "4",
        "text": "11.1"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - A and B only upon denaturation at 60\u00b0C is closest to",
    "answerOptionText": "A and B only upon denaturation at 60\u00b0C is closest to",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 72,
    "subject": "Chemistry",
    "sourcePage": 18,
    "slug": "neet-2026-question-72",
    "questionText": "72. One of the products formed in the following reaction is listll cp Ce) feta : ene = [ra (1) P[ RERT [[Sea_ (2) QQ) Choose the correct answer from the options given NH, below : (1) AV, Bll, C1, Dl (3) CH) (2) Adll, BIV, CA, DAI (3) Al, B-l, C-Il, D-IV @) O (4) All, B-ll, C1, DIV CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 5",
    "rawSourceText": "72. One of the products formed in the following reaction is listll cp Ce) feta : ene = [ra (1) P[ RERT [[Sea_ (2) QQ) Choose the correct answer from the options given NH, below : (1) AV, Bll, C1, Dl (3) CH) (2) Adll, BIV, CA, DAI (3) Al, B-l, C-Il, D-IV @) O (4) All, B-ll, C1, DIV Ans. (4) Ans. (2) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 5",
    "options": [
      {
        "number": "1",
        "text": "P[ RERT [[Sea_"
      },
      {
        "number": "2",
        "text": "QQ) Choose the correct answer from the options given NH, below :"
      },
      {
        "number": "3",
        "text": "CH)"
      },
      {
        "number": "4",
        "text": "All, B-ll, C1, DIV"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - QQ) Choose the correct answer from the options given NH, below :",
    "answerOptionText": "QQ) Choose the correct answer from the options given NH, below :",
    "answerSourceText": "Ans. (2) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 5"
  },
  {
    "id": 73,
    "subject": "Chemistry",
    "sourcePage": 18,
    "slug": "neet-2026-question-73",
    "questionText": "73. The correct statement is explanation of A. (1) Boron has a maximum covalency of four. (2) Both A and R are correct and R is NOT the (2) Beryllium has three valence orbitals. correct explanation of A. (3) Magnesium has a maximum covalency of four. (3) A is correct but R is not correct. (4) Aluminimum has five valence orbitals. (4) Ais not correct but R is correct.",
    "rawSourceText": "73. The correct statement is explanation of A. (1) Boron has a maximum covalency of four. (2) Both A and R are correct and R is NOT the (2) Beryllium has three valence orbitals. correct explanation of A. (3) Magnesium has a maximum covalency of four. (3) A is correct but R is not correct. (4) Aluminimum has five valence orbitals. (4) Ais not correct but R is correct. Ans. (1) Ans. (1)",
    "options": [
      {
        "number": "1",
        "text": "Boron has a maximum covalency of four."
      },
      {
        "number": "2",
        "text": "Both A and R are correct and R is NOT the"
      },
      {
        "number": "3",
        "text": "Magnesium has a maximum covalency of four."
      },
      {
        "number": "4",
        "text": "Aluminimum has five valence orbitals."
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Boron has a maximum covalency of four.",
    "answerOptionText": "Boron has a maximum covalency of four.",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 74,
    "subject": "Chemistry",
    "sourcePage": 18,
    "slug": "neet-2026-question-74",
    "questionText": "74. A protein undergoes reversible _ thermal",
    "rawSourceText": "74. A protein undergoes reversible _ thermal",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 75,
    "subject": "Chemistry",
    "sourcePage": 18,
    "slug": "neet-2026-question-75",
    "questionText": "75. Match the species in List-I with their geometry in",
    "rawSourceText": "75. Match the species in List-I with their geometry in",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 76,
    "subject": "Chemistry",
    "sourcePage": 19,
    "slug": "neet-2026-question-76",
    "questionText": "76. Given below are two statements : (1) K and L are geometrical isomers. Statement-I : (2) K and L are enantiomers trans-But-2-ene upon treatment with Br, in CCl, (3) Mand N are geometrical isomers. gives the following product (4) M and N are stereoisomers r Hi Me",
    "rawSourceText": "76. Given below are two statements : (1) K and L are geometrical isomers. Statement-I : (2) K and L are enantiomers trans-But-2-ene upon treatment with Br, in CCl, (3) Mand N are geometrical isomers. gives the following product (4) M and N are stereoisomers r Hi Me Ans. (1)",
    "options": [
      {
        "number": "1",
        "text": "K and L are geometrical isomers. Statement-I :"
      },
      {
        "number": "2",
        "text": "K and L are enantiomers trans-But-2-ene upon treatment with Br, in CCl,"
      },
      {
        "number": "3",
        "text": "Mand N are geometrical isomers. gives the following product"
      },
      {
        "number": "4",
        "text": "M and N are stereoisomers r Hi Me"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - K and L are geometrical isomers. Statement-I :",
    "answerOptionText": "K and L are geometrical isomers. Statement-I :",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 77,
    "subject": "Chemistry",
    "sourcePage": 19,
    "slug": "neet-2026-question-77",
    "questionText": "77. Consider the following reaction sequences and ; (1) A and B only choose the correct option (2) Band D only \u00abNella. NH py Oc-Me Hpac K (3) Aand C only |p teers | (4) Cand D only benzoyl peroxide N M CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 6",
    "rawSourceText": "77. Consider the following reaction sequences and ; (1) A and B only choose the correct option (2) Band D only \u00abNella. NH py Oc-Me Hpac K (3) Aand C only |p teers | (4) Cand D only benzoyl peroxide N M Ans. (2) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 6",
    "options": [
      {
        "number": "1",
        "text": "A and B only choose the correct option"
      },
      {
        "number": "2",
        "text": "Band D only \u00abNella. NH py Oc-Me Hpac K"
      },
      {
        "number": "3",
        "text": "Aand C only |p teers |"
      },
      {
        "number": "4",
        "text": "Cand D only benzoyl peroxide N M"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Band D only \u00abNella. NH py Oc-Me Hpac K",
    "answerOptionText": "Band D only \u00abNella. NH py Oc-Me Hpac K",
    "answerSourceText": "Ans. (2) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 6"
  },
  {
    "id": 78,
    "subject": "Chemistry",
    "sourcePage": 19,
    "slug": "neet-2026-question-78",
    "questionText": "78. The complex which has facial and meridional H Me isomers is Br (Given: py = pyridine and en = H,JN-CH,-CH,-NH,) Statement-II: (1) (Crfpy){CD,) cis-But-2-ene upon treatment with alkaline KMnO, (2) (Cx(H,0),)* gives the following product (3) (Co(NH,),(H,0),]* OH (4) (Ni(en),(H,0),* Hi OH",
    "rawSourceText": "78. The complex which has facial and meridional H Me isomers is Br (Given: py = pyridine and en = H,JN-CH,-CH,-NH,) Statement-II: (1) (Crfpy){CD,) cis-But-2-ene upon treatment with alkaline KMnO, (2) (Cx(H,0),)* gives the following product (3) (Co(NH,),(H,0),]* OH (4) (Ni(en),(H,0),* Hi OH Ans. (1)",
    "options": [
      {
        "number": "1",
        "text": "(Crfpy){CD,) cis-But-2-ene upon treatment with alkaline KMnO,"
      },
      {
        "number": "2",
        "text": "(Cx(H,0),)* gives the following product"
      },
      {
        "number": "3",
        "text": "(Co(NH,),(H,0),]* OH"
      },
      {
        "number": "4",
        "text": "(Ni(en),(H,0),* Hi OH"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - (Crfpy){CD,) cis-But-2-ene upon treatment with alkaline KMnO,",
    "answerOptionText": "(Crfpy){CD,) cis-But-2-ene upon treatment with alkaline KMnO,",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 79,
    "subject": "Chemistry",
    "sourcePage": 19,
    "slug": "neet-2026-question-79",
    "questionText": "79. Identify the reactions which give aniline as the major H Me product: Me CN LiAlH, In the light of the above statements, choose the A. \u2014_ most appropriate answer from the options given 0) below. (1) Both Statement-I and Statement-II are B. om KOH, Br, . correct (2) Both Statement-I and Statement-II are NO, NaBH al incorrect C. or \u2014 (3) Statement-I is correct but Statement-II is H . t CH. incorrec! Ny 5 HCL HO (4 Statement-I is incorrect but Statement-Il is D. re) \u2014__, correct Choose the correct answer from the options given below.",
    "rawSourceText": "79. Identify the reactions which give aniline as the major H Me product: Me CN LiAlH, In the light of the above statements, choose the A. \u2014_ most appropriate answer from the options given 0) below. (1) Both Statement-I and Statement-II are B. om KOH, Br, . correct (2) Both Statement-I and Statement-II are NO, NaBH al incorrect C. or \u2014 (3) Statement-I is correct but Statement-II is H . t CH. incorrec! Ny 5 HCL HO (4 Statement-I is incorrect but Statement-Il is D. re) \u2014__, correct Ans. (4) Choose the correct answer from the options given below.",
    "options": [
      {
        "number": "1",
        "text": "Both Statement-I and Statement-II are B. om KOH, Br, . correct"
      },
      {
        "number": "2",
        "text": "Both Statement-I and Statement-II are NO, NaBH al incorrect C. or \u2014"
      },
      {
        "number": "3",
        "text": "Statement-I is correct but Statement-II is H . t CH. incorrec! Ny 5 HCL HO (4 Statement-I is incorrect but Statement-Il is D. re) \u2014__, correct"
      },
      {
        "number": "4",
        "text": "Choose the correct answer from the options given below."
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Choose the correct answer from the options given below.",
    "answerOptionText": "Choose the correct answer from the options given below.",
    "answerSourceText": "Ans. (4) Choose the correct answer from the options given below."
  },
  {
    "id": 80,
    "subject": "Chemistry",
    "sourcePage": 20,
    "slug": "neet-2026-question-80",
    "questionText": "80. Match the vitamins in List-I with their sources in Oo List-II ; H,C - List-1 List-II %) a HC A. vitamin A L meat H,C CH, B. vitamin B,, Il. sunflower oil ie) Hc Ph Cc. vitamin E Ill. green leafy (4) \u00b0 ea vegetables H,C D. vitamin K IV. carrots Choose the correct answer from the options given",
    "rawSourceText": "80. Match the vitamins in List-I with their sources in Oo List-II ; H,C - List-1 List-II %) a HC A. vitamin A L meat H,C CH, B. vitamin B,, Il. sunflower oil ie) Hc Ph Cc. vitamin E Ill. green leafy (4) \u00b0 ea vegetables H,C D. vitamin K IV. carrots Ans. (1) Choose the correct answer from the options given",
    "options": [
      {
        "number": "4",
        "text": "\u00b0 ea vegetables H,C D. vitamin K IV. carrots"
      },
      {
        "number": "1",
        "text": "Choose the correct answer from the options given"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Choose the correct answer from the options given",
    "answerOptionText": "Choose the correct answer from the options given",
    "answerSourceText": "Ans. (1) Choose the correct answer from the options given"
  },
  {
    "id": 81,
    "subject": "Chemistry",
    "sourcePage": 20,
    "slug": "neet-2026-question-81",
    "questionText": "81. The correct decreasing order of oxidation state of the underlined atom in each molecule is (1) P.O, > SO,>H,O",
    "rawSourceText": "81. The correct decreasing order of oxidation state of Ans. (1) the underlined atom in each molecule is (1) P.O, > SO,>H,O",
    "options": [
      {
        "number": "1",
        "text": "the underlined atom in each molecule is"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - the underlined atom in each molecule is",
    "answerOptionText": "the underlined atom in each molecule is",
    "answerSourceText": "Ans. (1) the underlined atom in each molecule is (1) P.O, > SO,>H,O"
  },
  {
    "id": 82,
    "subject": "Chemistry",
    "sourcePage": 20,
    "slug": "neet-2026-question-82",
    "questionText": "82. The compound that CANNOT be obtained from Sn/HCI followed by neutralization gives an amine the aldol condensation reaction shown below, is that is more basic than aniline. In light of the above statements, choose the most q appropriate answer from the options given H,C 8 NaOH, A below. aVOH, H,C + PhCHO \u2014\u2014\u2014\u2014> (1) Both Statement-I and Statement-II are fe) correct Hc. (2) Both Statement-I and Statement-II are 5 (1) incorrect H,C HC CH (3) Statement-I is correct but Statement-II is x ; re) \u00b0 incorrect Hc (4) Statement-I is incorrect but Statement-II is 3 (2) om ~Ph correct H,C CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 7",
    "rawSourceText": "82. The compound that CANNOT be obtained from Sn/HCI followed by neutralization gives an amine the aldol condensation reaction shown below, is that is more basic than aniline. In light of the above statements, choose the most q appropriate answer from the options given H,C 8 NaOH, A below. aVOH, H,C + PhCHO \u2014\u2014\u2014\u2014> (1) Both Statement-I and Statement-II are fe) correct Hc. (2) Both Statement-I and Statement-II are 5 (1) incorrect H,C HC CH (3) Statement-I is correct but Statement-II is x ; re) \u00b0 incorrect Hc (4) Statement-I is incorrect but Statement-II is 3 (2) om ~Ph correct H,C Ans. (1) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 7",
    "options": [
      {
        "number": "1",
        "text": "Both Statement-I and Statement-II are fe) correct Hc."
      },
      {
        "number": "2",
        "text": "Both Statement-I and Statement-II are 5"
      },
      {
        "number": "3",
        "text": "Statement-I is correct but Statement-II is x ; re) \u00b0 incorrect Hc"
      },
      {
        "number": "4",
        "text": "Statement-I is incorrect but Statement-II is 3"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Both Statement-I and Statement-II are fe) correct Hc.",
    "answerOptionText": "Both Statement-I and Statement-II are fe) correct Hc.",
    "answerSourceText": "Ans. (1) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 7"
  },
  {
    "id": 83,
    "subject": "Chemistry",
    "sourcePage": 20,
    "slug": "neet-2026-question-83",
    "questionText": "83. Among the following, the compound having below. (1) Ad, Bll, CHV, D4 conjugated double bonds is (2) A-lV, BA, C-l, D-Ill (1) hepta-1,3-diene (3) AV, Bl, Cl, Dll (2) hepta-1,4-diene (4) A-lll, Bl, CIV, D-ll (3) hepta-1,5-diene (4) hepta-1,6-diene",
    "rawSourceText": "83. Among the following, the compound having below. (1) Ad, Bll, CHV, D4 conjugated double bonds is (2) A-lV, BA, C-l, D-Ill (1) hepta-1,3-diene (3) AV, Bl, Cl, Dll (2) hepta-1,4-diene (4) A-lll, Bl, CIV, D-ll (3) hepta-1,5-diene Ans. (2! s- (2) (4) hepta-1,6-diene",
    "options": [
      {
        "number": "1",
        "text": "Ad, Bll, CHV, D4 conjugated double bonds is"
      },
      {
        "number": "2",
        "text": "A-lV, BA, C-l, D-Ill"
      },
      {
        "number": "3",
        "text": "AV, Bl, Cl, Dll"
      },
      {
        "number": "4",
        "text": "A-lll, Bl, CIV, D-ll"
      }
    ],
    "answerOption": "2! s- (2",
    "answerLabel": "Source answer marker: 2! s- (2.",
    "answerOptionText": null,
    "answerSourceText": "Ans. (2! s- (2) (4) hepta-1,6-diene"
  },
  {
    "id": 84,
    "subject": "Chemistry",
    "sourcePage": 20,
    "slug": "neet-2026-question-84",
    "questionText": "84. Given below are two statements: (NO. > Al } > Hs Statement-I : Oxidation of p-nitrotoluene with ateM'5S MeN 3 vd (3) PbO, > N,O, > SO, acidic KMnO, gives an acid that is stronger than (4) P,O, > CLO, > AIH, benzoic acid. Statement-II_ : Reduction of p-nitrotoluene with",
    "rawSourceText": "84. Given below are two statements: (NO. > Al } > Hs Statement-I : Oxidation of p-nitrotoluene with ateM'5S MeN 3 vd (3) PbO, > N,O, > SO, acidic KMnO, gives an acid that is stronger than (4) P,O, > CLO, > AIH, benzoic acid. Ans. (2) Statement-II_ : Reduction of p-nitrotoluene with",
    "options": [
      {
        "number": "3",
        "text": "PbO, > N,O, > SO, acidic KMnO, gives an acid that is stronger than"
      },
      {
        "number": "4",
        "text": "P,O, > CLO, > AIH, benzoic acid."
      },
      {
        "number": "2",
        "text": "Statement-II_ : Reduction of p-nitrotoluene with"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Statement-II_ : Reduction of p-nitrotoluene with",
    "answerOptionText": "Statement-II_ : Reduction of p-nitrotoluene with",
    "answerSourceText": "Ans. (2) Statement-II_ : Reduction of p-nitrotoluene with"
  },
  {
    "id": 85,
    "subject": "Chemistry",
    "sourcePage": 20,
    "slug": "neet-2026-question-85",
    "questionText": "Question 85 source text could not be isolated cleanly from the embedded PDF text layer. Review the source-page excerpt for crawlable context.",
    "rawSourceText": "80. Match the vitamins in List-I with their sources in Oo List-II ; H,C - List-1 List-II %) a HC A. vitamin A L meat H,C CH, B. vitamin B,, Il. sunflower oil ie) Hc Ph Cc. vitamin E Ill. green leafy (4) \u00b0 ea vegetables H,C D. vitamin K IV. carrots Ans. (1) Choose the correct answer from the options given 83. Among the following, the compound having below. (1) Ad, Bll, CHV, D4 conjugated double bonds is (2) A-lV, BA, C-l, D-Ill (1) hepta-1,3-diene (3) AV, Bl, Cl, Dll (2) hepta-1,4-diene (4) A-lll, Bl, CIV, D-ll (3) hepta-1,5-diene Ans. (2! s- (2) (4) hepta-1,6-diene 81. The correct decreasing order of oxidation state of Ans. (1) the underlined atom in each molecule is (1) P.O, > SO,>H,O 84. Given below are two statements: (NO. > Al } > Hs Statement-I : Oxidation of p-nitrotoluene with ateM'5S MeN 3 vd (3) PbO, > N,O, > SO, acidic KMnO, gives an acid that is stronger than (4) P,O, > CLO, > AIH, benzoic acid. Ans. (2) Statement-II_ : Reduction of p-nitrotoluene with 82. The compound that CANNOT be obtained from Sn/HCI followed by neutralization gives an amine the aldol condensation reaction shown below, is that is more basic than aniline. In light of the above statements, choose the most q appropriate answer from the options given H,C 8 NaOH, A below. aVOH, H,C + PhCHO \u2014\u2014\u2014\u2014> (1) Both Statement-I and Statement-II are fe) correct Hc. (2) Both Statement-I and Statement-II are 5 (1) incorrect H,C HC CH (3) Statement-I is correct but Statement-II is x ; re) \u00b0 incorrect Hc (4) Statement-I is incorrect but Statement-II is 3 (2) om ~Ph correct H,C Ans. (1) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 7",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 86,
    "subject": "Chemistry",
    "sourcePage": 21,
    "slug": "neet-2026-question-86",
    "questionText": "86. Consider the following reaction, and choose the t t Y Cc D correct option. OR Oe CH, 1.Cr0,C1,.CS, or THO OP 0 > 0 1 The figure representing two radial nodes in the (1) On treating compound P with saturated orbital is NaHCO, solution, brisk effervescence is (I) A (2)B observed. (3)C (4) D (2) Compound P can be prepared by treating",
    "rawSourceText": "86. Consider the following reaction, and choose the t t Y Cc D correct option. OR Oe CH, 1.Cr0,C1,.CS, or THO OP 0 > 0 1 The figure representing two radial nodes in the (1) On treating compound P with saturated orbital is NaHCO, solution, brisk effervescence is (I) A (2)B observed. (3)C (4) D Ans. (3) (2) Compound P can be prepared by treating",
    "options": [
      {
        "number": "1",
        "text": "On treating compound P with saturated orbital is NaHCO, solution, brisk effervescence is (I) A (2)B observed. (3)C"
      },
      {
        "number": "3",
        "text": "(2) Compound P can be prepared by treating"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - (2) Compound P can be prepared by treating",
    "answerOptionText": "(2) Compound P can be prepared by treating",
    "answerSourceText": "Ans. (3) (2) Compound P can be prepared by treating"
  },
  {
    "id": 87,
    "subject": "Chemistry",
    "sourcePage": 21,
    "slug": "neet-2026-question-87",
    "questionText": "87. A 1:3 electrolyte in an aqueous solution is MA<B<C<D ()C<A<D<B (3)C<A<B<D (QA<C<B<D (1) [CoCl,(NH,),JCl (2) {CoCIINH,)ICI,",
    "rawSourceText": "87. A 1:3 electrolyte in an aqueous solution is MA<B<C<D ()C<A<D<B (3)C<A<B<D (QA<C<B<D (1) [CoCl,(NH,),JCl Ans. (4) (2) {CoCIINH,)ICI,",
    "options": [
      {
        "number": "3",
        "text": "C<A<B<D (QA<C<B<D"
      },
      {
        "number": "1",
        "text": "[CoCl,(NH,),JCl"
      },
      {
        "number": "4",
        "text": "(2) {CoCIINH,)ICI,"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - (2) {CoCIINH,)ICI,",
    "answerOptionText": "(2) {CoCIINH,)ICI,",
    "answerSourceText": "Ans. (4) (2) {CoCIINH,)ICI,"
  },
  {
    "id": 88,
    "subject": "Chemistry",
    "sourcePage": 21,
    "slug": "neet-2026-question-88",
    "questionText": "88. Consider the following schematic plots of orbital KMn0, at 513 K is wavefunction (y,) against distance (r) from the nucleus. (1) K.MnO, (2) Mn,0, t t v, A We B (4) KO, oF = 5 =",
    "rawSourceText": "88. Consider the following schematic plots of orbital KMn0, at 513 K is wavefunction (y,) against distance (r) from the nucleus. (1) K.MnO, (2) Mn,0, t t v, A We B (4) KO, oF = 5 = Ans. (1)",
    "options": [
      {
        "number": "1",
        "text": "K.MnO,"
      },
      {
        "number": "2",
        "text": "Mn,0, t t v, A We B"
      },
      {
        "number": "4",
        "text": "KO, oF = 5 ="
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - K.MnO,",
    "answerOptionText": "K.MnO,",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 89,
    "subject": "Chemistry",
    "sourcePage": 21,
    "slug": "neet-2026-question-89",
    "questionText": "89. Arrange the following compounds in the increasing benzene with anhydrous AICI, and CH,COCI. . order of polarity (3) On treatment with bromine water, compound P A. CH,CH,OCH,CH, gives a white precipitate. B. CH,CH,OH (4) C d P is obtained by the hydi ti \u00a9. CALCOCH, \u2018ompound P is obtaine: e hydrogenation P Y os D. CH,COOH of benzoyl chloride with Pd on BaSO,. Choose the correct answer from the options given below :",
    "rawSourceText": "89. Arrange the following compounds in the increasing benzene with anhydrous AICI, and CH,COCI. . order of polarity (3) On treatment with bromine water, compound P A. CH,CH,OCH,CH, gives a white precipitate. B. CH,CH,OH (4) C d P is obtained by the hydi ti \u00a9. CALCOCH, \u2018ompound P is obtaine: e hydrogenation P Y os D. CH,COOH of benzoyl chloride with Pd on BaSO,. Choose the correct answer from the options given Ans. (4) below :",
    "options": [
      {
        "number": "3",
        "text": "On treatment with bromine water, compound P A. CH,CH,OCH,CH, gives a white precipitate. B. CH,CH,OH"
      },
      {
        "number": "4",
        "text": "C d P is obtained by the hydi ti \u00a9. CALCOCH, \u2018ompound P is obtaine: e hydrogenation P Y os D. CH,COOH of benzoyl chloride with Pd on BaSO,. Choose the correct answer from the options given"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - C d P is obtained by the hydi ti \u00a9. CALCOCH, \u2018ompound P is obtaine: e hydrogenation P Y os D. CH,COOH of benzoyl chloride with Pd on BaSO,. Choose the correct answer from the options given",
    "answerOptionText": "C d P is obtained by the hydi ti \u00a9. CALCOCH, \u2018ompound P is obtaine: e hydrogenation P Y os D. CH,COOH of benzoyl chloride with Pd on BaSO,. Choose the correct answer from the options given",
    "answerSourceText": "Ans. (4) below :"
  },
  {
    "id": 90,
    "subject": "Chemistry",
    "sourcePage": 21,
    "slug": "neet-2026-question-90",
    "questionText": "90. The highest occupied molecular orbital for Ne, is (1) m%, (2) 3, (3) (Co(NH,),]C1, . . (3) #*,, (4) 02, (4) [(Co(NH,),{NO,),] CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 8",
    "rawSourceText": "90. The highest occupied molecular orbital for Ne, is (1) m%, (2) 3, (3) (Co(NH,),]C1, . . (3) #*,, (4) 02, (4) [(Co(NH,),{NO,),] Ans. (4) Ans. (3) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 8",
    "options": [
      {
        "number": "1",
        "text": "m%,"
      },
      {
        "number": "2",
        "text": "3,"
      },
      {
        "number": "3",
        "text": "(Co(NH,),]C1, . ."
      },
      {
        "number": "4",
        "text": "02,"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - (Co(NH,),]C1, . .",
    "answerOptionText": "(Co(NH,),]C1, . .",
    "answerSourceText": "Ans. (3) CHEMISTRY | NEET 2026 Questions with Answers CHEMISTRY page 8"
  },
  {
    "id": 91,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-91",
    "questionText": "91. The number of vertebrae in a human is .",
    "rawSourceText": "91. The number of vertebrae in a human is .",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 92,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-92",
    "questionText": "92. Symbiotic association between fungi and algae are |",
    "rawSourceText": "92. Symbiotic association between fungi and algae are |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 93,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-93",
    "questionText": "93. Cell theory was formulated by __. C. Thylakoids Il. Cell membrane (1) Schleiden and Schwann D. Phospholipid IV. Disc shaped sacs in the (2) Robert Brown Golgi apparatus (3) Singer and Nicolson Choose the correct answer from the options given (4) Antonie Von Leeuwenhoek below : (1) A-lll, BIV, C4, Dl (2) Adl, BIV, C4, DAM",
    "rawSourceText": "93. Cell theory was formulated by __. C. Thylakoids Il. Cell membrane (1) Schleiden and Schwann D. Phospholipid IV. Disc shaped sacs in the (2) Robert Brown Golgi apparatus (3) Singer and Nicolson Choose the correct answer from the options given (4) Antonie Von Leeuwenhoek below : Ans. (1) (1) A-lll, BIV, C4, Dl (2) Adl, BIV, C4, DAM",
    "options": [
      {
        "number": "1",
        "text": "Schleiden and Schwann D. Phospholipid IV. Disc shaped sacs in the"
      },
      {
        "number": "2",
        "text": "Robert Brown Golgi apparatus"
      },
      {
        "number": "3",
        "text": "Singer and Nicolson Choose the correct answer from the options given"
      },
      {
        "number": "4",
        "text": "Antonie Von Leeuwenhoek below :"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Schleiden and Schwann D. Phospholipid IV. Disc shaped sacs in the",
    "answerOptionText": "Schleiden and Schwann D. Phospholipid IV. Disc shaped sacs in the",
    "answerSourceText": "Ans. (1) (1) A-lll, BIV, C4, Dl (2) Adl, BIV, C4, DAM"
  },
  {
    "id": 94,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-94",
    "questionText": "94. Which of the following are characteristics of (3) Adl, BIV, Cll, DI (4) AlV, Bll, C4, D-Ill prokaryotic cells ? (a) Ribosomes are made of 50S and 30S subunits",
    "rawSourceText": "94. Which of the following are characteristics of (3) Adl, BIV, Cll, DI (4) AlV, Bll, C4, D-Ill prokaryotic cells ? Ans. (2) (a) Ribosomes are made of 50S and 30S subunits",
    "options": [
      {
        "number": "3",
        "text": "Adl, BIV, Cll, DI"
      },
      {
        "number": "4",
        "text": "AlV, Bll, C4, D-Ill prokaryotic cells ?"
      },
      {
        "number": "2",
        "text": "(a) Ribosomes are made of 50S and 30S subunits"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - (a) Ribosomes are made of 50S and 30S subunits",
    "answerOptionText": "(a) Ribosomes are made of 50S and 30S subunits",
    "answerSourceText": "Ans. (2) (a) Ribosomes are made of 50S and 30S subunits"
  },
  {
    "id": 95,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-95",
    "questionText": "95. Which of the following is not a part of human (c) It secretes melanocyte stimulating hormone central neural system ? (d) It does not secrete prolactin (1) Arachnoid (2) Dura mater Choose the correct answer from the options given (3) Pia mater (4) Pericardium below : (1) (a) and (b) only (2) (a), (6) and (c) only (3) (\u00a9) and (d) only (4) (b) and (\u00a2) only BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 1",
    "rawSourceText": "95. Which of the following is not a part of human (c) It secretes melanocyte stimulating hormone central neural system ? (d) It does not secrete prolactin (1) Arachnoid (2) Dura mater Choose the correct answer from the options given (3) Pia mater (4) Pericardium below : (1) (a) and (b) only (2) (a), (6) and (c) only Ans. (4) (3) (\u00a9) and (d) only (4) (b) and (\u00a2) only BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 1",
    "options": [
      {
        "number": "1",
        "text": "Arachnoid"
      },
      {
        "number": "2",
        "text": "Dura mater Choose the correct answer from the options given"
      },
      {
        "number": "3",
        "text": "Pia mater"
      },
      {
        "number": "4",
        "text": "Pericardium below :"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Pericardium below :",
    "answerOptionText": "Pericardium below :",
    "answerSourceText": "Ans. (4) (3) (\u00a9) and (d) only (4) (b) and (\u00a2) only BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 1"
  },
  {
    "id": 96,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-96",
    "questionText": "96. Mitochondrial inner membrane encloses . (1) 7 (2) 12 (1) matrix (2) cytosol (3) 26 (4) 206 (3) mucus (4) aqueous humor",
    "rawSourceText": "96. Mitochondrial inner membrane encloses . (1) 7 (2) 12 (1) matrix (2) cytosol (3) 26 (4) 206 (3) mucus (4) aqueous humor Ans. (3) Ans. (1)",
    "options": [
      {
        "number": "2",
        "text": "12"
      },
      {
        "number": "1",
        "text": "matrix"
      },
      {
        "number": "3",
        "text": "26"
      },
      {
        "number": "4",
        "text": "206"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - matrix",
    "answerOptionText": "matrix",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 97,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-97",
    "questionText": "97. Match List-I with List-Il. called List-I List-II \u2014 A. Cristae I Flat membrane sacs in (1) lichens (2) sponges stroma of chloroplast (3) mycorrhiza (4) chrysophytes B. Cisternae Il. Infoldings in mitochondria",
    "rawSourceText": "97. Match List-I with List-Il. called List-I List-II \u2014 A. Cristae I Flat membrane sacs in (1) lichens (2) sponges stroma of chloroplast (3) mycorrhiza (4) chrysophytes B. Cisternae Il. Infoldings in Ans. (1) mitochondria",
    "options": [
      {
        "number": "1",
        "text": "lichens"
      },
      {
        "number": "2",
        "text": "sponges stroma of chloroplast"
      },
      {
        "number": "3",
        "text": "mycorrhiza"
      },
      {
        "number": "4",
        "text": "chrysophytes B. Cisternae Il. Infoldings in"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - lichens",
    "answerOptionText": "lichens",
    "answerSourceText": "Ans. (1) mitochondria"
  },
  {
    "id": 98,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-98",
    "questionText": "98. The plastid that stores xanthophyll is known as (b) They can have plasmids . (c) They contain mesosome (1) chloroplast (2) chromoplast (d) They have peroxisomes (3) aleuroplast (4) amyloplast Choose the correct answer from the options given below :",
    "rawSourceText": "98. The plastid that stores xanthophyll is known as (b) They can have plasmids . (c) They contain mesosome (1) chloroplast (2) chromoplast (d) They have peroxisomes (3) aleuroplast (4) amyloplast Choose the correct answer from the options given Ans. (2) below :",
    "options": [
      {
        "number": "1",
        "text": "chloroplast"
      },
      {
        "number": "2",
        "text": "chromoplast (d) They have peroxisomes"
      },
      {
        "number": "3",
        "text": "aleuroplast"
      },
      {
        "number": "4",
        "text": "amyloplast Choose the correct answer from the options given"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - chromoplast (d) They have peroxisomes",
    "answerOptionText": "chromoplast (d) They have peroxisomes",
    "answerSourceText": "Ans. (2) below :"
  },
  {
    "id": 99,
    "subject": "Biology",
    "sourcePage": 23,
    "slug": "neet-2026-question-99",
    "questionText": "99. Which of the following statements related to (1) (b) and (c) only (2) (a) and (c) only pituitary gland are correct ? (3) (a), (c) and (d) only \u2014(4) (a), (b) and (c) only (a) It is divided anatomically into adenohypophysis and neurohypophysis . oo. (b) It secretes follicle stimulating hormone",
    "rawSourceText": "99. Which of the following statements related to (1) (b) and (c) only (2) (a) and (c) only pituitary gland are correct ? (3) (a), (c) and (d) only \u2014(4) (a), (b) and (c) only (a) It is divided anatomically into adenohypophysis Ans. (4) and neurohypophysis . oo. (b) It secretes follicle stimulating hormone",
    "options": [
      {
        "number": "1",
        "text": "(b) and (c) only"
      },
      {
        "number": "2",
        "text": "(a) and (c) only pituitary gland are correct ?"
      },
      {
        "number": "3",
        "text": "(a), (c) and (d) only \u2014(4) (a), (b) and (c) only (a) It is divided anatomically into adenohypophysis"
      },
      {
        "number": "4",
        "text": "and neurohypophysis . oo. (b) It secretes follicle stimulating hormone"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - and neurohypophysis . oo. (b) It secretes follicle stimulating hormone",
    "answerOptionText": "and neurohypophysis . oo. (b) It secretes follicle stimulating hormone",
    "answerSourceText": "Ans. (4) and neurohypophysis . oo. (b) It secretes follicle stimulating hormone"
  },
  {
    "id": 100,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-100",
    "questionText": "100. Photorespiration reaction catalyzed by RuBisCo is |",
    "rawSourceText": "100. Photorespiration reaction catalyzed by RuBisCo is |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 101,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-101",
    "questionText": "101. Mad cow disease is caused by__. below : (1) prions (2) viroids (1) Ad, Bl, CV, DAI (3) Aspergillus sp. (4) Mycoplasma sp. (2) Adl, BI, CV, DAI (3) All, BH, Cll, DIV",
    "rawSourceText": "101. Mad cow disease is caused by__. below : (1) prions (2) viroids (1) Ad, Bl, CV, DAI (3) Aspergillus sp. (4) Mycoplasma sp. (2) Adl, BI, CV, DAI Ans. (1) (3) All, BH, Cll, DIV",
    "options": [
      {
        "number": "1",
        "text": "prions"
      },
      {
        "number": "2",
        "text": "viroids"
      },
      {
        "number": "3",
        "text": "Aspergillus sp."
      },
      {
        "number": "4",
        "text": "Mycoplasma sp."
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - prions",
    "answerOptionText": "prions",
    "answerSourceText": "Ans. (1) (3) All, BH, Cll, DIV"
  },
  {
    "id": 102,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-102",
    "questionText": "102. Which pigment has absorption peak at 700 nm in (4) Al, Bil, C-lll, DIV the photosynthetic reaction centre PS I (P700) ? (1) Chlorophyll b",
    "rawSourceText": "102. Which pigment has absorption peak at 700 nm in (4) Al, Bil, C-lll, DIV the photosynthetic reaction centre PS I (P700) ? Ans. (2) (1) Chlorophyll b",
    "options": [
      {
        "number": "4",
        "text": "Al, Bil, C-lll, DIV the photosynthetic reaction centre PS I (P700) ?"
      },
      {
        "number": "2",
        "text": "(1) Chlorophyll b"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - (1) Chlorophyll b",
    "answerOptionText": "(1) Chlorophyll b",
    "answerSourceText": "Ans. (2) (1) Chlorophyll b"
  },
  {
    "id": 103,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-103",
    "questionText": "103. In water, frogs respire using _. Statement II : In phylum Echinodermata, both (1) skin (2) buccal cavity adults and larvae are radially symmetrical. (3) lungs (4) trachea In the light of the above statements, choose the",
    "rawSourceText": "103. In water, frogs respire using _. Statement II : In phylum Echinodermata, both (1) skin (2) buccal cavity adults and larvae are radially symmetrical. (3) lungs (4) trachea Ans. (1) In the light of the above statements, choose the",
    "options": [
      {
        "number": "1",
        "text": "skin"
      },
      {
        "number": "2",
        "text": "buccal cavity adults and larvae are radially symmetrical."
      },
      {
        "number": "3",
        "text": "lungs"
      },
      {
        "number": "4",
        "text": "trachea"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - skin",
    "answerOptionText": "skin",
    "answerSourceText": "Ans. (1) In the light of the above statements, choose the"
  },
  {
    "id": 104,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-104",
    "questionText": "104. Which of the following represents the correct most appropriate answer from the options given sequence of arrangement of bones in the lower limb below: of humans ? (1) Both Statement I and Statement II are (1) Femur-tibia-patella-tarsal correct (2) Patella-femur-tibia-tarsal (2) Both Statement I and Statement II are (3) Femur-patella-tibia-tarsal incorrect (4) Femur-tarsal-patella-tibia (3) Statement I is correct but Statement II is incorrect",
    "rawSourceText": "104. Which of the following represents the correct most appropriate answer from the options given sequence of arrangement of bones in the lower limb below: of humans ? (1) Both Statement I and Statement II are (1) Femur-tibia-patella-tarsal correct (2) Patella-femur-tibia-tarsal (2) Both Statement I and Statement II are (3) Femur-patella-tibia-tarsal incorrect (4) Femur-tarsal-patella-tibia (3) Statement I is correct but Statement II is Ans. (3) incorrect",
    "options": [
      {
        "number": "1",
        "text": "Both Statement I and Statement II are"
      },
      {
        "number": "2",
        "text": "Patella-femur-tibia-tarsal"
      },
      {
        "number": "3",
        "text": "Femur-patella-tibia-tarsal incorrect"
      },
      {
        "number": "4",
        "text": "Femur-tarsal-patella-tibia"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Femur-patella-tibia-tarsal incorrect",
    "answerOptionText": "Femur-patella-tibia-tarsal incorrect",
    "answerSourceText": "Ans. (3) incorrect"
  },
  {
    "id": 105,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-105",
    "questionText": "105. Phyllotaxy is the pattem of arrangement of ___. (4) Statement I is incorrect but Statement II is (1) leaves (2) flowers correct (3) fruits (4) sepals BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 2",
    "rawSourceText": "105. Phyllotaxy is the pattem of arrangement of ___. (4) Statement I is incorrect but Statement II is (1) leaves (2) flowers correct (3) fruits (4) sepals Ans. (3) Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 2",
    "options": [
      {
        "number": "4",
        "text": "Statement I is incorrect but Statement II is"
      },
      {
        "number": "1",
        "text": "leaves"
      },
      {
        "number": "2",
        "text": "flowers correct"
      },
      {
        "number": "3",
        "text": "fruits"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - leaves",
    "answerOptionText": "leaves",
    "answerSourceText": "Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 2"
  },
  {
    "id": 106,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-106",
    "questionText": "106. Match List-I with List-Il shown below : List-I List-II RuBP + O, \u2014 3-Phosphoglycerate + X Identify \"X\" from the given options : A. Starch 1. Fights infection (1) Phosphoenolpyruvate B. Antibody Il. Energy storage (2) 2-Phosphoglycolate C. Concanavalin III. Glucose transport (3) Oxaloacetate (4) Malate D. Glut4 IV. Lectin Choose the correct answer from the options given",
    "rawSourceText": "106. Match List-I with List-Il shown below : List-I List-II RuBP + O, \u2014 3-Phosphoglycerate + X Identify \"X\" from the given options : A. Starch 1. Fights infection (1) Phosphoenolpyruvate B. Antibody Il. Energy storage (2) 2-Phosphoglycolate C. Concanavalin III. Glucose transport (3) Oxaloacetate (4) Malate D. Glut4 IV. Lectin Ans. (2) Choose the correct answer from the options given",
    "options": [
      {
        "number": "1",
        "text": "Phosphoenolpyruvate B. Antibody Il. Energy storage"
      },
      {
        "number": "2",
        "text": "2-Phosphoglycolate C. Concanavalin III. Glucose transport"
      },
      {
        "number": "3",
        "text": "Oxaloacetate"
      },
      {
        "number": "4",
        "text": "Malate D. Glut4 IV. Lectin"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - 2-Phosphoglycolate C. Concanavalin III. Glucose transport",
    "answerOptionText": "2-Phosphoglycolate C. Concanavalin III. Glucose transport",
    "answerSourceText": "Ans. (2) Choose the correct answer from the options given"
  },
  {
    "id": 107,
    "subject": "Biology",
    "sourcePage": 24,
    "slug": "neet-2026-question-107",
    "questionText": "107. Given below are two statements: (2) Chlorophyll a (3) Xanthophylls Statement I : When any plane passing through the (4) Carotenoids central axis of the body divides the organism into two identical halves, it is called radial symmetry.",
    "rawSourceText": "107. Given below are two statements: (2) Chlorophyll a (3) Xanthophylls Statement I : When any plane passing through the (4) Carotenoids central axis of the body divides the organism into Ans. (2) two identical halves, it is called radial symmetry.",
    "options": [
      {
        "number": "2",
        "text": "Chlorophyll a"
      },
      {
        "number": "3",
        "text": "Xanthophylls Statement I : When any plane passing through the"
      },
      {
        "number": "4",
        "text": "Carotenoids central axis of the body divides the organism into"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Chlorophyll a",
    "answerOptionText": "Chlorophyll a",
    "answerSourceText": "Ans. (2) two identical halves, it is called radial symmetry."
  },
  {
    "id": 108,
    "subject": "Biology",
    "sourcePage": 25,
    "slug": "neet-2026-question-108",
    "questionText": "108. Endomembrane system includes .",
    "rawSourceText": "108. Endomembrane system includes .",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 109,
    "subject": "Biology",
    "sourcePage": 25,
    "slug": "neet-2026-question-109",
    "questionText": "109. How many molecules of pyruvic acid are produced at the end of glycolysis from 206 molecules of",
    "rawSourceText": "109. How many molecules of pyruvic acid are produced Ans. (4) at the end of glycolysis from 206 molecules of",
    "options": [
      {
        "number": "4",
        "text": "at the end of glycolysis from 206 molecules of"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - at the end of glycolysis from 206 molecules of",
    "answerOptionText": "at the end of glycolysis from 206 molecules of",
    "answerSourceText": "Ans. (4) at the end of glycolysis from 206 molecules of"
  },
  {
    "id": 110,
    "subject": "Biology",
    "sourcePage": 25,
    "slug": "neet-2026-question-110",
    "questionText": "110. Which of the following plant growth regulators is . epipetalous \u00abido 2 used as herbicide ? (4) Ovary is inferior (1) 24D (2) Kinetin Choose the correct answer from the options given (3) Abscisic acid (4) Gibberellin below : S.",
    "rawSourceText": "110. Which of the following plant growth regulators is . epipetalous \u00abido 2 used as herbicide ? (4) Ovary is inferior (1) 24D (2) Kinetin Choose the correct answer from the options given (3) Abscisic acid (4) Gibberellin Ans. (1) below : S.",
    "options": [
      {
        "number": "4",
        "text": "Ovary is inferior"
      },
      {
        "number": "1",
        "text": "24D"
      },
      {
        "number": "2",
        "text": "Kinetin Choose the correct answer from the options given"
      },
      {
        "number": "3",
        "text": "Abscisic acid"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - 24D",
    "answerOptionText": "24D",
    "answerSourceText": "Ans. (1) below : S."
  },
  {
    "id": 111,
    "subject": "Biology",
    "sourcePage": 25,
    "slug": "neet-2026-question-111",
    "questionText": "111. Given below are two statements : (1) (@), (6) and (c) only (2) (@) only Statement I : In gymnosperms, the male and (3) (@) and (b) only (4) (b), (c) and (d) only . (1 female gametophytes remain within the sporangia. Statement Il : In gymnosperms, seeds are not",
    "rawSourceText": "111. Given below are two statements : (1) (@), (6) and (c) only (2) (@) only Statement I : In gymnosperms, the male and (3) (@) and (b) only (4) (b), (c) and (d) only . (1 female gametophytes remain within the sporangia. Ans. (1) Statement Il : In gymnosperms, seeds are not",
    "options": [
      {
        "number": "1",
        "text": "(@), (6) and (c) only"
      },
      {
        "number": "2",
        "text": "(@) only Statement I : In gymnosperms, the male and"
      },
      {
        "number": "3",
        "text": "(@) and (b) only"
      },
      {
        "number": "4",
        "text": "(b), (c) and (d) only . (1 female gametophytes remain within the sporangia."
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - (@), (6) and (c) only",
    "answerOptionText": "(@), (6) and (c) only",
    "answerSourceText": "Ans. (1) Statement Il : In gymnosperms, seeds are not"
  },
  {
    "id": 112,
    "subject": "Biology",
    "sourcePage": 25,
    "slug": "neet-2026-question-112",
    "questionText": "112. Match List-I with List-I. (1) endoplasmic reticulum, Golgi complex, List-I List-II lysosomes and vacuole A. Spherical L Vibrio (2) endoplasmic reticulum, chloroplast, B. Rod IL Cocci peroxisomes and vacuole C. Comma Ill. Spirilla (3) mitochondria, chloroplast, peroxisomes and D. Spirilum IV. Bacilli vacuole Choose the correct answer from the options given (4) Golgi complex, chloroplast, peroxisomes and below : vacuole (1) Ad, BAIL, CHI, DIV (2) Ad, BHI, Cl, DAV (3) All, BI, CAV, DAIL (4) Ad, BIV, C4, Dll",
    "rawSourceText": "112. Match List-I with List-I. (1) endoplasmic reticulum, Golgi complex, List-I List-II lysosomes and vacuole A. Spherical L Vibrio (2) endoplasmic reticulum, chloroplast, B. Rod IL Cocci peroxisomes and vacuole C. Comma Ill. Spirilla (3) mitochondria, chloroplast, peroxisomes and D. Spirilum IV. Bacilli vacuole Choose the correct answer from the options given (4) Golgi complex, chloroplast, peroxisomes and below : vacuole (1) Ad, BAIL, CHI, DIV (2) Ad, BHI, Cl, DAV Ans. (1) (3) All, BI, CAV, DAIL (4) Ad, BIV, C4, Dll",
    "options": [
      {
        "number": "1",
        "text": "endoplasmic reticulum, Golgi complex, List-I List-II lysosomes and vacuole A. Spherical L Vibrio"
      },
      {
        "number": "2",
        "text": "endoplasmic reticulum, chloroplast, B. Rod IL Cocci peroxisomes and vacuole C. Comma Ill. Spirilla"
      },
      {
        "number": "3",
        "text": "mitochondria, chloroplast, peroxisomes and D. Spirilum IV. Bacilli vacuole Choose the correct answer from the options given"
      },
      {
        "number": "4",
        "text": "Golgi complex, chloroplast, peroxisomes and below : vacuole"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - endoplasmic reticulum, Golgi complex, List-I List-II lysosomes and vacuole A. Spherical L Vibrio",
    "answerOptionText": "endoplasmic reticulum, Golgi complex, List-I List-II lysosomes and vacuole A. Spherical L Vibrio",
    "answerSourceText": "Ans. (1) (3) All, BI, CAV, DAIL (4) Ad, BIV, C4, Dll"
  },
  {
    "id": 113,
    "subject": "Biology",
    "sourcePage": 25,
    "slug": "neet-2026-question-113",
    "questionText": "113. Which of the following are characteristic features of glucose ? ; family ? (1) 206 (2) 309 Solanaceae family ? (3) 103 (4) 412 (a) Flowers are bisexual and actinomorphic (b) Calyx have five sepals and are united S. (c) Androecium have five stamens and are",
    "rawSourceText": "113. Which of the following are characteristic features of glucose ? ; family ? (1) 206 (2) 309 Solanaceae family ? (3) 103 (4) 412 (a) Flowers are bisexual and actinomorphic Ans. (4) (b) Calyx have five sepals and are united S. (c) Androecium have five stamens and are",
    "options": [
      {
        "number": "1",
        "text": "206"
      },
      {
        "number": "2",
        "text": "309 Solanaceae family ?"
      },
      {
        "number": "3",
        "text": "103"
      },
      {
        "number": "4",
        "text": "412 (a) Flowers are bisexual and actinomorphic"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - 412 (a) Flowers are bisexual and actinomorphic",
    "answerOptionText": "412 (a) Flowers are bisexual and actinomorphic",
    "answerSourceText": "Ans. (4) (b) Calyx have five sepals and are united S. (c) Androecium have five stamens and are"
  },
  {
    "id": 114,
    "subject": "Biology",
    "sourcePage": 25,
    "slug": "neet-2026-question-114",
    "questionText": "114. Select the correct sequence of experiments that led to a gradual understanding of photosynthesis in covered. green plants. In the light of the above statements, choose the (1) Absorption spectra of chlorophyll a and b > most appropriate answer from the options given production of glucose \u2014 release of oxygen \u2014 below: role of air ow: (2) Role of air > release of oxygen \u2014 production (1) Both Statement I and Statement II are of glucose > absorption spectra of chlorophyll a correct and b (2) Both Statement I and Statement II are (3) Release of oxygen \u2014> production of glucose > incorrect absorption spectra of chlorophyll a and b > role (3) Statement I is correct but Statement II is of air incorrect (4) Production of glucose > role of air > release of (4) Statement 1 is incorrect but Statement II is on > absorption spectra of chlorophyll a an correct @) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 3",
    "rawSourceText": "114. Select the correct sequence of experiments that led to a gradual understanding of photosynthesis in covered. green plants. In the light of the above statements, choose the (1) Absorption spectra of chlorophyll a and b > most appropriate answer from the options given production of glucose \u2014 release of oxygen \u2014 below: role of air ow: (2) Role of air > release of oxygen \u2014 production (1) Both Statement I and Statement II are of glucose > absorption spectra of chlorophyll a correct and b (2) Both Statement I and Statement II are (3) Release of oxygen \u2014> production of glucose > incorrect absorption spectra of chlorophyll a and b > role (3) Statement I is correct but Statement II is of air incorrect (4) Production of glucose > role of air > release of (4) Statement 1 is incorrect but Statement II is on > absorption spectra of chlorophyll a an correct Ans. (2) Ans. (1) @) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 3",
    "options": [
      {
        "number": "1",
        "text": "Absorption spectra of chlorophyll a and b > most appropriate answer from the options given production of glucose \u2014 release of oxygen \u2014 below: role of air ow:"
      },
      {
        "number": "2",
        "text": "Role of air > release of oxygen \u2014 production"
      },
      {
        "number": "3",
        "text": "Release of oxygen \u2014> production of glucose > incorrect absorption spectra of chlorophyll a and b > role"
      },
      {
        "number": "4",
        "text": "Production of glucose > role of air > release of"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Absorption spectra of chlorophyll a and b > most appropriate answer from the options given production of glucose \u2014 release of oxygen \u2014 below: role of air ow:",
    "answerOptionText": "Absorption spectra of chlorophyll a and b > most appropriate answer from the options given production of glucose \u2014 release of oxygen \u2014 below: role of air ow:",
    "answerSourceText": "Ans. (1) @) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 3"
  },
  {
    "id": 115,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-115",
    "questionText": "115. The number of action potentials generated by Choose the correct answer trom the options given sino-arterial node (SAN) in a healthy human is below : per minute. (1) @), (a), (e), (C), (b), (A), (f (1) 28 - 30 (2) 70-75 (2) (a), (c), ), (9), (f), (0), (e) (3) 100 - 110 (4) 120 - 140 (3) (9), (o), (), (b), (e), (a), (f (4) (f, (), (\u00a9), (@), (d), (e), (@)",
    "rawSourceText": "115. The number of action potentials generated by Choose the correct answer trom the options given sino-arterial node (SAN) in a healthy human is below : per minute. (1) @), (a), (e), (C), (b), (A), (f (1) 28 - 30 (2) 70-75 (2) (a), (c), ), (9), (f), (0), (e) (3) 100 - 110 (4) 120 - 140 (3) (9), (o), (), (b), (e), (a), (f Ans. (2) (4) (f, (), (\u00a9), (@), (d), (e), (@)",
    "options": [
      {
        "number": "1",
        "text": "@), (a), (e), (C), (b), (A), (f"
      },
      {
        "number": "2",
        "text": "70-75"
      },
      {
        "number": "3",
        "text": "100 - 110"
      },
      {
        "number": "4",
        "text": "120 - 140"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - 70-75",
    "answerOptionText": "70-75",
    "answerSourceText": "Ans. (2) (4) (f, (), (\u00a9), (@), (d), (e), (@)"
  },
  {
    "id": 116,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-116",
    "questionText": "116. How many turns of Calvin cycle are required for the | formation of three molecules of glucose ?",
    "rawSourceText": "116. How many turns of Calvin cycle are required for the | Ans. (1) formation of three molecules of glucose ?",
    "options": [
      {
        "number": "1",
        "text": "formation of three molecules of glucose ?"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - formation of three molecules of glucose ?",
    "answerOptionText": "formation of three molecules of glucose ?",
    "answerSourceText": "Ans. (1) formation of three molecules of glucose ?"
  },
  {
    "id": 117,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-117",
    "questionText": "117. Which of the following statements is incorrect ? C. Parietal placentation Il. Primrose . . D. Free central IV. Pea (1) Blood coagulates in response to an injury placentation (2) Blood clot consists of fibrins Choose the correct answer from the options given (3) Fibrin is produced from fibrinogen below : (4) Fibrinogen is produced from fibrin (1) All, BIV, C4, DIM (2) ANV, Bul, Cll, D1",
    "rawSourceText": "117. Which of the following statements is incorrect ? C. Parietal placentation Il. Primrose . . D. Free central IV. Pea (1) Blood coagulates in response to an injury placentation (2) Blood clot consists of fibrins Choose the correct answer from the options given (3) Fibrin is produced from fibrinogen below : (4) Fibrinogen is produced from fibrin (1) All, BIV, C4, DIM Ans. (4) (2) ANV, Bul, Cll, D1",
    "options": [
      {
        "number": "1",
        "text": "Blood coagulates in response to an injury placentation"
      },
      {
        "number": "2",
        "text": "Blood clot consists of fibrins Choose the correct answer from the options given"
      },
      {
        "number": "3",
        "text": "Fibrin is produced from fibrinogen below :"
      },
      {
        "number": "4",
        "text": "Fibrinogen is produced from fibrin"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Fibrinogen is produced from fibrin",
    "answerOptionText": "Fibrinogen is produced from fibrin",
    "answerSourceText": "Ans. (4) (2) ANV, Bul, Cll, D1"
  },
  {
    "id": 118,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-118",
    "questionText": "118. Match List-I with List-IL. (3) AAV, BAll, Cl, Dil List-I List-II (4) AV, B-Il, C4, D-III A. Family I. Sapindales B. Genus I. Dicotyledonae",
    "rawSourceText": "118. Match List-I with List-IL. (3) AAV, BAll, Cl, Dil List-I List-II (4) AV, B-Il, C4, D-III A. Family I. Sapindales Ans. (4) B. Genus I. Dicotyledonae",
    "options": [
      {
        "number": "3",
        "text": "AAV, BAll, Cl, Dil List-I List-II"
      },
      {
        "number": "4",
        "text": "AV, B-Il, C4, D-III A. Family I. Sapindales"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - AV, B-Il, C4, D-III A. Family I. Sapindales",
    "answerOptionText": "AV, B-Il, C4, D-III A. Family I. Sapindales",
    "answerSourceText": "Ans. (4) B. Genus I. Dicotyledonae"
  },
  {
    "id": 119,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-119",
    "questionText": "119. Arrange the following taxonomic categories in below : ascending order. (1) (a) and (d) only (a) Genus (b) Class (2) (c) and (d) only (@) Species (4) (a) and (b) only BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 4",
    "rawSourceText": "119. Arrange the following taxonomic categories in below : ascending order. (1) (a) and (d) only (a) Genus (b) Class (2) (c) and (d) only (@) Species (4) (a) and (b) only Ans. (2) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 4",
    "options": [
      {
        "number": "1",
        "text": "(a) and (d) only (a) Genus (b) Class"
      },
      {
        "number": "2",
        "text": "(c) and (d) only (@) Species"
      },
      {
        "number": "4",
        "text": "(a) and (b) only"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - (c) and (d) only (@) Species",
    "answerOptionText": "(c) and (d) only (@) Species",
    "answerSourceText": "Ans. (2) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 4"
  },
  {
    "id": 120,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-120",
    "questionText": "120. Match List-I with List-II. (1) 6 (2)3 List-I List-II (3) 1 (4) 18 A. Marginal placentation I. Argemone B. Axile placentation I. Tomato",
    "rawSourceText": "120. Match List-I with List-II. (1) 6 (2)3 List-I List-II (3) 1 (4) 18 A. Marginal placentation I. Argemone Ans. (4) B. Axile placentation I. Tomato",
    "options": [
      {
        "number": "1",
        "text": "6 (2)3 List-I List-II"
      },
      {
        "number": "4",
        "text": "18 A. Marginal placentation I. Argemone"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - 18 A. Marginal placentation I. Argemone",
    "answerOptionText": "18 A. Marginal placentation I. Argemone",
    "answerSourceText": "Ans. (4) B. Axile placentation I. Tomato"
  },
  {
    "id": 121,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-121",
    "questionText": "121. Sphenopsida class belongs to____. Cc. Class Ill. Anacardiaceae (1) bryophytes (2) angiosperms D. Phylum IV. Angiospermae (3) gymnosperms (4) pteridophytes E. Order V. Mangifera Choose the correct answer from the options given |",
    "rawSourceText": "121. Sphenopsida class belongs to____. Cc. Class Ill. Anacardiaceae (1) bryophytes (2) angiosperms D. Phylum IV. Angiospermae (3) gymnosperms (4) pteridophytes E. Order V. Mangifera Ans. (4) Choose the correct answer from the options given |",
    "options": [
      {
        "number": "1",
        "text": "bryophytes"
      },
      {
        "number": "2",
        "text": "angiosperms D. Phylum IV. Angiospermae"
      },
      {
        "number": "3",
        "text": "gymnosperms"
      },
      {
        "number": "4",
        "text": "pteridophytes E. Order V. Mangifera"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - pteridophytes E. Order V. Mangifera",
    "answerOptionText": "pteridophytes E. Order V. Mangifera",
    "answerSourceText": "Ans. (4) Choose the correct answer from the options given |"
  },
  {
    "id": 122,
    "subject": "Biology",
    "sourcePage": 26,
    "slug": "neet-2026-question-122",
    "questionText": "122. Which of the following statements regarding below : photorespiration are correct ? (1) Al, B-V, C-Il, D-IV, E-Ill (a) Do not occur in C3 plants (2) A-Il, B-l, Cll, D-IV, E-V (b) CO, is consumed and O, is generated (3) A-ll, Bll, C-V, D-l, EIV (c) Phosphoglycolate is formed (4) All, B-V, C-Il, DV, El (d) No synthesis of ATP and NADPH Choose the correct answer from the options given",
    "rawSourceText": "122. Which of the following statements regarding below : photorespiration are correct ? (1) Al, B-V, C-Il, D-IV, E-Ill (a) Do not occur in C3 plants (2) A-Il, B-l, Cll, D-IV, E-V (b) CO, is consumed and O, is generated (3) A-ll, Bll, C-V, D-l, EIV (c) Phosphoglycolate is formed (4) All, B-V, C-Il, DV, El (d) No synthesis of ATP and NADPH Ans. (4) Choose the correct answer from the options given",
    "options": [
      {
        "number": "1",
        "text": "Al, B-V, C-Il, D-IV, E-Ill (a) Do not occur in C3 plants"
      },
      {
        "number": "2",
        "text": "A-Il, B-l, Cll, D-IV, E-V (b) CO, is consumed and O, is generated"
      },
      {
        "number": "3",
        "text": "A-ll, Bll, C-V, D-l, EIV (c) Phosphoglycolate is formed"
      },
      {
        "number": "4",
        "text": "All, B-V, C-Il, DV, El (d) No synthesis of ATP and NADPH"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - All, B-V, C-Il, DV, El (d) No synthesis of ATP and NADPH",
    "answerOptionText": "All, B-V, C-Il, DV, El (d) No synthesis of ATP and NADPH",
    "answerSourceText": "Ans. (4) Choose the correct answer from the options given"
  },
  {
    "id": 123,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-123",
    "questionText": "123. Smooth endoplasmic reticulum .",
    "rawSourceText": "123. Smooth endoplasmic reticulum .",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 124,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-124",
    "questionText": "124. Which one of the following statements is incorrect ? below : 1) wcalls of te ah (1) Adl, Bll, Cl (2) AdI,BA,CAN (1) a-cells of pancreas secrete glucagon (3) Ad, Bel, CA (4) Ad, Bil, C-l (2) a-cells of pancreas secrete insulin (3) Glucagon stimulates glycogenolysis",
    "rawSourceText": "124. Which one of the following statements is incorrect ? below : 1) wcalls of te ah (1) Adl, Bll, Cl (2) AdI,BA,CAN (1) a-cells of pancreas secrete glucagon (3) Ad, Bel, CA (4) Ad, Bil, C-l (2) a-cells of pancreas secrete insulin Ans. (1) (3) Glucagon stimulates glycogenolysis",
    "options": [
      {
        "number": "1",
        "text": "Adl, Bll, Cl"
      },
      {
        "number": "2",
        "text": "AdI,BA,CAN"
      },
      {
        "number": "3",
        "text": "Ad, Bel, CA"
      },
      {
        "number": "4",
        "text": "Ad, Bil, C-l"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Adl, Bll, Cl",
    "answerOptionText": "Adl, Bll, Cl",
    "answerSourceText": "Ans. (1) (3) Glucagon stimulates glycogenolysis"
  },
  {
    "id": 125,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-125",
    "questionText": "125. Genus represents __. Statement Il : All organisms belonging to Reptilia (1) an individual plant or animal have three chambered heart. (2) a population of plants and animals In the light of the above statements, choose the (3) a group of closely related species most appropriate answer from the options given (4) a group of closely related families below : (1) Both Statement I and Statement II are correct",
    "rawSourceText": "125. Genus represents __. Statement Il : All organisms belonging to Reptilia (1) an individual plant or animal have three chambered heart. (2) a population of plants and animals In the light of the above statements, choose the (3) a group of closely related species most appropriate answer from the options given (4) a group of closely related families below : Ans. (3) (1) Both Statement I and Statement II are correct",
    "options": [
      {
        "number": "1",
        "text": "an individual plant or animal have three chambered heart."
      },
      {
        "number": "2",
        "text": "a population of plants and animals In the light of the above statements, choose the"
      },
      {
        "number": "3",
        "text": "a group of closely related species most appropriate answer from the options given"
      },
      {
        "number": "4",
        "text": "a group of closely related families below :"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - a group of closely related species most appropriate answer from the options given",
    "answerOptionText": "a group of closely related species most appropriate answer from the options given",
    "answerSourceText": "Ans. (3) (1) Both Statement I and Statement II are correct"
  },
  {
    "id": 126,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-126",
    "questionText": "126. Which of the following is not a prokaryote ? (2) Both Statement I and Statement Il are incorrect (1) Bacteria (3) Statement I is correct but Statement II is (2) Blue green algae incorrect (3) Mi la: (3) Mycoplasma (4) Statement I is incorrect but Statement II is (4) Fungi correct",
    "rawSourceText": "126. Which of the following is not a prokaryote ? (2) Both Statement I and Statement Il are incorrect (1) Bacteria (3) Statement I is correct but Statement II is (2) Blue green algae incorrect (3) Mi la: (3) Mycoplasma (4) Statement I is incorrect but Statement II is (4) Fungi correct Ans. (4) Ans. (3)",
    "options": [
      {
        "number": "2",
        "text": "Both Statement I and Statement Il are incorrect"
      },
      {
        "number": "1",
        "text": "Bacteria"
      },
      {
        "number": "3",
        "text": "Statement I is correct but Statement II is"
      },
      {
        "number": "4",
        "text": "Statement I is incorrect but Statement II is"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Statement I is correct but Statement II is",
    "answerOptionText": "Statement I is correct but Statement II is",
    "answerSourceText": "Ans. (3)"
  },
  {
    "id": 127,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-127",
    "questionText": "127. Which of the following plant growth regulators |",
    "rawSourceText": "127. Which of the following plant growth regulators |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 128,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-128",
    "questionText": "128. The correct sequence of adult cell cycle phases is . (2) Both Statement I and Statement Il are false (1) G1-G2-S-M (2) G1-M-G2-S (3) Statement I is correct, but Statement I] is false (3) G1-S-G2-M (4) S-M-G2-G1 (4) Statement I is incorrect, but Statement I] is true BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 5",
    "rawSourceText": "128. The correct sequence of adult cell cycle phases is . (2) Both Statement I and Statement Il are false (1) G1-G2-S-M (2) G1-M-G2-S (3) Statement I is correct, but Statement I] is false (3) G1-S-G2-M (4) S-M-G2-G1 (4) Statement I is incorrect, but Statement I] is true Ans. (3) Ans. (3) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 5",
    "options": [
      {
        "number": "2",
        "text": "Both Statement I and Statement Il are false"
      },
      {
        "number": "1",
        "text": "G1-G2-S-M"
      },
      {
        "number": "3",
        "text": "Statement I is correct, but Statement I] is false"
      },
      {
        "number": "4",
        "text": "S-M-G2-G1"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Statement I is correct, but Statement I] is false",
    "answerOptionText": "Statement I is correct, but Statement I] is false",
    "answerSourceText": "Ans. (3) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 5"
  },
  {
    "id": 129,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-129",
    "questionText": "129. Match List-I with List-Il. . . List-I List-II (1) has ribosomes attached to its surface (2) is the major site for the synthesis of lipids A. Fusion of protoplasms I. Meiosis between gametes (3) is actively involved in protein synthesis B. Fusion of two nuclei \u2018I. Plasmogamy (4) is a site for the synthesis of carbohydrates C. Generation of Ill. Karyogamy haploid spores Choose the correct answer from the options given",
    "rawSourceText": "129. Match List-I with List-Il. . . List-I List-II (1) has ribosomes attached to its surface (2) is the major site for the synthesis of lipids A. Fusion of protoplasms I. Meiosis between gametes (3) is actively involved in protein synthesis B. Fusion of two nuclei \u2018I. Plasmogamy (4) is a site for the synthesis of carbohydrates C. Generation of Ill. Karyogamy Ans. (2) haploid spores Choose the correct answer from the options given",
    "options": [
      {
        "number": "1",
        "text": "has ribosomes attached to its surface"
      },
      {
        "number": "2",
        "text": "is the major site for the synthesis of lipids A. Fusion of protoplasms I. Meiosis between gametes"
      },
      {
        "number": "3",
        "text": "is actively involved in protein synthesis B. Fusion of two nuclei \u2018I. Plasmogamy"
      },
      {
        "number": "4",
        "text": "is a site for the synthesis of carbohydrates C. Generation of Ill. Karyogamy"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - is the major site for the synthesis of lipids A. Fusion of protoplasms I. Meiosis between gametes",
    "answerOptionText": "is the major site for the synthesis of lipids A. Fusion of protoplasms I. Meiosis between gametes",
    "answerSourceText": "Ans. (2) haploid spores Choose the correct answer from the options given"
  },
  {
    "id": 130,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-130",
    "questionText": "130. Given below are two statements : (4) B-cells of pancreas secrete insulin Statement I : The class name Reptilia refers to creeping or crawling mode of locomotion.",
    "rawSourceText": "130. Given below are two statements : (4) B-cells of pancreas secrete insulin Statement I : The class name Reptilia refers to Ans. (2) creeping or crawling mode of locomotion.",
    "options": [
      {
        "number": "4",
        "text": "B-cells of pancreas secrete insulin Statement I : The class name Reptilia refers to"
      },
      {
        "number": "2",
        "text": "creeping or crawling mode of locomotion."
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - creeping or crawling mode of locomotion.",
    "answerOptionText": "creeping or crawling mode of locomotion.",
    "answerSourceText": "Ans. (2) creeping or crawling mode of locomotion."
  },
  {
    "id": 131,
    "subject": "Biology",
    "sourcePage": 27,
    "slug": "neet-2026-question-131",
    "questionText": "131. Given below are two statements : promotes internode elongation prior to flowering in Statement I : Chromosomes are fully condensed cabbage ? at the end of prophase I. (1) Abscisic acid Statement II : Meiosis | resembles mitosis. (2) Gibberellin In the light of the above statements, choose the (3) Indole butyric acid . | . most appropriate answer from the options given (4) Ethephon below : (1) Both Statement I and Statement Il are true",
    "rawSourceText": "131. Given below are two statements : promotes internode elongation prior to flowering in Statement I : Chromosomes are fully condensed cabbage ? at the end of prophase I. (1) Abscisic acid Statement II : Meiosis | resembles mitosis. (2) Gibberellin In the light of the above statements, choose the (3) Indole butyric acid . | . most appropriate answer from the options given (4) Ethephon below : Ans. (2) (1) Both Statement I and Statement Il are true",
    "options": [
      {
        "number": "1",
        "text": "Abscisic acid Statement II : Meiosis | resembles mitosis."
      },
      {
        "number": "2",
        "text": "Gibberellin In the light of the above statements, choose the"
      },
      {
        "number": "3",
        "text": "Indole butyric acid . | . most appropriate answer from the options given"
      },
      {
        "number": "4",
        "text": "Ethephon below :"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Gibberellin In the light of the above statements, choose the",
    "answerOptionText": "Gibberellin In the light of the above statements, choose the",
    "answerSourceText": "Ans. (2) (1) Both Statement I and Statement Il are true"
  },
  {
    "id": 132,
    "subject": "Biology",
    "sourcePage": 28,
    "slug": "neet-2026-question-132",
    "questionText": "132. Which of the following is not a characteristic of |",
    "rawSourceText": "132. Which of the following is not a characteristic of |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 133,
    "subject": "Biology",
    "sourcePage": 28,
    "slug": "neet-2026-question-133",
    "questionText": "133. Length of the stem at time 0 is 20 cm. The",
    "rawSourceText": "133. Length of the stem at time 0 is 20 cm. The",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 134,
    "subject": "Biology",
    "sourcePage": 28,
    "slug": "neet-2026-question-134",
    "questionText": "134. Arrange the following elements in descending order of their contribution to percentage weight of the human body.",
    "rawSourceText": "134. Arrange the following elements in descending order Ans. (1) of their contribution to percentage weight of the human body.",
    "options": [
      {
        "number": "1",
        "text": "of their contribution to percentage weight of the human body."
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - of their contribution to percentage weight of the human body.",
    "answerOptionText": "of their contribution to percentage weight of the human body.",
    "answerSourceText": "Ans. (1) of their contribution to percentage weight of the human body."
  },
  {
    "id": 135,
    "subject": "Biology",
    "sourcePage": 28,
    "slug": "neet-2026-question-135",
    "questionText": "135. In frogs, the number of pairs of cranial nerves ? chordates ? arising from the brain are : (1) Presence of notochord (2) Central nervous system is dorsal (6 (2) 9 (3) Absence of gills (3) 10 (4) 12 (4) Presence of post anal part (tail)",
    "rawSourceText": "135. In frogs, the number of pairs of cranial nerves ? chordates ? arising from the brain are : (1) Presence of notochord (2) Central nervous system is dorsal (6 (2) 9 (3) Absence of gills (3) 10 (4) 12 (4) Presence of post anal part (tail) Ans. (3) Ans. (3)",
    "options": [
      {
        "number": "1",
        "text": "Presence of notochord"
      },
      {
        "number": "2",
        "text": "Central nervous system is dorsal (6"
      },
      {
        "number": "3",
        "text": "Absence of gills"
      },
      {
        "number": "4",
        "text": "12"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Absence of gills",
    "answerOptionText": "Absence of gills",
    "answerSourceText": "Ans. (3)"
  },
  {
    "id": 136,
    "subject": "Biology",
    "sourcePage": 28,
    "slug": "neet-2026-question-136",
    "questionText": "136. Which of the following is used as a clot buster? arithmetic growth rate is 30 cm per day. What is the (1) Streptokinase length of the stem at the end of the 7\"day ? ane (2) Penicillin (1) 50 cm (2) 170 cm (3) 230 cm (4) 460 cm (3) Cyclosporin A (4) Statins",
    "rawSourceText": "136. Which of the following is used as a clot buster? arithmetic growth rate is 30 cm per day. What is the (1) Streptokinase length of the stem at the end of the 7\"day ? ane (2) Penicillin (1) 50 cm (2) 170 cm (3) 230 cm (4) 460 cm (3) Cyclosporin A Ans. (3) (4) Statins",
    "options": [
      {
        "number": "1",
        "text": "Streptokinase length of the stem at the end of the 7\"day ? ane"
      },
      {
        "number": "2",
        "text": "Penicillin"
      },
      {
        "number": "3",
        "text": "230 cm"
      },
      {
        "number": "4",
        "text": "460 cm"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - 230 cm",
    "answerOptionText": "230 cm",
    "answerSourceText": "Ans. (3) (4) Statins"
  },
  {
    "id": 137,
    "subject": "Biology",
    "sourcePage": 28,
    "slug": "neet-2026-question-137",
    "questionText": "137. The inactive form of Bt toxin is converted to the (a) Oxygen (b) Carbon active form in the insect gut . Hyd: (d) Nit (\u00a9) Hydrogen (4) Nitrogen (1) due to alkaline pH Choose the correct answer from the options given below : (2) due to acidic pH (1) (a), {b), (0), (d) (2) (0), (@), (b), (d) (3) by proteases 3)(b, (0, ) (4)(b),\u20ac),(, () (4) by nucleases Here's your chance torank upin 2 NEET (UG) 2027 wis ~ . , A Online Courses | ii 30June'26 r em, any f EEE ene BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 6",
    "rawSourceText": "137. The inactive form of Bt toxin is converted to the (a) Oxygen (b) Carbon active form in the insect gut . Hyd: (d) Nit (\u00a9) Hydrogen (4) Nitrogen (1) due to alkaline pH Choose the correct answer from the options given below : (2) due to acidic pH (1) (a), {b), (0), (d) (2) (0), (@), (b), (d) (3) by proteases 3)(b, (0, ) (4)(b),\u20ac),(, () (4) by nucleases Ans. (1) Ans. (1) Here's your chance torank upin 2 NEET (UG) 2027 wis ~ . , A Online Courses | ii 30June'26 r em, any f EEE ene BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 6",
    "options": [
      {
        "number": "4",
        "text": "Nitrogen"
      },
      {
        "number": "1",
        "text": "due to alkaline pH Choose the correct answer from the options given below :"
      },
      {
        "number": "2",
        "text": "due to acidic pH"
      },
      {
        "number": "3",
        "text": "by proteases 3)(b, (0, ) (4)(b),\u20ac),(, ()"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - due to alkaline pH Choose the correct answer from the options given below :",
    "answerOptionText": "due to alkaline pH Choose the correct answer from the options given below :",
    "answerSourceText": "Ans. (1) Here's your chance torank upin 2 NEET (UG) 2027 wis ~ . , A Online Courses | ii 30June'26 r em, any f EEE ene BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 6"
  },
  {
    "id": 138,
    "subject": "Biology",
    "sourcePage": 29,
    "slug": "neet-2026-question-138",
    "questionText": "138. Given below are two statements :",
    "rawSourceText": "138. Given below are two statements :",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 139,
    "subject": "Biology",
    "sourcePage": 29,
    "slug": "neet-2026-question-139",
    "questionText": "139. Which of the following disease is not sexually asa etterentia transmitted ? (4) Infundibulum (1) Syphilis (2) Tuberculosis (3) Gonorrhoea (4) Genital warts s. (4)",
    "rawSourceText": "139. Which of the following disease is not sexually asa etterentia transmitted ? (4) Infundibulum (1) Syphilis (2) Tuberculosis Ans. (4) (3) Gonorrhoea (4) Genital warts s. (4) Ans. (2)",
    "options": [
      {
        "number": "4",
        "text": "Infundibulum"
      },
      {
        "number": "1",
        "text": "Syphilis"
      },
      {
        "number": "2",
        "text": "Tuberculosis"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Tuberculosis",
    "answerOptionText": "Tuberculosis",
    "answerSourceText": "Ans. (2)"
  },
  {
    "id": 140,
    "subject": "Biology",
    "sourcePage": 29,
    "slug": "neet-2026-question-140",
    "questionText": "140. Sperm motility is due to . number of species in the Amazonian rain forest. (1) flagellar movement (2) ciliary movement (a) Plants (3) amoeboid movement (b) Birds (4) muscular movement (c) Fishes",
    "rawSourceText": "140. Sperm motility is due to . number of species in the Amazonian rain forest. (1) flagellar movement (2) ciliary movement (a) Plants (3) amoeboid movement (b) Birds (4) muscular movement Ans. (1) (c) Fishes",
    "options": [
      {
        "number": "1",
        "text": "flagellar movement"
      },
      {
        "number": "2",
        "text": "ciliary movement (a) Plants"
      },
      {
        "number": "3",
        "text": "amoeboid movement (b) Birds"
      },
      {
        "number": "4",
        "text": "muscular movement"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - flagellar movement",
    "answerOptionText": "flagellar movement",
    "answerSourceText": "Ans. (1) (c) Fishes"
  },
  {
    "id": 141,
    "subject": "Biology",
    "sourcePage": 29,
    "slug": "neet-2026-question-141",
    "questionText": "141. Natural selection can lead to . (d) Invertebrates (a) stabilisation (b) genetic drift (e) Mammals (2) directional change (4) disruption Choose the correct answer from the options given Choose the correct answer from the options given below : below : (1) (a) only (1) (<)> (b) > @) > (e) > @) 2) (2) (6) and (@) only 2 @>@>~>0>( (3) (@), (0), (c) and (d) (4) (a) and (c) only (3) (e) > (6) > (a) >) > d) (4) (b) > fa) >) > () > (e) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 7",
    "rawSourceText": "141. Natural selection can lead to . (d) Invertebrates (a) stabilisation (b) genetic drift (e) Mammals (2) directional change (4) disruption Choose the correct answer from the options given Choose the correct answer from the options given below : below : (1) (a) only (1) (<)> (b) > @) > (e) > @) 2) (2) (6) and (@) only 2 @>@>~>0>( (3) (@), (0), (c) and (d) (4) (a) and (c) only (3) (e) > (6) > (a) >) > d) Ans. (2) (4) (b) > fa) >) > () > (e) Ans. (2) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 7",
    "options": [
      {
        "number": "2",
        "text": "directional change"
      },
      {
        "number": "4",
        "text": "disruption Choose the correct answer from the options given Choose the correct answer from the options given below : below :"
      },
      {
        "number": "1",
        "text": "(a) only"
      },
      {
        "number": "3",
        "text": "(@), (0), (c) and (d)"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - directional change",
    "answerOptionText": "directional change",
    "answerSourceText": "Ans. (2) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 7"
  },
  {
    "id": 142,
    "subject": "Biology",
    "sourcePage": 29,
    "slug": "neet-2026-question-142",
    "questionText": "142. The method of directly of injecting a sperm into Statement I: Down's syndrome is caused by the ovum in assisted reproductive technology is called : absence of one of the X-chromosomes. Statement II : Turner's syndrome is caused by the (1) Gamete intra fallopian transfer (GIFT) Presence of an additional copy of the (2) Zygote intra fallopian transfer (ZIFT) chromosomes. In the light of the above statements, choose the (3) Intra cytoplasmic sperm injection (ICSI) correct answer from the options given below : (4) Embryo transfer (ET) (1) Both Statement I and Statement II are correct (2) Both Statement I and Statement II are .",
    "rawSourceText": "142. The method of directly of injecting a sperm into Statement I: Down's syndrome is caused by the ovum in assisted reproductive technology is called : absence of one of the X-chromosomes. Statement II : Turner's syndrome is caused by the (1) Gamete intra fallopian transfer (GIFT) Presence of an additional copy of the (2) Zygote intra fallopian transfer (ZIFT) chromosomes. In the light of the above statements, choose the (3) Intra cytoplasmic sperm injection (ICSI) correct answer from the options given below : (4) Embryo transfer (ET) (1) Both Statement I and Statement II are correct Ans. (3) (2) Both Statement I and Statement II are .",
    "options": [
      {
        "number": "1",
        "text": "Gamete intra fallopian transfer (GIFT) Presence of an additional copy of the"
      },
      {
        "number": "2",
        "text": "Zygote intra fallopian transfer (ZIFT) chromosomes. In the light of the above statements, choose the"
      },
      {
        "number": "3",
        "text": "Intra cytoplasmic sperm injection (ICSI) correct answer from the options given below :"
      },
      {
        "number": "4",
        "text": "Embryo transfer (ET)"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Intra cytoplasmic sperm injection (ICSI) correct answer from the options given below :",
    "answerOptionText": "Intra cytoplasmic sperm injection (ICSI) correct answer from the options given below :",
    "answerSourceText": "Ans. (3) (2) Both Statement I and Statement II are ."
  },
  {
    "id": 143,
    "subject": "Biology",
    "sourcePage": 29,
    "slug": "neet-2026-question-143",
    "questionText": "143. Which of the following structure is not a part of the incorrect (3) Statement I is correct but Statement II is male reproductive system ? incorrect . (4) Statement I is incorrect but Statement II is (1) Rete testis correct (2) Epididymis (3) Vasa efferenti",
    "rawSourceText": "143. Which of the following structure is not a part of the incorrect (3) Statement I is correct but Statement II is male reproductive system ? incorrect . (4) Statement I is incorrect but Statement II is (1) Rete testis correct (2) Epididymis Ans. (2) (3) Vasa efferenti",
    "options": [
      {
        "number": "3",
        "text": "Statement I is correct but Statement II is male reproductive system ? incorrect ."
      },
      {
        "number": "4",
        "text": "Statement I is incorrect but Statement II is"
      },
      {
        "number": "1",
        "text": "Rete testis correct"
      },
      {
        "number": "2",
        "text": "Epididymis"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Epididymis",
    "answerOptionText": "Epididymis",
    "answerSourceText": "Ans. (2) (3) Vasa efferenti"
  },
  {
    "id": 144,
    "subject": "Biology",
    "sourcePage": 29,
    "slug": "neet-2026-question-144",
    "questionText": "144. Arrange the following in descending order of",
    "rawSourceText": "144. Arrange the following in descending order of",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 145,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-145",
    "questionText": "Question 145 source text could not be isolated cleanly from the embedded PDF text layer. Review the source-page excerpt for crawlable context.",
    "rawSourceText": "149. Given below are two statements : 148. Match List-I with List-H. Statement I : Ovulation is caused by LH surge List List-II A. Excess I. Reabsorption of water leading to rupture of Graafian follicles. growth and electrolytes in . . _ hormone kidney Statement II : Graafian follicle remaining after B. Luteinizing IL Contraction of uterus ovulation transform into corpus luteum and secretes hormone during child birth C. Vasopressin Ill. | Acromegaly large amount of estrogen. D. Oxytocin IV. Ovulation In the light of the above statements, choose the Choose the correct answer from the options given below : most appropriate answer from the options given (1) Adil, BIV, Cll, DI (2) Adll, BIV, CA, Dil below : (3) Ad, BIV, Cl, DI (4) ATV, Bll, C1, DAI (1) Both Statement I and Statement II are Ans. (2) 149. The opening between the right atrium and the right correct ventricle is guarded by . (2) Both Statement I and Statement II are (1) bicuspid valve (2) tricuspid valve incorrect (3) semilunar valve (4) sino-atrial node (3) Statement I is correct but Statement II is Ans. (2) 150. Sponges exchange O, with CO, by : i t incorrec (1) simple diffusion over their entire body surfaces (4) Statement I is incorrect but Statement II is (2) moist cuticle correct (3) tracheal tubes (4) gills Ans. (3) (4) gi Ans. (1) 146. Which of the following are primary consumers in a 151. How many theca are present in each lobe of a food chain ? typical bilobed angiosperm anther ? (1) Parasites (2) Predators (1) 2 (2) 6 (3) 8 (4) 12 (3) Herbivores (4) Carnivores Ans. (1) Ans. (3) 152. Muscle contraction is initiated by a signal sent by the 147. A_ population of diploid organisms is at central nervous system by the release of ___\u2014 (1) acetyl choline Hardy-Weinberg equilibrium. If the frequency of (2) acetyl coenzyme A allele A is 0.1, the frequency of AA is : (3) cyclic guanine monophosphate (1) 0.01 (2) 0.02 (4) cyclic adenine monophosphate (3) 0.10 (4) 0.99 Ans. (1) Ans. (1) BIOLOGY | NEET 2026 Qu\u2026",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 146,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-146",
    "questionText": "146. Which of the following are primary consumers in a",
    "rawSourceText": "146. Which of the following are primary consumers in a",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 147,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-147",
    "questionText": "147. A_ population of diploid organisms is at central nervous system by the release of ___\u2014 (1) acetyl choline Hardy-Weinberg equilibrium. If the frequency of (2) acetyl coenzyme A allele A is 0.1, the frequency of AA is : (3) cyclic guanine monophosphate (1) 0.01 (2) 0.02 (4) cyclic adenine monophosphate (3) 0.10 (4) 0.99 BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 8",
    "rawSourceText": "147. A_ population of diploid organisms is at central nervous system by the release of ___\u2014 (1) acetyl choline Hardy-Weinberg equilibrium. If the frequency of (2) acetyl coenzyme A allele A is 0.1, the frequency of AA is : (3) cyclic guanine monophosphate (1) 0.01 (2) 0.02 (4) cyclic adenine monophosphate (3) 0.10 (4) 0.99 Ans. (1) Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 8",
    "options": [
      {
        "number": "1",
        "text": "acetyl choline Hardy-Weinberg equilibrium. If the frequency of"
      },
      {
        "number": "2",
        "text": "acetyl coenzyme A allele A is 0.1, the frequency of AA is :"
      },
      {
        "number": "3",
        "text": "cyclic guanine monophosphate"
      },
      {
        "number": "4",
        "text": "cyclic adenine monophosphate"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - acetyl choline Hardy-Weinberg equilibrium. If the frequency of",
    "answerOptionText": "acetyl choline Hardy-Weinberg equilibrium. If the frequency of",
    "answerSourceText": "Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 8"
  },
  {
    "id": 148,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-148",
    "questionText": "148. Match List-I with List-H. Statement I : Ovulation is caused by LH surge List List-II A. Excess I. Reabsorption of water leading to rupture of Graafian follicles. growth and electrolytes in . . _ hormone kidney Statement II : Graafian follicle remaining after B. Luteinizing IL Contraction of uterus ovulation transform into corpus luteum and secretes hormone during child birth C. Vasopressin Ill. | Acromegaly large amount of estrogen. D. Oxytocin IV. Ovulation In the light of the above statements, choose the Choose the correct answer from the options given below : most appropriate answer from the options given (1) Adil, BIV, Cll, DI (2) Adll, BIV, CA, Dil below : (3) Ad, BIV, Cl, DI (4) ATV, Bll, C1, DAI (1) Both Statement I and Statement II are",
    "rawSourceText": "148. Match List-I with List-H. Statement I : Ovulation is caused by LH surge List List-II A. Excess I. Reabsorption of water leading to rupture of Graafian follicles. growth and electrolytes in . . _ hormone kidney Statement II : Graafian follicle remaining after B. Luteinizing IL Contraction of uterus ovulation transform into corpus luteum and secretes hormone during child birth C. Vasopressin Ill. | Acromegaly large amount of estrogen. D. Oxytocin IV. Ovulation In the light of the above statements, choose the Choose the correct answer from the options given below : most appropriate answer from the options given (1) Adil, BIV, Cll, DI (2) Adll, BIV, CA, Dil below : (3) Ad, BIV, Cl, DI (4) ATV, Bll, C1, DAI (1) Both Statement I and Statement II are Ans. (2)",
    "options": [
      {
        "number": "1",
        "text": "Adil, BIV, Cll, DI"
      },
      {
        "number": "2",
        "text": "Adll, BIV, CA, Dil below :"
      },
      {
        "number": "3",
        "text": "Ad, BIV, Cl, DI"
      },
      {
        "number": "4",
        "text": "ATV, Bll, C1, DAI"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Adll, BIV, CA, Dil below :",
    "answerOptionText": "Adll, BIV, CA, Dil below :",
    "answerSourceText": "Ans. (2)"
  },
  {
    "id": 149,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-149",
    "questionText": "149. The opening between the right atrium and the right correct ventricle is guarded by . (2) Both Statement I and Statement II are (1) bicuspid valve (2) tricuspid valve incorrect (3) semilunar valve (4) sino-atrial node (3) Statement I is correct but Statement II is",
    "rawSourceText": "149. The opening between the right atrium and the right correct ventricle is guarded by . (2) Both Statement I and Statement II are (1) bicuspid valve (2) tricuspid valve incorrect (3) semilunar valve (4) sino-atrial node (3) Statement I is correct but Statement II is Ans. (2)",
    "options": [
      {
        "number": "2",
        "text": "Both Statement I and Statement II are"
      },
      {
        "number": "1",
        "text": "bicuspid valve"
      },
      {
        "number": "3",
        "text": "semilunar valve"
      },
      {
        "number": "4",
        "text": "sino-atrial node"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Both Statement I and Statement II are",
    "answerOptionText": "Both Statement I and Statement II are",
    "answerSourceText": "Ans. (2)"
  },
  {
    "id": 150,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-150",
    "questionText": "150. Sponges exchange O, with CO, by : i t incorrec (1) simple diffusion over their entire body surfaces (4) Statement I is incorrect but Statement II is (2) moist cuticle correct (3) tracheal tubes (4) gills (4) gi",
    "rawSourceText": "150. Sponges exchange O, with CO, by : i t incorrec (1) simple diffusion over their entire body surfaces (4) Statement I is incorrect but Statement II is (2) moist cuticle correct (3) tracheal tubes (4) gills Ans. (3) (4) gi Ans. (1)",
    "options": [
      {
        "number": "1",
        "text": "simple diffusion over their entire body surfaces"
      },
      {
        "number": "4",
        "text": "Statement I is incorrect but Statement II is"
      },
      {
        "number": "2",
        "text": "moist cuticle correct"
      },
      {
        "number": "3",
        "text": "tracheal tubes"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - simple diffusion over their entire body surfaces",
    "answerOptionText": "simple diffusion over their entire body surfaces",
    "answerSourceText": "Ans. (1)"
  },
  {
    "id": 151,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-151",
    "questionText": "151. How many theca are present in each lobe of a food chain ? typical bilobed angiosperm anther ? (1) Parasites (2) Predators (1) 2 (2) 6 (3) 8 (4) 12 (3) Herbivores (4) Carnivores",
    "rawSourceText": "151. How many theca are present in each lobe of a food chain ? typical bilobed angiosperm anther ? (1) Parasites (2) Predators (1) 2 (2) 6 (3) 8 (4) 12 (3) Herbivores (4) Carnivores Ans. (1) Ans. (3)",
    "options": [
      {
        "number": "1",
        "text": "Parasites"
      },
      {
        "number": "2",
        "text": "Predators"
      },
      {
        "number": "4",
        "text": "12"
      },
      {
        "number": "3",
        "text": "Herbivores"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Herbivores",
    "answerOptionText": "Herbivores",
    "answerSourceText": "Ans. (3)"
  },
  {
    "id": 152,
    "subject": "Biology",
    "sourcePage": 30,
    "slug": "neet-2026-question-152",
    "questionText": "152. Muscle contraction is initiated by a signal sent by the",
    "rawSourceText": "152. Muscle contraction is initiated by a signal sent by the",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 153,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-153",
    "questionText": "153. Which of the following statements about lac-operon |",
    "rawSourceText": "153. Which of the following statements about lac-operon |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 154,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-154",
    "questionText": "154. Which of the following in female gametophyte of an vertebra, sacrum angiosperm helps in guiding the pollen tube for (4) Cervical vertebra, thoracic vertebra, lumbar fertilizing the eggs ? vertebra, sacrum (1) Antipodals (2) Synergids (3) Central cells (4) Polar nucleus",
    "rawSourceText": "154. Which of the following in female gametophyte of an vertebra, sacrum angiosperm helps in guiding the pollen tube for (4) Cervical vertebra, thoracic vertebra, lumbar fertilizing the eggs ? vertebra, sacrum (1) Antipodals (2) Synergids Ans. (4) (3) Central cells (4) Polar nucleus",
    "options": [
      {
        "number": "4",
        "text": "Cervical vertebra, thoracic vertebra, lumbar fertilizing the eggs ? vertebra, sacrum"
      },
      {
        "number": "1",
        "text": "Antipodals"
      },
      {
        "number": "2",
        "text": "Synergids"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Cervical vertebra, thoracic vertebra, lumbar fertilizing the eggs ? vertebra, sacrum",
    "answerOptionText": "Cervical vertebra, thoracic vertebra, lumbar fertilizing the eggs ? vertebra, sacrum",
    "answerSourceText": "Ans. (4) (3) Central cells (4) Polar nucleus"
  },
  {
    "id": 155,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-155",
    "questionText": "155. Which of the following plant produces non-albuminous (1) Convergent evolution of traits like wings of birds seeds ? and butterflies (1) Wheat (2) Maize (2) Paleontological evidence from fossil records (3) Barley (4) Pea (3) Embryological support for evolution as proposed by Ernst Heckel",
    "rawSourceText": "155. Which of the following plant produces non-albuminous (1) Convergent evolution of traits like wings of birds seeds ? and butterflies (1) Wheat (2) Maize (2) Paleontological evidence from fossil records (3) Barley (4) Pea (3) Embryological support for evolution as proposed Ans. (4) by Ernst Heckel",
    "options": [
      {
        "number": "1",
        "text": "Convergent evolution of traits like wings of birds seeds ? and butterflies"
      },
      {
        "number": "2",
        "text": "Maize"
      },
      {
        "number": "3",
        "text": "Barley"
      },
      {
        "number": "4",
        "text": "Pea"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Pea",
    "answerOptionText": "Pea",
    "answerSourceText": "Ans. (4) by Ernst Heckel"
  },
  {
    "id": 156,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-156",
    "questionText": "156. If the diploid chromosome number of typical (4) Divergent evolution of anatomical structures such : as forelimbs angiosperm is 36, what would be the chromosome . number in its endosperm ? (1) 18 (2) 36",
    "rawSourceText": "156. If the diploid chromosome number of typical (4) Divergent evolution of anatomical structures such : as forelimbs angiosperm is 36, what would be the chromosome . Ans. (3) number in its endosperm ? (1) 18 (2) 36",
    "options": [
      {
        "number": "4",
        "text": "Divergent evolution of anatomical structures such : as forelimbs angiosperm is 36, what would be the chromosome ."
      },
      {
        "number": "3",
        "text": "number in its endosperm ?"
      },
      {
        "number": "1",
        "text": "18"
      },
      {
        "number": "2",
        "text": "36"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - number in its endosperm ?",
    "answerOptionText": "number in its endosperm ?",
    "answerSourceText": "Ans. (3) number in its endosperm ? (1) 18 (2) 36"
  },
  {
    "id": 157,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-157",
    "questionText": "157. Which of the following statements about the Statement II: Homo sapiens arose around 75000 reabsorption process in Henle's loop are correct? to 10000 years ago. (a) The descending limb of Henle's loop is permeable to water but almost impermeable to electrolytes. In the light of the above statements, choose the (b) Urine gets concentrated in Henle\u2019s loop. most appropriate answer from the options given (c) Reabsorption of Na* and water takes place in Henle's loop. below : (d) Active or passive transport of electrolytes occurs (1) Both Statement I and Statement I are correct in the ascending limb of Henle's loop. ; Choose the correct answer from the options given (2) Both Statement Land Statement Il are incorrect below : (3) Statement Lis correct but Statement I] is incorrect (1) (a) and (b) only (2) (b), (c) and (d) only nos , (3) (2), (b) and (\u00a2) only (4) (a), ) and (d) only (4) Statement Lis incorrect but Statement Il is correct BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 9",
    "rawSourceText": "157. Which of the following statements about the Statement II: Homo sapiens arose around 75000 reabsorption process in Henle's loop are correct? to 10000 years ago. (a) The descending limb of Henle's loop is permeable to water but almost impermeable to electrolytes. In the light of the above statements, choose the (b) Urine gets concentrated in Henle\u2019s loop. most appropriate answer from the options given (c) Reabsorption of Na* and water takes place in Henle's loop. below : (d) Active or passive transport of electrolytes occurs (1) Both Statement I and Statement I are correct in the ascending limb of Henle's loop. ; Choose the correct answer from the options given (2) Both Statement Land Statement Il are incorrect below : (3) Statement Lis correct but Statement I] is incorrect (1) (a) and (b) only (2) (b), (c) and (d) only nos , (3) (2), (b) and (\u00a2) only (4) (a), ) and (d) only (4) Statement Lis incorrect but Statement Il is correct Ans. (4) Ans. (4) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 9",
    "options": [
      {
        "number": "1",
        "text": "Both Statement I and Statement I are correct in the ascending limb of Henle's loop. ; Choose the correct answer from the options given"
      },
      {
        "number": "2",
        "text": "Both Statement Land Statement Il are incorrect below :"
      },
      {
        "number": "3",
        "text": "Statement Lis correct but Statement I] is incorrect"
      },
      {
        "number": "4",
        "text": "(a), ) and (d) only"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - (a), ) and (d) only",
    "answerOptionText": "(a), ) and (d) only",
    "answerSourceText": "Ans. (4) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 9"
  },
  {
    "id": 158,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-158",
    "questionText": "158. Which of the following is the correct order of is correct? arrangement of vertebrate column from the head to (1) Gene i is constitutively expressed toe? (2) Lactose activates repressor to bind to the operator (1) Cervical vertebra, thoracic vertebra, sacrum, (3) Genes i, z, y and a share single common lumbar vertebra promoter (2) Sacrum, lumbar vertebra, thoracic vertebra, (4) Galactose can act as an inducer of lac operon cervical vertebra (3) Cervical vertebra, lumbar vertebra, thoracic",
    "rawSourceText": "158. Which of the following is the correct order of is correct? arrangement of vertebrate column from the head to (1) Gene i is constitutively expressed toe? (2) Lactose activates repressor to bind to the operator (1) Cervical vertebra, thoracic vertebra, sacrum, (3) Genes i, z, y and a share single common lumbar vertebra promoter (2) Sacrum, lumbar vertebra, thoracic vertebra, (4) Galactose can act as an inducer of lac operon cervical vertebra Ans. (1) (3) Cervical vertebra, lumbar vertebra, thoracic",
    "options": [
      {
        "number": "1",
        "text": "Gene i is constitutively expressed toe?"
      },
      {
        "number": "2",
        "text": "Lactose activates repressor to bind to the operator"
      },
      {
        "number": "3",
        "text": "Genes i, z, y and a share single common lumbar vertebra promoter"
      },
      {
        "number": "4",
        "text": "Galactose can act as an inducer of lac operon cervical vertebra"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Gene i is constitutively expressed toe?",
    "answerOptionText": "Gene i is constitutively expressed toe?",
    "answerSourceText": "Ans. (1) (3) Cervical vertebra, lumbar vertebra, thoracic"
  },
  {
    "id": 159,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-159",
    "questionText": "159. Which of the following is mot evidence for evolution?",
    "rawSourceText": "159. Which of the following is mot evidence for Ans. (2) evolution?",
    "options": [
      {
        "number": "2",
        "text": "evolution?"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - evolution?",
    "answerOptionText": "evolution?",
    "answerSourceText": "Ans. (2) evolution?"
  },
  {
    "id": 160,
    "subject": "Biology",
    "sourcePage": 31,
    "slug": "neet-2026-question-160",
    "questionText": "160. Given below are two statements : (3) 54 (4) 72 Statement I: Modern Homo sapiens arose in Australia and moved across continents.",
    "rawSourceText": "160. Given below are two statements : (3) 54 (4) 72 Statement I: Modern Homo sapiens arose in Ans. (3) Australia and moved across continents.",
    "options": [
      {
        "number": "3",
        "text": "54"
      },
      {
        "number": "4",
        "text": "72 Statement I: Modern Homo sapiens arose in"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - 54",
    "answerOptionText": "54",
    "answerSourceText": "Ans. (3) Australia and moved across continents."
  },
  {
    "id": 161,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-161",
    "questionText": "161. Consider a population of 10 million cells. Given the |",
    "rawSourceText": "161. Consider a population of 10 million cells. Given the |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 162,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-162",
    "questionText": "162. During PCR, primers bind to the DNA strands in (1) (a) and (b) only (2) (b) and (c) only the____step. (3) (b) and (d) only (4) (a) and (d) only (1) denaturation (2) extension (3) annealing (4) ligation",
    "rawSourceText": "162. During PCR, primers bind to the DNA strands in (1) (a) and (b) only (2) (b) and (c) only the____step. (3) (b) and (d) only (4) (a) and (d) only (1) denaturation (2) extension Ans. (2) (3) annealing (4) ligation",
    "options": [
      {
        "number": "1",
        "text": "(a) and (b) only"
      },
      {
        "number": "2",
        "text": "(b) and (c) only the____step."
      },
      {
        "number": "3",
        "text": "(b) and (d) only"
      },
      {
        "number": "4",
        "text": "(a) and (d) only"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - (b) and (c) only the____step.",
    "answerOptionText": "(b) and (c) only the____step.",
    "answerSourceText": "Ans. (2) (3) annealing (4) ligation"
  },
  {
    "id": 163,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-163",
    "questionText": "163. Given below are two statements: one is labelled as (1) hcG (2) Estrogen Assertion A and the other is labelled as Reason R. (3) Progesterone (4)LH Assertion A: The logistic growth model of populations is considered more realistic than the |",
    "rawSourceText": "163. Given below are two statements: one is labelled as (1) hcG (2) Estrogen Assertion A and the other is labelled as Reason R. (3) Progesterone (4)LH Assertion A: The logistic growth model of Ans. (4) populations is considered more realistic than the |",
    "options": [
      {
        "number": "1",
        "text": "hcG"
      },
      {
        "number": "2",
        "text": "Estrogen Assertion A and the other is labelled as Reason R."
      },
      {
        "number": "3",
        "text": "Progesterone (4)LH Assertion A: The logistic growth model of"
      },
      {
        "number": "4",
        "text": "populations is considered more realistic than the |"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - populations is considered more realistic than the |",
    "answerOptionText": "populations is considered more realistic than the |",
    "answerSourceText": "Ans. (4) populations is considered more realistic than the |"
  },
  {
    "id": 164,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-164",
    "questionText": "164. Adaptive radiation in placental mammals and correct Australian Marsupials leading to similarity between (2) Both Statement I and Statement II are distant species is an example of . incorrect . . . (3) Statement I is correct but Statement II is (1) divergent evolution (2) convergent evolution incorrect (3) founder effect (4) genetic drift (4) Statement I is incorrect but Statement II is correct BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 10",
    "rawSourceText": "164. Adaptive radiation in placental mammals and correct Australian Marsupials leading to similarity between (2) Both Statement I and Statement II are distant species is an example of . incorrect . . . (3) Statement I is correct but Statement II is (1) divergent evolution (2) convergent evolution incorrect (3) founder effect (4) genetic drift (4) Statement I is incorrect but Statement II is Ans. (2) correct Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 10",
    "options": [
      {
        "number": "2",
        "text": "Both Statement I and Statement II are distant species is an example of . incorrect . . ."
      },
      {
        "number": "3",
        "text": "Statement I is correct but Statement II is"
      },
      {
        "number": "1",
        "text": "divergent evolution"
      },
      {
        "number": "4",
        "text": "genetic drift"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - divergent evolution",
    "answerOptionText": "divergent evolution",
    "answerSourceText": "Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 10"
  },
  {
    "id": 165,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-165",
    "questionText": "165. Which of the following are secondary lymphoid per-capita birth rate of 0.002 (per unit time) and the organs ? per-capita death rate of 0.002 (per unit time), the (a) Bone marrow expected number of cells after 10 generations is (b) Tonsils . (c) Spleen (1) 1 million (2) 5 million (d) Thymus (3) 10 million (4) 100 million Choose the correct answer from the options given below :",
    "rawSourceText": "165. Which of the following are secondary lymphoid per-capita birth rate of 0.002 (per unit time) and the organs ? per-capita death rate of 0.002 (per unit time), the (a) Bone marrow expected number of cells after 10 generations is (b) Tonsils . (c) Spleen (1) 1 million (2) 5 million (d) Thymus (3) 10 million (4) 100 million Choose the correct answer from the options given Ans. (3) below :",
    "options": [
      {
        "number": "1",
        "text": "1 million"
      },
      {
        "number": "2",
        "text": "5 million (d) Thymus"
      },
      {
        "number": "3",
        "text": "10 million"
      },
      {
        "number": "4",
        "text": "100 million Choose the correct answer from the options given"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - 10 million",
    "answerOptionText": "10 million",
    "answerSourceText": "Ans. (3) below :"
  },
  {
    "id": 166,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-166",
    "questionText": "166. Which of the following hormone is not secreted by human placenta ?",
    "rawSourceText": "166. Which of the following hormone is not secreted by Ans. (3) human placenta ?",
    "options": [
      {
        "number": "3",
        "text": "human placenta ?"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - human placenta ?",
    "answerOptionText": "human placenta ?",
    "answerSourceText": "Ans. (3) human placenta ?"
  },
  {
    "id": 167,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-167",
    "questionText": "167. Which of the following enzymes synthesizes exponential growth model. precursor mRNA ? Reason R: Resources are finite. (1) RNA polymerase! (2) RNA polymerase II In the light of the above statements, choose the (3) RNA polymerase III (4) DNA polymerase most appropriate answer from the options given below:",
    "rawSourceText": "167. Which of the following enzymes synthesizes exponential growth model. precursor mRNA ? Reason R: Resources are finite. (1) RNA polymerase! (2) RNA polymerase II In the light of the above statements, choose the (3) RNA polymerase III (4) DNA polymerase most appropriate answer from the options given Ans. (2) below:",
    "options": [
      {
        "number": "1",
        "text": "RNA polymerase!"
      },
      {
        "number": "2",
        "text": "RNA polymerase II In the light of the above statements, choose the"
      },
      {
        "number": "3",
        "text": "RNA polymerase III"
      },
      {
        "number": "4",
        "text": "DNA polymerase most appropriate answer from the options given"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - RNA polymerase II In the light of the above statements, choose the",
    "answerOptionText": "RNA polymerase II In the light of the above statements, choose the",
    "answerSourceText": "Ans. (2) below:"
  },
  {
    "id": 168,
    "subject": "Biology",
    "sourcePage": 32,
    "slug": "neet-2026-question-168",
    "questionText": "168. Given below are two statements : (1) Both A and R are correct and R is the correct Statement [ : Plasmids are autonomously explanation of A replicating DNA. (2) Both A and R are correct but R is not the Statement II: Plasmids are extrachromosomal correct explanation of A DNA. (3) A is correct but R is not correct In the light of the above statements, choose the (4) Ais not correct but Ris correct most appropriate answer from the options given below : . (1) Both Statement I and Statement II are",
    "rawSourceText": "168. Given below are two statements : (1) Both A and R are correct and R is the correct Statement [ : Plasmids are autonomously explanation of A replicating DNA. (2) Both A and R are correct but R is not the Statement II: Plasmids are extrachromosomal correct explanation of A DNA. (3) A is correct but R is not correct In the light of the above statements, choose the (4) Ais not correct but Ris correct most appropriate answer from the options given Ans. (1) below : . (1) Both Statement I and Statement II are",
    "options": [
      {
        "number": "1",
        "text": "Both A and R are correct and R is the correct Statement [ : Plasmids are autonomously explanation of A replicating DNA."
      },
      {
        "number": "2",
        "text": "Both A and R are correct but R is not the Statement II: Plasmids are extrachromosomal correct explanation of A DNA."
      },
      {
        "number": "3",
        "text": "A is correct but R is not correct In the light of the above statements, choose the"
      },
      {
        "number": "4",
        "text": "Ais not correct but Ris correct most appropriate answer from the options given"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Both A and R are correct and R is the correct Statement [ : Plasmids are autonomously explanation of A replicating DNA.",
    "answerOptionText": "Both A and R are correct and R is the correct Statement [ : Plasmids are autonomously explanation of A replicating DNA.",
    "answerSourceText": "Ans. (1) below : . (1) Both Statement I and Statement II are"
  },
  {
    "id": 169,
    "subject": "Biology",
    "sourcePage": 33,
    "slug": "neet-2026-question-169",
    "questionText": "169. For a person with blood group \u2018O, which of the |",
    "rawSourceText": "169. For a person with blood group \u2018O, which of the |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 170,
    "subject": "Biology",
    "sourcePage": 33,
    "slug": "neet-2026-question-170",
    "questionText": "170. Given below are two statements : one is labelled as (2) Both A and R are correct and R is the correct explanation of A Assertion A and the other is labelled as (2) Both A and R are correct but R is not the Reason R. correct explanation of A. . (3) Ais correct but R is not correct Assertion A : Forelimbs of human and bats are (4) Ais not correct but Ris correct homologous. Reason R : Forelimbs of humans and bats have |",
    "rawSourceText": "170. Given below are two statements : one is labelled as (2) Both A and R are correct and R is the correct explanation of A Assertion A and the other is labelled as (2) Both A and R are correct but R is not the Reason R. correct explanation of A. . (3) Ais correct but R is not correct Assertion A : Forelimbs of human and bats are (4) Ais not correct but Ris correct homologous. Ans. (1) Reason R : Forelimbs of humans and bats have |",
    "options": [
      {
        "number": "2",
        "text": "Both A and R are correct and R is the correct explanation of A Assertion A and the other is labelled as"
      },
      {
        "number": "3",
        "text": "Ais correct but R is not correct Assertion A : Forelimbs of human and bats are"
      },
      {
        "number": "4",
        "text": "Ais not correct but Ris correct homologous."
      },
      {
        "number": "1",
        "text": "Reason R : Forelimbs of humans and bats have |"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Reason R : Forelimbs of humans and bats have |",
    "answerOptionText": "Reason R : Forelimbs of humans and bats have |",
    "answerSourceText": "Ans. (1) Reason R : Forelimbs of humans and bats have |"
  },
  {
    "id": 171,
    "subject": "Biology",
    "sourcePage": 33,
    "slug": "neet-2026-question-171",
    "questionText": "171. Colostrum, secreted by mother during initial days of below : lactation, is abundant in . (1) Al, BIV, CAI, D4 (2) Al, Bl, C-Ill, DIV (igs @)IoM (3) All, BA, CIV, Dl (3) IgA (4) IsD (4) Adlll, B4, C-l, DIV BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 11",
    "rawSourceText": "171. Colostrum, secreted by mother during initial days of below : lactation, is abundant in . (1) Al, BIV, CAI, D4 (2) Al, Bl, C-Ill, DIV (igs @)IoM (3) All, BA, CIV, Dl (3) IgA (4) IsD (4) Adlll, B4, C-l, DIV Ans. (3) Ans. (4) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 11",
    "options": [
      {
        "number": "1",
        "text": "Al, BIV, CAI, D4"
      },
      {
        "number": "2",
        "text": "Al, Bl, C-Ill, DIV (igs @)IoM"
      },
      {
        "number": "3",
        "text": "All, BA, CIV, Dl"
      },
      {
        "number": "4",
        "text": "IsD"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - IsD",
    "answerOptionText": "IsD",
    "answerSourceText": "Ans. (4) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 11"
  },
  {
    "id": 172,
    "subject": "Biology",
    "sourcePage": 33,
    "slug": "neet-2026-question-172",
    "questionText": "172. Given below are two statements : one is labelled as following is not a possible combination of parents\u2019 Assertion A and the other is labelled as Reason R. blood group genotypes ? Assertion A : Abingdon tortoise in Galapagos (1) Father: fiand Mother : Fi islands became extinct within a decade after goats were introduced. (2) Father: Fi and Mother : Fi Reason R : Goats were more efficient at browsing (3) Father: Pi and Mother : Fi than Abingdon tortoise. In the light of the above statements, choose the (4) Father: \u2019P and Mother: fi : . most appropriate answer from the options given below :",
    "rawSourceText": "172. Given below are two statements : one is labelled as following is not a possible combination of parents\u2019 Assertion A and the other is labelled as Reason R. blood group genotypes ? Assertion A : Abingdon tortoise in Galapagos (1) Father: fiand Mother : Fi islands became extinct within a decade after goats were introduced. (2) Father: Fi and Mother : Fi Reason R : Goats were more efficient at browsing (3) Father: Pi and Mother : Fi than Abingdon tortoise. In the light of the above statements, choose the (4) Father: \u2019P and Mother: fi : . most appropriate answer from the options given Ans. (4) below :",
    "options": [
      {
        "number": "1",
        "text": "Father: fiand Mother : Fi islands became extinct within a decade after goats were introduced."
      },
      {
        "number": "2",
        "text": "Father: Fi and Mother : Fi Reason R : Goats were more efficient at browsing"
      },
      {
        "number": "3",
        "text": "Father: Pi and Mother : Fi than Abingdon tortoise. In the light of the above statements, choose the"
      },
      {
        "number": "4",
        "text": "Father: \u2019P and Mother: fi : . most appropriate answer from the options given"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Father: \u2019P and Mother: fi : . most appropriate answer from the options given",
    "answerOptionText": "Father: \u2019P and Mother: fi : . most appropriate answer from the options given",
    "answerSourceText": "Ans. (4) below :"
  },
  {
    "id": 173,
    "subject": "Biology",
    "sourcePage": 33,
    "slug": "neet-2026-question-173",
    "questionText": "173. The covering of ovum at ovulation is _. (1) endometrium similar anatomical structure. (2) zona radiata In the light of the above statements, choose the (3) zona pellucida . . \u2018 (4) chorion most appropriate answer from the options given below :",
    "rawSourceText": "173. The covering of ovum at ovulation is _. (1) endometrium similar anatomical structure. (2) zona radiata In the light of the above statements, choose the (3) zona pellucida . . \u2018 (4) chorion most appropriate answer from the options given Ans. (3) below :",
    "options": [
      {
        "number": "1",
        "text": "endometrium similar anatomical structure."
      },
      {
        "number": "2",
        "text": "zona radiata In the light of the above statements, choose the"
      },
      {
        "number": "3",
        "text": "zona pellucida . . \u2018"
      },
      {
        "number": "4",
        "text": "chorion most appropriate answer from the options given"
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - zona pellucida . . \u2018",
    "answerOptionText": "zona pellucida . . \u2018",
    "answerSourceText": "Ans. (3) below :"
  },
  {
    "id": 174,
    "subject": "Biology",
    "sourcePage": 33,
    "slug": "neet-2026-question-174",
    "questionText": "174. Match List-I with List-II. (1) Both A and R are correct and R is the correct List-I List-II A. Both species are harmed _ I. Predation explanation of A B. One species is harmed II. Mutualism (2) Both A and R are true, but R is not the correct and the other is benefited explanation of A C. Both species III. Competition (3) Ais true but Ris false are benefited D. One is benefited IV. Commensalism (4) Ais false but R is true while the other has no effect Choose the correct answer from the options given",
    "rawSourceText": "174. Match List-I with List-II. (1) Both A and R are correct and R is the correct List-I List-II A. Both species are harmed _ I. Predation explanation of A B. One species is harmed II. Mutualism (2) Both A and R are true, but R is not the correct and the other is benefited explanation of A C. Both species III. Competition (3) Ais true but Ris false are benefited D. One is benefited IV. Commensalism (4) Ais false but R is true while the other has Ans. (1) no effect Choose the correct answer from the options given",
    "options": [
      {
        "number": "1",
        "text": "Both A and R are correct and R is the correct List-I List-II A. Both species are harmed _ I. Predation explanation of A B. One species is harmed II. Mutualism"
      },
      {
        "number": "2",
        "text": "Both A and R are true, but R is not the correct and the other is benefited explanation of A C. Both species III. Competition"
      },
      {
        "number": "3",
        "text": "Ais true but Ris false are benefited D. One is benefited IV. Commensalism"
      },
      {
        "number": "4",
        "text": "Ais false but R is true while the other has"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Both A and R are correct and R is the correct List-I List-II A. Both species are harmed _ I. Predation explanation of A B. One species is harmed II. Mutualism",
    "answerOptionText": "Both A and R are correct and R is the correct List-I List-II A. Both species are harmed _ I. Predation explanation of A B. One species is harmed II. Mutualism",
    "answerSourceText": "Ans. (1) no effect Choose the correct answer from the options given"
  },
  {
    "id": 175,
    "subject": "Biology",
    "sourcePage": 34,
    "slug": "neet-2026-question-175",
    "questionText": "175. Given below are two statements : one is labelled as |",
    "rawSourceText": "175. Given below are two statements : one is labelled as |",
    "options": [],
    "answerOption": null,
    "answerLabel": "Answer marker not clearly extracted from the PDF text layer; verify against the source PDF.",
    "answerOptionText": null,
    "answerSourceText": ""
  },
  {
    "id": 176,
    "subject": "Biology",
    "sourcePage": 34,
    "slug": "neet-2026-question-176",
    "questionText": "176. Given below are two statements : one is labelled as (2) Reproduces sexually in RBCs Assertion A and the other is labelled as (3) Gametocytes develop in mosquito gut Reason R. (4) Fertilization takes place in mosquito gut Assertion A : In recombinant DNA technology, | lysozyme is used for disrupting bacterial cells while |",
    "rawSourceText": "176. Given below are two statements : one is labelled as (2) Reproduces sexually in RBCs Assertion A and the other is labelled as (3) Gametocytes develop in mosquito gut Reason R. (4) Fertilization takes place in mosquito gut Assertion A : In recombinant DNA technology, | Ans. (4) lysozyme is used for disrupting bacterial cells while |",
    "options": [
      {
        "number": "2",
        "text": "Reproduces sexually in RBCs Assertion A and the other is labelled as"
      },
      {
        "number": "3",
        "text": "Gametocytes develop in mosquito gut Reason R."
      },
      {
        "number": "4",
        "text": "Fertilization takes place in mosquito gut Assertion A : In recombinant DNA technology, |"
      }
    ],
    "answerOption": "4",
    "answerLabel": "Option 4 - Fertilization takes place in mosquito gut Assertion A : In recombinant DNA technology, |",
    "answerOptionText": "Fertilization takes place in mosquito gut Assertion A : In recombinant DNA technology, |",
    "answerSourceText": "Ans. (4) lysozyme is used for disrupting bacterial cells while |"
  },
  {
    "id": 177,
    "subject": "Biology",
    "sourcePage": 34,
    "slug": "neet-2026-question-177",
    "questionText": "177. Which of the following is used as an elfective Assertion A and the other is labelled as sedative and painkiller for treating post-surgery Reason R. patients ? Assertion A : In an experiment, Mendel observed (1) Interferon (2) Antibiotics that the F1 progeny plants are all tall and none are (3) Morphine (4) Antiretroviral drugs dwarf. Reason R : Stem height is a contrasting trait, with |",
    "rawSourceText": "177. Which of the following is used as an elfective Assertion A and the other is labelled as sedative and painkiller for treating post-surgery Reason R. patients ? Assertion A : In an experiment, Mendel observed (1) Interferon (2) Antibiotics that the F1 progeny plants are all tall and none are (3) Morphine (4) Antiretroviral drugs dwarf. Ans. (3) Reason R : Stem height is a contrasting trait, with |",
    "options": [
      {
        "number": "1",
        "text": "Interferon"
      },
      {
        "number": "2",
        "text": "Antibiotics that the F1 progeny plants are all tall and none are"
      },
      {
        "number": "3",
        "text": "Morphine"
      },
      {
        "number": "4",
        "text": "Antiretroviral drugs dwarf."
      }
    ],
    "answerOption": "3",
    "answerLabel": "Option 3 - Morphine",
    "answerOptionText": "Morphine",
    "answerSourceText": "Ans. (3) Reason R : Stem height is a contrasting trait, with |"
  },
  {
    "id": 178,
    "subject": "Biology",
    "sourcePage": 34,
    "slug": "neet-2026-question-178",
    "questionText": "178. Which of the following statements are correct ? tall being dominant and dwarf being recessive. (a) Energy flow from producers to consumers is In the light of the above statements, choose the unidirectional most appropriate answer from the options given (b) Energy pyramid can never be inverted below : (c) Transfer of energy follows the 1% law (1) Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below : (2) Both A and R are correct but R is not the (2) fa), (&) and (c) (2) @) and (b) only (a) and (c) only and (c) only (3) (a) and (c) onl (4) (6) and (c) onk correct explanation of A (3) Ais correct but R is not correct",
    "rawSourceText": "178. Which of the following statements are correct ? tall being dominant and dwarf being recessive. (a) Energy flow from producers to consumers is In the light of the above statements, choose the unidirectional most appropriate answer from the options given (b) Energy pyramid can never be inverted below : (c) Transfer of energy follows the 1% law (1) Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below : (2) Both A and R are correct but R is not the (2) fa), (&) and (c) (2) @) and (b) only (a) and (c) only and (c) only (3) (a) and (c) onl (4) (6) and (c) onk correct explanation of A Ans. (2) (3) Ais correct but R is not correct",
    "options": [
      {
        "number": "1",
        "text": "Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below :"
      },
      {
        "number": "2",
        "text": "Both A and R are correct but R is not the"
      },
      {
        "number": "3",
        "text": "(a) and (c) onl"
      },
      {
        "number": "4",
        "text": "(6) and (c) onk correct explanation of A"
      }
    ],
    "answerOption": "2",
    "answerLabel": "Option 2 - Both A and R are correct but R is not the",
    "answerOptionText": "Both A and R are correct but R is not the",
    "answerSourceText": "Ans. (2) (3) Ais correct but R is not correct"
  },
  {
    "id": 179,
    "subject": "Biology",
    "sourcePage": 34,
    "slug": "neet-2026-question-179",
    "questionText": "179. Which of the following statements is correct about (4) Ais not correct but R is correct Plasmodium? (1) Reproduces sexually in liver cells",
    "rawSourceText": "179. Which of the following statements is correct about (4) Ais not correct but R is correct Plasmodium? Ans. (1) (1) Reproduces sexually in liver cells",
    "options": [
      {
        "number": "4",
        "text": "Ais not correct but R is correct Plasmodium?"
      },
      {
        "number": "1",
        "text": "(1) Reproduces sexually in liver cells"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - (1) Reproduces sexually in liver cells",
    "answerOptionText": "(1) Reproduces sexually in liver cells",
    "answerSourceText": "Ans. (1) (1) Reproduces sexually in liver cells"
  },
  {
    "id": 180,
    "subject": "Biology",
    "sourcePage": 34,
    "slug": "neet-2026-question-180",
    "questionText": "180. Match List-I with List-II. cellulase is for plant cells. List-I List-II Reason R : Isolation of genetic material needs A. Transformation I. Restriction enzyme disruption of cells. B. Cloning site IL. Transfer DNA to In the light of the above statements, choose the host bacteria most appropriate answer from the options given C. Selection Ill. Replication below : D. Ori IV. Antibiotic (1) Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below : (2) Both A and R are correct but R is not the (1) Adi, B, CIV, DA correct explanation of A (2) Ad, Bll, CAV, Dill (3) A is correct but R is not correct (3) Adll, BV, C-ll, D4 (4) Ais not correct but R is correct (4) ALV, BA, C-Ill, D-l BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 12",
    "rawSourceText": "180. Match List-I with List-II. cellulase is for plant cells. List-I List-II Reason R : Isolation of genetic material needs A. Transformation I. Restriction enzyme disruption of cells. B. Cloning site IL. Transfer DNA to In the light of the above statements, choose the host bacteria most appropriate answer from the options given C. Selection Ill. Replication below : D. Ori IV. Antibiotic (1) Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below : (2) Both A and R are correct but R is not the (1) Adi, B, CIV, DA correct explanation of A (2) Ad, Bll, CAV, Dill (3) A is correct but R is not correct (3) Adll, BV, C-ll, D4 (4) Ais not correct but R is correct (4) ALV, BA, C-Ill, D-l Ans. (1) Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 12",
    "options": [
      {
        "number": "1",
        "text": "Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below :"
      },
      {
        "number": "2",
        "text": "Both A and R are correct but R is not the"
      },
      {
        "number": "3",
        "text": "A is correct but R is not correct"
      },
      {
        "number": "4",
        "text": "Ais not correct but R is correct"
      }
    ],
    "answerOption": "1",
    "answerLabel": "Option 1 - Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below :",
    "answerOptionText": "Both A and R are correct and R is the correct Choose the correct answer from the options given explanation of A below :",
    "answerSourceText": "Ans. (1) BIOLOGY | NEET 2026 Questions with Answers BIOLOGY page 12"
  }
] satisfies Neet2026DiscussionQuestion[];
