import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homescreen from '../screens/Homescreen';
import addscreen from '../screens/Addscreen';
import ChatScreen from '../screens/chat/chatscreen';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/reducers/rootReducer';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const store = configureStore({
  reducer: rootReducer,
});
//const dispatch = useDispatch();
 // const advertisementList = useSelector((state: RootState) => state.advertisements);

 // const handleAddAdvertisement = (newAdvertisement: Advertisement) => {
    // Вызов Redux action для добавления нового объявления
  //  dispatch(addAdvertisement(newAdvertisement));
 // };


 export default function TabRoutes()
 {
     return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={homescreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={addscreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
);
}


