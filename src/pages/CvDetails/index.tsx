import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image, Text, Linking } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodContact,
  TotalContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

interface Params {
  id: number;
}

interface IUser {
  name: string;
  email: string;
  city: string;
  address: string;
  state: string;
  avatar_url?: string;
  phone: string;
  celphone: string;
}
interface IProfession {
  name: string;
}

interface Food {
  id: number;
  name: string;
  description: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  user: IUser;
  professions: IProfession;
}

const CvDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [avatar, setAvatar] = useState('');
  const [state, setState] = useState('');
  const [adrress, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [celphone, setCelphone] = useState('');
  const [email, setEmail] = useState('');

  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const { id } = routeParams;
      const response = await api.get<Food>(`/curriculum/${id}/details`);
      const selectedFood = response.data;
      setFood(selectedFood);
      setName(selectedFood.user.name);
      setProfession(selectedFood.professions.name);

      if (selectedFood.user.avatar_url) {
        setAvatar(selectedFood.user.avatar_url);
      }
      setCity(selectedFood.user.city);
      setState(selectedFood.user.state);
      setAddress(selectedFood.user.address);
      setPhone(selectedFood.user.phone);
      setCelphone(selectedFood.user.celphone);
      setEmail(selectedFood.user.email);
    }

    loadFood();
  }, [routeParams]);

  const message = `Olá estou entrando em contato pois gostaria de conhecer mais sobre você`;

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={avatar ? { uri: avatar } : null}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{name}</FoodTitle>
              <FoodDescription>{profession}</FoodDescription>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodContact>
                {city} - {state}
              </FoodContact>

              <FoodContact>{adrress}</FoodContact>
              <FoodContact>{phone}</FoodContact>
              <FoodContact>{celphone}</FoodContact>
              <FoodContact>{email}</FoodContact>
            </FoodContent>
          </Food>
        </FoodsContainer>

        <TotalContainer>
          <FinishOrderButton
            onPress={() =>
              Linking.canOpenURL('whatsapp://send?text=oi').then(supported => {
                if (supported) {
                  return Linking.openURL(
                    `whatsapp://send?phone=5519992250066&text=${message}`,
                  );
                }
                return Linking.openURL(
                  `https://api.whatsapp.com/send?phone=5519992250066&text=${message}`,
                );
              })}
          >
            <ButtonText>Contato via Whatsapp</ButtonText>
            <IconContainer>
              <Icon name="phone" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>

          <FinishOrderButton onPress={() => {}}>
            <ButtonText>Contato via Email</ButtonText>
            <IconContainer>
              <Icon name="mail" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default CvDetails;
