// actions.ts
import { Advertisement } from '../types';
import { API, graphqlOperation } from 'aws-amplify';
import { createAction } from 'typesafe-actions';

export const addAdvertisement = (newAdvertisement: Advertisement) => ({
  type: 'ADD_ADVERTISEMENT',
  payload: newAdvertisement,
});

export const getAdvertisementList = () => ({
  type: 'GET_ADVERTISEMENT_LIST',
});
export const userAuthenticated = createAction('USER_AUTHENTICATED', (sub: string) => sub)();
