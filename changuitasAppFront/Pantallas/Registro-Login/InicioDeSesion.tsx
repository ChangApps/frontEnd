import {SafeAreaView,Text, TextInput, TouchableOpacity, View, useWindowDimensions, } from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import EstilosInicioDeSesion from './estilos/EstilosInicioDeSesion';

const InicioDeSesion = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { width } = useWindowDimensions();


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
    <SafeAreaView style={EstilosInicioDeSesion.areaSegura}>
      <View style={[EstilosInicioDeSesion.contenedor, width > 600 && EstilosInicioDeSesion.contenedorWeb]}>
        <View style={EstilosInicioDeSesion.encabezado}>
          <Text style={EstilosInicioDeSesion.titulo}>Iniciar sesión</Text>
        </View>

       {/* Mensaje de error */}
        {errorMessage && (
          <View style={EstilosInicioDeSesion.errorContainer}>
            <Text style={EstilosInicioDeSesion.errorText}>Error: {errorMessage}</Text>
          </View>
        )}
        {/* Campos de entrada */}
        <View style={EstilosInicioDeSesion.contenedorEntrada}>
          <Text style={EstilosInicioDeSesion.etiqueta}>Nombre de usuario</Text>
          <TextInput
            placeholder="changuitas1"
            placeholderTextColor="#666"
            style={EstilosInicioDeSesion.entrada}
            value={username}
            onChangeText={setusername}
          />

          <Text style={EstilosInicioDeSesion.etiqueta}>Contraseña</Text>
          <View style={EstilosInicioDeSesion.contenedorEntradaContrasena}>
            <TextInput
              placeholder="***************"
              placeholderTextColor="#666"
              secureTextEntry={!mostrarContrasena}
              style={EstilosInicioDeSesion.entradaContrasena}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={EstilosInicioDeSesion.iconoOjo}
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
            colors={["#197278", "#9BCDC8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={EstilosInicioDeSesion.degradadoBoton}
          >
            <Text style={EstilosInicioDeSesion.textoBoton}>Ingresar</Text>
          </LinearGradient>
        </TouchableOpacity>

      {/* Botón de registrarse */}
        <TouchableOpacity>
          <Text style={EstilosInicioDeSesion.textoRegistrarse}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>

    {/* Botón de recuperar nombre de usuario */}
        <TouchableOpacity>
          <Text style={EstilosInicioDeSesion.textoRegistrarse}>Olvidé mi nombre de usuario</Text>
        </TouchableOpacity>
   {/* Botón de recuperar contraseña */}
        <TouchableOpacity>
          <Text style={EstilosInicioDeSesion.textoRegistrarse}>Olvidé mi contraseña</Text>
        </TouchableOpacity>

            {/* Texto de pie de página */}
{/*
        <Text style={EstilosInicioDeSesion.textoPie}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
*/
}
 </View>
    </SafeAreaView>
  );
};

export default InicioDeSesion;