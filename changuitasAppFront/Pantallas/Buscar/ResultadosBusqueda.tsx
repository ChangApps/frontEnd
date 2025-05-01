import { SafeAreaView, Text, View, TouchableOpacity, Image,Modal, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from "../../auxiliares/API_URL"; 
import BarraNavegacionInferior from "../../auxiliares/BarraNavegacionInferior";
import EstilosResultadosBusqueda from "./estilos/EstilosResultadosBusqueda";

const ResultadosBusqueda = () => {
    const [usuariosBloqueados, setUsuariosBloqueados] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ResultadosBusqueda'>>();
    const { proveedores, error } = route.params;
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
    const [selectedImage, setSelectedImage] = useState("");

    console.log("Datos del arreglo de proveedores: ", proveedores);

    useEffect(() => {
      const obtenerUsuariosBloqueados = async () => {
          try {
              const accessToken = await AsyncStorage.getItem('accessToken');
              const response = await fetch(`${API_URL}/bloqueados/`, {
                  headers: {
                      'Authorization': `Bearer ${accessToken}`,
                  },
              });

              const data = await response.json();
              if (response.ok) {
                  const idsBloqueados = data.map((usuario: any) => usuario.id);
                  console.log("Usuarios bloqueados:", idsBloqueados);
                  setUsuariosBloqueados(idsBloqueados);
              } else {
                  console.error("Error al obtener usuarios bloqueados:", data.error);
              }
          } catch (error) {
              console.error("Error al obtener usuarios bloqueados:", error);
          } finally {
              setLoading(false);
          }
      };

      obtenerUsuariosBloqueados();
  }, []);

  const handleImagePress = (imageUri: string) => {
      setSelectedImage(imageUri);
      setModalVisible(true);
  };

    const handleCloseModal = () => {
      setModalVisible(false); // Cerrar el modal cuando se presiona el botón de cerrar
    };

    const obtenerFotoPerfil = (proveedor:any) => {
      return proveedor.fotoPerfil ? `${API_URL}${proveedor.fotoPerfil}` : "https://via.placeholder.com/100";
  };
   
    //Filtramos los proveedores que NO están bloqueados
    const proveedoresFiltrados = proveedores.filter(proveedor => !usuariosBloqueados.includes(proveedor.id));

    return (
      <SafeAreaView style={EstilosResultadosBusqueda .safeArea}>
        <View style={EstilosResultadosBusqueda .container}>
          {/* Botón de regreso y título */}
          <View style={EstilosResultadosBusqueda .header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={EstilosResultadosBusqueda .title}>Resultados</Text>
          </View>
  
  
          {/* Mostrar mensaje de error si existe */}
          {error ? (
                    <View style={EstilosResultadosBusqueda.errorContainer}>
                    <Text style={EstilosResultadosBusqueda.errorText}>{error}</Text>
                  </View>
                ) : proveedoresFiltrados.length === 0 ? (
                  <View style={EstilosResultadosBusqueda.noResultsContainer}>
                    <Image
                      source={require('./estilos/no-results.png')}
                      style={EstilosResultadosBusqueda.noResultsImage}
                      resizeMode="contain"
                    />
                    <Text style={EstilosResultadosBusqueda.mensajeNoUsuarios}>No se encontraron proveedores para el servicio solicitado.</Text>
                  </View>
                ) : (
                  
                  proveedoresFiltrados.map((item, index) => (
                        <View key={index} style={EstilosResultadosBusqueda .resultItem}>
                            <TouchableOpacity onPress={() => handleImagePress(obtenerFotoPerfil(item))} style={EstilosResultadosBusqueda .image}>
                                <Image
                                    style={EstilosResultadosBusqueda .image}
                                    source={{ uri: obtenerFotoPerfil(item) }}
                                />
                            </TouchableOpacity>
                            <View style={EstilosResultadosBusqueda .resultDetails}>
                                <Text style={EstilosResultadosBusqueda .name}>{item.nombre} {item.apellido}</Text>
                                <Text style={EstilosResultadosBusqueda .category}>{item.nombreServicio || "Categoría no especificada"}</Text>
                                <View style={EstilosResultadosBusqueda .rating}>
                                    {[...Array(5)].map((_, i) => (
                                        <Ionicons
                                            key={i}
                                            name="star"
                                            size={16}
                                            color={i < item.puntaje ? "black" : "#CCCCCC"}
                                        />
                                    ))}
                                </View>
                            </View>
                            <TouchableOpacity
                               onPress={() => navigation.navigate('PerfilProveedor', { id: item.id })}
                                style={EstilosResultadosBusqueda .arrowButton}
                            >
                                <Ionicons name="chevron-forward" size={20} color="#333" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>

       {/* Modal para la imagen ampliada */}
       <Modal visible={modalVisible} animationType="fade" transparent>
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={EstilosResultadosBusqueda .modalContainer}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={EstilosResultadosBusqueda .imagenModal} />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        {/* Barra de navegación inferior */}
         <BarraNavegacionInferior/>
      </SafeAreaView>
    );
  };

export default ResultadosBusqueda;
