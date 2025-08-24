import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import EstilosAgregarServicio1 from './estilos/EstilosAgregarServicio1';
import { Button } from '../../componentes/Buttons';
import Colors from '../../assets/Colors';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomSnackbar from '../../componentes/CustomSnackbar';
import API_URL from '../../utils/API_URL';
import PantallaCarga from '../../componentes/PantallaCarga';

interface Categoria {
  id: number;
  nombre: string;
  categoria_padre: number | null;
}

const AgregarServicio1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedService, setSelectedService] = useState<{ nombre: string; parentId: number | null } | null>(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar categorías desde el backend
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/categorias/`);
        const data: Categoria[] = await response.json();
        setCategorias(data);
      } catch (error) {
        setMessage('Error al obtener las categorias');
        setVisible(true);
      }finally{
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);


    const handleSelectService = (nombre: string, parentId: number | null) => {
      if (selectedService?.nombre === nombre && selectedService?.parentId === parentId) {
        setSelectedService(null); // si hace tap de nuevo, lo deselecciona
      } else {
        setSelectedService({ nombre, parentId });
      }
    };

  const handleNext = () => {
    if (!selectedService) {
      setMessage("Por favor selecciona un servicio.");
      setVisible(true);
      return;
    }
    navigation.navigate("AgregarServicio2", {
      selectedServices: [selectedService] 
    });
  };

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

  // Agrupar categorías por padre
  const categoriasPadre = categorias.filter((c) => c.categoria_padre === null);
  const getSubcategorias = (parentId: number) =>
    categorias.filter((c) => c.categoria_padre === parentId);

  if (loading) {
    return <PantallaCarga frase="Cargando categorias..." />;
  }


  return (
    <SafeAreaView style={EstilosAgregarServicio1.safeContainer}>
      {/* NavBar Superior */}
      <NavBarSuperior
        titulo="Agregar un servicio"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightButtonType="none"
      />

      <ScrollView contentContainerStyle={EstilosAgregarServicio1.scrollContainer}>
        <View style={EstilosAgregarServicio1.pasosWrapper}>
          <View style={EstilosAgregarServicio1.pasoActivo}>
            <Text style={EstilosAgregarServicio1.pasoTextoActivo}>1. Seleccionar categoría</Text>
          </View>
          <View style={EstilosAgregarServicio1.pasoInactivo}>
            <Text style={EstilosAgregarServicio1.pasoTextoInactivo}>2. Agregar detalles</Text>
          </View>
        </View>

        {categoriasPadre.map((catPadre) => (
          <View key={catPadre.id} style={EstilosAgregarServicio1.categoriaContenedor}>
            <Text style={EstilosAgregarServicio1.categoriaTitulo}>{catPadre.nombre}</Text>
            <View style={EstilosAgregarServicio1.chipsContenedor}>
              {getSubcategorias(catPadre.id).map((subcat) => (
                <TouchableOpacity
                  key={subcat.id}
                  style={[
                    EstilosAgregarServicio1.chip,
                    selectedService?.nombre === subcat.nombre &&
                      selectedService?.parentId === catPadre.id &&
                      EstilosAgregarServicio1.chipSeleccionado,
                  ]}
                  onPress={() => handleSelectService(subcat.nombre, catPadre.id)}
                >
                  <Text
                    style={[
                      EstilosAgregarServicio1.chipTexto,
                      selectedService?.nombre === subcat.nombre &&
                        selectedService?.parentId === catPadre.id &&
                        EstilosAgregarServicio1.chipTextoSeleccionado,
                    ]}
                  >
                    {subcat.nombre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Botones de acción */}
        <View style={EstilosAgregarServicio1.botonesContenedor}>
          <Button
            titulo="Siguiente"
            onPress={handleNext}
            textSize={18}
            textColor={Colors.fondo}
            padding={14}
            borderRadius={25}
          />
          <Button
            titulo="Cancelar"
            onPress={() => navigation.navigate("MisServicios", { message: "" })}
            backgroundColor="transparent"
            textColor={Colors.naranja}
            textSize={18}
            padding={14}
            borderRadius={25}
          />
        </View>
      </ScrollView>

      <NavBarInferior activeScreen="AgregarServicio1" onNavigate={handleNavigation} />
      <CustomSnackbar visible={visible} setVisible={setVisible} message={message} />
    </SafeAreaView>
  );
};

export default AgregarServicio1;