import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import sender from './hooks/sender';

const Orders = props => {
  const [orders, setOrders] = useState('');
  const [message, setMessage] = useState('');
  useEffect(async () => {
    const orders = await sender(
      'http://192.168.0.105:5000/admin/getOrders',
      'GET',
    );
    setOrders(orders);
  }, []);
  const handleUpdateStatus = async (id, status = '') => {
    if (!status) {
      status = message;
    }
    await sender('http://192.168.0.105:5000/admin/updateStatus', 'PUT', {
      id: id,
      status: status,
    });
    setMessage('');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {orders
            ? orders.map((item, idx) => (
                <View key={idx} style={styles.card}>
                  <Text style={styles.textStyle}>Name: {item.username}</Text>
                  <Text style={styles.textStyle}>
                    {item.date.split(' ')[4]}
                  </Text>
                  {item.services
                    ? item.services.map((el, id) => (
                        <View key={id} style={styles.itemBlock}>
                          <Text style={styles.textStyle}>{el.service}</Text>
                          <Text style={styles.textStyle}>
                            Price: {el.price}
                          </Text>
                        </View>
                      ))
                    : null}
                  <Text style={styles.textStyle}>Status: {item.status}</Text>
                  <TouchableOpacity
                    onPress={() => handleUpdateStatus(item._id, 'ready')}
                    style={styles.btn}>
                    <Text style={styles.btn_text}>Ready</Text>
                  </TouchableOpacity>

                  <TextInput
                    onChangeText={item => setMessage(item)}
                    style={styles.inputArea}
                  />
                  <TouchableOpacity
                    onPress={() => handleUpdateStatus(item._id)}
                    style={styles.btn}>
                    <Text style={styles.btn_text}>Return</Text>
                  </TouchableOpacity>
                </View>
              ))
            : null}
        </View>
      </View>
    </ScrollView>
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
  itemBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    width: '90%',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  btn: {
    width: '90%',
    borderRadius: 10,
    marginTop: 20,
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
  inputArea: {
    color: '#000',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 10,
    width: '90%',
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 5,
  },
});

export default Orders;
