import { Alert, SafeAreaView,Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../auxiliares/API_URL";
import EstilosRecuperarContrasena2 from "../RecuperarAcceso/estilos/EstilosRecuperarContrasena2";


const RecuperarContrasena2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [codigo, setCodigo] = useState("");  // Estado para el codigo
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState("");  // Estado para almacenar el mensaje de error o éxito
  const route = useRoute<RouteProp<RootStackParamList, 'RecuperarContrasena2'>>();

  // Acceder al email desde los parámetros de la ruta
  const { email } = route.params;

  // Mostrar los datos pasados desde la pantalla anterior
  useEffect(() => {
    console.log('Entrando al useEffect de contrasena2');
    console.log('Email recibido:', email); 
  }, [email]);


  const obtenerId = async () => {
    try {
      // Verifica que el email esté presente antes de hacer la solicitud
      if (!email) {
        Alert.alert("Error", "El email es requerido.");
        return;
      }
  
      const response = await fetch(`${API_URL}/obtener-email-por-id/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }), 
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log("idObtenido: ", data.id);
        navigation.navigate('RecuperarContrasena3', { id: data.id }); 
      } else {
        Alert.alert("Error", "No se pudo obtener el ID.");
      }
    } catch (error) {
      setMessage("Error de conexión. Inténtalo de nuevo.");
      setVisible(true);
    }
  };

  const validarCodigo = async () => {
   
    const codigoInt = parseInt(codigo, 10);
  
    // Verifica si el código es un número válido
    if (isNaN(codigoInt)) {
      Alert.alert("Error", "Por favor ingresa un código válido.");
      setMessage("El código debe ser un número.");
      setVisible(true);
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/validar-codigo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: codigoInt, email: email }), 
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Código válido");
        Alert.alert("Éxito", "Código válido");
        setMessage("El código es válido");
        setVisible(true);
        obtenerId(); // Llama a la función obtenerId después de la validación
      } else {
        setMessage(data?.email || "El código no es válido.");
        setVisible(true);
      }
    } catch (error) {
      setMessage("Error de conexión. Inténtalo de nuevo.");
      setVisible(true);
    }
  };


  return (
    <SafeAreaView style={EstilosRecuperarContrasena2.areaSegura}>
      <View style={EstilosRecuperarContrasena2.contenedor}>
        {/* Título de la pantalla */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 30, left: 20,marginTop:45 }}>
        <Ionicons name="arrow-back" size={24} color="#197278" />
        </TouchableOpacity>
        <Text style={EstilosRecuperarContrasena2.titulo}>Recuperar contraseña</Text>

        {/* Paso de verificación */}
        <Text style={EstilosRecuperarContrasena2.instruccion}>Ingrese el código numérico que se ha enviado.</Text>

        {/* Campo de entrada */}
        <TextInput
          placeholder=" "
          style={EstilosRecuperarContrasena2.entrada}
          keyboardType="phone-pad"
          value={codigo}  // Vinculamos el estado `codigo` con el campo de entrada
          onChangeText={setCodigo}  // Actualiza el estado `codigo` con el valor ingresado
        />

        {/* Snackbar para mostrar mensajes */}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={4000} // 4 segundos
          style={{
            marginLeft: -30, 
            alignSelf: "center", 
            width: "90%", 
          }}
        >
          {message}
        </Snackbar>

        {/* Botón de siguiente */}
        <TouchableOpacity 
          style={EstilosRecuperarContrasena2.botonSiguiente} 
           onPress={validarCodigo} 
        >
          <Text style={EstilosRecuperarContrasena2.textoBoton}>Verificar código</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecuperarContrasena2;