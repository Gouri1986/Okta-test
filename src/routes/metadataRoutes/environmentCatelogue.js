const AWS = [
  {
    path: "/tech-category-master",
    apiEndpoint: "encs-tech-category-master",
    pk: "iscTechCategoryName",
    name: "Regions",
  },
  {
    path: "/os-tech-master",
    apiEndpoint: "encs-os-tech-master",
    pk: "iscOsTechName	",
    name: "Zones",
  },
  {
    path: "/data-tech-master",
    apiEndpoint: "encs-data-tech-master",
    pk: "iscDataTechName	",
    name: "Instance Type",
  },
  {
    path: "/application-master",
    apiEndpoint: "encs-app-tech-master",
    pk: "iscAppTechName",
    name: "Instance Size",
  },
];

const GCP = [
  {
    path: "/tech-category-master",
    apiEndpoint: "encs-tech-category-master",
    pk: "iscTechCategoryName",
    name: "Regions",
  },
  {
    path: "/os-tech-master",
    apiEndpoint: "encs-os-tech-master",
    pk: "iscOsTechName	",
    name: "Zones",
  },
  {
    path: "/data-tech-master",
    apiEndpoint: "encs-data-tech-master",
    pk: "iscDataTechName	",
    name: "Machine Type",
  },
];

const OCI = [
  {
    path: "/tech-category-master",
    apiEndpoint: "encs-tech-category-master",
    pk: "iscTechCategoryName",
    name: "Regions",
  },
  {
    path: "/os-tech-master",
    apiEndpoint: "encs-os-tech-master",
    pk: "iscOsTechName	",
    name: "Zones",
  },
];

const Azure = [
  {
    path: "/tech-category-master",
    apiEndpoint: "encs-tech-category-master",
    pk: "iscTechCategoryName",
    name: "Regions",
  },
  {
    path: "/os-tech-master",
    apiEndpoint: "encs-os-tech-master",
    pk: "iscOsTechName	",
    name: "Zones",
  },
];

const ServicesAndResource = [
  {
    path: "/tech-category-master",
    apiEndpoint: "encs-tech-category-master",
    pk: "iscTechCategoryName",
    name: "Insatnce Shapes",
  },
  {
    path: "/os-tech-master",
    apiEndpoint: "encs-os-tech-master",
    pk: "iscOsTechName	",
    name: "Service Metadata",
  },
  {
    path: "/data-tech-master",
    apiEndpoint: "encs-data-tech-master",
    pk: "iscDataTechName	",
    name: "Resource Metadata",
  },
  {
    path: "/application-master",
    apiEndpoint: "encs-app-tech-master",
    pk: "iscAppTechName",
    name: "Resource Events",
  },
  {
    path: "/application-master",
    apiEndpoint: "encs-app-tech-master",
    pk: "iscAppTechName",
    name: "Crtical Actions",
  },
];

// const customer = [
//   {
//     path: "/customer-master",
//     apiEndpoint: "encs-customer-master",
//     pk: "customerId",
//   },
//   {
//     path: "/customer-contact",
//     apiEndpoint: "encs-customer-contact",
//     pk: "customerContactId",
//   },
//   {
//     path: "/customer-location",
//     apiEndpoint: "encs-customer-location-info",
//     pk: "customerLocationId ",
//   },
//   {
//     path: "/business-group",
//     apiEndpoint: "encs-business-group-details",
//     pk: "businessGroupId ",
//   },
//   {
//     path: "/functional-group",
//     apiEndpoint: "encs-functional-group-details",
//     pk: "fgId",
//   },
// ];

/**********************************************************
                       Exporting All ENCS Modules
 ***********************************************************/

const encsRoutes = [
  {
    section: "Cloud Environment",
    routes: {
      AWS,
      GCP,
      OCI,
      Azure,
      ServicesAndResource,
    },
  },
];

export default encsRoutes;
