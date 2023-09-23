import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../CustomButton';
import { Auth } from 'aws-amplify';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = async () => {
    try {
      const user = await Auth.federatedSignIn({ provider: 'Google' });
      console.log('Logged in with Google:', user);
      // Здесь вы можете выполнить какие-либо дополнительные действия после успешной аутентификации.
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };
  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
