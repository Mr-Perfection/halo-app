import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Bytes: any;
  DateTime: any;
  Decimal: any;
  Json: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  id: Scalars['Int'];
  user: User;
};

export type Customer = {
  __typename?: 'Customer';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  slug: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type DbCredentials = {
  __typename?: 'DBCredentials';
  createdAt?: Maybe<Scalars['DateTime']>;
  customer?: Maybe<Customer>;
  host: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  password: Scalars['String'];
  port: Scalars['String'];
  type: DbType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

/** Type of database credentials that user has. */
export enum DbType {
  Mysql = 'MYSQL',
  Postgresql = 'POSTGRESQL'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCustomer: Customer;
  createDBCredentials: DbCredentials;
  logout: Scalars['Boolean'];
  signup: AuthPayload;
};


export type MutationCreateCustomerArgs = {
  slug: Scalars['String'];
};


export type MutationCreateDbCredentialsArgs = {
  host: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  port: Scalars['String'];
  type: DbType;
  username: Scalars['String'];
};


export type MutationSignupArgs = {
  customerSlug: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAllDBCredentials: Array<DbCredentials>;
  getCustomer: Customer;
  getTicketContext: Ticket;
  getUser: User;
  getUsers: Array<User>;
  login: AuthPayload;
};


export type QueryGetCustomerArgs = {
  slug: Scalars['String'];
};


export type QueryGetTicketContextArgs = {
  queries: Scalars['String'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  context: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  customer?: Maybe<Customer>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  role: UserRole;
};

/** Roles that determine what permissions the user has access to. */
export enum UserRole {
  Admin = 'ADMIN',
  Operator = 'OPERATOR',
  Root = 'ROOT'
}

export type AuthSignupMutationVariables = Exact<{
  customerSlug: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type AuthSignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', id: number, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: UserRole } } };

export type AuthLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type AuthLogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type AuthLoginQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthLoginQuery = { __typename?: 'Query', login: { __typename?: 'AuthPayload', id: number, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: UserRole } } };

export type GetCustomerBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetCustomerBySlugQuery = { __typename?: 'Query', getCustomer: { __typename?: 'Customer', id: number, slug: string } };

export type CreateIntegrationsDbCredentialsMutationVariables = Exact<{
  type: DbType;
  host: Scalars['String'];
  port: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateIntegrationsDbCredentialsMutation = { __typename?: 'Mutation', createDBCredentials: { __typename?: 'DBCredentials', id: number, type: DbType, host: string, port: string, name: string, username: string, password: string, createdAt?: any | null, updatedAt?: any | null } };

export type GetAllIntegrationsDbCredentialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIntegrationsDbCredentialsQuery = { __typename?: 'Query', getAllDBCredentials: Array<{ __typename?: 'DBCredentials', id: number, type: DbType, host: string, port: string, name: string, username: string, password: string, createdAt?: any | null, updatedAt?: any | null }> };

export type AdminGetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: UserRole }> };

export type PrivateRouteGetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type PrivateRouteGetCurrentUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: UserRole, customer?: { __typename?: 'Customer', id: number, slug: string } | null } };


export const AuthSignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"authSignup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"customerSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"customerSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"customerSlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<AuthSignupMutation, AuthSignupMutationVariables>;
export const AuthLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"authLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<AuthLogoutMutation, AuthLogoutMutationVariables>;
export const AuthLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"authLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<AuthLoginQuery, AuthLoginQueryVariables>;
export const GetCustomerBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomerBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCustomer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetCustomerBySlugQuery, GetCustomerBySlugQueryVariables>;
export const CreateIntegrationsDbCredentialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createIntegrationsDBCredentials"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DBType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"host"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"port"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDBCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"host"},"value":{"kind":"Variable","name":{"kind":"Name","value":"host"}}},{"kind":"Argument","name":{"kind":"Name","value":"port"},"value":{"kind":"Variable","name":{"kind":"Name","value":"port"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"host"}},{"kind":"Field","name":{"kind":"Name","value":"port"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateIntegrationsDbCredentialsMutation, CreateIntegrationsDbCredentialsMutationVariables>;
export const GetAllIntegrationsDbCredentialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllIntegrationsDBCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllDBCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"host"}},{"kind":"Field","name":{"kind":"Name","value":"port"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllIntegrationsDbCredentialsQuery, GetAllIntegrationsDbCredentialsQueryVariables>;
export const AdminGetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"adminGetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<AdminGetUsersQuery, AdminGetUsersQueryVariables>;
export const PrivateRouteGetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"privateRouteGetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<PrivateRouteGetCurrentUserQuery, PrivateRouteGetCurrentUserQueryVariables>;