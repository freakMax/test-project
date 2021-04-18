import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import sender from './hooks/sender';

const createForm = props => {
  const {navigation} = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [services, setServices] = useState([]);
  const [photo, setPhoto] = useState('');
  const [newService, setNewService] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const handleAdd = () => {
    setServices(prevServices => [
      ...prevServices,
      {service: newService, price: newPrice},
    ]);
    setNewService('');
    setNewPrice(0);
  };
  const handleEdit = (idx, value, str) => {
    const editServices = services.map((item, id) => {
      if (id == idx) {
        return str === 'service'
          ? {...item, service: value}
          : {...item, price: value};
      }
      return item;
    });
    setServices(editServices);
  };
  const handleDelete = id => {
    setServices(prevServices => prevServices.filter((el, idx) => idx != id));
  };
  const handleSave = async () => {
    await sender('http://192.168.0.105:5000/admin/addCleaner', 'POST', {
      name: name,
      description: description,
      services: services,
      photo: photo,
    });
    navigation.navigate('Cleaners');
  };
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={item => setName(item)}
            style={styles.inputArea}
          />
          <Text style={styles.textStyle}>Description:</Text>
          <TextInput
            value={description}
            onChangeText={item => setDescription(item)}
            style={styles.inputArea}
          />
          <Text style={styles.textStyle}>Photo:</Text>
          <TextInput
            value={photo}
            onChangeText={item => setPhoto(item)}
            style={styles.inputArea}
          />
          {services.map((item, idx) => (
            <View key={idx}>
              <Text style={styles.textStyle}>Name of service:</Text>
              <TextInput
                value={item.service}
                onChangeText={value => handleEdit(idx, value, 'service')}
                style={styles.inputArea}
              />
              <Text style={styles.textStyle}>Price:</Text>
              <TextInput
                value={item.price}
                onChangeText={value => handleEdit(idx, value, 'price')}
                style={styles.inputArea}
              />
              <TouchableOpacity
                onPress={() => handleDelete(idx)}
                style={styles.btn}>
                <Text style={styles.btn_text}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View>
            <Text style={styles.textStyle}>New service:</Text>
            <TextInput
              onChangeText={item => setNewService(item)}
              value={newService}
              style={styles.inputArea}
            />
            <Text style={styles.textStyle}>Price:</Text>
            <TextInput
              onChangeText={item => setNewPrice(item)}
              value={newPrice}
              style={styles.inputArea}
            />
            <TouchableOpacity onPress={handleAdd} style={styles.btn}>
              <Text style={styles.btn_text}>Add service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSave()} style={styles.btn}>
              <Text style={styles.btn_text}>Save</Text>
            </TouchableOpacity>
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

export default createForm;
