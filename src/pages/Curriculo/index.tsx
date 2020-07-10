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

const Curriculo: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchValue, setSearchValue] = useState('');

  const navigation = useNavigation();

  async function handleNavigate(id: number): Promise<void> {
    navigation.navigate('CvDetails', { id });
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
      <FilterContainer>
        <SearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="O que procura ?"
        />
      </FilterContainer>
      <ScrollView>
        <FoodsContainer>
          <Title>Currículos</Title>
          <FoodList>
            {foods.map(food => (
              <Food
                key={food.id + food.name}
                onPress={() => handleNavigate(food.id)}
                activeOpacity={0.6}
                testID={`food-${food.id}`}
              >
                <FoodImageContainer>
                  <Image
                    style={{ width: 88, height: 88, borderRadius: 10 }}
                    source={{
                      uri: food.user.avatar_url,
                    }}
                  />
                </FoodImageContainer>
                <FoodContent>
                  <FoodTitle>{food.user.name}</FoodTitle>
                  <FoodDescription ellipsizeMode="tail" numberOfLines={3}>
                    {food.description}
                  </FoodDescription>
                  <FoodDescription />
                  <FoodDescription>
                    {food.user.city} - {food.user.state}
                  </FoodDescription>
                  {/* <FoodPricing>{food.user.phone}</FoodPricing>
                  <FoodPricing>{food.user.celphone}</FoodPricing> */}
                </FoodContent>
              </Food>
            ))}
          </FoodList>
        </FoodsContainer>
      </ScrollView>
    </Container>
  );
};

export default Curriculo;
