/**
 * routes to iam tables with table details
 *
 * description of few main terminologies:
 * path - url path of page -> this path will be applied whenever the navigation changes form the menu bar
 * pageName - page name to be displayed in the header section of the page
 * apiEndpoint - api endpoint for the respective tables to fetch data from the server
 * whitelist - an array of table keys. These keys will be exluded from modal form
 * dropdown - an array of objects where each object is an info about dropdown in the modal form
 * checkbox - an array of objects where each object is an info about checkbox in the modal form
 * pk/uk - array of keys where the table uses them as the key for crud
 * visibilityDependenvy - an array objects where an object holds the info about value dependency of one input on another input For eg, one input will be rendered/made visbile based on a value of dropdown
 *
 */

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
        parent: "iamType", // parent input's key in which the children inputs' rendering depends
        value: "External IDM", // actual match of value to render the children(depended) inputs
        children: ["externalIamClientId", "externalIamName"], // an array of depending inputs
      },
    ],
    dropdown: [
      {
        name: "customerBusinessName", // key of the column
        dynamic: true, // if dynamic, call the api to fetch dropdown data
        displayKey: "customerBusinessName", // key of the object returned from the api to display in dropdown
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs_customer-master-details-list-all-services`, // api to fetch the dropdown if dynamic
      },
      {
        name: "iamType", // key of column
        dropdown: ["Internal IDM", "External IDM", "Internal Auth"], // if not dynamic, populate with static dropdown with array of strings(Values)
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
        name: "privilegesAssigned", // key of column
        displayKey: "privilege", //key of the object returned from the api to display in checkbox label
        api: `${process.env.REACT_APP_IAM_BASE_URL}list-admin-privileges`, // api to fetch checkbox values
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
      /**
       *
       * Following two dropdown depends on the value of another dropdwon/input, that will be passed as the paramw to the apis of the following dropdown
       */
      {
        name: "cloudServiceType",
        dynamic: true,
        displayKey: "cloudServiceType",
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs-cloud-resources`,
        params: ["cloudName"], // an array of key where the selected value of the key will be passed the param in the above api to fetch the respective dropdown values
      },
      /**
       *
       * Following dropdown renders in complex way (nested retrieval)
       * this dropdown is depend on the values of another dropdown (nestedArrayDependencyKey)
       * from that values, actual dropdown values of the this dropdown can be grabbed with nestedArrayKey
       *
       */
      {
        name: "cloudResourceType",
        displayKey: "cloudResourceType",
        nestedArrayKey: "cloudResource",
        nestedArrayDependencyKey: "cloudServiceType",
        dynamic: true,
        dropdown: `${process.env.REACT_APP_ENCS_BASE_URL}encs-cloud-resources`,
        params: ["cloudName"], // an array of key where the selected value of the key will be passed the param in the above api to fetch the respective dropdown values
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

// export all the routes of the iam as a single array of object in the single section with no title

const iamRoutes = [
  {
    section: "",
    routes: {
      routes,
    },
  },
];

export default iamRoutes;
