export const kyrgyzstanCountryHeroImage =
  "/kyrgyzstan/kyrgyzstan-scenery.webp";

const universityImageSlugs = new Set([
  "adam-university",
  "ala-too-international-university",
  "altamimi-international-university",
  "asian-international-university-named-after-s-tentishev",
  "avicenna-international-medical-university",
  "batken-state-university",
  "bishkek-international-medical-institute",
  "central-asian-international-medical-university",
  "eurasian-international-university",
  "international-higher-school-of-medicine",
  "international-higher-school-of-medicine-central",
  "international-higher-school-of-medicine-elite",
  "international-european-university",
  "international-medical-university",
  "international-university-of-kyrgyzstan",
  "ishenaly-arabaev-kyrgyz-state-university",
  "issyk-kul-state-university",
  "jalal-abad-international-university",
  "jalal-abad-state-university",
  "jusup-balasagyn-kyrgyz-national-university",
  "kyrgyz-national-agrarian-university",
  "kyrgyz-russian-slavic-university",
  "kyrgyz-state-medical-academy",
  "kyrgyz-turkish-manas-university",
  "kyrgyz-uzbek-international-university",
  "osh-international-medical-university",
  "osh-state-university",
  "royal-metropolitan-university",
  "salymbekov-university",
]);

export function kyrgyzstanUniversityImage(slug: string) {
  if (!universityImageSlugs.has(slug)) {
    return kyrgyzstanCountryHeroImage;
  }

  return `/kyrgyzstan/universities/${slug}.webp`;
}
