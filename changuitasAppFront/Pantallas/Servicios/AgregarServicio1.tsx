import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper'; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import EstilosAgregarServicio1 from './estilos/EstilosAgregarServicio1';

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

  return (
    <View style={EstilosAgregarServicio1.container}>
      {/* Encabezado */}
      <View style={EstilosAgregarServicio1.headerContainer}>
        <TouchableOpacity style={EstilosAgregarServicio1.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={EstilosAgregarServicio1.headerText}>Agregar un servicio (1/2)</Text>
      </View>

      {/* Servicios */}
      <ScrollView contentContainerStyle={EstilosAgregarServicio1.scrollContainer}>
        {renderCategory("BELLEZA", ["Depilación", "Maquillaje", "Manicura", "Peluquería", "Podología"], selectedService, handleSelectService)}
        {renderCategory("JARDINERÍA", ["Corte de pasto", "Arreglo jardín", "Limpieza jardín"], selectedService, handleSelectService)}
        {renderCategory("LIMPIEZA", ["Limpieza de hogar", "Limpieza vehículo"], selectedService, handleSelectService)}
        {renderCategory("HOGAR", [
          "Gasista", "Electricista", "Plomero", "Carpintero",
          "Pintor", "Albañil", "Zinguería", "Gomería",
          "Electrodomésticos", "Calderista"
        ], selectedService, handleSelectService)}
        {renderCategory("CUIDADO DE PERSONAS", ["Niñero/a", "Cuidado de adultos mayores"], selectedService, handleSelectService)}
        {renderCategory("EDUCACIÓN", ["Clases particulares", "Clases de música", "Clases de idiomas"], selectedService, handleSelectService)}
        {renderCategory("MUDANZA", ["Fletes", "Movimiento de muebles"], selectedService, handleSelectService)}
        {renderCategory("INVIERNO", ["Limpieza de nieve", "Sal en veredas"], selectedService, handleSelectService)}
        {renderCategory("CONTROL DE PLAGAS", ["Fumigación", "Control de roedores"], selectedService, handleSelectService)}

        {/* Botones */}
        <View style={EstilosAgregarServicio1.buttonContainer}>
          <TouchableOpacity style={EstilosAgregarServicio1.nextButton} onPress={handleNext}>
            <Text style={EstilosAgregarServicio1.nextButtonText}>Siguiente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={EstilosAgregarServicio1.cancelButton} onPress={() => navigation.navigate('MisServicios')}>
            <Text style={EstilosAgregarServicio1.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <BarraNavegacionInferior/>
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
  <View key={title}>
    <Text style={EstilosAgregarServicio1.categoryTitle}>{title}</Text>
    {options.map(option => (
      <TouchableOpacity
        key={option}
        style={EstilosAgregarServicio1.optionContainer}
        onPress={() => handleSelectService(option)}
      >
        <Checkbox
          status={selectedService === option ? 'checked' : 'unchecked'}
          onPress={() => handleSelectService(option)}
        />
        <Text style={EstilosAgregarServicio1.optionText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default AgregarServicio1;