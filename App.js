import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CleanersContainer from './components/CleanersContainer';
import OneCleaner from './components/OneCleaner';
import YourOrder from './components/YourOrder';
import adminForm from './components/adminForm';
import createForm from './components/createForm';
import Orders from './components/Orders';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Cleaners"
          component={CleanersContainer}
          options={{
            title: 'Cleaners',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              alignSelf: 'center',
              fontSize: 20,
              color: '#fff',
              textAlign: 'center',
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="OneCleaner"
          component={OneCleaner}
          options={{
            title: 'Cleaner',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
              color: '#fff',
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="Your_orders"
          component={YourOrder}
          options={{
            title: 'My orders',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
              color: '#fff',
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="Admin_Form"
          component={adminForm}
          options={{
            title: 'Admin form',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
              color: '#fff',
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="Create_Form"
          component={createForm}
          options={{
            title: 'Create new form',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
              color: '#fff',
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{
            title: 'All orders',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 20,
              color: '#fff',
              fontWeight: '700',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
