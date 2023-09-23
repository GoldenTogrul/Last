import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listAdvertisements } from '../graphql/queries';
import MapView, { Marker } from 'react-native-maps';
import { Advertisement } from '../store/types';
import { RootState } from '../store/store';
import { updateAdvertisement } from '../graphql/mutations';

const AdvertisementsTab: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAdvertisement, setSelectedAdvertisement] = useState<Advertisement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(listAdvertisements, {
            filter: {
              status: { eq: "visible" }, // Установите здесь нужный статус
            },
          })
        );

        const advertisementData = response.data.listAdvertisements.items;
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

  // Функция для обработки нажатия на кнопку "Принять объявление"
  const acceptAdvertisement = async () => {
    if (selectedAdvertisement) {
      try {
        // Получаем текущего пользователя
        const user = await Auth.currentAuthenticatedUser();
        const userSub = user.attributes.sub;

        // Проверяем, что текущий пользователь не является создателем объявления
        if (userSub === selectedAdvertisement.userID) {
          console.log('Вы не можете принять своё собственное объявление');
          return;
        }

        // Проверяем, что объявление еще не было принято другим пользователем
        if (selectedAdvertisement.acceptedUserID) {
          console.log('Объявление уже принято другим пользователем');
          return;
        }

        // Создаем объект обновления для мутации
        const updateInput = {
          id: selectedAdvertisement.id,
          status: "accepted", // Устанавливаем новый статус
          acceptedUserID: userSub, // Устанавливаем ID пользователя, который принял объявление
        };

        // Выполняем мутацию для обновления объявления
        const updatedAdvertisement = await API.graphql({
          query: updateAdvertisement,
          variables: { input: updateInput },
        });

        // Обновляем локальное состояние объявления с новым статусом и acceptedUserID
        setSelectedAdvertisement({
          ...selectedAdvertisement,
          status: "accepted",
          acceptedUserID: userSub,
        });

        console.log('Объявление принято:', updatedAdvertisement.data?.updateAdvertisement);
      } catch (error) {
        console.error('Ошибка при обновлении объявления:', error);
      }
    }
  };

  const renderAdvertisementItem = ({ item }: { item: Advertisement }) => {
    const timeLeft = calculateTimeLeft();
    console.log('Advertisement Data:', item);

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
            <TouchableOpacity style={styles.acceptButton} onPress={acceptAdvertisement}>
          <Text>Принять объявление</Text>
        </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text>Close</Text>
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
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  acceptButton: {
    backgroundColor: 'green', // Цвет фона кнопки "Принять объявление"
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
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
});

export default AdvertisementsTab;
