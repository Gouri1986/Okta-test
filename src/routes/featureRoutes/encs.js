const technologyRoutes = [
  {
    path: "/tech-master",
    apiEndpoint: "encs-tech-category-master",
  },
  {
    path: "/os-tech-master",
    apiEndpoint: "encs-os-tech-master",
  },
  {
    path: "/data-tech-master",
    apiEndpoint: "encs-data-tech-master",
  },
  {
    path: "/application-master",
    apiEndpoint: "encs-app-tech-master",
  },
];

const customer = [
  { path: "/customer-master", apiEndpoint: "encs-customer-master" },
  { path: "/customer-contact", apiEndpoint: "encs-customer-contact" },
  { path: "/customer-location", apiEndpoint: "encs-customer-location-info" },
  { path: "/business-group", apiEndpoint: "encs-business-group-details" },
  { path: "/functional-group", apiEndpoint: "encs-functional-group-details" },
];

const application = [
  { path: "/application-details", apiEndpoint: "encs-app-env-master" },
  { path: "/environment-details", apiEndpoint: "encs-app-env-master" },
  { path: "/partition-details", apiEndpoint: "encs-app-partition-details" },
  { path: "/sub-partition-details", apiEndpoint: "encs-res-partition-detail" },
];

const resPartition = [
  { path: "respartition-master" },
  { path: "dc-providers" },
  { path: "dc-master" },
  { path: "dc-hall" },
  { path: "respartition-dc-hall" },
  { path: "application-dc-hall" },
];

const dcAssetCatalog = [
  { path: "suppliers" },
  { path: "type-master" },
  { path: "vendors" },
  { path: "model-master" },
  { path: "dc-asset" },
  { path: "allocation" },
];

/**********************************************************
                       ENCS Cloud Services
 ***********************************************************/

const cloudMasterDetails = [{ path: "cloud-master-details" }];

const oracleCloud = [
  { path: "oci-region-details" },
  { path: "oci-cloud-ad-details" },
  { path: "oci-cloud-fd-details" },
  { path: "oci-respartition-ad" },
  { path: "oci-app-respartition-ad" },
];

const googleCloud = [
  { path: "gcp-region-details" },
  { path: "gcp-cloud-az-details" },
  { path: "gcp-respartition-az" },
  { path: "gcp-app-respartition-az" },
];

const awsCloud = [
  { path: "aws-region-details" },
  { path: "aws-cloud-az-details" },
  { path: "aws-respartition-az" },
  { path: "aws-app-respartition-az" },
];

/**********************************************************
                       ENCS Services and Resources
 ***********************************************************/

const cloudTables = [
  { path: "cloud-services" },
  { path: "onp-services" },
  { path: "cloud-resources" },
  { path: "onp-resources" },
  { path: "cloud-action" },
  { path: "service-meta-data" },
  { path: "resources-meta-data" },
];

/**********************************************************
                       Exporting All ENCS Modules
 ***********************************************************/

const encsRoutes = [
  {
    section: "Environment Services",
    routes: {
      technologyRoutes,
      customer,
      application,
      resPartition,
      dcAssetCatalog,
    },
  },
  {
    section: "Cloud Services",
    routes: {
      cloudMasterDetails,
      oracleCloud,
      googleCloud,
      awsCloud,
    },
  },
  {
    section: "Services and Resources",
    routes: {
      cloudTables,
    },
  },
];

export default encsRoutes;
