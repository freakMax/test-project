import React from 'react';
import {ScrollView} from 'react-native';
import Cleaners from './Cleaners';
import Authform from './Authform';
import {useState} from 'react';

const CleanersContainer = ({navigation}) => {
  const [token, setToken] = useState('');
  const getToken = token => {
    setToken(token);
  };
  return (
    <ScrollView>
      {!token ? (
        <Authform getToken={getToken} />
      ) : (
        <Cleaners navigation={navigation} token={token} />
      )}
    </ScrollView>
  );
};

export default CleanersContainer;
