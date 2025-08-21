import {
  Text,
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  useNavigation,
  NavigationProp,
  RouteProp,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../../navegacion/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../utils/API_URL";
import { AuthContext } from "../../autenticacion/auth";
import { cerrarSesion } from "../../autenticacion/authService";
import EstilosResenias from "./estilos/EstilosResenias";
import { NavBarSuperior } from "../../componentes/NavBarSuperior";
import { NavBarInferior } from "../../componentes/NavBarInferior";
import CustomSnackbar from "../../componentes/CustomSnackbar";
import { SafeAreaView } from "react-native-safe-area-context";
import PantallaCarga from "../../componentes/PantallaCarga";
import Colors from "../../assets/Colors";
import { redirectAdmin } from "../../utils/utils";
import MenuDesplegable from "../../componentes/MenuDesplegable";
import EstilosUsuariosBloqueados from "./estilos/EstilosUsuariosBloqueados";
import EstiloOverlay from "../../componentes/estiloOverlayMenuDesplegable";

const Resenias = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, "Resenias">>();
  const [visible, setVisible] = useState(false); // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje de error o éxito
  const [loading, setLoading] = useState<boolean>(true);
  const [solicitudes, setSolicitudes] = useState([]); //Estado para guardar el arreglo del historial
  const [state, setState] = useContext(AuthContext);
  const [hayResenas, setHayResenas] = useState(true);

  const logout = async () => {
    try {
      setState({ token: "" });
      await cerrarSesion(); // Simula el proceso de cierre de sesión
      console.log("Sesión cerrada correctamente"); // Log al finalizar el cierre de sesión
    } catch (error) {
      console.error("Error en el cierre de sesión:", error);
      setMessage("Error al cerrar sesion");
      setVisible(true);
    }
  };

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  useEffect(() => {
    fetchSolicitudesUsuario();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const fetchSolicitudesUsuario = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const userId = route.params.idUsuario;

      if (!accessToken || !userId) {
        throw new Error("No se encontró el token o el ID de usuario");
      }

      const responseSolicitudUsuario = await fetch(
        `${API_URL}/solicitudes/por-proveedor/${userId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (responseSolicitudUsuario.status === 404) {
        setHayResenas(false);
        setMessage("No hay reseñas disponibles");
        return;
      }

      if (!responseSolicitudUsuario.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const solicitudData = await responseSolicitudUsuario.json();
      // Filtrar solo los que tienen estado 'F' o 'Finalizado'
      const solicitudFiltrada = solicitudData.filter(
        (item: any) => item.estado === "F" || item.estado === "Finalizado"
      );

      if (solicitudFiltrada.length > 0) {
        setSolicitudes(solicitudFiltrada);
      } else {
        setHayResenas(false);
        setMessage("No hay reseñas disponibles");
      }
    } catch (error) {
      console.error("Error al obtener las resenias");
    } finally {
      setLoading(false);
    }
  };

  const renderResenia = ({ item }: { item: any }) => (
    <View style={EstilosResenias.reseniaItem}>
      <View style={EstilosResenias.headerResenia}>
        <Text style={EstilosResenias.categoria}>
          Nombre del servicio: {item.nombreServicio}
        </Text>
        <Text style={EstilosResenias.categoria}>
          Calificado por: {item.cliente_nombre}
        </Text>
        <Text style={EstilosResenias.categoria}>
          Comentario: {item.comentario ? item.comentario : "Sin comentarios"}
        </Text>
        <Text style={EstilosResenias.fecha}>
          Fecha de Valoración:{" "}
          {item.fechaValoracion ? item.fechaValoracion : "No disponible"}
        </Text>
      </View>
      <View style={EstilosResenias.rating}>
        <Text style={EstilosResenias.valoracion}>Valoración: </Text>
        {/* Dibuja las estrellas basadas en la valoración */}
        {[...Array(5)].map((_, i) => (
          <Ionicons
            key={i}
            name="star"
            size={16}
            color={i < item.valoracion ? Colors.naranja : Colors.grisTexto} // Estrella llena o vacía
          />
        ))}
      </View>
    </View>
  );

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case "Home":
        navigation.navigate("Home");
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

  return (
    <SafeAreaView style={EstilosResenias.safeContainer}>
      <View style={EstilosResenias.container}>
        {/* NavBar Superior */}
        <NavBarSuperior
          titulo="Reseñas"
          showBackButton={true}
          onBackPress={() => {
            navigation.goBack();
          }}
          rightButtonType="menu"
          onRightPress={() => {
            toggleDesplegable();
          }}
        />

        {/* Overlay transparente cuando el menú está abierto para que al tocar la pantalla se cierre el menú */}
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

          {loading ? (
            <PantallaCarga frase="Cargando reseñas..." />
          ) : !hayResenas ? (
            <View style={EstilosResenias.noResultsContainer}>
              <Image
                source={require("./estilos/no-results.png")}
                style={EstilosUsuariosBloqueados.noResultsImage}
                resizeMode="contain"
              />
              <Text style={EstilosResenias.mensajeVacio}>{message}</Text>
            </View>
          ) : (
            <FlatList
              data={solicitudes}
              renderItem={renderResenia}
              keyExtractor={(item, index) => index.toString()}
            />
          )}

          <CustomSnackbar
            visible={visible}
            setVisible={setVisible}
            message={message}
          />
        {/* Barra de navegación inferior */}
        <NavBarInferior
          activeScreen="Resenias" // O el screen activo correspondiente
          onNavigate={handleNavigation}
        />
      </View>
    </SafeAreaView>
  );
};
export default Resenias;
