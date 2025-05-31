import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import API_URL from '../../auxiliares/API_URL';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import EstilosCalificarTarea from './estilos/EstilosCalificarTarea';

const CalificarTarea = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CalificarTarea'>>();
  
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error


  useEffect(() => {
    console.log("CalificarTarea: ID DE SOLICITUD RECIBIDO:", route.params.idSolicitud);
  }, [route.params.idSolicitud]);

  const actualizarSolicitud = async () => {
    if (calificacion === 0 || comentario.trim() === "") {
      setMessage('Error, Debe completar la calificación y el comentario antes de continuar.');
      setVisible(true);
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) throw new Error('No se encontró el token de acceso');

      const idSolicitud = route.params.idSolicitud;

      const response = await fetch(`${API_URL}/valorar-changuita/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          solicitud_id:idSolicitud,
          comentario,
          valoracion: calificacion,
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar la solicitud');

      console.log("Solicitud actualizada correctamente");
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
      setMessage('Error al actualizar la solicitud.');
      setVisible(true);
    }
  };

  return (
    <View style={EstilosCalificarTarea.container}>
      {/* Encabezado */}
      <View style={EstilosCalificarTarea.encabezado}>
      <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={EstilosCalificarTarea.botonVolver}
          >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={EstilosCalificarTarea.textoEncabezado}>Calificar tarea</Text>
      </View>
      
      {/* Calificación */}
      <Text style={EstilosCalificarTarea.label}>Puntúe el trabajo realizado:</Text>
      <View style={EstilosCalificarTarea.rating}>
        {[...Array(5)].map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setCalificacion(i + 1)}>
            <Ionicons name="star" size={30} color={i < calificacion ? "gold" : "#CCCCCC"} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Comentario */}
      <Text style={EstilosCalificarTarea.label}>Deje su comentario:</Text>
      <TextInput
        style={EstilosCalificarTarea.textInput}
        placeholder="Descripción"
        placeholderTextColor="#999999"
        multiline
        textAlignVertical="top"
        value={comentario}
        onChangeText={setComentario}
      />

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}  // Ocultar el Snackbar cuando se cierre
        duration={Snackbar.DURATION_SHORT}    // Podemos intercalar entre  DURATION_LONG o DURATION_SHORT
        style={{
          position: 'absolute',
          top: -150,
          left: 0,
          right: 0,
          zIndex: 100000,  // Alto para asegurarse de que esté encima de otros elementos
          marginRight: 50,
        }}
      >
        {message}
      </Snackbar>
      
      {/* Botón Calificar */}
      <View style={EstilosCalificarTarea.buttonContainer}>
        <TouchableOpacity style={EstilosCalificarTarea.nextButton} onPress={actualizarSolicitud}>
          <Text style={EstilosCalificarTarea.nextButtonText}>Calificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalificarTarea;
