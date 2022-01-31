const routes = [
  {
    path: "/iam-ctg-cloud-ref",
    pageName: "CTG Cloud Reference",
    apiEndpoint: "iam-ctg-cloud-ref",
    pk: ["cloudName"],
    whitelist: ["cloudMasterId"],
  },
  {
    path: "/iam-customer-master",
    apiEndpoint: "iam-customer-master",
    pageName: "Customer Master",
    pk: ["customerId"],
    whitelist: ["customerId"],
    visibilitydependency: [
      {
        parent: "iamType",
        value: "External IDM",
        children: ["externalIamClientId", "externalIamName"],
      },
    ],
    dropdown: [
      {
        name: "customerBusinessName",
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
    pageName: "Customer Clouds",
    whitelist: ["customerId"],
    apiEndpoint: "iam-customer-clouds",
    pk: ["customerId", "cloudName"],
    dropdown: [
      {
        name: "customerBusinessName",
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
    pageName: "Job Functions",
    apiEndpoint: "iam-job-functions",
    pk: ["jobFunctionName"],
    dropdown: [{ name: "jobFunctionType", dropdown: ["Admin", "IS Job"] }],
  },
  {
    path: "/iam-admin-roles",
    apiEndpoint: "iam-admin-roles",
    pageName: "Admin Roles",
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
    pageName: "Default Cloud Roles",
    uk: ["defaultCloudRoleName", "cloudName"],
    dropdown: [
      {
        name: "cloudName",
        dynamic: true,
        displayKey: "cloudName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-cloud-name`,
      },
    ],
    checkbox: [
      {
        name: "privilegesAssigned",
        displayKey: "privilege",
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-cloud-privileges`,
      },
    ],
  },
  {
    path: "/iam-job-cloud-roles",
    apiEndpoint: "iam-job-cloud-roles",
    pageName: "Job Cloud Roles",
    pk: ["jobFunctionName", "CLoudName"],
    dropdown: [
      {
        name: "jobFunctionName",
        dynamic: true,
        displayKey: "jobFunctionName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-job-junction-name`,
      },
      {
        name: "cloudName",
        dynamic: true,
        displayKey: "cloudName",
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}list-cloudNames`,
      },
      { name: "jobFunctionType", dropdown: ["IS Job"] },
    ],
    checkbox: [
      {
        name: "rolesApplicable",
        displayKey: "defaultCloudRoleName",
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-default-cloud-role-id`,
      },
    ],
  },
  {
    path: "/iam-cloud-privileges",
    pageName: "Cloud Privileges",
    apiEndpoint: "iam-cloud-privileges",
    pk: ["privilegeId"],
    whitelist: ["privilegeId"],
    dropdown: [
      {
        name: "cloudName",
        dynamic: true,
        displayKey: "cloudName",
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}list-cloudNames`,
      },
      {
        name: "cloudServiceType",
        dynamic: true,
        displayKey: "cloudServiceName",

        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs-cloud-resources/`,
        params: ["cloudName"],
      },
      {
        name: "cloudResourceType",
        dropdownKey: "cloudResource",
        displayKey: "cloudResourceName",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs-cloud-resources/`,
        params: ["cloudName"],
      },
    ],
  },
  {
    path: "/iam-admin-privileges",
    pageName: "Admin Privileges",
    apiEndpoint: "iam-admin-privileges",
    pk: ["privilegeId"],
    dropdown: [{ name: "adminLevel", dropdown: ["Account", "CTG", "CT"] }],
  },
  {
    path: "/iam-custom-cloud-roles",
    pageName: "Custom Cloud Roles",
    apiEndpoint: "iam-custom-cloud-roles",
    uk: ["customCloudRoleName"],
    whitelist: ["customCloudRoleId", "customerId"],
    dropdown: [
      {
        name: "cloudName",
        dynamic: true,
        displayKey: "cloudName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-customer-clouds-customer-id`,
      },
    ],
    checkbox: [
      {
        name: "privilegesAssigned",
        displayKey: "privilege",
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-cloud-privileges`,
      },
    ],
  },
  {
    path: "/iam-ctg-master",
    apiEndpoint: "iam-ctg-master",
    pageName: "CTG Master",
    pk: ["ctgName", "customerId"],
    dropdown: [
      {
        name: "customerId",
        dynamic: true,
        displayKey: "customerBusinessName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-customer-ids`,
      },
    ],
  },
  {
    path: "/iam-ctg-tenants",
    pageName: "CTG Tenants",
    apiEndpoint: "iam-ctg-tenants",
    pk: ["cloudTenantName"],
    dependency: [
      { parent: "ctgId", children: ["ctgName", "customerId"], disabled: true },
    ],
    whitelist: ["ctgId", "customerId"],
    dropdown: [
      {
        name: "ctgName",
        dynamic: true,
        displayKey: "ctgName",
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
  {
    path: "/iam-user-roles",
    pageName: "IAM User Roles",
    apiEndpoint: "iam-user-roles",
    pk: ["userRoleId"],
    whitelist: ["userRoleId"],
    visibilitydependency: [
      {
        parent: "roleType",
        value: "custom",
        children: [
          "customCloudRoleId",
          "customCloudRoleName",
          "customRoleCloud",
        ],
      },
      {
        parent: "roleType",
        value: "default",
        children: [
          "defaultCloudRoleId",
          "defaultCloudRoleName",
          "defaultRoleCloud",
        ],
      },
    ],
    dropdown: [
      {
        name: "userId",
        dynamic: true,
        displayKey: "userId",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-users-id-roles`,
      },
      {
        name: "customCloudRoleName",
        dynamic: true,
        displayKey: "customCloudRoleName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-custom-cloud-role-id`,
      },
      {
        name: "defaultCloudRoleName",
        dynamic: true,
        displayKey: "defaultCloudRoleName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-default-cloud-role-id`,
      },
      { name: "roleType", dropdown: ["Custom", "Default"] },
      {
        name: "cloudName",
        dynamic: true,
        displayKey: "cloudName",
        dropdown: `${process.env.REACT_APP_IAM_BASE_URL}list-customer-clouds-customer-id`,
      },
    ],
  },
];

const iamRoutes = [
  {
    section: "",
    routes: {
      routes,
    },
  },
];

export default iamRoutes;
