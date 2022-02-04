const controlTypes = [
  {
    path: "/scos-security-control-types",
    apiEndpoint: "scos-security-control-types",
    pk: "scosSecurityControlType",
    showAsSubMenu: false,
  },
];

const securityControls = [
  {
    path: "/scos-security-controls",
    apiEndpoint: "scos-security-controls",
    pk: "scosSecurityControlName",
    showAsSubMenu: false,
  },
];
const frameworkTypes = [
  {
    path: "/scos-framework-types",
    apiEndpoint: "scos-framework-types",
    pk: "scosFrameworkType",
    showAsSubMenu: false,
  },
];

const controlFramework = [
  {
    path: "/scos-control-frameworks",
    apiEndpoint: "scos-control-frameworks",
    pk: "controlFrameworkName",
    showAsSubMenu: false,
  },
];

const CSI7 = [
  {
    path: "/scos-cis7-control_details",
    apiEndpoint: "scos-cis7-control_details",
    pk: "cisSafeguard",
    showAsSubMenu: false,
  },
];

const CSI8 = [
  {
    path: "/scos-cis8-control_details",
    apiEndpoint: "scos-cis8-control_details",
    pk: "cisSafeguard",
    showAsSubMenu: false,
  },
];

const CSI7And8Mapping = [
  {
    path: "/scos-cis8-regulation-map",
    apiEndpoint: "scos-cis8-regulation-map",
    pk: "cis8RegulationMapId",
    showAsSubMenu: false,
  },
];

const regulationFramework = [
  {
    path: "/scos-regulation-frameworks",
    apiEndpoint: "scos-regulation-frameworks",
    pk: "regulationFrameworkId",
    showAsSubMenu: false,
  },
];

const SOC2 = [
  {
    path: "/scos-soc2-regulation-criteria",
    apiEndpoint: "scos-soc2-regulation-criteria",
    pk: "regulationCriteriaSeries",
    name: "Criteria",
  },
  {
    path: "/scos-soc2-regulation-category",
    apiEndpoint: "scos-soc2-regulation-category",
    pk: "regulationCategoryNumber",
    name: "Category",
  },
  {
    path: "/scos-soc2-regulation-details",
    apiEndpoint: "scos-soc2-regulation-details",
    pk: "sco2TscNumber",
    name: "Details",
  },
  {
    path: "/scos-soc2-regulation-focus-points",
    apiEndpoint: "scos-soc2-regulation-focus-points",
    pk: "sco2RegulationFocusPointId",
    name: "Focus Points",
  },
];

const ISO27001 = [
  {
    path: "/scos-iso27001-regulation-category",
    apiEndpoint: "scos-iso27001-regulation-category",
    pk: "regulationCategoryNumber",
    name: "Category",
  },
  {
    path: "/scos-iso27001-regulation-sub1-category",
    apiEndpoint: "cos-iso27001-regulation-sub1-category",
    pk: "sub1RegulationCategoryNumber",
    name: "Sub Category",
  },
  {
    path: "/scos-iso27001-regulation-details",
    apiEndpoint: "scos-iso27001-regulation-details",
    pk: "iso27001ControlNumber",
    name: "Details",
  },
];

const PCIDSSV321 = [
  {
    path: "/scos-pcidss-v321-regulation-categories",
    apiEndpoint: "scos-pcidss-v321-regulation-categories",
    pk: "categoryNumber",
    name: "Category",
  },
  {
    path: "/scos-pcidss-v321-regulation-sub1-categories",
    apiEndpoint: "scos-pcidss-v321-regulation-sub1-categories",
    pk: "sub1CategoryNumber",
    name: "Sub Category",
  },
  {
    path: "/scos-pcidss-v321-regulation-details",
    apiEndpoint: "scos-pcidss-v321-regulation-details",
    pk: "pcidssV321RequirementNumber",
    name: "Details",
  },
];

const HIPPA = [
  {
    path: "/scos-hipaa-regulation-safegaurds",
    apiEndpoint: "scos-hipaa-regulation-safegaurds",
    pk: "regulationSafegaurd",
    name: "Safeguard",
  },
  {
    path: "/scos-hipaa-regulation-standards",
    apiEndpoint: "scos-hipaa-regulation-standards",
    pk: "regulationStandard",
    name: "Standards",
  },
  {
    path: "/scos-hipaa-regulation-details",
    apiEndpoint: "scos-hipaa-regulation-details",
    pk: "hipaaSection",
    name: "Details",
  },
  {
    path: "/scos-hipaa-regulation-imp-specs",
    apiEndpoint: "scos-hipaa-regulation-imp-specs",
    pk: "hipaaRegulationImpSpecDetailsId",
    name: "Imp Specs",
  },
];

const GDPR = [
  {
    path: "/scos-gdpr-regulation-chapters",
    apiEndpoint: "scos-gdpr-regulation-chapters",
    pk: "chapterNumber",
    name: "Chapters",
  },
  {
    path: "/scos-gdpr-regulation-sections",
    apiEndpoint: "scos-gdpr-regulation-sections",
    pk: "sectionNumber",
    name: "Sections",
  },
  {
    path: "/scos-gdpr-article-categories",
    apiEndpoint: "scos-gdpr-article-categories",
    pk: "articleCategoryNumber",
    name: "Categories",
  },
  {
    path: "/scos-gdpr-regulation-details",
    apiEndpoint: "scos-gdpr-regulation-details",
    pk: "gdprArticleNumber",
    name: "Details",
  },
  {
    path: "/scos-gdpr-regulation-focus-points",
    apiEndpoint: "scos-gdpr-regulation-focus-points",
    pk: "gdprFocusPointId",
    name: "Focus Points",
  },
];

const CCM = [
  {
    path: "/scos-ccm-regulation-control-domains",
    apiEndpoint: "scos-ccm-regulation-control-domains",
    pk: "controlDomain",
    name: "Control Domains",
  },
  {
    path: "/scos-ccm-regulation-details",
    apiEndpoint: "scos-ccm-regulation-details",
    pk: "ccmControlId",
    name: "Details",
  },
];

const CCPA = [
  {
    path: "/scos-ccpa-regulation-details",
    apiEndpoint: "scos-ccpa-regulation-details",
    pk: "ccpaSection",
    name: "Details",
    showAsSubMenu: true,
  },
];

const NIST80053Rev5 = [
  {
    path: "/scos-nist-800-53-rev5-regulation-control-family",
    apiEndpoint: "scos-nist-800-53-rev5-regulation-control-family",
    pk: "controlFamily",
    name: "Control Family",
  },
  {
    path: "/scos-nist-800-53-rev5-regulation-details",
    apiEndpoint: "scos-nist-800-53-rev5-regulation-details",
    pk: "nist80053Rev5ControlId",
    name: "Details",
  },
];

const scosRoutes = [
  {
    section: "Metadata",
    routes: {
      controlTypes,
      securityControls,
      frameworkTypes,
    },
  },
  {
    section: "CSI Controls",
    routes: {
      controlFramework,
      ["CSI 7"]: CSI7,
      ["CSI 8"]: CSI8,
      ["CSI 7 & Mapping"]: CSI7And8Mapping,
      securityControls,
      frameworkTypes,
    },
  },
  {
    section: "Regulations",
    routes: {
      regulationFramework,
      ["SOC 2"]: SOC2,
      ["ISO 27001"]: ISO27001,
      ["PCIDSS V321"]: PCIDSSV321,
      HIPPA,
      GDPR,
      CCM,
      CCPA,
      ["NIST 800 53 Rev5"]: NIST80053Rev5,
    },
  },
];

export default scosRoutes;
