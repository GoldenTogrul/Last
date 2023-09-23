import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createAdvertisement, updateUser } from '../graphql/mutations'; 
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getUser } from '../graphql/queries';
import { UserData } from '../store/types';
import { userAuthenticated } from '../store/actions/actions';

const AddAdvertisementTab: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState({ latitude: 0, longitude: 0 });
  const [executionTime, setExecutionTime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [cognitoSub, setCognitoSub] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const newLatitude = location.coords.latitude;
        const newLongitude = location.coords.longitude;

        setLatitude(newLatitude);
        setLongitude(newLongitude);

        setSelectedLocation({ latitude: newLatitude, longitude: newLongitude });

        // Извлекаем cognitoSub из текущего аутентифицированного пользователя
        const user = await Auth.currentAuthenticatedUser();
        const userSub = user.attributes.sub;
        setCognitoSub(userSub);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleAddAdvertisement = async () => {
    if (!title || !description || !price || !executionTime || !cognitoSub) {
      console.log('Error: Please fill in all fields');
      return;
    }

    try {
      // Получаем текущего пользователя
      const user = await Auth.currentAuthenticatedUser();
      const userSub = user.attributes.sub;
      const userData = await API.graphql({
        query: getUser,
        variables: { id: userSub }
      });
      console.log('userData:', userData);
      const userResult = userData.data?.getUser as UserData;
      if (userResult) {
        setUser(userResult);
      }
      console.log(userResult.balans);
      // Получаем баланс пользователя
      const userBalance = userResult.balans || 0; // Замените 'balans' на актуальное название атрибута баланса

      // Проверяем, хватает ли у пользователя средств
      const advertisementPrice = parseFloat(price);
      if (userBalance < advertisementPrice) {
        console.log('Error: Insufficient funds', userBalance);
        return;
      }

      // Вычитаем цену объявления из баланса пользователя
      const newBalance = userBalance - advertisementPrice;

      // Обновляем баланс пользователя в базе данных
      // await Auth.updateUserAttributes(user, {
      //   balans: newBalance.toString(), 
      // });
      const updateInput = {
        id: cognitoSub,
       balans: newBalance.toString(), 
      };

      
      const updatedUser = await API.graphql({
        query: updateUser,
        variables: { input: updateInput },
      });
      console.log('balans:', newBalance.toString(),);
      const advertisementId = uuidv4();

      console.log('id:', advertisementId);
      console.log('title:', title);
      console.log('description:', description);
      console.log('price:', parseFloat(price));
      console.log('latitude:', selectedLocation.latitude);
      console.log('longitude:', selectedLocation.longitude);
      console.log('executionTime:', new Date(executionTime).toISOString());
      console.log('cognitoSub:', cognitoSub);
      const newAdvertisement = await API.graphql({
        query: createAdvertisement,
        variables: {
          input: {
            id: advertisementId,
            title: title,
            description: description,
            price: parseFloat(price),
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            executionTime: new Date(executionTime).toISOString(),
            cognitoSub: cognitoSub,
            userID: cognitoSub,
            status: "visible",
          }
        }
      });

      console.log('Advertisement added:', newAdvertisement.data?.createAdvertisement);
      // Возможно, здесь вам нужно обновить локальное состояние с объявлением
    } catch (error) {
      console.error('Error adding advertisement:', error);
    }

    setTitle('');
    setDescription('');
    setPrice('');
    setExecutionTime('');
    Keyboard.dismiss();
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const handleMapPress = (e: { nativeEvent: { coordinate: { latitude: any; longitude: any; }; }; }) => {
    const newLatitude = e.nativeEvent.coordinate.latitude;
    const newLongitude = e.nativeEvent.coordinate.longitude;
    setLatitude(newLatitude);
    setLongitude(newLongitude);

    setSelectedLocation({ latitude: newLatitude, longitude: newLongitude });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setExecutionTime(date);
    hideDatePicker();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchablePress}>
      <View style={styles.container}>
        <Text style={styles.title}>Добавить объявление</Text>
        <TextInput
          style={styles.input}
          placeholder="Название"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Описание"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title="Местоположение"
            />
          </MapView>
        </View>
        <TextInput
          style={styles.inputPrice}
          placeholder="Цена"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        /> 
        <Text>AZN</Text>
        <Button title="Выбрать время" onPress={showDatePicker} />
        <Text>Время выполнения: {executionTime ? executionTime.toLocaleString() : 'Не выбрано'}</Text>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
          pickerContainerStyleIOS={{ backgroundColor: 'black', padding: 20 }}
        />
        <Button title="Добавить" onPress={handleAddAdvertisement} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  inputPrice: {
    height: 40,
    borderColor: 'red',
    borderWidth: 3,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: 60,
  },
  mapContainer: {
    flex: 1,
    height: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
  },
  map: {
    flex: 1,
  },
  descriptionInput: {
    height: 120,
  },
});

export default AddAdvertisementTab;
