const technologyRoutes = [
  {
    path: "/tech-category-master",
    apiEndpoint: "encs-tech-category-master",
    pk: "iscTechCategoryName",
  },
  {
    path: "/os-tech-master",
    apiEndpoint: "encs-os-tech-master",
    pk: "iscOsTechName	",
  },
  {
    path: "/data-tech-master",
    apiEndpoint: "encs-data-tech-master",
    pk: "iscDataTechName	",
  },
  {
    path: "/application-master",
    apiEndpoint: "encs-app-tech-master",
    pk: "iscAppTechName",
  },
];

const customer = [
  {
    path: "/customer-master",
    apiEndpoint: "encs-customer-master",
    pk: "customerId",
  },
  {
    path: "/customer-contact",
    apiEndpoint: "encs-customer-contact",
    pk: "customerContactId",
  },
  {
    path: "/customer-location",
    apiEndpoint: "encs-customer-location-info",
    pk: "customerLocationId ",
  },
  {
    path: "/business-group",
    apiEndpoint: "encs-business-group-details",
    pk: "businessGroupId ",
  },
  {
    path: "/functional-group",
    apiEndpoint: "encs-functional-group-details",
    pk: "fgId",
  },
];

const application = [
  {
    path: "/application-details",
    apiEndpoint: "encs-application-details",
    pk: "applicationId",
  },
  {
    path: "/environment-details",
    apiEndpoint: "encs-app-env-master",
    pk: "appEnvName",
  },
  {
    path: "/partition-details",
    apiEndpoint: "encs-app-partition-details",
    pk: "appPartitionId",
  },
  {
    path: "/sub-partition-details",
    apiEndpoint: "encs-app-sub-partition-details",
    pk: "appSubPartitionId",
  },
];

const resPartition = [
  { path: "/respartition-master", apiEndpoint: "encs-res-partition-master" },
  { path: "/dc-providers", apiEndpoint: "encs-dc-providers" },
  { path: "/dc-master", apiEndpoint: "encs-dc-master" },
  { path: "/dc-hall", apiEndpoint: "encs-dc-hall" },
  { path: "/respartition-dc-hall", apiEndpoint: "encs-res-partition-dc-hall" },
  {
    path: "/application-dc-hall",
    apiEndpoint: "encs-app-res-partition-dc-hall",
  },
];

const dcAssetCatalog = [
  { path: "/suppliers", apiEndpoint: "encs-dc-asset-suppliers" },
  { path: "/type-master", apiEndpoint: "encs-dc-asset-type-master" },
  { path: "/vendors", apiEndpoint: "encs-dc-asset-vendors" },
  { path: "/model-master", apiEndpoint: "encs-dc-asset-model-master" },
  { path: "/dc-asset", apiEndpoint: "encs-dc-asset" },
  { path: "/allocation", apiEndpoint: "encs-dc-asset-allocation" },
];

/**********************************************************
                       ENCS Cloud Services
 ***********************************************************/

const cloudMasterDetails = [
  { path: "/cloud-master-details", apiEndpoint: "encs-cloud-master" },
];

const oracleCloud = [
  { path: "/oci-region-details", apiEndpoint: "encs-oci-region-details" },
  { path: "/oci-cloud-ad-details", apiEndpoint: "encs-oci-ad-details" },
  { path: "/oci-cloud-fd-details", apiEndpoint: "encs-oci-fd-details" },
  { path: "/oci-respartition-ad", apiEndpoint: "encs-oci-res-partition-ad" },
  {
    path: "/oci-app-respartition-ad",
    apiEndpoint: "encs-oci-app-res-partition-ad",
  },
];

const googleCloud = [
  { path: "/gcp-region-details", apiEndpoint: "encs-gcp-region-details" },
  { path: "/gcp-cloud-az-details", apiEndpoint: "encs-gcp-az-details" },
  { path: "/gcp-respartition-az", apiEndpoint: "encs-gcp-res-partition-az" },
  {
    path: "/gcp-app-respartition-az",
    apiEndpoint: "encs-gcp-app-res-partition-az",
  },
];

const awsCloud = [
  { path: "/aws-region-details", apiEndpoint: "encs-aws-region-details" },
  { path: "/aws-cloud-az-details", apiEndpoint: "encs-aws-az-details" },
  { path: "/aws-respartition-az", apiEndpoint: "encs-aws-res-partition-az" },
  {
    path: "/aws-app-respartition-az",
    apiEndpoint: "encs-aws-app-res-partition-az",
  },
];

/**********************************************************
                       ENCS Services and Resources
 ***********************************************************/

const cloudTables = [
  { path: "/cloud-services", apiEndpoint: "encs-cloud-service-master" },
  { path: "/onp-services", apiEndpoint: "encs-onp-service-master-details" },
  { path: "/cloud-resources", apiEndpoint: "encs-cloud-resource-master" },
  { path: "/onp-resources", apiEndpoint: "encs-onp-resource-master-details" },
  // { path: "/cloud-action", apiEndpoint: "encs-cloud-critical-actions" },
  // { path: "service-meta-data" },
  // { path: "resources-meta-data" },
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
