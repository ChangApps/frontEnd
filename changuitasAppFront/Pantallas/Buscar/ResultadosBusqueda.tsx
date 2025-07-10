import { SafeAreaView, Text, View, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from "react-native";
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

const ResultadosBusqueda = () => {
    const [usuariosBloqueados, setUsuariosBloqueados] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
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
                    setMessage("Error al obtener usuarios bloqueados");
                    setVisible(true);
                }
            } catch (error) {
                console.error("Error al obtener usuarios bloqueados:", error);
                setMessage("Error de conexión al obtener usuarios bloqueados");
                setVisible(true);
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

    const obtenerFotoPerfil = (proveedor: any) => {
        return proveedor.fotoPerfil ? `${API_URL}${proveedor.fotoPerfil}` : "https://via.placeholder.com/100";
    };

    //Filtramos los proveedores que NO están bloqueados
    const proveedoresFiltrados = proveedores.filter(proveedor => !usuariosBloqueados.includes(proveedor.id));

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
                // Navegar a notificaciones
                break;
            case 'PerfilUsuario':
                navigation.navigate('PerfilUsuario');
                break;
        }
    };

    return (
        <SafeAreaView style={EstilosResultadosBusqueda.safeArea}>
            <View style={EstilosResultadosBusqueda.container}>
                {/* NavBar Superior */}
                <NavBarSuperior
                    titulo="Resultados"
                    showBackButton={true}
                    onBackPress={() => navigation.goBack()}
                    rightButtonType="none"
                />


                {/* Mostrar mensaje de error si existe */}
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
                        <Text style={EstilosResultadosBusqueda.mensajeNoUsuarios}>No se encontraron proveedores para los filtros seleccionados.</Text>
                    </View>
                ) : (

                    proveedoresFiltrados.map((item, index) => (
                        <View key={index} style={EstilosResultadosBusqueda.resultItem}>
                            <TouchableOpacity onPress={() => handleImagePress(obtenerFotoPerfil(item))} style={EstilosResultadosBusqueda.image}>
                                <Image
                                    style={EstilosResultadosBusqueda.image}
                                    source={{ uri: obtenerFotoPerfil(item) }}
                                />
                            </TouchableOpacity>
                            <View style={EstilosResultadosBusqueda.resultDetails}>
                                <Text style={EstilosResultadosBusqueda.name}>{item.nombre} {item.apellido}</Text>
                                <Text style={EstilosResultadosBusqueda.category}>{item.nombreServicio || "Categoría no especificada"}</Text>
                                <View style={EstilosResultadosBusqueda.rating}>
                                    {[...Array(5)].map((_, i) => (
                                        <Ionicons
                                            key={i}
                                            name="star"
                                            size={16}
                                            color={i < item.puntaje ? "#FC6A30" : "#CCCCCC"}
                                        />
                                    ))}
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('PerfilProveedor', { id: item.id })}
                                style={EstilosResultadosBusqueda.arrowButton}
                            >
                                <Ionicons name="chevron-forward" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>

            {/* Modal para la imagen ampliada */}
            <Modal visible={modalVisible} animationType="fade" transparent>
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                    <View style={EstilosResultadosBusqueda.modalContainer}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={EstilosResultadosBusqueda.imagenModal} />
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Barra de navegación inferior */}
            <NavBarInferior
                activeScreen="ResultadosBusqueda" // O el screen activo correspondiente
                onNavigate={handleNavigation}
            />

            {/* CustomSnackbar */}
            <CustomSnackbar
                visible={visible}
                setVisible={setVisible}
                message={message}
            />
        </SafeAreaView>
    );
};

export default ResultadosBusqueda;