/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "..\API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAdvertisement = /* GraphQL */ `query GetAdvertisement($id: ID!) {
  getAdvertisement(id: $id) {
    id
    title
    description
    price
    latitude
    longitude
    executionTime
    cognitoSub
    userID
    status
    acceptedUserID
    comletedUserID
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAdvertisementQueryVariables,
  APITypes.GetAdvertisementQuery
>;
export const listAdvertisements = /* GraphQL */ `query ListAdvertisements(
  $filter: ModelAdvertisementFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdvertisements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      description
      price
      latitude
      longitude
      executionTime
      cognitoSub
      userID
      status
      acceptedUserID
      comletedUserID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdvertisementsQueryVariables,
  APITypes.ListAdvertisementsQuery
>;
export const advertisementsByUserID = /* GraphQL */ `query AdvertisementsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAdvertisementFilterInput
  $limit: Int
  $nextToken: String
) {
  advertisementsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      title
      description
      price
      latitude
      longitude
      executionTime
      cognitoSub
      userID
      status
      acceptedUserID
      comletedUserID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AdvertisementsByUserIDQueryVariables,
  APITypes.AdvertisementsByUserIDQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    firstName
    lastName
    profileImage
    cognitoSub
    phone
    Advertisements {
      nextToken
      __typename
    }
    balans
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      email
      firstName
      lastName
      profileImage
      cognitoSub
      phone
      balans
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
