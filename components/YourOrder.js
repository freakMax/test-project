import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import sender from './hooks/sender';

const YourOrder = props => {
  const {data} = props.route.params;
  const {navigation} = props;
  const [myOrder, setMyOrder] = useState('');
  useEffect(async () => {
    const order = await sender(
      'http://192.168.0.105:5000/users/getOrders',
      'POST',
      {token: data},
    );
    setMyOrder(order);
  }, []);
  const handleDelete = async id => {
    await sender('http://192.168.0.105:5000/users/deleteOrder', 'POST', {
      id: id,
    });
    navigation.navigate('Cleaners');
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {myOrder
            ? myOrder.map((item, ind) => (
                <View style={styles.card} key={ind}>
                  {item.services.map((el, id) => (
                    <View style={styles.cardItem} key={id}>
                      <Text style={styles.orderText}>{el.service}</Text>
                      <Text style={styles.orderText}>{el.price}</Text>
                    </View>
                  ))}
                  <Text style={styles.orderText}>Status:</Text>
                  <Text style={styles.statusText}>{item.status}</Text>
                  <Text style={styles.orderText}>
                    {item.date.split(' ')[4]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(item._id)}
                    style={styles.btn}>
                    <Text style={styles.btn_text}>Delete order</Text>
                  </TouchableOpacity>
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
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  orderText: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  statusText: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    fontWeight: '700',
  },
  cardItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
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

export default YourOrder;
