import { Auth } from 'aws-amplify';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const signOut = async () => {
  try {
    await Auth.signOut();
    console.log('SignOut');
  } catch (error) {
    console.log('Ошибка при выходе из системы:', error);
  }
};

const ChatScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Comming soon</Text>
      <Text
        onPress={signOut}
        style={styles.signOut}>
        Sign out
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  
  signOut: {
    width: '100%',
    textAlign: 'center',
    color: 'red',
    marginTop: 'auto',
    marginVertical: 20,
    fontSize: 20,
  },
});
export default ChatScreen;
