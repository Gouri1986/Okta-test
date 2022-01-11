const iamRoutes = [
  {
    path: "/iam-ctg-cloud-ref",
    apiEndpoint: "iam-ctg-cloud-ref",
    pk: ["cloudName"],
  },
  {
    path: "/iam-customer-master",
    apiEndpoint: "iam-customer-master",
    pk: ["customerId"],
    dropdown: [
      {
        name: "customerId",
        dynamic: true,
        displayKey: "customerBusinessName",
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs_customer-master-details-list-all-services`,
      },
      {
        name: "iamType",
        dropdown: ["Internal IDM", "External IDM", "Internal Auth"],
      },
    ],
  },
  {
    path: "/iam-customer-clouds",
    apiEndpoint: "iam-customer-clouds",
    pk: ["customerId", "cloudName"],
    dropdown: [
      {
        name: "customerId",
        dynamic: true,
        displayKey: "customerBusinessName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-customer-ids`,
      },
      {
        name: "cloudName",
        dynamic: true,
        displayKey: "cloudName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-cloud-name`,
      },
    ],
  },
  {
    path: "/iam-job-functions",
    apiEndpoint: "iam-job-functions",
    pk: ["jobFunctionName"],
    dropdown: [{ name: "jobFunctionType", dropdown: ["Admin", "IS Job"] }],
  },
  {
    path: "/iam-admin-roles",
    apiEndpoint: "iam-admin-roles",
    uk: ["adminRoleName"],
    checkbox: [
      {
        name: "privilegesAssigned",
        displayKey: "privilege",
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-admin-privileges`,
      },
    ],
  },
  {
    path: "/iam-default-cloud-roles",
    apiEndpoint: "iam-default-cloud-roles",
    uk: ["defaultCloudRoleName", "cloudName"],
    dropdown: [
      {
        name: "cloudName",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-cloud-name`,
      },
    ],
    checkbox: [
      {
        name: "privilegesAssigned",
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-cloud-privileges`,
      },
    ],
  },
  {
    path: "/iam-job-cloud-roles",
    apiEndpoint: "iam-job-cloud-roles",
    pk: ["jobFunctionName", "CLoudName"],
    dropdown: [
      {
        name: "jobFunctionName",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-job-junction-name`,
      },
      {
        name: "cloudName",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}list-cloudNames`,
      },
      { name: "jobFunctionType", dropdown: ["IS Job"] },
    ],
    checkbox: [
      {
        name: "rolesApplicable",
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-default-cloud-role-id`,
      },
    ],
  },
  {
    path: "/iam-cloud-privileges",
    apiEndpoint: "iam-cloud-privileges",
    pk: ["privilegeId"],
    dropdown: [
      {
        name: "cloudName",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}list-cloudNames`,
      },
      {
        name: "cloudServiceType",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs-cloud-resources/`,
        params: ["cloudName"],
      },
      {
        name: "cloudResourceType",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs-cloud-resources/`,
        params: ["cloudName"],
      },
    ],
  },
  {
    path: "/iam-admin-privileges",
    apiEndpoint: "iam-admin-privileges",
    pk: ["privilegeId"],
    dropdown: [{ name: "adminLevel", dropdown: ["Account", "CTG", "CT"] }],
  },
  {
    path: "/iam-custom-cloud-roles",
    apiEndpoint: "iam-custom-cloud-roles",
    uk: ["CustomCloudRoleName"],
    dropdown: [
      {
        name: "customerId",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-customer-clouds-customer-id`,
      },
    ],
    checkbox: [
      {
        name: "privilegesAssigned",
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-cloud-privileges`,
      },
    ],
  },
  {
    path: "/iam-ctg-master",
    apiEndpoint: "iam-ctg-master",
    pk: ["ctgName", "customerId"],
    dropdown: [
      {
        name: "customerId",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-customer-ids`,
      },
    ],
  },
  {
    path: "/iam-ctg-tenants",
    apiEndpoint: "iam-ctg-tenants",
    pk: ["cloudTenantName"],
    dropdown: [
      {
        name: "ctgId",
        dynamic: true,
        displayKey: "ctgId",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-ctg-id`,
      },
      {
        name: "cloudName",
        dynamic: true,
        displayKey: "cloudName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-customer-clouds-customer-id`,
      },
    ],
    json: [{ name: "recsConfig" }],
  },
];

export default iamRoutes;
