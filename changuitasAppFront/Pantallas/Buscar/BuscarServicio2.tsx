import React, { useState } from 'react';
import { View, Text,TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from "../../auxiliares/API_URL"; 
import { Picker } from '@react-native-picker/picker';
import { Snackbar } from 'react-native-paper';
import EstilosBuscarServicio2 from './estilos/EstilosBuscarServicio2';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';

const BuscarServicio2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BuscarServicio2'>>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [visible, setVisible] = useState(false);  // Estado para manejar la visibilidad del Snackbar
  const [message, setMessage] = useState('');  // Estado para almacenar el mensaje de error

  type DiaSemana = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

  const [days, setDays] = useState<Record<DiaSemana, boolean>>({
    Lunes: false,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });
  
  const [hours, setHours] = useState<Record<DiaSemana, { start: string; end: string }>>({
    Lunes: { start: '', end: '' },
    Martes: { start: '', end: '' },
    Miércoles: { start: '', end: '' },
    Jueves: { start: '', end: '' },
    Viernes: { start: '', end: '' },
    Sábado: { start: '', end: '' },
    Domingo: { start: '', end: '' },
  });



  const buscarProveedores = async (nombreServicio: string, diasSeleccionados: string[]) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');
      
      if (!accessToken) {
        throw new Error('No se encontró el token de acceso. Por favor, inicia sesión.');
      }
  
      const response = await axios.get(`${API_URL}/buscar-proveedores/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        params: { 
          nombre_servicio: nombreServicio,
          dias: diasSeleccionados.join(','), // Convertimos el arreglo a una cadena separada por comas
          //Faltaria pasar el horario
        },
      });
  
      const todosLosProveedores = response.data.proveedores || [];
      if (!userId) {
        throw new Error('No se encontró el ID del usuario.');
      }
      
      const proveedoresFiltrados = todosLosProveedores.filter(
        (proveedor: any) => proveedor.id !== parseInt(userId)
      );
  
      if (proveedoresFiltrados.length > 0) {
        setProviders(proveedoresFiltrados);
        const idServicio = todosLosProveedores[0].idServicio;
        await AsyncStorage.setItem('idServicio', idServicio.toString()); 
        console.log('ID del servicio guardado en AsyncStorage:', idServicio);
        console.log('Proveedores: ',proveedoresFiltrados);
        navigation.navigate("Home");
          navigation.navigate('ResultadosBusqueda', { proveedores: proveedoresFiltrados });
      } else {
         
        navigation.navigate('ResultadosBusqueda', { proveedores: [], error: 'No se encontraron proveedores para el servicio solicitado (excluyendo tu cuenta).' });
      }
    } catch (error: any) {
        const mensajeError = error?.response?.data?.message;

        navigation.navigate('ResultadosBusqueda', { 
          proveedores: [], 
          error: mensajeError || null  // Solo enviamos error si realmente existe
        });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const params = route.params;
    
    if (!params || !params.selectedService) {
      setMessage('No se seleccionó ningún servicio.');
      setVisible(true);
      return;
    }
  
    // Verificar si al menos un día está seleccionado
    const diasSeleccionados = Object.keys(days).filter((day) => days[day as DiaSemana]);
    if (diasSeleccionados.length === 0) {
      setMessage('Debe seleccionar al menos un día.');
      setVisible(true);
      return;
    }
  
    console.log('Días seleccionados:', diasSeleccionados);  // Verifica los días seleccionados
    
    console.log('BuscarServicio2: servicio seleccionado:', params.selectedService);  
    // Mostrar las horas seleccionadas para cada día
    diasSeleccionados.forEach((day) => {
        const dia = day as DiaSemana;
        console.log(`${dia}: Desde ${hours[dia].start} hasta ${hours[dia].end}`);
      });

    buscarProveedores(params.selectedService[0], diasSeleccionados);  // Enviar días seleccionados junto al servicio
  };
    

  const toggleDay = (day: DiaSemana) => {
    setDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTimeChange = (
    day: DiaSemana,
    timeType: 'start' | 'end',
    value: string
  ) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [timeType]: value },
    }));
  };
   // Función para generar las opciones de hora
   const generateHourOptions = () => {
    const opciones = [];
    for (let i = 0; i < 24; i++) { // Generar horas entre 00 y 23
      for (let j = 0; j < 60; j += 30) { // Generar minutos en intervalos de 30
        const horaConSegundos = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}:00`; // Formato con segundos
        const horaSinSegundos = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`; // Solo horas y minutos
  
        opciones.push(
          <Picker.Item label={horaSinSegundos} value={horaConSegundos} key={horaConSegundos} />
        );
      }
    }
    return opciones;
  };
  
  return (
    <View style={EstilosBuscarServicio2.container}>
      <Text style={EstilosBuscarServicio2.header}>Buscar un servicio (2/2)</Text>
      <ScrollView contentContainerStyle={EstilosBuscarServicio2.scrollContainer}>
        <Text style={EstilosBuscarServicio2.label}>Descripción del Servicio:</Text>

        <View style={EstilosBuscarServicio2.dayContainer}>
          <Text style={EstilosBuscarServicio2.dayLabel}>Día</Text>
          <Text style={EstilosBuscarServicio2.hourLabel}>Hora</Text>
          {Object.keys(days).map((day) => {
  const dia = day as DiaSemana;
  return (
            <View style={EstilosBuscarServicio2.dayRow} key={dia}>
            <Switch
                value={days[dia]}
                onValueChange={() => toggleDay(dia)}
            />
            <Text style={EstilosBuscarServicio2.dayText}>{dia}</Text>

            {/* Picker para la hora de inicio */}
            <View style={EstilosBuscarServicio2.pickerContainer}>
                <Picker
                selectedValue={hours[dia].start}
                onValueChange={(itemValue: string) => handleTimeChange(dia, 'start', itemValue)}
                enabled={days[dia]}
                style={EstilosBuscarServicio2.picker}
                >
                {generateHourOptions()}
                </Picker>
            </View>
            <Text style={EstilosBuscarServicio2.toText}> a </Text>

            {/* Picker para la hora de fin */}
            <View style={EstilosBuscarServicio2.pickerContainer}>
                <Picker
                selectedValue={hours[dia].end}
                onValueChange={(itemValue:string) => handleTimeChange(dia, 'end', itemValue)}
                enabled={days[dia]}
                style={EstilosBuscarServicio2.picker}
                >
                {generateHourOptions()}
                </Picker>
            </View>
            </View>
        );
        })}
        </View>

        <View style={EstilosBuscarServicio2.buttonContainer}>
          <TouchableOpacity style={EstilosBuscarServicio2.nextButton} onPress={handleNext}>
            <Text style={EstilosBuscarServicio2.nextButtonText}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={EstilosBuscarServicio2.prevButton} onPress={() => navigation.navigate('BuscarServicio1')}>
            <Text style={EstilosBuscarServicio2.prevButtonText}>Atrás</Text>
          </TouchableOpacity>
        </View>
       
          {errorMessage ? (
          <View style={EstilosBuscarServicio2.errorContainer}>
            <Text style={EstilosBuscarServicio2.errorText}>{errorMessage}</Text>
          </View>
        ) : null}
              
        </ScrollView>

        {/* Barra de navegación inferior */}
       <BarraNavegacionInferior/>
      
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}  // Ocultar el Snackbar cuando se cierre
        duration={Snackbar.DURATION_SHORT}    // Podemos intercalar entre  DURATION_LONG o DURATION_SHORT
        style={{
          position: 'absolute',
          top: -150,
          left: 0,
          right: 0,
          zIndex: 100000,  // Alto para asegurarse de que esté encima de otros elementos
        }}
      >
        {message}
      </Snackbar>

    </View>
  );
};

export default BuscarServicio2;