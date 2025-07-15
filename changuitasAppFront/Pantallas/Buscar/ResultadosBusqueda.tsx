import { Text,View, TouchableOpacity, Image, Modal,  TouchableWithoutFeedback, ScrollView, FlatList,} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from "../../utils/API_URL";
import EstilosResultadosBusqueda from "./estilos/EstilosResultadosBusqueda";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import CustomSnackbar from "../../componentes/CustomSnackbar";
import { NavBarInferior } from "../../componentes/NavBarInferior";
import Colors from "../../assets/Colors";
import ModalSeleccionarServicio from "../../componentes/ModalSeleccionarServicio";
import { SafeAreaView } from 'react-native-safe-area-context';

const ResultadosBusqueda = () => {
  const [usuariosBloqueados, setUsuariosBloqueados] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalServiciosVisible, setModalServiciosVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [serviciosModal, setServiciosModal] = useState<any[]>([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<any>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ResultadosBusqueda'>>();
  const { proveedores, error, busquedaGeneral } = route.params;

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
        setUsuariosBloqueados(idsBloqueados);
      } else {
        setMessage("Error al obtener usuarios bloqueados");
        setVisible(true);
      }
    } catch (error) {
      setMessage("Error de conexión al obtener usuarios bloqueados");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuariosBloqueados();
  }, []);

  const obtenerFotoPerfil = (proveedor: any) => {
    return proveedor.fotoPerfil ? `${API_URL}${proveedor.fotoPerfil}` : "https://via.placeholder.com/100";
  };

  const handleImagePress = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'Home':
        navigation.navigate('Home');
        break;
      case 'Historial1':
        navigation.navigate('Historial1');
        break;
      case 'Add':
        navigation.navigate('AgregarServicio1');
        break;
      case 'Notifications':
        break;
      case 'PerfilUsuario':
        navigation.navigate('PerfilUsuario');
        break;
    }
  };


const handleProveedorPress = (proveedor: any) => {
  if (!proveedor.servicios || proveedor.servicios.length === 0) {
    setMessage("El proveedor selecionado no tiene servicios disponibles");
    setVisible(true);
    return;
  }

  if (proveedor.servicios.length > 1) {
    setProveedorSeleccionado(proveedor);
    setServiciosModal(proveedor.servicios);
    setModalServiciosVisible(true);
  } else {
    console.log('ResultadosBusqueda proveedor id: ', proveedor.id, ' proveedor.servicios: ', proveedor.servicios);
     navigation.navigate('PerfilProveedor', { id: proveedor.id, servicio: proveedor.servicios[0].id });
  }
};

  const handleServicioSeleccionado = (servicio: any) => {
    setModalServiciosVisible(false);
    navigation.navigate('PerfilProveedor', {
      id: proveedorSeleccionado.id,
      servicio: servicio.id,
    });
  };

  const proveedoresFiltrados = proveedores.filter(proveedor => !usuariosBloqueados.includes(proveedor.id));

  return (
    <SafeAreaView edges={['top']} style={EstilosResultadosBusqueda.safeContainer}>
      <View style={EstilosResultadosBusqueda.container}>
        <NavBarSuperior
          titulo="Resultados"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          rightButtonType="none"
        />

        {error ? (
          <View style={EstilosResultadosBusqueda.errorContainer}>
            <Text style={EstilosResultadosBusqueda.errorText}>{error}</Text>
          </View>
        ) : proveedoresFiltrados.length === 0 ? (
          <View style={EstilosResultadosBusqueda.noResultsContainer}>
            <Image
              source={require('./estilos/list-is-empty.png')}
              style={EstilosResultadosBusqueda.noResultsImage}
              resizeMode="contain"
            />
            <Text style={EstilosResultadosBusqueda.mensajeNoUsuarios}>
              No se encontraron proveedores para los filtros seleccionados.
            </Text>
          </View>
        ) : (
          <ScrollView>
            {busquedaGeneral ? (
              proveedoresFiltrados.map((item: any, index: number) => (
                <View key={index} style={EstilosResultadosBusqueda.resultItem}>
                  <TouchableOpacity onPress={() => handleImagePress(obtenerFotoPerfil(item))}>
                    <Image
                      style={EstilosResultadosBusqueda.image}
                      source={{ uri: obtenerFotoPerfil(item) }}
                    />
                  </TouchableOpacity>

                  <View style={EstilosResultadosBusqueda.resultDetails}>
                    <Text style={EstilosResultadosBusqueda.name}>
                      {(item.nombre || item.first_name) ?? ''} {(item.apellido || item.last_name) ?? ''}
                    </Text>

                    {item.servicios && item.servicios.length > 0 ? (
                      item.servicios.map((servicio: any, idx: number) => (
                        <View key={idx} style={{ marginTop: 6 }}>
                          <Text style={{ color: Colors.naranja, fontWeight: 'bold' }}>{servicio.nombreServicio}</Text>
                          {servicio.dias && servicio.dias.length > 0 && servicio.dias.map((horario: any, idx2: number) => (
                            <Text key={idx2} style={{ color: '#aaaaaa', fontSize: 12 }}>
                              {horario.dia} de {horario.desdeHora} a {horario.hastaHora}
                            </Text>
                          ))}
                        </View>
                      ))
                    ) : (
                      <Text>No hay servicios disponibles</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() => handleProveedorPress(item)}
                    style={EstilosResultadosBusqueda.arrowButton}
                  >
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              proveedoresFiltrados.map((item: any, index: number) => (
                <View key={index} style={EstilosResultadosBusqueda.resultItem}>
                  <TouchableOpacity onPress={() => handleImagePress(obtenerFotoPerfil(item))}>
                    <Image
                      style={EstilosResultadosBusqueda.image}
                      source={{ uri: obtenerFotoPerfil(item) }}
                    />
                  </TouchableOpacity>
                  <View style={EstilosResultadosBusqueda.resultDetails}>
                    <Text style={EstilosResultadosBusqueda.name}>
                      {(item.nombre || item.first_name) ?? ''} {(item.apellido || item.last_name) ?? ''}
                    </Text>
                   <Text style={{ color: Colors.naranja, fontWeight: 'bold' }}>
                      {item.nombreServicio || (item.servicios?.[0]?.nombreServicio) || "Categoría no especificada"}
                    </Text>
                    {item.dias && item.dias.length > 0 && item.dias.map((horario: any, idx: number) => (
                      <Text key={idx} style={{ color: '#aaaaaa', fontSize: 12 }}>
                        {horario.dia} de {horario.desdeHora} a {horario.hastaHora}
                      </Text>
                    ))}
                  </View>
                  <TouchableOpacity
                    onPress={() => handleProveedorPress(item)}
                    style={EstilosResultadosBusqueda.arrowButton}
                  >
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>

      {/* Modal para imagen ampliada */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={EstilosResultadosBusqueda.modalContainer}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={EstilosResultadosBusqueda.imagenModal} />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal para seleccionar servicio */}
      <ModalSeleccionarServicio
        visible={modalServiciosVisible}
        onClose={() => setModalServiciosVisible(false)}
        servicios={serviciosModal}
        onSeleccionar={handleServicioSeleccionado}
      />

      <NavBarInferior
        activeScreen="ResultadosBusqueda"
        onNavigate={handleNavigation}
      />

      <CustomSnackbar
        visible={visible}
        setVisible={setVisible}
        message={message}
      />
    </SafeAreaView>
  );
};

export default ResultadosBusqueda;