import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { API, Auth, graphqlOperation } from 'aws-amplify';

import MapView, { Marker } from 'react-native-maps';
import { Advertisement, UserData } from '../../store/types';

import { advertisementsByUserID, getUser } from '../../graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { updateAdvertisement, updateUser } from '../../graphql/mutations';


const AdvertisementsTab: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState<Advertisement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const navigation = useNavigation();
  const [sub, setSub] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [completeUser, setCompleteUser] = useState<UserData | null>(null);

  // Создаем функцию для обработки нажатия на кнопку "назад"
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userSub = user.attributes.sub;
        setSub(userSub);
        const response = await API.graphql({
          query: advertisementsByUserID,
          variables: {
            userID: userSub,
            filter: { status: { eq: "accepted" } } // Добавляем фильтр по статусу "accepted"
            // Добавьте другие параметры, если необходимо
          },
        });
        const advertisementData = response.data.advertisementsByUserID.items;
        setAdvertisements(advertisementData);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
      }
    };
  
    fetchAdvertisements();
  }, []);

  const handleAdvertisementPress = (advertisement: Advertisement) => {
    setSelectedAdvertisement(advertisement);
    setIsModalVisible(true);
  };

  const handleCompleteAdvertisement = async () => {
    if (selectedAdvertisement) {
      try {
        // Создаем объект обновления для мутации
        const updateInput = {
          id: selectedAdvertisement.id,
          status: "done", // Устанавливаем новый статус "done"
        };

        // Выполняем мутацию для обновления статуса объявления
        const updatedAdvertisement = await API.graphql({
          query: updateAdvertisement,
          variables: { input: updateInput },
        });

        // Обновляем локальное состояние объявления с новым статусом
        setSelectedAdvertisement({
          ...selectedAdvertisement,
          status: "done",
        });

        console.log('Объявление выполнено:', updatedAdvertisement.data?.updateAdvertisement);
        const completeUserResponse = await API.graphql({
          query: getUser, // Замените на ваш запрос для получения данных пользователя
          variables: { id: selectedAdvertisement.completeUserID },
        });
        const completeUserData = completeUserResponse.data.getUser; // Замените на соответствующий путь к данным пользователя

        // Увеличение баланса пользователя, который завершил объявление
        const updatedCompleteUser = {
          ...completeUserData,
          
          balance: completeUserData.balance + selectedAdvertisement.price,
        };
        // Выполните мутацию для обновления баланса пользователя с completeUserID
      const updateCompleteUserResponse = await API.graphql({
        query: updateUser, // Замените на ваш запрос для обновления данных пользователя
        variables: { input: updatedCompleteUser },
      });
      } catch (error) {
        console.error('Ошибка при обновлении статуса объявления:', error);
      }
    }
  };

  const closeModal = () => {
    setSelectedAdvertisement(null);
    setIsModalVisible(false);
  };

  const calculateTimeLeft = () => {
    if (selectedAdvertisement) {
      const expirationTime = new Date(selectedAdvertisement.executionTime);
      const currentTime = new Date();
      const timeDifference = expirationTime.getTime() - currentTime.getTime();

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    }

    return { hours: 0, minutes: 0, seconds: 0 };
  };

  const renderAdvertisementItem = ({ item }: { item: Advertisement }) => {
    const timeLeft = calculateTimeLeft();

    return (
      <TouchableOpacity
        style={styles.advertisementItem}
        onPress={() => handleAdvertisementPress(item)}
      >
        <Text style={styles.advertisementTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Price: ${item.price}</Text>
        
        <MapView
          style={styles.map}
          region={{
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          initialRegion={{
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title="Местоположение"
          />
        </MapView>
        <Text>
          Time Left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={handleGoBack} />
      <FlatList
        data={advertisements}
        renderItem={renderAdvertisementItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {isModalVisible && (
        <Modal visible={true} animationType="slide">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selected Advertisement:</Text>
            <Text>Title: {selectedAdvertisement?.title}</Text>
            <Text>Description: {selectedAdvertisement?.description}</Text>
            <Text>Price: ${selectedAdvertisement?.price}</Text>
            <Text>Time Left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</Text>

            {/* Добавляем кнопку "Выполнено" */}
            <TouchableOpacity style={styles.completeButton} onPress={handleCompleteAdvertisement}>
              <Text>Выполнено</Text>
            </TouchableOpacity>

            {/* Улучшаем кнопку "Close Modal" */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  advertisementItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  advertisementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  map: {
    height: 200,
    marginBottom: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  // Улучшенный стиль кнопки "Close Modal"
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  closeButtonText: {
    color: 'white', // Цвет текста кнопки "Закрыть"
    textAlign: 'center',
  },
});

export default AdvertisementsTab;

