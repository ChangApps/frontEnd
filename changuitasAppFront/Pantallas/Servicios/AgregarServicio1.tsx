import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import EstilosAgregarServicio1 from './estilos/EstilosAgregarServicio1';
import { Button } from '../../componentes/Buttons';
import Colors from '../../assets/Colors';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import { NavBarInferior } from '../../componentes/NavBarInferior';
import { SafeAreaView } from 'react-native-safe-area-context';

const AgregarServicio1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedService, setSelectedService] = useState<string | null>(null);

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

        {renderCategory("BELLEZA", ["Depilación", "Maquillaje", "Manicura", "Peluquería", "Podología"], selectedService, handleSelectService)}
        {renderCategory("MASCOTAS", ["Paseo de perros", "Cuidado en el hogar", "Guardería"], selectedService, handleSelectService)}
        {renderCategory("JARDINERÍA", ["Corte de pasto", "Arreglo jardín", "Limpieza jardín"], selectedService, handleSelectService)}
        {renderCategory("LIMPIEZA", ["Limpieza de hogar", "Limpieza vehículo"], selectedService, handleSelectService)}
        {renderCategory("HOGAR", ["Gasista", "Electricista", "Plomero", "Carpintería", "Pintor", "Albañil", "Zinguería", "Gomería", "Electrodomésticos", "Calderista"], selectedService, handleSelectService)}
        {renderCategory("CUIDADO DE PERSONAS", ["Niñera/o", "Cuidado de adultos mayores"], selectedService, handleSelectService)}
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

      <NavBarInferior
        activeScreen="AgregarServicio1" // O el screen activo correspondiente
        onNavigate={handleNavigation}
      />
    </SafeAreaView>
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