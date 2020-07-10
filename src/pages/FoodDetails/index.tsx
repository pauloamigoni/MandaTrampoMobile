import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

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
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdittionalItem,
  AdittionalItemText,
  AdittionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

interface Params {
  id: number;
}

interface Photo {
  id: number;
  name: string;
  local_url: string;
}

interface Food {
  id: number;
  name: string;
  description: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  celphone: string;
  email: string;
  site: string;
  link_facebook: string;
  link_instagram: string;
  opening_hours: string;
  iswhats: string;
  categories: {
    name: string;
  };
  photo: Photo[];
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [avatar, setAvatar] = useState('');
  // const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const { id } = routeParams;
      const response = await api.get<Food>(`/services/${id}/details`);

      const selectedFood = response.data;

      if (selectedFood.photo.length > 0) {
        if (selectedFood.photo[0].local_url) {
          setAvatar(selectedFood.photo[0].local_url);
        } else {
          setAvatar(
            'http://www.mandatrampo.com.br:8080/static/media/imagem-mandatrampo-home.6b4ec973.png',
          );
        }
      } else {
        setAvatar(
          'http://www.mandatrampo.com.br:8080/static/media/imagem-mandatrampo-home.6b4ec973.png',
        );
      }

      setFood(selectedFood);
    }

    loadFood();
  }, [routeParams]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              {/* <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri:
                    'http://www.mandatrampo.com.br:8080/static/media/imagem-mandatrampo-home.6b4ec973.png',
                }}
              /> */}

              <Image
                style={{ width: 327, height: 183 }}
                source={
                  avatar
                    ? { uri: avatar }
                    : 'http://www.mandatrampo.com.br:8080/static/media/imagem-mandatrampo-home.6b4ec973.png'
                }
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>

              <FoodDescription>
                {food.city} -{food.state}{' '}
              </FoodDescription>
              <FoodContact>{food.address}</FoodContact>
              <FoodContact>{food.phone}</FoodContact>
              <FoodContact>{food.celphone}</FoodContact>
              <FoodContact>{food.email}</FoodContact>
            </FoodContent>
          </Food>
        </FoodsContainer>

        <TotalContainer>
          <FinishOrderButton onPress={() => {}}>
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

export default FoodDetails;
