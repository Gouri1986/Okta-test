const complianceDashboardRoutes = [
  {
    section: "OCI Compliance",
    path: "/get-recs-oci-complaince-details",
    apiEndpoint: "get-recs-oci-complaince-details",
    pk: "controlId",
    tableWhitelists: ["resources"]
  }
]

export default complianceDashboardRoutes
