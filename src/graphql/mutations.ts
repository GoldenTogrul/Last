/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "..\API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAdvertisement = /* GraphQL */ `mutation CreateAdvertisement(
  $input: CreateAdvertisementInput!
  $condition: ModelAdvertisementConditionInput
) {
  createAdvertisement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateAdvertisementMutationVariables,
  APITypes.CreateAdvertisementMutation
>;
export const updateAdvertisement = /* GraphQL */ `mutation UpdateAdvertisement(
  $input: UpdateAdvertisementInput!
  $condition: ModelAdvertisementConditionInput
) {
  updateAdvertisement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateAdvertisementMutationVariables,
  APITypes.UpdateAdvertisementMutation
>;
export const deleteAdvertisement = /* GraphQL */ `mutation DeleteAdvertisement(
  $input: DeleteAdvertisementInput!
  $condition: ModelAdvertisementConditionInput
) {
  deleteAdvertisement(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteAdvertisementMutationVariables,
  APITypes.DeleteAdvertisementMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
