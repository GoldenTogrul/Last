import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Advertisement } from '../store/types';
import MapView, { Marker } from 'react-native-maps';

type AdvertisementDetailModalProps = {
  advertisement: Advertisement | null;
  location: { latitude: number; longitude: number }; 
  hours: number;
  minutes: number;
  seconds: number;
  onClose: () => void;
};

const AdvertisementDetailModal: React.FC<AdvertisementDetailModalProps> = (props) => {
  const { advertisement, location, hours, minutes, seconds, onClose } = props;

  if (!advertisement) {
    return null;
  }

  return (
    <Modal animationType="slide" transparent={true} visible={!!advertisement}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{advertisement.title}</Text>
          <Text>Описание: {advertisement.description}</Text>
          <Text>Цена: {advertisement.price}</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Местоположение"
            />
          </MapView>
          <Text>
            Time Left: {hours}h {minutes}m {seconds}s
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1, // Добавьте эту строку, чтобы контент занимал всю доступную высоту
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 130,
  },
  closeButton: {
    backgroundColor: 'blue', // Цвет фона кнопки
    padding: 10, // Отступы вокруг текста кнопки
    borderRadius: 8, // Скругленные углы кнопки
    marginBottom: 10, // Отступ между кнопками
  },
  map: {
    flex: 0.5, // Добавьте эту строку, чтобы карта занимала всю доступную высоту
    marginBottom: 16,
    width: 300,
  },
});

export default AdvertisementDetailModal;
