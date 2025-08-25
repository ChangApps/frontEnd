import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../navegacion/AppNavigator";
import API_URL from "../../utils/API_URL";
import EstilosResultadosBusqueda from "./estilos/EstilosResultadosBusqueda";
import { NavBarInferior } from "../../componentes/NavBarInferior";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import CustomSnackbar from "../../componentes/CustomSnackbar";
import { SafeAreaView } from "react-native-safe-area-context";
import PantallaCarga from "../../componentes/PantallaCarga";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/Colors";
import ModalSeleccionarServicio from "../../componentes/ModalSeleccionarServicio";

const ResultadosBusqueda = () => {
  const [usuariosBloqueados, setUsuariosBloqueados] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalServiciosVisible, setModalServiciosVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [serviciosModal, setServiciosModal] = useState<any[]>([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<any>(null);
  const [loadingProveedor, setLoadingProveedor] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "ResultadosBusqueda">>();
  const { proveedores, error, busquedaGeneral } = route.params;

  const obtenerUsuariosBloqueados = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/bloqueados/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  useFocusEffect(
    useCallback(() => {
      const cargarUsuariosBloqueados = async () => {
        setLoading(true); // inicio de carga
        try {
          await obtenerUsuariosBloqueados();
        } catch (error) {
          setMessage("Error al cargar usuarios bloqueados");
          setVisible(true);
        } finally {
          setLoading(false); //fin de carga
        }
      };
      cargarUsuariosBloqueados();
    }, [])
  );

  const obtenerFotoPerfil = (proveedor: any) => {
    return proveedor.fotoPerfil
      ? `${API_URL}${proveedor.fotoPerfil}`
      : "https://via.placeholder.com/100";
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
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        break;
      case "Historial1":
        navigation.navigate("Historial1");
        break;
      case "Add":
        navigation.navigate("AgregarServicio1");
        break;
      case "Notifications":
        navigation.navigate("Notificaciones");
        break;
      case "PerfilUsuario":
        navigation.navigate("PerfilUsuario");
        break;
    }
  };

  const handleProveedorPress = (proveedor: any) => {
    if (proveedor.servicios && proveedor.servicios.length > 1) {
      // mas de un servicio: abrir modal
      setProveedorSeleccionado(proveedor);
      setServiciosModal(proveedor.servicios);
      setModalServiciosVisible(true);
    } else if (proveedor.servicios && proveedor.servicios.length === 1) {
      // un solo servicio: navegar con ese servicio
      setLoadingProveedor(true);
      navigation.navigate("PerfilProveedor", {
        id: proveedor.id,
        servicio: proveedor.servicios[0].id,
      });
    } else if (proveedor.idServicio) {
      setLoadingProveedor(true);
      navigation.navigate("PerfilProveedor", {
        id: proveedor.id,
        servicio: proveedor.idServicio,
      });
    } else {
      // no tiene servicios
      setMessage("El proveedor seleccionado no tiene servicios disponibles");
      setVisible(true);
    }
  };

  const handleServicioSeleccionado = (servicio: any) => {
    setModalServiciosVisible(false);
    setLoadingProveedor(true);
    navigation.navigate("PerfilProveedor", {
      id: proveedorSeleccionado.id,
      servicio: servicio.id,
    });
  };

  const proveedoresFiltrados = proveedores.filter(
    (proveedor) => !usuariosBloqueados.includes(proveedor.id)
  );

  if (loading) {
    return <PantallaCarga frase="Cargando resultados..." />;
  }

  return (
    <SafeAreaView style={EstilosResultadosBusqueda.safeContainer}>
      <NavBarSuperior
        titulo="Resultados"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightButtonType="none"
      />

      <View style={EstilosResultadosBusqueda.container}>
        {error ? (
          <View style={EstilosResultadosBusqueda.noResultsContainer}>
            <Image
              source={require("./estilos/list-is-empty.png")}
              style={EstilosResultadosBusqueda.noResultsImage}
              resizeMode="contain"
            />
            <Text style={EstilosResultadosBusqueda.mensajeNoUsuarios}>
              {error}
            </Text>
          </View>
        ) : proveedoresFiltrados.length === 0 ? (
          <View style={EstilosResultadosBusqueda.noResultsContainer}>
            <Image
              source={require("./estilos/list-is-empty.png")}
              style={EstilosResultadosBusqueda.noResultsImage}
              resizeMode="contain"
            />
            <Text style={EstilosResultadosBusqueda.mensajeNoUsuarios}>
              No se encontraron proveedores para los filtros seleccionados
            </Text>
          </View>
        ) : (
          <ScrollView>
            {busquedaGeneral
              ? proveedoresFiltrados.map((item: any, index: number) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleProveedorPress(item)}
                    >
                       <View key={item.id || index}
                        style={EstilosResultadosBusqueda.resultItem}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleImagePress(obtenerFotoPerfil(item))
                          }
                        >
                          <Image
                            style={EstilosResultadosBusqueda.image}
                            source={{ uri: obtenerFotoPerfil(item) }}
                          />
                        </TouchableOpacity>

                        <View style={EstilosResultadosBusqueda.resultDetails}>
                          <Text style={EstilosResultadosBusqueda.name}>
                            {(item.nombre || item.first_name) ?? ""}{" "}
                            {(item.apellido || item.last_name) ?? ""}
                          </Text>

                          {item.servicios && item.servicios.length > 0 ? (
                            item.servicios.map((servicio: any, idx: number) => (
                               <View
                                  key={servicio.id || servicio.nombreServicio}  
                                  style={{ marginTop: 6 }}
                                >
                                <Text
                                  style={{
                                    color: Colors.naranja,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {servicio.nombreServicio}
                                </Text>
                                {servicio.dias &&
                                  servicio.dias.length > 0 &&
                                  servicio.dias.map(
                                    (horario: any, idx2: number) => (
                                      <Text
                                        key={idx2}
                                        style={{
                                          color: "#aaaaaa",
                                          fontSize: 12,
                                        }}
                                      >
                                        {horario.dia} de {horario.desdeHora} a{" "}
                                        {horario.hastaHora}
                                      </Text>
                                    )
                                  )}
                              </View>
                            ))
                          ) : (
                            <Text style={{ color: Colors.naranja }}>
                              No hay servicios disponibles
                            </Text>
                          )}
                        </View>

                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              : proveedoresFiltrados.map((item: any, index: number) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => handleProveedorPress(item)}
                    >
                      <View
                        key={index}
                        style={EstilosResultadosBusqueda.resultItem}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleImagePress(obtenerFotoPerfil(item))
                          }
                        >
                          <Image
                            style={EstilosResultadosBusqueda.image}
                            source={{ uri: obtenerFotoPerfil(item) }}
                          />
                        </TouchableOpacity>
                        <View style={EstilosResultadosBusqueda.resultDetails}>
                          <Text style={EstilosResultadosBusqueda.name}>
                            {(item.nombre || item.first_name) ?? ""}{" "}
                            {(item.apellido || item.last_name) ?? ""}
                          </Text>
                          <Text
                            style={{
                              color: Colors.naranja,
                              fontWeight: "bold",
                            }}
                          >
                            {item.nombreServicio ||
                              item.servicios?.[0]?.nombreServicio ||
                              "Categoría no especificada"}
                          </Text>
                          {item.dias &&
                            item.dias.length > 0 &&
                            item.dias.map((horario: any, idx: number) => (
                                <Text
                                      key={horario.id || horario.dia + horario.desdeHora}  
                                      style={{ color: "#aaaaaa", fontSize: 12 }}
                                    >
                                {horario.dia} de {horario.desdeHora} a{" "}
                                {horario.hastaHora}
                              </Text>
                            ))}
                        </View>

                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
          </ScrollView>
        )}
      </View>

      {/* Modal para imagen ampliada */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={EstilosResultadosBusqueda.modalContainer}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={EstilosResultadosBusqueda.imagenModal}
              />
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