// advertisementsSaga.ts

import { put, call, takeEvery } from 'redux-saga/effects';
import { API, graphqlOperation } from 'aws-amplify';
import { listAdvertisements } from '../../graphql/queries';
import { Advertisement } from '../types';


function* fetchAdvertisements() {
  try {
    const response = yield call(API.graphql, graphqlOperation(listAdvertisements));
    const advertisements: Advertisement[] = response.data.listAdvertisements.items;
    yield put({ type: 'ADD_ADVERTISEMENT', payload: advertisements });
  } catch (error) {
    console.error('Error fetching advertisements:', error);
  }
}

export function* advertisementsSaga() {
  yield takeEvery('FETCH_ADVERTISEMENTS', fetchAdvertisements);
}
