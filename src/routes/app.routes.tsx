import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import TabRoutes from './tab.routes';

import Home from '../pages/Home';
import FoodDetails from '../pages/FoodDetails';
import CvDetails from '../pages/CvDetails';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <App.Navigator initialRouteName="Home">
      <App.Screen
        options={{
          cardStyle: { backgroundColor: '#EEEEEE' },
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <App.Screen
        name="MainBottom"
        component={TabRoutes}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <App.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#FFB84D"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRight: () => <Icon name="heart" size={24} color="#FFB84D" />,
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Serviço - Detalhe',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: '#302269',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />

      <App.Screen
        name="CvDetails"
        component={CvDetails}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#FFB84D"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 24,
          },
          headerRight: () => <Icon name="heart" size={24} color="#FFB84D" />,
          headerRightContainerStyle: {
            marginRight: 24,
          },
          headerTitle: 'Currículo - Detalhe',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
          headerStyle: {
            backgroundColor: '#302269',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />
    </App.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
