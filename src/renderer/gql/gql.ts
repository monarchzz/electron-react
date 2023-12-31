/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment AttachmentFragment on AttachmentPayload {\n    id\n    fileName\n    length\n    contentType\n    url\n  }\n": types.AttachmentFragmentFragmentDoc,
    "\n  fragment RoleFragment on RolePayload {\n    id\n    name\n    description\n  }\n": types.RoleFragmentFragmentDoc,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      userId\n      token\n      refreshToken\n      tenant\n    }\n  }\n": types.LoginDocument,
    "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      token\n      refreshToken\n      tenant\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  query Profile {\n    profile {\n      id\n      lastName\n      firstName\n      email\n      phoneNumber\n      gender\n      emailConfirmed\n      address\n      dateOfBirth\n      avatar {\n        ...AttachmentFragment\n      }\n      roles {\n        ...RoleFragment\n      }\n    }\n  }\n": types.ProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AttachmentFragment on AttachmentPayload {\n    id\n    fileName\n    length\n    contentType\n    url\n  }\n"): (typeof documents)["\n  fragment AttachmentFragment on AttachmentPayload {\n    id\n    fileName\n    length\n    contentType\n    url\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RoleFragment on RolePayload {\n    id\n    name\n    description\n  }\n"): (typeof documents)["\n  fragment RoleFragment on RolePayload {\n    id\n    name\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      userId\n      token\n      refreshToken\n      tenant\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      userId\n      token\n      refreshToken\n      tenant\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      token\n      refreshToken\n      tenant\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($input: RefreshTokenInput!) {\n    refreshToken(input: $input) {\n      userId\n      token\n      refreshToken\n      tenant\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Profile {\n    profile {\n      id\n      lastName\n      firstName\n      email\n      phoneNumber\n      gender\n      emailConfirmed\n      address\n      dateOfBirth\n      avatar {\n        ...AttachmentFragment\n      }\n      roles {\n        ...RoleFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query Profile {\n    profile {\n      id\n      lastName\n      firstName\n      email\n      phoneNumber\n      gender\n      emailConfirmed\n      address\n      dateOfBirth\n      avatar {\n        ...AttachmentFragment\n      }\n      roles {\n        ...RoleFragment\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;