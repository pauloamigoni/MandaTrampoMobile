import React, { useEffect, useState, Fragment } from 'react';
import {
  Image,
  ScrollView,
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Logo from '../../assets/logo-header.png';
import Logo2 from '../../assets/logo-header.png';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  FilterContainer,
  Title,
  CategoryContainer,
  CategorySlider,
  CategoryItem,
  CategoryItemTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  FoodContact,
} from './styles';

interface Photo {
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
  celphone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  photo: Photo[];
  user: { name: string };
  categories: {
    name: string;
  };
}

interface Category {
  id: number;
  title: string;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
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

  const [offsetX] = useState(new Animated.Value(-400));
  const translate = Animated.timing(offsetX, {
    toValue: 0,
    duration: 1000,
    easing: Easing.inOut(Easing.linear),
    useNativeDriver: true,
  });
  const reset = Animated.timing(offsetX, {
    toValue: -430,
    duration: 0,
    useNativeDriver: true,
  });
  const animation = Animated.sequence([translate, reset]);

  useEffect(() => {
    Animated.loop(animation).start();
    let isMounted = true;

    async function loadFoods(): Promise<void> {
      const response = await api.get('/services');

      const listFoodsCategorySearch = response.data.map((food: Food) => {
        return {
          ...food,
        };
      });
      setFoods(listFoodsCategorySearch);
      setLoading(false);
    }
    if (isMounted) {
      loadFoods();
    }
    return () => {
      isMounted = false;
    };
  }, [animation]);

  const transform = { transform: [{ translateX: offsetX }] };

  const styles = StyleSheet.create({
    headerContentContainer: {
      paddingHorizontal: 25,
      paddingTop: 80,
      paddingBottom: 40,
    },
    syncContentContainer: {
      paddingHorizontal: 25,
      paddingTop: 40,
      paddingBottom: 20,
    },
    title1: {
      fontWeight: '700',
      fontSize: 32,
    },
    title3: {
      fontWeight: '700',
      fontSize: 18,
    },
    body2: {
      fontSize: 14,
    },
    syncProgressBarContainer: {
      flexDirection: 'row',
    },
    syncProgressBar: {
      height: 4,
      marginHorizontal: 10,
      width: 200,
      backgroundColor: '#0000ff',
    },
  });

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
      {loading && (
        <>
          <View style={styles.headerContentContainer}>
            <Text style={styles.title1}>
              O Aplicativo está sincronizando seus dados.
            </Text>
          </View>
          <Animated.View style={styles.syncProgressBarContainer}>
            <Animated.View style={[transform, styles.syncProgressBar]} />
            <Animated.View style={[transform, styles.syncProgressBar]} />
            <Animated.View style={[transform, styles.syncProgressBar]} />
            <Animated.View style={[transform, styles.syncProgressBar]} />
          </Animated.View>
          <View style={styles.syncContentContainer}>
            <Text style={styles.title3}>Não feche ou saia do aplicativo.</Text>
            <Text style={styles.body2}>
              Você pode aproveitar para fazer um alongamento.
            </Text>
          </View>
        </>
      )}

      <ScrollView>
        <FoodsContainer>
          {!loading && (
            <>
              <Title>Serviços</Title>
            </>
          )}
          <FoodList>
            {foods.map(food => (
              <Food
                key={String(food.id + new Date().toString())}
                onPress={() => handleNavigate(food.id)}
                activeOpacity={0.6}
                testID={`food-${food.id}`}
              >
                {food.photo.length <= 0 ? (
                  <FoodImageContainer>
                    <Image
                      key={String(food.id + new Date().toString())}
                      style={{ width: 88, height: 88, borderRadius: 10 }}
                      source={{
                        uri:
                          'http://www.mandatrampo.com.br:8080/static/media/imagem-mandatrampo-home.6b4ec973.png',
                      }}
                    />
                  </FoodImageContainer>
                ) : (
                  food.photo.slice(0, 1).map(foto => (
                    <FoodImageContainer>
                      <Image
                        key={food.id + foto.id}
                        style={{ width: 88, height: 88, borderRadius: 10 }}
                        source={{ uri: foto.local_url }}
                      />
                    </FoodImageContainer>
                  ))
                )}
                <FoodContent>
                  <FoodTitle>{food.name}</FoodTitle>
                  <FoodPricing>{food.categories.name}</FoodPricing>
                  <FoodContact>
                    {food.city} - {food.state}
                  </FoodContact>
                  <FoodContact />
                  <FoodDescription ellipsizeMode="tail" numberOfLines={3}>
                    {food.description}
                  </FoodDescription>
                </FoodContent>
              </Food>
            ))}
          </FoodList>
        </FoodsContainer>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
