import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import sender from './hooks/sender';

const Cleaners = ({navigation, token}) => {
  const [permission, setPermission] = useState('');
  const [cleaners, setCleaners] = useState('');
  const [money, setMoney] = useState(Math.floor(Math.random() * 500));
  navigation.addListener('focus', async () => {
    const data = await sender(
      'http://192.168.0.105:5000/users/getCleaners',
      'GET',
    );
    setCleaners(data);
    const perm = await sender(
      'http://192.168.0.105:5000/admin/havePermission',
      'POST',
      {
        token: token,
      },
    );
    setPermission(perm);
  });

  useEffect(async () => {
    const data = await sender(
      'http://192.168.0.105:5000/users/getCleaners',
      'GET',
    );
    setCleaners(data);
    const perm = await sender(
      'http://192.168.0.105:5000/admin/havePermission',
      'POST',
      {
        token: token,
      },
    );
    setPermission(perm);
  }, []);
  return (
    <>
      <ScrollView>
        {permission ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Create_Form')}
              style={styles.btn}>
              <Text style={styles.btn_text}>Add Cleaner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Orders')}
              style={styles.btn}>
              <Text style={styles.btn_text}>Orders</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Your_orders', {
                data: token,
              })
            }
            style={styles.btn}>
            <Text style={styles.btn_text}>My orders</Text>
          </TouchableOpacity>
        )}
        <View style={styles.container}>
          {cleaners
            ? cleaners.map((el, idx) => (
                <View style={styles.card} key={idx}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: el.photo,
                    }}
                  />
                  <Text style={styles.cardText}>{el.name}</Text>
                  <Text style={styles.cardDescription}>{el.description}</Text>
                  <View style={styles.buttonContainer}>
                    {permission ? (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Admin_Form', {
                            data: {el},
                          });
                        }}
                        style={styles.btn}>
                        <Text style={styles.btn_text}>Edit</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('OneCleaner', {
                            data: {el, token, money, setMoney},
                          })
                        }
                        style={styles.btn}>
                        <Text style={styles.btn_text}>View Services</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  card: {
    width: '90%',
    justifyContent: 'center',
    height: 300,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  cardImage: {
    width: '80%',
    height: '60%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginTop: 5,
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: 13,
    color: 'black',
    alignSelf: 'center',
  },
  servicesTitle: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center',
  },
  servicesText: {
    fontSize: 13,
    color: '#fff',
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
  },
  btn: {
    width: '90%',
    borderRadius: 10,
    marginTop: 10,
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'coral',
    alignSelf: 'center',
  },
  btn_text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: '700',
  },
});

export default Cleaners;
