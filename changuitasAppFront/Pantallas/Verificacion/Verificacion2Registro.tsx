import { Alert, Platform, Image, SafeAreaView, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RootStackParamList } from '../../navegacion/AppNavigator';
import API_URL from "../../utils/API_URL";
import { AuthContext } from '../../autenticacion/auth';
import EstilosVerificacion2 from './estilos/EstilosVerificacion2';
import FormData from 'form-data';
import { mostrarOpcionesSelectorImagen } from '../../utils/seleccionImagen';
import { ImageCropperWeb } from "../../componentes/ImageCropperWeb";
import { Button } from "../../componentes/Buttons";

const Verificacion2Registro = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Estado para la foto de perfil
  const [imageUri, setImageUri] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const route = useRoute<RouteProp<RootStackParamList, 'Verificacion2Registro'>>();
  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState(route.params?.datosUsuario || {});
  const [state, setState] = useContext(AuthContext);
  const [cropperVisible, setCropperVisible] = useState<boolean>(false);

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

      setState({ token: data.access });
      await AsyncStorage.setItem("@auth", JSON.stringify({ token: data.access }));
      await AsyncStorage.setItem("accessToken", data.access);
      await AsyncStorage.setItem("refreshToken", data.refresh);
      await AsyncStorage.setItem("userId", data.id.toString());

      console.log("Token guardado: ", data.access);

      console.log("Exito");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error en login:", error);
      setErrorMessage("Error al iniciar sesión.");
    }
  };


  return (
    <SafeAreaView style={EstilosVerificacion2.areaSegura}>
      <View style={EstilosVerificacion2.contenedor}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={EstilosVerificacion2.botonAtras}>
          <Ionicons name="arrow-back" size={30} color="#197278" />
        </TouchableOpacity>
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

        {Platform.OS === 'web' ? (
          <>
            <TouchableOpacity
              onPress={() =>
                mostrarOpcionesSelectorImagen(setImageUri, setImageFile, setCropperVisible)
              }
            >
              <Text style={EstilosVerificacion2.textoOpcion}>Seleccionar Imagen</Text>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={cropperVisible}
              onRequestClose={() => setCropperVisible(false)}
            >
              <View style={EstilosVerificacion2.modalOverlay}>
                <View style={EstilosVerificacion2.modalContent}>
                  <ImageCropperWeb
                    imageUri={imageUri}
                    setImageUri={setImageUri}
                    setCropperVisible={setCropperVisible}
                  />
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <TouchableOpacity
            onPress={() =>
              mostrarOpcionesSelectorImagen(setImageUri, setImageFile, setCropperVisible)
            }
          >
            <Text style={EstilosVerificacion2.textoOpcion}>Seleccionar Imagen</Text>
          </TouchableOpacity>
        )}
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

        <View style={{ alignSelf: 'center', width: '60%', marginTop:20 }}>
          <Button
            titulo="Siguiente →"
            onPress={crearUsuario}
            backgroundColor= '#FC6A30'
            textColor="#fffff"           
            textSize={18}                 
            padding={15}                  
            borderRadius={25}             
            width={undefined}             
            showIcon={false}
          />
        </View>

      </View>
    </SafeAreaView>
  );
};
export default Verificacion2Registro;
