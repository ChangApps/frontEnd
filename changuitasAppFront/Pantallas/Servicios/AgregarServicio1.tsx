import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Linking } from 'react-native';
import { Checkbox } from 'react-native-paper'; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import EstilosAgregarServicio1 from './estilos/EstilosAgregarServicio1';
import EncabezadoPerfil from '../../componentes/perfilesUsuarios/EncabezadoPerfil';
import MenuDesplegable from '../../auxiliares/MenuDesplegable';
import { AuthContext } from '../../autenticacion/auth';
import {cerrarSesion} from '../../autenticacion/authService';
import { Button } from '../../componentes/Buttons';
import Colors from '../../assets/Colors';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';

const AgregarServicio1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
  const [state,setState] = useContext(AuthContext);

  const toggleDesplegable = () => {
    setMostrarDesplegable(!mostrarDesplegable);
  };

  const redirectAdmin = () => {
      Linking.openURL('http://127.0.0.1:8000/admin/');
    };

  const logout = async () => {
      try {
        setState({ token: "" });
        await cerrarSesion(); // Simula el proceso de cierre de sesión
        console.log('Sesión cerrada correctamente'); // Log al finalizar el cierre de sesión
      }  catch (error: any) {
          console.log('Error en el cierre de sesión:', error.message);
          Alert.alert("Error", error.message);
      } finally {
      console.log("Intentando ir al iniciar sesion ");
      navigation.reset({
        index: 0,
        routes: [{ name: "InicioDeSesion" }],
      });
      }
    };

  const handleSelectService = (service: string) => {
    // Seleccionar un solo servicio, desmarcando el anterior
    setSelectedService(service === selectedService ? null : service);
  };

  const handleNext = () => {
    if (!selectedService) {
      alert("Por favor selecciona un servicio.");
      return;
    }
    navigation.navigate('AgregarServicio2', { selectedServices: [selectedService] });
  };

  return (
    <View style={EstilosAgregarServicio1.container}>
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

        {renderCategory("BELLEZA", ["Depilación", "Maquillaje", "Manicura", "Peluquería", "Podología"], selectedService, handleSelectService)}
        {renderCategory("MASCOTAS", ["Paseo de perros", "Cuidado en el hogar", "Guardería"], selectedService, handleSelectService)}
        {renderCategory("JARDINERÍA", ["Corte de pasto", "Arreglo jardín", "Limpieza jardín"], selectedService, handleSelectService)}
        {renderCategory("LIMPIEZA", ["Limpieza de hogar", "Limpieza vehículo"], selectedService, handleSelectService)}
        {renderCategory("HOGAR", ["Gasista", "Electricista", "Plomero", "Carpintería", "Pintor", "Albañil", "Zinguería", "Gomería", "Electrodomésticos", "Calderista"], selectedService, handleSelectService)}
        {renderCategory("CIUDADO DE PERSONAS", ["Limpieza de hogar", "Limpieza vehículo"], selectedService, handleSelectService)}
        {renderCategory("EDUCACIÓN", ["Clases particulares", "Clases de música", "Clases de idiomas"], selectedService, handleSelectService)}
        {renderCategory("MUDANZA", ["Fletes", "Movimiento de muebles"], selectedService, handleSelectService)}
        {renderCategory("INVIERNO", ["Limpieza de nieve", "Sal en veredas"], selectedService, handleSelectService)}
        {renderCategory("CONTROL DE PLAGAS", ["Fumigación", "Control de roedores"], selectedService, handleSelectService)}

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
          onPress={() => navigation.navigate('MisServicios')}
          backgroundColor="transparent"
          textColor={Colors.naranja}
          textSize={18}
          padding={14}
          borderRadius={25}
        />
      </View>
      </ScrollView>

      <BarraNavegacionInferior />
    </View>
  );
};

// Función para renderizar categorías
const renderCategory = (
  title: string,
  options: string[],
  selectedService: string | null,
  handleSelectService: (service: string) => void
) => (
  <View key={title} style={EstilosAgregarServicio1.categoriaContenedor}>
    <Text style={EstilosAgregarServicio1.categoriaTitulo}>{title}</Text>
    <View style={EstilosAgregarServicio1.chipsContenedor}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            EstilosAgregarServicio1.chip,
            selectedService === option && EstilosAgregarServicio1.chipSeleccionado,
          ]}
          onPress={() => handleSelectService(option)}
        >
          <Text
            style={[
              EstilosAgregarServicio1.chipTexto,
              selectedService === option && EstilosAgregarServicio1.chipTextoSeleccionado,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default AgregarServicio1;