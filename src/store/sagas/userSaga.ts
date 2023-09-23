
import { put, takeEvery, select } from 'redux-saga/effects';
import { userAuthenticated } from '../actions/actions';
import { RootState } from '../reducers/rootReducer';

// Функция-генератор для обработки действия userAuthenticated
function* handleUserAuthenticated(action: ReturnType<typeof userAuthenticated>) {
  const sub = action.payload;
  yield put({ type: 'SET_SUB', payload: sub });
  // Далее ваша логика, использующая sub
}

// Слушайте действие userAuthenticated и вызывайте handleUserAuthenticated при его вызове
export function* watchUserAuthenticated() {
  yield takeEvery(userAuthenticated, handleUserAuthenticated);
}