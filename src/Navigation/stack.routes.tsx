import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Profile from "../screens/Profiles/Profile";
import EditProfile from "../screens/Profiles/EditProfile";
import AdvertUser from "../screens/Profiles/AdvertUser";
import  createUser  from "../screens/Profiles/CreateUser";
import AdvertDone from "../screens/Profiles/AdvertDone";


const Stack = createNativeStackNavigator();

export default function StackRoutes()
{
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
             <Stack.Screen
                name="Home"
                component={Profile}
            />  
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="MyAdverts" component={AdvertUser} />
            <Stack.Screen name="MyAdvertsDone" component={AdvertDone} />
            <Stack.Screen name="Create" component={createUser} />
        </Stack.Navigator>
    )
}