const GCP = [
  {
    path: "/recs-gcp-complaince-details-control-id",
    apiEndpoint: "recs-gcp-complaince-details-control-id",
    name: "GCP Compliance",
    // pk: "scosSecurityControlType",
  },
];

const AWS = [
  {
    path: "/scos-security-control-types",
    apiEndpoint: "scos-security-control-types",
    pk: "scosSecurityControlType",
  },
];
const OCI = [
  {
    path: "/scos-security-control-types",
    apiEndpoint: "scos-security-control-types",
    pk: "scosSecurityControlType",
  },
];
const AZURE = [
  {
    path: "/scos-security-control-types",
    apiEndpoint: "scos-security-control-types",
    pk: "scosSecurityControlType",
  },
];

const resourceInventoryRoutes = [
  {
    section: "Dashboard",
    sectionType: "gcp",
    path: "/get-recs-gcp-complaince-details",
    apiEndpoint: "recs-gcp-complaince-details-control-id",
    pk: "controlId",
    tableWhitelists: ["resources"],
    headerStatic: [
      {
        title: "Control Domain",
        id: "securityControlDomain",
        width: 150,
      },
      {
        title: "Service Type",
        id: "gcpServiceType",
        width: 130,
      },
      {
        title: "Resource Type",
        id: "gcpResourceType",
        width: 140,
      },
      {
        title: "Control ID",
        id: "bcGcpControlItemId",
        width: 110,
      },
      {
        title: "Control",
        id: "bcGcpControlDescription",
        width: 350,
      },
      {
        title: "Compliance Status",
        id: "descriptiveComplainceStatus",
        width: 180,
      },
      {
        title: "Region",
        id: "gcpRegion",
        width: 120,
      },
      {
        title: "Severity",
        id: "Severity",
        width: 120,
        levels: {
          c: "confidentialityRisk",
          i: "integrityRisk",
          a: "availabilityRisk",
        },
      },
      {
        title: "Regulation",
        id: "regulationControls",
        width: 100,
        mr: 20,
      },
      // {
      //   title: "Bc Control",
      //   id: "bcGcpControl",
      //   width: 150
      // },
      // {
      //   title: "Project Id",
      //   id: "gcpProjectId",
      //   width: 180
      // },
      // {
      //   title: "Multi Security Check",
      //   id: "multiSecurityCheck",
      //   width: 250
      // },

      // {
      //   title: "Security Check Category",
      //   id: "securityCheckCategory",
      //   width: 250
      // }
    ],
    /**
     * ! Drawer Functionality API Config
     * ? This is the function that will be called when the user clicks on the drawer buttons
     *
     *
     * ? 1) Resources Dashboard Drawer Functionality config
     **/

    complainceDetails: {
      apiEndpoint: "get-bcControlId-complaince-details",
      params: {
        paramKey: ["resource", "bcControlItemId"],
        tableKey: ["gcpResourceType", "bcGcpControlItemId"],
      },
      dawerHeaderColoumn: {
        controlId: "Control ID",
        projectId: "GCP Project ID",
        resourceType: "Resource Type",
        serviceType: "Service Type",
      },
      jsonView: {
        apiEndpoint: "get-resourceid-complaince-details",
        params: {
          paramKey: ["resourceId", "resource"],
          tableKey: ["resourceId", "gcpResourceType"],
        },
      },
    },
    /**
     *
     * ? 2) Regualation Drawer Functionality config
     */
    regulationControls: {
      apiEndpoint: "recs-gcp-controls-regulation-map-controlItemId",
      params: {
        paramKey: ["controlItemId"],
        tableKey: ["bcGcpControlItemId"],
      },
      discription: {
        apiEndpoint: "recs-gcp-controls-regulation-map_configregulationId",
        params: {
          paramKey: ["regulationId", "regulation"],
          tableKey: ["Control id", "Regulation"],
        },
      },
    },
  },
  {
    section: "CTG1",
    routes: {
      GCP,
      // OCI,
      // AWS,
      // AZURE,
    },
  },
  {
    section: "CTG2",
    routes: {
      GCP,
      // OCI,
      // AWS,
      // AZURE,
    },
  },
];

export default resourceInventoryRoutes;
