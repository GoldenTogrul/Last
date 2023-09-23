import { all, fork } from 'redux-saga/effects';
import { advertisementsSaga } from './advertisementsSaga';
import { watchUserAuthenticated } from './userSaga';

function* rootSaga() {
  yield all([
    fork(advertisementsSaga),
    fork(watchUserAuthenticated)
  ]);
}

export default rootSaga;