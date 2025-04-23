import { Alert, Platform, Image, SafeAreaView, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../auxiliares/API_URL";
//import { AuthContext } from '../../autenticacion/auth';
import EstilosVerificacion2 from './estilos/EstilosVerificacion2';
import FormData from 'form-data';

const Verificacion2Registro = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
  // Estado para la foto de perfil
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const route = useRoute<RouteProp<RootStackParamList, 'Verificacion2Registro'>>();
   // Estado para almacenar los datos del usuario
   const [usuario, setUsuario] = useState(route.params?.datosUsuario || {});
  // const [state, setState] = useContext(AuthContext);
   const [idUsuarioCreado,setIdUsuarioCreado]=useState(null);


   // Funciones para manejar la selección de imagen
   const manejarRespuestaSelectorImagen = (resultado: ImagePicker.ImagePickerResult) => {
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setImageUri(resultado.assets[0].uri);
    }
  };

  const manejarCambioArchivoWeb = (event: Event) => {
    const target = event.target as HTMLInputElement; 
    const file = target.files ? target.files[0] : null;
  
    if (file) {
      console.log("Imagen seleccionada:", file);
      setImageFile(file); // Actualiza el estado con el archivo seleccionado
      const imageUrl = URL.createObjectURL(file); // Genera una URL para mostrar la imagen seleccionada
      setImageUri(imageUrl);
    }
  };

  const mostrarOpcionesSelectorImagen = () => {
    if (Platform.OS === 'web') {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = manejarCambioArchivoWeb;
      fileInput.click();
    } else {
      Alert.alert("Seleccionar una imagen", "Elige la opción para seleccionar una imagen", [
        { text: "Cancelar", style: "cancel" },
        { text: "Tomar una foto", onPress: abrirCamara },
        { text: "Elegir desde la galería", onPress: abrirSelectorImagen },
      ]);
    }
  };

  const abrirSelectorImagen = async () => {
    const resultadoPermiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (resultadoPermiso.granted === false) {
      alert("Has rechazado el acceso a la galería de imágenes.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true, // Activa el recorte
    aspect: [1, 1], // Define la relación de aspecto del recorte (cuadrado)
    quality: 0.8, // Calidad de la imagen (0.1 a 1.0)
    });

    manejarRespuestaSelectorImagen(resultado);
  };

  const abrirCamara = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync(); // Solicita permisos
  
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a la cámara.");
      return;
    }
  
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Activa el recorte
      aspect: [1, 1], // Relación de aspecto cuadrada
      quality: 0.8, // Calidad de la imagen
    });
  
    manejarRespuestaSelectorImagen(resultado);
  };

   const handleImagePress = () => {
    setModalVisible(true); // Mostrar el modal cuando se presiona la imagen
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
  };



    const crearUsuario = async () => {
      try {
        // Enviar los datos del usuario sin la foto de perfil
        const response = await fetch(`${API_URL}/usuarios/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(usuario),
        });
    
        // Verificar si la creación fue exitosa
        if (response.ok) {
          const data = await response.json(); 
          const idUsuarioCreado = data.id; // Obtenemos el ID del usuario recién creado
            console.log("Usuario creado");
          // Llamar a la función para enviar la foto de perfil
          EnviarFotoPerfil(idUsuarioCreado);
        } else {
          console.error("Error al crear el usuario:", response.status);
          setErrorMessage("No se pudo crear el usuario.");
        }
      } catch (error) {
        console.error("Error en la creación del usuario:", error);
        setErrorMessage("Error en la creación del usuario.");
      }
    }
    
    const EnviarFotoPerfil = async (idUsuarioCreado: string) => {
      try {
        // Crear FormData para enviar la foto de perfil
        const formData = new FormData();
    
         // Agregar la imagen si existe y ha sido modificada
            if (imageUri) {
              try {
                const response = await fetch(imageUri);
                const blob = await response.blob();
                const fileType = blob.type.split('/')[1] || 'jpg';
                
                if (Platform.OS === "web") {
                  formData.append('fotoPerfil', blob, `photo.${fileType}`);
                } else if (Platform.OS === "android") {
                  formData.append('fotoPerfil', {
                    uri: imageUri,
                    name: 'photo.png',
                    type: 'image/png',
                  });
                }
              } catch (error) {
                console.error('Error al procesar la imagen:', error);
                Alert.alert('Error', 'No se pudo procesar la imagen seleccionada.');
                return;
              }
            }
      
        // Realizar la solicitud PATCH para actualizar la foto de perfil
        const response = await axios.patch(`${API_URL}/usuarios/${idUsuarioCreado}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        console.log("Foto de perfil actualizada correctamente:", response.data);
    
        // Llamar a login() después de actualizar la foto de perfil
        login();
      } catch (error) {
        console.error("Error al actualizar la foto de perfil:", error);
        setErrorMessage("Error al actualizar la foto de perfil.");
      }
    };
  // Función para hacer login
  const login = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/login/`, {
        username: usuario.username, 
        password: usuario.password,
      });

      if (data.error) {
        console.error("Error en login:", data.error);
        setErrorMessage(data.error);
        return;
      }

 //     setState({ token: data.access });

      await AsyncStorage.setItem("@auth", JSON.stringify({ token: data.access }));
      await AsyncStorage.setItem("accessToken", data.access);
      await AsyncStorage.setItem("refreshToken", data.refresh);
      await AsyncStorage.setItem("userId", data.id.toString());

      console.log("Token guardado: ", data.access);

      console.log("Exito");
   //   navigation.navigate("PantallaHome");
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage("Error al iniciar sesión.");
    }
  };
  

  return (
    <SafeAreaView style={EstilosVerificacion2.areaSegura}>
      <View style={EstilosVerificacion2.contenedor}>
        <Text style={EstilosVerificacion2.titulo}>Verificación</Text>
        <Text style={EstilosVerificacion2.textoPaso}>PASO 2</Text>
        <Text style={EstilosVerificacion2.subtitulo}>Subir foto de perfil</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>

        <View style={EstilosVerificacion2.contenedorImagenPerfil}>
  <TouchableOpacity onPress={handleImagePress} style={EstilosVerificacion2.contenedorImagenPerfil}>
    {imageUri ? (
      <Image 
        source={{ uri: imageUri }} 
        style={EstilosVerificacion2.imagenPerfil} 
      />
    ) : (
      <Ionicons 
        name="person-circle-outline" 
        size={100} 
        color="#B7B7B7" 
      />
    )}
  </TouchableOpacity>
</View>

        <TouchableOpacity onPress={mostrarOpcionesSelectorImagen}>
          <Text style={EstilosVerificacion2.textoOpcion}>+ Seleccionar Imagen</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="fade" transparent>
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={EstilosVerificacion2.modalContainer}>
              <Image 
                source={{ uri: imageUri || 'https://via.placeholder.com/100' }} 
                style={EstilosVerificacion2.imagenModal} 
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <TouchableOpacity 
            onPress={crearUsuario} 
           style={EstilosVerificacion2.botonContenedor}
          >
          <Text style={EstilosVerificacion2.textoBoton}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Verificacion2Registro;
