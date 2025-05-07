import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Checkbox } from 'react-native-paper';  // Importar Checkbox de react-native-paper
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import  EstilosBuscarServicio1 from '../Buscar/estilos/EstilosBuscarServicio1';
const BuscarServicio1 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedService, setSelectedService] = useState<string | null>(null);


  const handleSelectService = (service: string) => {
    // Seleccionar un solo servicio, desmarcando el anterior
    setSelectedService(service === selectedService ? null : service);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Limpiar la selección al ganar el foco
      setSelectedService(null);
    }, [])
  );

  const handleNext = () => {
    if (!selectedService) {
      alert("Por favor selecciona un servicio.");
      return;
    }
    navigation.navigate('BuscarServicio2', { selectedService: [selectedService] });
  };

  return (
    <View style={EstilosBuscarServicio1.container}>
      <View style={EstilosBuscarServicio1.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={EstilosBuscarServicio1.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={EstilosBuscarServicio1.header}>Buscar un servicio (1/3)</Text>
      </View>
      
      <ScrollView contentContainerStyle={EstilosBuscarServicio1.scrollContainer}>
        {/* Sección de servicios */}
         {/* Sección de servicios */}
         {renderCategory("BELLEZA", ["Depilacion", "Maquillaje", "Manicura", "Peluqueria", "Podologia"], selectedService, handleSelectService)}
        {renderCategory("JARDINERÍA", ["Jardinero","Corte de pasto", "Arreglo jardín", "Limpieza jardín"], selectedService, handleSelectService)}
        {renderCategory("LIMPIEZA", ["Limpieza de hogar", "Limpieza vehículo"], selectedService, handleSelectService)}
        {renderCategory("HOGAR", [
          "Gasista", "Electricista", "Plomero", "Carpintero", 
          "Pintor", "Albañil", "Ziguería", "Gomería", 
          "Electrodomésticos", "Calderista"
        ], selectedService, handleSelectService)}
        {renderCategory("CUIDADO DE PERSONAS", ["Niñero/a", "Cuidado de adultos mayores"], selectedService, handleSelectService)}
        {renderCategory("EDUCACIÓN", ["Clases particulares", "Clases de música", "Clases de idiomas"], selectedService, handleSelectService)}
        {renderCategory("MUDANZA", ["Fletes", "Movimiento de muebles"], selectedService, handleSelectService)}
        {renderCategory("INVIERNO", ["Limpieza de nieve", "Sal en veredas"], selectedService, handleSelectService)}
        {renderCategory("CONTROL DE PLAGAS", ["Fumigación", "Control de roedores"], selectedService, handleSelectService)}

        {/* Botones de acción */}
        <View style={EstilosBuscarServicio1.buttonContainer}>
          <TouchableOpacity style={EstilosBuscarServicio1.nextButton} onPress={handleNext}>
            <Text style={EstilosBuscarServicio1.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <BarraNavegacionInferior/>
    </View>
  );
};


const renderCategory = (
    title: any,
    options: any,
    selectedService: any,
    handleSelectService: any
  ) => (
    <View key={title}>
      <Text style={EstilosBuscarServicio1.categoryTitle}>{title}</Text>
      {options.map((option: any) => (
       <TouchableOpacity
        style={EstilosBuscarServicio1.optionContainer}
        key={option}
        onPress={() => handleSelectService(option)}
        activeOpacity={0.7}
      >
        <Checkbox
          status={selectedService === option ? 'checked' : 'unchecked'}
        />
        <Text style={EstilosBuscarServicio1.optionText}>{option}</Text>
     </TouchableOpacity>
      ))}
    </View>
  );
export default BuscarServicio1;
