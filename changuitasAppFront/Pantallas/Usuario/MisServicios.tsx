import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../navegacion/AppNavigator";
import API_URL from "../../utils/API_URL";
import { cerrarSesion } from "../../autenticacion/authService";
import { AuthContext } from "../../autenticacion/auth";
import EstilosMisServicios from "./estilos/EstilosMisServicios";
import BarraPestanasPerfil from "../../utils/BarraPestanasPerfil";
import MenuDesplegable from "../../componentes/MenuDesplegable";
import EncabezadoPerfil from "../../componentes/perfilesUsuarios/EncabezadoPerfil";
import { NavBarInferior } from "../../componentes/NavBarInferior";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../assets/Colors";
import CustomSnackbar from "../../componentes/CustomSnackbar";
import { redirectAdmin } from "../../utils/utils";
import { Servicio } from "../../types/interfaces";
import EstiloOverlay from "../../componentes/estiloOverlayMenuDesplegable";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomModal from "../../componentes/CustomModal";

const MisServicios = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "MisServicios">>();
  const [services, setServices] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [idServicioSeleccionado, setIdServicioSeleccionado] = useState(null);
  const [visible, setVisible] = useState(false); // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje de error
  const [modalVisible, setModalVisible] = useState(false);
  const [servicioAEliminar, setServicioAEliminar] = useState<Servicio | null>(null);


  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log("Sesión cerrada correctamente"); // Log al finalizar el cierre de sesión
    } catch (error) {
      setMessage("Error al cerrar sesion");
      setVisible(true);
    }
  };

  const EliminarServicio = async (serviceId: any) => {
    try {
      // Almacena el id del servicio en la variable de estado antes de borrar
      setIdServicioSeleccionado(serviceId);

      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Token de acceso no encontrado");
      }

      const response = await fetch(`${API_URL}/servicios/${serviceId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        console.log("Se elimino el servicio correctamente");
        // Actualiza la lista de servicios eliminando el servicio borrado.
        setServices(services.filter((servicio) => servicio.id !== serviceId));

        // Reinicia la variable de id a null después de borrar el servicio
        setIdServicioSeleccionado(null);
      } else {
        const data = await response.json(); //mensaje del backend
        setMessage(data.error || "Ocurrió un error"); // usa data.error si existe
        setVisible(true);
      }
    } catch (error) {
        setMessage("Error al eliminar servicio");
        setVisible(true);
    }
  };

  const fetchUsuario = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const userId = await AsyncStorage.getItem("userId");

      if (!accessToken || !userId) {
        throw new Error("Token de acceso o ID de usuario no encontrado");
      }

      const response = await fetch(
        `${API_URL}/servicios/por-usuario/${userId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al obtener servicios: ${response.status}`);
      }

      const data: Servicio[] = await response.json();
      setServices(data);
    } catch (error) {
      setMessage("Error al cargar los servicios del usuario");
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuario();
  }, []);

  useEffect(() => {
    if (route.params?.message) {
      setMessage(route.params.message);
      setVisible(true);
    }
  }, [route.params]);

  const renderServiceItem = ({ item }: { item: Servicio }) => (
    <View style={EstilosMisServicios.servicioCard}>
      <Text style={EstilosMisServicios.nombreServicio}>
        {item.nombreServicio}
      </Text>
      <Text style={EstilosMisServicios.descripcion}>{item.descripcion}</Text>
      {item.dias &&
        item.dias.map((dia, index) => (
          <Text key={index} style={EstilosMisServicios.horario}>
            {dia.dia}: {dia.desdeHora} - {dia.hastaHora}
          </Text>
        ))}
      {/* Fallback for original single day format */}
      {!item.dias && (
        <Text style={EstilosMisServicios.horario}>
          {item.dia}: {item.desdeHora} - {item.hastaHora}
        </Text>
      )}
      <View style={EstilosMisServicios.botonesCard}>
        {/* Botón editar */}
        <TouchableOpacity
          style={EstilosMisServicios.botonEditar}
          onPress={() =>
            navigation.navigate("AgregarServicio2", {
              selectedServices: [],
              servicio: item,
            })
          }
        >
          <FontAwesome name="pencil" size={24} color="coral" />
        </TouchableOpacity>

        {/* Botón para eliminar el servicio */}
        <TouchableOpacity
          style={EstilosMisServicios.botonEliminar}
          onPress={() => {
            setServicioAEliminar(item);
            setModalVisible(true);
          }}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleNavigation = (screen: string) => {
  switch (screen) {
    case 'Home':
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      break;
    case 'Historial1':
      navigation.navigate('Historial1');
      break;
    case 'Add':
      navigation.navigate('AgregarServicio1');
      break;
    case 'Notifications':
      navigation.navigate('Notificaciones');
      break;
    case 'PerfilUsuario':
      navigation.navigate('PerfilUsuario');
      break;
  }
};

  const EmptyComponent = () => (
    <View style={EstilosMisServicios.noResultsContainer}>
      <Text style={EstilosMisServicios.sinServicios}>
        Aún no tenés servicios vinculados
      </Text>
      <Image
        source={require("./estilos/bored.png")}
        style={EstilosMisServicios.noResultsImage}
        resizeMode="contain"
      />
    </View>
  );

  // Se crea una copia del array 'services' para no modificar el original
  const serviciosOrdenados = [...services].sort((a, b) => {
    // obtenemos el timestamp de 'fechaDesde' de 'a', o null si no existe
    const fechaA = a.fechaDesde ? new Date(a.fechaDesde).getTime() : null;
    // obtenemos el timestamp de 'fechaDesde' de 'b', o null si no existe
    const fechaB = b.fechaDesde ? new Date(b.fechaDesde).getTime() : null;

    // si ninguno tiene fecha, mantienen su orden relativo
    if (fechaA === null && fechaB === null) return 0;
    // si 'a' no tiene fecha pero 'b' sí, 'a' va después
    if (fechaA === null) return 1;
    // si 'b' no tiene fecha pero 'a' sí, 'b' va después
    if (fechaB === null) return -1;

    // si ambos tienen fecha, ordenamos por fecha descendente
    // (más reciente primero)
    return fechaB - fechaA;
  });

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={EstilosMisServicios.safeContainer}>
        <EncabezadoPerfil onToggleMenu={toggleDesplegable} />
        <BarraPestanasPerfil />
          {/* Overlay */}
        {mostrarDesplegable && (
          <TouchableWithoutFeedback
            onPress={() => setMostrarDesplegable(false)}
          >
            <View style={EstiloOverlay.overlay} />
          </TouchableWithoutFeedback>
        )}

        <MenuDesplegable
          visible={mostrarDesplegable}
          usuario={state.usuario}
          onLogout={logout}
          onRedirectAdmin={redirectAdmin}
        />

        {/* Botón agregar servicio */}
        <View style={{ paddingTop: 20 }}>
          <TouchableOpacity
            style={EstilosMisServicios.botonAgregarServicio}
            onPress={() => navigation.navigate("AgregarServicio1")}
          >
            <Ionicons name="add" size={20} color={Colors.naranja} />
            <Text style={EstilosMisServicios.textoBoton}>Agregar servicio</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de servicios */}
        <FlatList
          data={serviciosOrdenados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          contentContainerStyle={EstilosMisServicios.listaServicios}
          ListEmptyComponent={!loading ? <EmptyComponent /> : null}
          ListHeaderComponent={
            loading ? (
              <Text style={EstilosMisServicios.cargando}>
                Cargando servicios...
              </Text>
            ) : null
          }
          showsVerticalScrollIndicator={true}
        />

        <NavBarInferior
          activeScreen="MisServicios"
          onNavigate={handleNavigation}
        />
      </SafeAreaView>

      {/* Snackbar */}
      <CustomSnackbar
        visible={visible}
        setVisible={setVisible}
        message={message}
      />

      {/* Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            width: "80%",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            ¿Estás seguro?
          </Text>
          <Text style={{ marginBottom: 20 }}>
            Esta acción eliminará el servicio "
            {servicioAEliminar?.nombreServicio}" permanentemente.
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "black" }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (servicioAEliminar) {
                  EliminarServicio(servicioAEliminar.id);
                }
                setModalVisible(false);
                setServicioAEliminar(null);
              }}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default MisServicios;
