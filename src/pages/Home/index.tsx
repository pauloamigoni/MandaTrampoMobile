import React from 'react';
import { Image, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  BackgroundImage,
  Title,
  NavigationButton,
  ButtonText,
  IconContainer,
} from './styles';

import Background from '../../assets/home-background.png';
import Logo from '../../assets/logo.png';

const Home: React.FC = () => {
  const navigation = useNavigation();

  async function handleNavigate(): Promise<void> {
    navigation.navigate('MainBottom', {
      screen: 'Dashboard',
    });
  }

  return (
    <BackgroundImage
      source={Background}
      imageStyle={{
        width: 313,
        height: 427,
      }}
    >
      <Container>
        <Image source={Logo} />
        <Title>
          Busque{' '}
          <Text style={{ color: '#7062ff' }}>Currículos e Serviços.</Text> Manda
          um Trampo para Alguém que Precise.
        </Title>
      </Container>
      <NavigationButton onPress={() => handleNavigate()}>
        <ButtonText>Entrar no MandaTrampo</ButtonText>
        <IconContainer>
          <Icon name="log-in" size={24} color="#fff" />
        </IconContainer>
      </NavigationButton>
    </BackgroundImage>
  );
};

export default Home;
