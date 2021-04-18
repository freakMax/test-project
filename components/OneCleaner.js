import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
} from 'react-native';
import sender from './hooks/sender';

const OneCleaner = props => {
  const {navigation} = props;
  const {data} = props.route.params;
  const money = data.money;
  const setMoney = data.setMoney;
  const [newMoney, setNewMoney] = useState(money);
  const [order, setOrder] = useState('');
  const handleCreateOrder = async () => {
    if (order) {
      setMoney(newMoney);
      await sender('http://192.168.0.105:5000/users/addOrder', 'POST', {
        order,
        token: data.token,
      });
      navigation.navigate('Cleaners');
    } else {
      Alert.alert('Oops!', "You haven't any items in order!", [{text: 'OK'}]);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.serviceBlock}>
            <Text style={styles.nameText}>{data.el.name}</Text>
            <Text style={styles.descriptionText}>{data.el.description}</Text>
            <Text style={styles.servicesTitle}>Services:</Text>

            {data.el.services.map((item, ind) => (
              <View style={styles.optionalBlock} key={ind}>
                <Text style={styles.servicesText}>{item.service}</Text>
                <Text style={styles.servicesPrice}>Price: {item.price}</Text>
                <TouchableOpacity
                  onPress={() => {
                    if (newMoney - item.price >= 0) {
                      setOrder(prevOrder => [...prevOrder, item]);
                      setNewMoney(newMoney - item.price);
                    } else {
                      Alert.alert('Oops!', "You haven't enough money!", [
                        {text: 'OK'},
                      ]);
                    }
                  }}
                  style={styles.btn}>
                  <Text style={styles.btn_text}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}

            <Text style={styles.balance}>Your balance : {newMoney}</Text>
            <View style={styles.servicesBlock}>
              <Text style={styles.orderText}>Your order</Text>
              {order.length !== 0 &&
                order.map((el, ind) => (
                  <View style={styles.orderBlock} key={ind}>
                    <Text style={styles.orderTextItem}>{el.service}</Text>
                  </View>
                ))}
              <View style={styles.buttonBlock}>
                <TouchableOpacity
                  onPress={handleCreateOrder}
                  style={styles.btn}>
                  <Text style={styles.btn_text}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  serviceBlock: {
    width: '90%',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  nameText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
    fontWeight: '700',
  },
  optionalBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  servicesTitle: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },
  servicesText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
    width: '50%',
  },
  servicesPrice: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },
  balance: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },
  orderText: {
    fontSize: 18,
    color: '#000',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 13,
    color: '#000',
    alignSelf: 'center',
  },
  orderTextItem: {
    fontSize: 15,
    color: '#000',
    alignSelf: 'center',
  },

  buttonBlock: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 5,
  },
  btn: {
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

export default OneCleaner;
