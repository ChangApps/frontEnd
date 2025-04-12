import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';


const  InicioDeSesion = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error

 /*
  const login = async () => {

    if (!username.trim() || !password.trim()) {
      // Verifica si los campos están vacíos o contienen solo espacios
      setErrorMessage('Por favor, ingresa tu nombre de usuario y contraseña.');
      return;
    }
  
    try {
      const {data} = await axios.post(`${API_URL}/login/`,{username,password,
      });

      if (data.error) {
        alert(data.error);
        throw new Error(data.error); // Lanza un error con el mensaje del servidor
    }
        setState({
          token: data.access,
      });
      await AsyncStorage.setItem("@auth", JSON.stringify({ token: data.access }));
      
      console.log("Token guardado: ", data.access);

      // Almacena tokens y userId
      await AsyncStorage.setItem('accessToken', data.access);
      await AsyncStorage.setItem('refreshToken', data.refresh);
      await AsyncStorage.setItem('userId', data.id.toString());
     
     // Limpiar los campos de username y password después del login exitoso
     setusername(''); 
     setPassword('');

      navigation.navigate('PantallaHome');
     
    } catch (error) {
      setErrorMessage(error.message);
    }
   
  };
  */


  return (
    <SafeAreaView style={estilos.areaSegura}>
      <View style={estilos.contenedor}>
        <View style={estilos.encabezado}>
          <Text style={estilos.titulo}>Iniciar sesión</Text>
        </View>

        {/* Mensaje de error */}
        {errorMessage && (
          <View style={estilos.errorContainer}>
            <Text style={estilos.errorText}>Error: {errorMessage}</Text>
          </View>
        )}

        {/* Campos de entrada */}
        <View style={estilos.contenedorEntrada}>
          <Text style={estilos.etiqueta}>Nombre de usuario</Text>
          <TextInput
            placeholder="changuitas1"
            placeholderTextColor="#666"
            style={estilos.entrada}
            value={username}
            onChangeText={setusername}
          />

          <Text style={estilos.etiqueta}>Contraseña</Text>
          <View style={estilos.contenedorEntradaContrasena}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarContrasena}
              style={estilos.entradaContrasena}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={estilos.iconoOjo}
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
            >
              <Ionicons 
                name={mostrarContrasena ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón de ingresar */}
        <TouchableOpacity>
          <LinearGradient
            colors={['#197278', '#9BCDC8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={estilos.degradadoBoton}
          >
            <Text style={estilos.textoBoton}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>

             {/* Botón de registrarse */}
      <TouchableOpacity      >
        <Text style={estilos.textoRegistrarse}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>

      {/* Botón de recuperar nombre de usuario */}
      <TouchableOpacity >
        <Text style={estilos.textoRegistrarse}>Olvidé mi nombre de usuario</Text>
      </TouchableOpacity>

      {/* Botón de recuperar contraseña */}
      <TouchableOpacity >
        <Text style={estilos.textoRegistrarse}>Olvidé mi contraseña</Text>
      </TouchableOpacity>

        {/* Texto de pie de página */}
        <Text style={estilos.textoPie}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
      </View>
    </SafeAreaView>
  );
};

const estilos = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#B7B7B7',
  },
  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'flex-end',
    marginTop: 60,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    marginLeft: -1,
    marginBottom: 80, 
  },
  botonAtras: {
    marginRight: 10,
    marginTop: -75,
  },
  errorContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    color: '#A94442',
    fontSize: 14,
    textAlign: 'center',
  },
  contenedorEntrada: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  entrada: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  contenedorEntradaContrasena: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  entradaContrasena: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  iconoOjo: {
    position: 'absolute',
    right: 15,
  },
  degradadoBoton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',   
    justifyContent: 'center', 
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  textoPie: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 80,
    paddingHorizontal: 40,
  },
  botonRegistrarse: {
    marginTop: 20, // Espaciado entre el botón de "Ingresar" y el de "Registrarse"
    paddingVertical: 10,
    alignItems: 'center',
  },
  botonRecuperacion: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  textoRegistrarse: {
    fontSize: 14, // Tamaño de fuente 
    color: '#197278',
    textDecorationLine: 'underline', // Subrayado
    textDecorationColor: '#197278', // Color del subrayado 
    textDecorationStyle: 'solid', // Estilo de subrayado
  },
});

export default InicioDeSesion;