/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAdvertisementInput = {
  id?: string | null,
  title: string,
  description: string,
  price: number,
  latitude: number,
  longitude: number,
  executionTime: string,
  cognitoSub: string,
  userID: string,
  status: string,
  acceptedUserID?: string | null,
  comletedUserID?: string | null,
};

export type ModelAdvertisementConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  executionTime?: ModelStringInput | null,
  cognitoSub?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  acceptedUserID?: ModelStringInput | null,
  comletedUserID?: ModelStringInput | null,
  and?: Array< ModelAdvertisementConditionInput | null > | null,
  or?: Array< ModelAdvertisementConditionInput | null > | null,
  not?: ModelAdvertisementConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Advertisement = {
  __typename: "Advertisement",
  id: string,
  title: string,
  description: string,
  price: number,
  latitude: number,
  longitude: number,
  executionTime: string,
  cognitoSub: string,
  userID: string,
  status: string,
  acceptedUserID?: string | null,
  comletedUserID?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAdvertisementInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  price?: number | null,
  latitude?: number | null,
  longitude?: number | null,
  executionTime?: string | null,
  cognitoSub?: string | null,
  userID?: string | null,
  status?: string | null,
  acceptedUserID?: string | null,
  comletedUserID?: string | null,
};

export type DeleteAdvertisementInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email: string,
  firstName: string,
  lastName?: string | null,
  profileImage?: string | null,
  cognitoSub: string,
  phone?: string | null,
  balans: number,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  cognitoSub?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  balans?: ModelFloatInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email: string,
  firstName: string,
  lastName?: string | null,
  profileImage?: string | null,
  cognitoSub: string,
  phone?: string | null,
  Advertisements?: ModelAdvertisementConnection | null,
  balans: number,
  createdAt: string,
  updatedAt: string,
};

export type ModelAdvertisementConnection = {
  __typename: "ModelAdvertisementConnection",
  items:  Array<Advertisement | null >,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  profileImage?: string | null,
  cognitoSub?: string | null,
  phone?: string | null,
  balans?: number | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelAdvertisementFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelFloatInput | null,
  latitude?: ModelFloatInput | null,
  longitude?: ModelFloatInput | null,
  executionTime?: ModelStringInput | null,
  cognitoSub?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  acceptedUserID?: ModelStringInput | null,
  comletedUserID?: ModelStringInput | null,
  and?: Array< ModelAdvertisementFilterInput | null > | null,
  or?: Array< ModelAdvertisementFilterInput | null > | null,
  not?: ModelAdvertisementFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  firstName?: ModelStringInput | null,
  lastName?: ModelStringInput | null,
  profileImage?: ModelStringInput | null,
  cognitoSub?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  balans?: ModelFloatInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionAdvertisementFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionFloatInput | null,
  latitude?: ModelSubscriptionFloatInput | null,
  longitude?: ModelSubscriptionFloatInput | null,
  executionTime?: ModelSubscriptionStringInput | null,
  cognitoSub?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  acceptedUserID?: ModelSubscriptionStringInput | null,
  comletedUserID?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdvertisementFilterInput | null > | null,
  or?: Array< ModelSubscriptionAdvertisementFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  firstName?: ModelSubscriptionStringInput | null,
  lastName?: ModelSubscriptionStringInput | null,
  profileImage?: ModelSubscriptionStringInput | null,
  cognitoSub?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  balans?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type CreateAdvertisementMutationVariables = {
  input: CreateAdvertisementInput,
  condition?: ModelAdvertisementConditionInput | null,
};

export type CreateAdvertisementMutation = {
  createAdvertisement?:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string,
    price: number,
    latitude: number,
    longitude: number,
    executionTime: string,
    cognitoSub: string,
    userID: string,
    status: string,
    acceptedUserID?: string | null,
    comletedUserID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAdvertisementMutationVariables = {
  input: UpdateAdvertisementInput,
  condition?: ModelAdvertisementConditionInput | null,
};

export type UpdateAdvertisementMutation = {
  updateAdvertisement?:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string,
    price: number,
    latitude: number,
    longitude: number,
    executionTime: string,
    cognitoSub: string,
    userID: string,
    status: string,
    acceptedUserID?: string | null,
    comletedUserID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAdvertisementMutationVariables = {
  input: DeleteAdvertisementInput,
  condition?: ModelAdvertisementConditionInput | null,
};

export type DeleteAdvertisementMutation = {
  deleteAdvertisement?:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string,
    price: number,
    latitude: number,
    longitude: number,
    executionTime: string,
    cognitoSub: string,
    userID: string,
    status: string,
    acceptedUserID?: string | null,
    comletedUserID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string | null,
    profileImage?: string | null,
    cognitoSub: string,
    phone?: string | null,
    Advertisements?:  {
      __typename: "ModelAdvertisementConnection",
      nextToken?: string | null,
    } | null,
    balans: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string | null,
    profileImage?: string | null,
    cognitoSub: string,
    phone?: string | null,
    Advertisements?:  {
      __typename: "ModelAdvertisementConnection",
      nextToken?: string | null,
    } | null,
    balans: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string | null,
    profileImage?: string | null,
    cognitoSub: string,
    phone?: string | null,
    Advertisements?:  {
      __typename: "ModelAdvertisementConnection",
      nextToken?: string | null,
    } | null,
    balans: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAdvertisementQueryVariables = {
  id: string,
};

export type GetAdvertisementQuery = {
  getAdvertisement?:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string,
    price: number,
    latitude: number,
    longitude: number,
    executionTime: string,
    cognitoSub: string,
    userID: string,
    status: string,
    acceptedUserID?: string | null,
    comletedUserID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAdvertisementsQueryVariables = {
  filter?: ModelAdvertisementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdvertisementsQuery = {
  listAdvertisements?:  {
    __typename: "ModelAdvertisementConnection",
    items:  Array< {
      __typename: "Advertisement",
      id: string,
      title: string,
      description: string,
      price: number,
      latitude: number,
      longitude: number,
      executionTime: string,
      cognitoSub: string,
      userID: string,
      status: string,
      acceptedUserID?: string | null,
      comletedUserID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AdvertisementsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAdvertisementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AdvertisementsByUserIDQuery = {
  advertisementsByUserID?:  {
    __typename: "ModelAdvertisementConnection",
    items:  Array< {
      __typename: "Advertisement",
      id: string,
      title: string,
      description: string,
      price: number,
      latitude: number,
      longitude: number,
      executionTime: string,
      cognitoSub: string,
      userID: string,
      status: string,
      acceptedUserID?: string | null,
      comletedUserID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string | null,
    profileImage?: string | null,
    cognitoSub: string,
    phone?: string | null,
    Advertisements?:  {
      __typename: "ModelAdvertisementConnection",
      nextToken?: string | null,
    } | null,
    balans: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email: string,
      firstName: string,
      lastName?: string | null,
      profileImage?: string | null,
      cognitoSub: string,
      phone?: string | null,
      balans: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAdvertisementSubscriptionVariables = {
  filter?: ModelSubscriptionAdvertisementFilterInput | null,
};

export type OnCreateAdvertisementSubscription = {
  onCreateAdvertisement?:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string,
    price: number,
    latitude: number,
    longitude: number,
    executionTime: string,
    cognitoSub: string,
    userID: string,
    status: string,
    acceptedUserID?: string | null,
    comletedUserID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAdvertisementSubscriptionVariables = {
  filter?: ModelSubscriptionAdvertisementFilterInput | null,
};

export type OnUpdateAdvertisementSubscription = {
  onUpdateAdvertisement?:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string,
    price: number,
    latitude: number,
    longitude: number,
    executionTime: string,
    cognitoSub: string,
    userID: string,
    status: string,
    acceptedUserID?: string | null,
    comletedUserID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAdvertisementSubscriptionVariables = {
  filter?: ModelSubscriptionAdvertisementFilterInput | null,
};

export type OnDeleteAdvertisementSubscription = {
  onDeleteAdvertisement?:  {
    __typename: "Advertisement",
    id: string,
    title: string,
    description: string,
    price: number,
    latitude: number,
    longitude: number,
    executionTime: string,
    cognitoSub: string,
    userID: string,
    status: string,
    acceptedUserID?: string | null,
    comletedUserID?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string | null,
    profileImage?: string | null,
    cognitoSub: string,
    phone?: string | null,
    Advertisements?:  {
      __typename: "ModelAdvertisementConnection",
      nextToken?: string | null,
    } | null,
    balans: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string | null,
    profileImage?: string | null,
    cognitoSub: string,
    phone?: string | null,
    Advertisements?:  {
      __typename: "ModelAdvertisementConnection",
      nextToken?: string | null,
    } | null,
    balans: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email: string,
    firstName: string,
    lastName?: string | null,
    profileImage?: string | null,
    cognitoSub: string,
    phone?: string | null,
    Advertisements?:  {
      __typename: "ModelAdvertisementConnection",
      nextToken?: string | null,
    } | null,
    balans: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
