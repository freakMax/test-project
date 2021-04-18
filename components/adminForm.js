import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import sender from './hooks/sender';

const adminForm = props => {
  const {navigation} = props;
  const {data} = props.route.params;
  const [name, setName] = useState(data.el.name);
  const [description, setDescription] = useState(data.el.description);
  const [services, setServices] = useState(data.el.services);
  const [newService, setNewService] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const handleUpdate = async () => {
    await sender('http://192.168.0.105:5000/admin/updateCleaner', 'PUT', {
      name: name,
      description: description,
      services: services,
      id: data.el._id,
    });
  };
  const handleDelete = id => {
    setServices(prevServices => prevServices.filter((el, idx) => idx != id));
  };
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
  const handleDeleteCleaner = async () => {
    await sender('http://192.168.0.105:5000/admin/deleteCleaner', 'POST', {
      id: data.el._id,
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
          {data
            ? services.map((item, idx) => (
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
              ))
            : null}
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
          </View>
          <TouchableOpacity onPress={() => handleUpdate()} style={styles.btn}>
            <Text style={styles.btn_text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDeleteCleaner()}
            style={styles.btn}>
            <Text style={styles.btn_text}>Delete cleaner</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 5,
    paddingHorizontal: 10,
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

export default adminForm;
