type AdmissionAccessStatus = "open" | "state-specific" | "no-private";

type SortableStateGroup = {
  state: string;
  privateCount: number;
  totalSeats: number;
};

export type MBBSIndiaAdmissionAccess = {
  status: AdmissionAccessStatus;
  label: "Open for all" | "State-specific" | "No private MBBS";
  detail: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const preferredMBBSIndiaStates = ["West Bengal", "Karnataka", "Jharkhand"];

const defaultOpenSource = {
  sourceLabel: "2025 open-state private quota guide",
  sourceUrl: "https://hellomentor.in/news-blogs/management-private-quota-open-state-mbbs-seats-in-medical-colleges-in-2025",
};

const openStateAccess = (detail = "Private/management quota is listed as available to eligible NEET candidates from any Indian state."): MBBSIndiaAdmissionAccess => ({
  status: "open",
  label: "Open for all",
  detail,
  ...defaultOpenSource,
});

const stateSpecificAccess = (detail = "Private/state quota participation is treated as state-specific; verify domicile and quota rules before choice filling."): MBBSIndiaAdmissionAccess => ({
  status: "state-specific",
  label: "State-specific",
  detail,
  sourceLabel: "2025 state domicile/open-state guidance",
  sourceUrl: "https://medical.studentkhabri.com/article/mbbs-admission-2025-open-state-closed-state/",
});

const noPrivateAccess: MBBSIndiaAdmissionAccess = {
  status: "no-private",
  label: "No private MBBS",
  detail: "No private MBBS college is listed in the provided NMC data for this state or union territory.",
  sourceLabel: "Provided NMC college data",
  sourceUrl: "/mbbs-india/",
};

export const mbbsIndiaAdmissionAccessByState: Record<string, MBBSIndiaAdmissionAccess> = {
  "Andaman Nicobar Islands": noPrivateAccess,
  "Andhra Pradesh": openStateAccess(),
  "Arunachal Pradesh": noPrivateAccess,
  Assam: noPrivateAccess,
  Bihar: openStateAccess(),
  Chandigarh: noPrivateAccess,
  Chattisgarh: openStateAccess(),
  "Dadra and Nagar Haveli": noPrivateAccess,
  Delhi: stateSpecificAccess("Private/institutional seats are not treated as a general open-state private MBBS route."),
  Goa: noPrivateAccess,
  Gujarat: stateSpecificAccess("Private MBBS participation is listed as closed for non-domicile candidates in open-state guidance."),
  Haryana: openStateAccess(),
  "Himachal Pradesh": openStateAccess(),
  "Jammu & Kashmir": stateSpecificAccess("Private MBBS participation is listed as closed for non-domicile candidates in open-state guidance."),
  Jharkhand: openStateAccess("Private MBBS All India/NRI quota seats have been reported in state counselling for 2025."),
  Karnataka: openStateAccess("Karnataka private college seats are handled through KEA counselling; state quota still has domicile rules."),
  Kerala: openStateAccess(),
  "Madhya Pradesh": openStateAccess("Open-state guidance lists private MBBS access from later counselling rounds."),
  Maharashtra: openStateAccess("Open-state guidance lists institutional/management quota access for non-domicile candidates."),
  Manipur: openStateAccess(),
  Meghalaya: stateSpecificAccess(),
  Mizoram: noPrivateAccess,
  Nagaland: noPrivateAccess,
  Orissa: stateSpecificAccess("Private MBBS participation is listed as closed for non-domicile candidates in open-state guidance."),
  Pondicherry: openStateAccess(),
  Punjab: stateSpecificAccess("Private MBBS participation is listed as closed for non-domicile candidates in open-state guidance."),
  Rajasthan: openStateAccess("Open-state guidance lists private MBBS access from later counselling rounds."),
  Sikkim: openStateAccess(),
  "Tamil Nadu": openStateAccess(),
  Telangana: openStateAccess(),
  Tripura: openStateAccess(),
  "Uttar Pradesh": openStateAccess(),
  Uttarakhand: openStateAccess(),
  "West Bengal": {
    status: "open",
    label: "Open for all",
    detail: "WBMCC conducts state quota, management quota, and NRI quota counselling for private MBBS seats.",
    sourceLabel: "WBMCC UG Medical & Dental Counselling",
    sourceUrl: "https://wbmcc.nic.in/ug-medical-dental-counselling/",
  },
};

export const getMBBSIndiaAdmissionAccess = (state: string, privateCount = 1) =>
  mbbsIndiaAdmissionAccessByState[state] ?? (privateCount > 0 ? stateSpecificAccess() : noPrivateAccess);

const accessRank: Record<AdmissionAccessStatus, number> = {
  open: 0,
  "state-specific": 1,
  "no-private": 2,
};

export function compareMBBSIndiaStateGroups(a: SortableStateGroup, b: SortableStateGroup) {
  const preferredA = preferredMBBSIndiaStates.indexOf(a.state);
  const preferredB = preferredMBBSIndiaStates.indexOf(b.state);

  if (preferredA !== -1 || preferredB !== -1) {
    return (preferredA === -1 ? Number.MAX_SAFE_INTEGER : preferredA) - (preferredB === -1 ? Number.MAX_SAFE_INTEGER : preferredB);
  }

  const accessA = getMBBSIndiaAdmissionAccess(a.state, a.privateCount);
  const accessB = getMBBSIndiaAdmissionAccess(b.state, b.privateCount);
  const accessDifference = accessRank[accessA.status] - accessRank[accessB.status];

  if (accessDifference !== 0) return accessDifference;
  if (a.privateCount !== b.privateCount) return b.privateCount - a.privateCount;
  if (a.totalSeats !== b.totalSeats) return b.totalSeats - a.totalSeats;

  return a.state.localeCompare(b.state);
}
