/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "..\API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAdvertisement = /* GraphQL */ `subscription OnCreateAdvertisement(
  $filter: ModelSubscriptionAdvertisementFilterInput
) {
  onCreateAdvertisement(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAdvertisementSubscriptionVariables,
  APITypes.OnCreateAdvertisementSubscription
>;
export const onUpdateAdvertisement = /* GraphQL */ `subscription OnUpdateAdvertisement(
  $filter: ModelSubscriptionAdvertisementFilterInput
) {
  onUpdateAdvertisement(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAdvertisementSubscriptionVariables,
  APITypes.OnUpdateAdvertisementSubscription
>;
export const onDeleteAdvertisement = /* GraphQL */ `subscription OnDeleteAdvertisement(
  $filter: ModelSubscriptionAdvertisementFilterInput
) {
  onDeleteAdvertisement(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAdvertisementSubscriptionVariables,
  APITypes.OnDeleteAdvertisementSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
