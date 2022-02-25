const GCP = [
  {
    baseURL: process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL,
    path: "/recs-gcp-complaince-details-control-id",
    apiEndpoint: "recs-gcp-complaince-details-control-id",
    name: "GCP Compliance",
    // tableWhitelists: ["resources"],
    headerStatic: [
      {
        title: "CT Group",
        id: "bcCtgName",
        width: 120
      },
      {
        title: "Cloud Tenant",
        id: "bcCtName",
        width: 150
      },
      {
        title: "Control Domain",
        id: "securityControlDomain",
        width: 180
      },
      {
        title: "Service Type",
        id: "gcpServiceType",
        width: 160
      },
      {
        title: "Resource Type",
        id: "gcpResourceType",
        width: 170
      },
      {
        title: "Control ID",
        id: "bcGcpControlItemId",
        width: 110
      },
      {
        title: "Control",
        id: "bcGcpControl",
        width: 350
      },
      {
        title: "Compliance Status",
        id: "descriptiveComplainceStatus",
        width: 180
      },
      {
        title: "Region",
        id: "gcpRegion",
        width: 120
      },
      {
        title: "Severity",
        id: "Severity",
        width: 150,
        levels: {
          c: "confidentialityRisk",
          i: "integrityRisk",
          a: "availabilityRisk"
        }
      },
      {
        title: "Regulation",
        id: "regulationControls",
        width: 100,
        mr: 20
      }
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
    // pk: "scosSecurityControlType",
    dawerHeader: {
      coloumn: {
        controlId: "Control ID",
        projectId: "GCP Project ID",
        resourceType: "Resource Type",
        serviceType: "Service Type"
      },
      coloumnKey: []
    },
    complainceDetails: {
      baseURL: process.env.REACT_APP_COMPLIANCE_DASHBOARD_BASE_URL,
      apiEndpoint: "get-bcControlId-complaince-details",
      params: {
        paramKey: ["resource", "bcControlItemId"],
        tableKey: ["gcpResourceType", "bcGcpControlItemId"]
      },
      jsonView: {
        apiEndpoint: "get-resourceid-complaince-details",
        params: {
          paramKey: ["resourceId", "resource"],
          tableKey: ["resourceId", "gcpResourceType"]
        }
      }
    },
    /**
     *
     * ? 2) Regualation Drawer Functionality config
     */
    regulationControls: {
      apiEndpoint: "recs-gcp-controls-regulation-map-controlItemId",
      params: {
        paramKey: ["controlItemId"],
        tableKey: ["bcGcpControlItemId"]
      },
      discription: {
        apiEndpoint: "recs-gcp-controls-regulation-map_configregulationId",
        params: {
          paramKey: ["regulationId", "regulation"],
          tableKey: ["Control id", "Regulation"]
        }
      }
    }
  }
]

const AWS = [
  {
    baseURL: process.env.REACT_APP_AWS_COMPLIANCE_DASHBOARD_BASE_URL,
    path: "/recs-aws-compliance-details-control-id",
    apiEndpoint: "recs-aws-compliance-details-control-id",
    name: "AWS Compliance",
    tableWhitelists: ["resources"],
    headerStatic: [
      {
        title: "CT Group",
        id: "bcCtgName",
        width: 120
      },
      {
        title: "Cloud Tenant",
        id: "bcCtName",
        width: 150
      },
      {
        title: "Control Domain",
        id: "securityControlDomain",
        width: 160
      },
      {
        title: "Service Type",
        id: "gcpServiceType",
        width: 130
      },
      {
        title: "Resource Type",
        id: "gcpResourceType",
        width: 150
      },
      {
        title: "Control ID",
        id: "bcGcpControlItemId",
        width: 110
      },
      {
        title: "Control",
        id: "bcGcpControlDescription",
        width: 350
      },
      {
        title: "Compliance Status",
        id: "descriptiveComplainceStatus",
        width: 180
      },
      {
        title: "Region",
        id: "gcpRegion",
        width: 120
      },
      {
        title: "Severity",
        id: "Severity",
        width: 120
      },
      {
        title: "Regulation",
        id: "regulationControls",
        width: 100,
        mr: 20
      }
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
    // pk: "scosSecurityControlType",
    complainceDetails: {
      baseURL: process.env.REACT_APP_AWS_COMPLIANCE_DASHBOARD_BASE_URL,
      apiEndpoint: "get-bc-control-id-compliance-details",
      params: {
        paramKey: ["resource", "bcControlItemId"],
        tableKey: ["gcpResourceType", "bcGcpControlItemId"]
      },
      dawerHeaderColoumn: {
        controlId: "Control ID",
        projectId: "GCP Project ID",
        resourceType: "Resource Type",
        serviceType: "Service Type"
      },
      jsonView: {
        apiEndpoint: "get-resourceid-complaince-details",
        params: {
          paramKey: ["resourceId", "resource"],
          tableKey: ["resourceId", "gcpResourceType"]
        }
      }
    },
    /**
     *
     * ? 2) Regualation Drawer Functionality config
     */
    regulationControls: {
      apiEndpoint: "recs-aws-controls-regulation-map-control-item-id",
      params: {
        paramKey: ["controlItemId"],
        tableKey: ["bcGcpControlItemId"]
      },
      discription: {
        apiEndpoint: "recs-aws-controls-regulation-map-config-regulation-id",
        params: {
          paramKey: ["regulationId", "regulation"],
          tableKey: ["Control id", "Regulation"]
        }
      }
    }
  }
]

const OCI = [
  {
    path: "/get-recs-oci-complaince-details",
    apiEndpoint: "get-recs-oci-complaince-details",
    name: "OCI Compliance",
    tableWhitelists: ["resources"],
    headerStatic: [
      {
        title: "CT Group",
        id: " ",
        width: 120
      },
      {
        title: "Cloud Tenant",
        id: " ",
        width: 150
      },
      {
        title: "Control Domain",
        id: "securityControlDomain",
        width: 160
      },
      {
        title: "Service Type",
        id: "gcpServiceType",
        width: 130
      },
      {
        title: "Resource Type",
        id: "gcpResourceType",
        width: 150
      },
      {
        title: "Control ID",
        id: "bcGcpControlItemId",
        width: 110
      },
      {
        title: "Control",
        id: "bcGcpControlDescription",
        width: 350
      },
      {
        title: "Compliance Status",
        id: "descriptiveComplainceStatus",
        width: 180
      },
      {
        title: "Region",
        id: "gcpRegion",
        width: 120
      },
      {
        title: "Severity",
        id: "Severity",
        width: 120
      },
      {
        title: "Regulation",
        id: "regulationControls",
        width: 100,
        mr: 20
      }
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
    ]
    // pk: "scosSecurityControlType",
  }
]

const routes = [
  {
    section: "Dashboard",
    sectionType: "gcp",
    path: "/recs-gcp-complaince-details-control-id",
    apiEndpoint: "recs-gcp-complaince-details-control-id",
    name: "GCP Compliance",
    pk: "controlId",
    tableWhitelists: ["resources"],
    headerStatic: [
      {
        title: "CT Group",
        id: " ",
        width: 120
      },
      {
        title: "Cloud Tenant",
        id: " ",
        width: 150
      },
      {
        title: "Control Domain",
        id: "securityControlDomain",
        width: 160
      },
      {
        title: "Service Type",
        id: "gcpServiceType",
        width: 130
      },
      {
        title: "Resource Type",
        id: "gcpResourceType",
        width: 150
      },
      {
        title: "Control ID",
        id: "bcGcpControlItemId",
        width: 110
      },
      {
        title: "Control",
        id: "bcGcpControlDescription",
        width: 360
      },
      {
        title: "Compliance Status",
        id: "descriptiveComplainceStatus",
        width: 200
      },
      {
        title: "Region",
        id: "gcpRegion",
        width: 120
      },
      {
        title: "Severity",
        id: "Severity",
        width: 120,
        levels: {
          c: "confidentialityRisk",
          i: "integrityRisk",
          a: "availabilityRisk"
        }
      },
      {
        title: "Regulation",
        id: "regulationControls",
        width: 100,
        mr: 20
      }
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
        tableKey: ["gcpResourceType", "bcGcpControlItemId"]
      },
      dawerHeaderColoumn: {
        controlId: "Control ID",
        projectId: "GCP Project ID",
        resourceType: "Resource Type",
        serviceType: "Service Type"
      },
      jsonView: {
        apiEndpoint: "get-resourceid-complaince-details",
        params: {
          paramKey: ["resourceId", "resource"],
          tableKey: ["resourceId", "gcpResourceType"]
        }
      }
    },
    /**
     *
     * ? 2) Regualation Drawer Functionality config
     */
    regulationControls: {
      apiEndpoint: "recs-gcp-controls-regulation-map-controlItemId",
      params: {
        paramKey: ["controlItemId"],
        tableKey: ["bcGcpControlItemId"]
      },
      discription: {
        apiEndpoint: "recs-gcp-controls-regulation-map_configregulationId",
        params: {
          paramKey: ["regulationId", "regulation"],
          tableKey: ["Control id", "Regulation"]
        }
      }
    }
  },
  {
    section: "CTG1",
    routes: {
      GCP,
      OCI,
      AWS
      // AZURE,
    }
  },
  {
    section: "CTG2",
    routes: {
      GCP,
      OCI,
      AWS
      // AZURE,
    }
  }
]

export default routes
