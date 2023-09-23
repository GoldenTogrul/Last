import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createUser, updateUser } from '../../graphql/mutations';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импортируем AsyncStorage

const EditProfile: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const navigation = useNavigation();

  // Создаем функцию для обработки нажатия на кнопку "назад"
  const handleGoBack = () => {
    navigation.goBack();
  };

  const createNewUser = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const firstName = userData.firstName;

      // Извлеките cognitoSub из userData
      const { cognitoSub } = userData;
      console.log('Отправляем запрос с данными:');
      console.log('username:', username);
      console.log('email:', email);
      console.log('firstName:', firstName);
      console.log('lastName:', lastName);
      console.log('profileImage:', profileImage);
      console.log('cognitoSub:', cognitoSub);
      console.log('phone:', phone);
      // Отправьте запрос для создания пользователя в базу данных
      try {
        const newUser = await API.graphql({
          query: createUser,
          variables: {
            input: {
              id: userData.cognitoSub,
              username: userData.username,
              email: userData.email,
              firstName: userData.firstName,
              cognitoSub: userData.cognitoSub,
              balans: 1000,
            }
          }
        });
    
        console.log('Пользователь успешно создан:', newUser);
    
        // Далее, вы можете добавить обработку результата createUser
        // например, обновить состояние или выполнить другие действия
      } catch (error) {
        console.error('Ошибка при создании пользователя:', error);
        // Обработайте ошибку, например, показав сообщение об ошибке пользователю
      }
      

      
    }// Здесь можно добавить дополнительную логику, например, перенаправление на другой экран
    } catch (error) {
      
    }
  };

  // Используем useEffect для получения данных из AsyncStorage при загрузке компонента
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Загрузите данные из AsyncStorage
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedUserData) {
          const userData = JSON.parse(storedUserData);

          // Установите данные в соответствующие состояния
          setUsername(userData.username);
          setEmail(userData.email);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setProfileImage(userData.profileImage);
          setPhone(userData.phone);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных из AsyncStorage:', error);
      }
    };

    // Вызовите функцию для загрузки данных при монтировании компонента
    loadUserData();
  }, []);  // [] означает, что useEffect будет вызываться только один раз при загрузке компонента

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Создать пользователя </Text>

      <TextInput
        style={styles.input}
        placeholder="Имя пользователя"
         onChangeText={(text) => setUsername(text)}
         value={username} // Убедитесь, что вы передаете значение username из userData
        />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Имя"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Фамилия"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <TextInput
        style={styles.input}
        placeholder="URL профильного изображения"
        onChangeText={(text) => setProfileImage(text)}
        value={profileImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <Button title="Создать пользователя" onPress={createNewUser} />
      <Button title="Back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default EditProfile;

