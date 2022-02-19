const complianceDashboardRoutes = [
  {
    section: "GCP Compliance",
    sectionType: "gcp",
    path: "/get-recs-gcp-complaince-details",
    apiEndpoint: "recs-gcp-complaince-details-control-id",
    pk: "controlId",
    tableWhitelists: ["resources"],
    /**
     * ! Drawer Functionality API Config
     * ? This is the function that will be called when the user clicks on the drawer buttons
     * ? 1) Complaince Dashboard Drawer Functionality config
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
        params: { paramKey: ["resourceId", "resource"], tableKey: ["resourceId", "gcpResourceType"] }
      }
    },
    regulationControls: {
      apiEndpoint: "get-bcControlId-complaince-details"
    }
  }
]

export default complianceDashboardRoutes
