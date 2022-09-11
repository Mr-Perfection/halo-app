export const pathNames = {
  ROOT: '/',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SIGNUP: 'signup',
  INTEGRATION: 'integrations',
  QUEUE: 'queues',
  DASHBOARD: 'dashboard',
  OPERATOR: 'operator',
  USERS: 'users',
  PROFILE: 'profile',
  NOT_FOUND: '404',
};

const paths = {
  ROOT: '/',
  LOGIN: `/${pathNames.LOGIN}`,
  LOGOUT: `/${pathNames.LOGOUT}`,
  SIGNUP: `/${pathNames.SIGNUP}`,
  INTEGRATION: `/${pathNames.INTEGRATION}`,
  QUEUE: `/${pathNames.QUEUE}`,
  DASHBOARD: `/${pathNames.DASHBOARD}`,
  OPERATOR: `/${pathNames.OPERATOR}`,
  USERS: `/${pathNames.USERS}`,
  PROFILE: `/${pathNames.PROFILE}`,
  NOT_FOUND: `/${pathNames.NOT_FOUND}`,
};

export default paths;
