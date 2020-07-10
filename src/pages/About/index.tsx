import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../assets/logo-header.png';
import Logo2 from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';

import {
  Container,
  Header,
  FilterContainer,
  Title,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Foto {
  id: string;
  local_url: string;
}
interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  phone: string;
  email: string;
  city: string;
  state: string;

  user: {
    name: string;
    email: string;
    city: string;
    state: string;
    avatar_url: string;
    phone: string;
    celphone: string;
  };
}

interface Category {
  id: number;
  title: string;
  image_url: string;
}

const About: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function handleNavigate(id: number): Promise<void> {
    navigation.navigate('FoodDetails', { id });
  }

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/curriculum');
      const listFoodsCategorySearch = response.data.map((food: Food) => {
        return {
          ...food,
        };
      });
      setFoods(listFoodsCategorySearch);
    }

    loadFoods();
  }, [selectedCategory, searchValue]);

  return (
    <Container>
      <Header>
        <Image source={Logo2} />
        <Icon
          name="log-out"
          size={24}
          color="#FFB84D"
          onPress={() => navigation.navigate('Home')}
        />
      </Header>

      <ScrollView>
        <FoodsContainer>
          <Title>Sobre nós</Title>

          <FoodContent>
            <FoodTitle>
              Devido a pandemia estabelecida ao redor do nosso planeta, a turma
              de Sistemas para Internet está desenvolvendo um jeitinho para
              ajudar quem está precisando, nesse momento dificil ou não.
              {'\n\n'}
              <Text style={{ fontWeight: 'bold' }}>FATEC ARARAS</Text>
            </FoodTitle>
          </FoodContent>
        </FoodsContainer>
      </ScrollView>
    </Container>
  );
};

export default About;
