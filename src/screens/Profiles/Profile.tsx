import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Auth, API } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { userAuthenticated } from '../../store/actions/actions';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../../graphql/queries';
import { UserData } from '../../store/types';



const Profile: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [sub, setSub] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  const handleAdvertUser = () => {
    navigation.navigate('MyAdverts');
  };
  const handleAdvertDone = () => {
    navigation.navigate('MyAdvertsDone');
  };
  const handleCreateUser = () => {
    navigation.navigate('Create');
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      
      console.log('SignOut');
    } catch (error) {
      console.log('Ошибка при выходе из системы:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userSub = user.attributes.sub;
        setSub(userSub);

        const userData = await API.graphql({
          query: getUser,
          variables: { id: userSub}
        });
        console.log('userData:', userData); 
        const userResult = userData.data?.getUser as UserData;
        if (userResult) {
          dispatch(userAuthenticated(userResult));
          setUser(userResult);
        }
      } catch (error) {
        console.log('Ошибка при получении данных пользователя:', error);
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [user, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      
      {user && (
        <View style={styles.userInfo}>
          {user.profileImage && (
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
          )}
          <Text style={styles.text}>Username: {user.username}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>First Name: {user.firstName}</Text>
          <Text style={styles.text}>Last Name: {user.lastName}</Text>
          {user.phone && <Text style={styles.text}>Phone: {user.phone}</Text>}
          <Text style={styles.text}>balans: {user.balans} azn</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
  <Text style={styles.buttonText}>Create</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={handleEditProfile}>
  <Text style={styles.buttonText}>Edit Profile</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={handleAdvertUser}>
  <Text style={styles.buttonText}>My Adverts</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={handleAdvertDone}>
  <Text style={styles.buttonText}>DoneAdvert</Text>
</TouchableOpacity>

      <Text onPress={signOut} style={styles.signOut}>
        Sign out
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  signOut: {
    width: '100%',
    textAlign: 'center',
    color: 'red',
    marginTop: 'auto',
    marginVertical: 20,
    fontSize: 20,
  },
  button: {
    backgroundColor: 'blue', // Цвет фона кнопки
    padding: 10, // Отступы вокруг текста кнопки
    borderRadius: 8, // Скругленные углы кнопки
    marginBottom: 10, // Отступ между кнопками
  },
  buttonText: {
    color: 'white', // Цвет текста кнопки
    fontSize: 18, // Размер шрифта текста кнопки
    textAlign: 'center', // Выравнивание текста по центру
  },
});

export default Profile;
