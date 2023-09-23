import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer'; // Импортируйте свой корневой редюсер
import { Advertisement } from './types';
import createSagaMiddleware from 'redux-saga';
import { watchSetSub } from './sagas/userSaga'; // Подключите вашу сагу
import { API, graphqlOperation } from 'aws-amplify';
import { UserData } from './types';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware], // Используйте middleware для Saga
  // Другие параметры конфигурации, если необходимо
});

sagaMiddleware.run(rootSaga);

export interface RootState {
  [x: string]: any;
  advertisements: Advertisement[];
  UserData: UserData[];
    
  // Другие свойства состояния
}

export default store;
