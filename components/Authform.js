import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import sender from './hooks/sender';

const Authform = ({getToken}) => {
  const [username, setUsername] = useState({username: ''});
  const [password, setPassword] = useState({password: ''});
  const [mail, setMail] = useState('');
  const [login, setLogin] = useState('');
  const [clicked, setClicked] = useState(false);
  const handleRegistration = async () => {
    const token = await sender(
      'http://192.168.0.105:5000/auth/registration',
      'POST',
      {
        username: username,
        password: password,
      },
    );
    getToken(token);
  };
  const handleLogin = async () => {
    const token = await sender('http://192.168.0.105:5000/auth/login', 'POST', {
      username: username,
      password: password,
    });
    getToken(token);
  };
  const handleReset = async () => {
    await sender('http://192.168.0.105:5000/auth/reset', 'POST', {
      mail: mail,
      login: login,
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputArea}
        placeholder="Username"
        onChangeText={username => setUsername(username)}></TextInput>
      <TextInput
        style={styles.inputArea}
        placeholder="Password"
        onChangeText={password => setPassword(password)}></TextInput>
      <TouchableOpacity onPress={handleRegistration} style={styles.btn}>
        <Text style={styles.btn_text}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btn_text}>Sign in</Text>
      </TouchableOpacity>
      {clicked ? (
        <>
          <TextInput
            style={styles.inputArea}
            placeholder="Your login"
            onChangeText={item => setLogin(item)}></TextInput>
          <TextInput
            style={styles.inputArea}
            placeholder="Your email"
            onChangeText={item => setMail(item)}></TextInput>
          <TouchableOpacity
            onPress={() => {
              handleReset();
              setClicked(false);
            }}
            style={styles.btn}>
            <Text style={styles.btn_text}>Send Message</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => setClicked(true)} style={styles.btn}>
          <Text style={styles.btn_text}>Forgot password?</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});

export default Authform;
