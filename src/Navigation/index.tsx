import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import DrawerRoutes from './Drawer';
import { Provider } from 'react-redux';
import store from '../store/store';

// import { Container } from './styles';

const Routes = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
        <DrawerRoutes/>
    </NavigationContainer>
    </Provider>
  );
}

export default Routes;