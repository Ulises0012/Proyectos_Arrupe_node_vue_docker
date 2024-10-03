import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Second: undefined;
  List: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [primer_nombre, setPrimerNombre] = useState('');
  const [segundo_nombre, setSegundoNombre] = useState('');
  const [primer_apellido, setPrimerApellido] = useState('');
  const [segundo_apellido, setSegundoApellido] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.0.13:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, username, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate('Login'); // Navega a la pantalla de login
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Primer Nombre" 
        placeholderTextColor="#ddd" 
        value={primer_nombre} 
        onChangeText={setPrimerNombre} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Segundo Nombre" 
        placeholderTextColor="#ddd" 
        value={segundo_nombre} 
        onChangeText={setSegundoNombre} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Primer Apellido" 
        placeholderTextColor="#ddd" 
        value={primer_apellido} 
        onChangeText={setPrimerApellido} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Segundo Apellido" 
        placeholderTextColor="#ddd" 
        value={segundo_apellido} 
        onChangeText={setSegundoApellido} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#ddd" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#ddd" 
        value={username} 
        onChangeText={setUsername} 
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#ddd" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backButtonText}>Ir a Inicio de Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#0099ff', // Celeste para el borde
    borderRadius: 5,
    color: 'white', // Texto blanco para contraste
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0099ff', // Celeste para el fondo del botón
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  backButtonContainer: {
    marginTop: 10,
    width: '100%', 
  },
  backButton: {
    padding: 15,
    backgroundColor: '#0099ff', // Celeste para el fondo del botón de regreso
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
