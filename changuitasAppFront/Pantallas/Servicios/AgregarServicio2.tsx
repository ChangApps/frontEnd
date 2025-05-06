import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch,Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { Picker } from '@react-native-picker/picker';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';
import EstilosAgregarServicio2 from './estilos/EstilosAgregarServicio2';
import API_URL from '../../auxiliares/API_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgregarServicio2 = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AgregarServicio2'>>();
  const [descripcion, setDescripcion] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState({
    Lunes: false,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });
  const [horasSeleccionadas, setHorasSeleccionadas] = useState({
    Lunes: { inicio: '', fin: '' },
    Martes: { inicio: '', fin: '' },
    Miércoles: { inicio: '', fin: '' },
    Jueves: { inicio: '', fin: '' },
    Viernes: { inicio: '', fin: '' },
    Sábado: { inicio: '', fin: '' },
    Domingo: { inicio: '', fin: '' },
  });

  // Mostrar los datos pasados desde la pantalla anterior (AgregarServicio1)
  useEffect(() => {
    console.log('Componente AgregarServicio2 montado');
    if (route.params?.selectedServices) {
      console.log('Servicios seleccionados:', route.params.selectedServices);
    } else {
      console.log('No se encontraron servicios seleccionados.');
    }
  }, [route.params]);

  // Cambiar el estado de un día
  const cambiarDia = (dia: string) => {
    setDiasSeleccionados(prev => ({ ...prev, [dia as keyof typeof prev]: !prev[dia as keyof typeof prev] }));

  };

  // Cambiar la hora de inicio o fin de un día
  const manejarCambioHora = (dia: string, tipoHora: 'inicio' | 'fin', valor: string) => {
    setHorasSeleccionadas(prev => ({
      ...prev,
      [dia as keyof typeof prev]: {
        ...prev[dia as keyof typeof prev],
        [tipoHora]: valor,
      },
    }));
  };

  //"Guardo" los datos obtenidos y se los paso a AgregarServicio3
   const manejarGuardar = () => {
    // Filtra los días seleccionados
    const diasSeleccionadosFiltrados = Object.keys(diasSeleccionados)
    .filter(dia => diasSeleccionados[dia as keyof typeof diasSeleccionados]) // Filtra solo los días con valor true
    .map(dia => {
      // Extrae las horas de inicio y fin para cada día seleccionado
      const desdeHora = horasSeleccionadas[dia as keyof typeof diasSeleccionados]?.inicio || '00:00:00';
      const hastaHora = horasSeleccionadas[dia as keyof typeof diasSeleccionados]?.fin || '00:00:00';
  
      // Devuelve un objeto con la estructura que necesita el backend
      return {
        nombreServicio: route.params.selectedServices[0], // Nombre del servicio
        descripcion, // Descripción del servicio
        dia, // Día de la semana
        desdeHora, // Hora de inicio
        hastaHora, // Hora de fin
      };
    });
  
 
    console.log('Datos seleccionados:', diasSeleccionadosFiltrados);
  
    // Aquí ya no necesitas duplicar el campo 'horas'
    const datosSeleccionados = {
      nombreServicio: route.params.selectedServices[0], // Incluye el nombre del servicio
      descripcion,
      dias: diasSeleccionadosFiltrados, // Solo los días seleccionados
    };

    // Navegar a AgregarServicio3 y pasar los datos filtrados
    //navigation.navigate('AgregarServicio3', { datosSeleccionados });
    manejarGuardarServicio(datosSeleccionados);
  };
  
    // Función para generar las opciones de hora
    const generarOpcionesHora = () => {
      const opciones = [];
      for (let i = 0; i < 24; i++) { // Generar horas entre 00 y 23
        for (let j = 0; j < 60; j += 30) { // Generar minutos en intervalos de 30
          const hora = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`; // Formato: 00:00, 00:30, etc.
          opciones.push(
            <Picker.Item label={hora} value={hora} key={hora} />
          );
        }
      }
      return opciones;
    };
    const manejarGuardarServicio = async (datosSeleccionados: any) => {
      if (!datosSeleccionados) {
        Alert.alert('Error', 'No hay datos para guardar.');
        return;
      }
  
   
     // Armo la lista de datos para enviar
     const formatearHora = (hora: string) => {
      const [horaPartes, minutos] = hora.split(':');
      return `${horaPartes}:${minutos}:00`;  // Añadir los segundos
    };
    
    // Uso en el frontend para enviar los datos
    const datosServicio = datosSeleccionados.dias.map((dia: { dia: any; desdeHora: string; hastaHora: string; }) => ({
      nombreServicio: datosSeleccionados.nombreServicio,
      descripcion: datosSeleccionados.descripcion,
      dia: dia.dia,
      desdeHora: formatearHora(dia.desdeHora),
      hastaHora: formatearHora(dia.hastaHora),
    }));
   
  
  
      console.log('Datos del primer día:', datosServicio);
   
     // Extraer los datos de cada día y sus respectivas horas
    datosSeleccionados.dias.map((dia: { dia: any; desdeHora: any; hastaHora: any; }) => {
      console.log('Nombre del Servicio:', datosSeleccionados.nombreServicio);
      console.log('Descripción:', datosSeleccionados.descripcion);
      console.log('Día:', dia.dia);           // El nombre del día
      console.log('Hora de Inicio:', dia.desdeHora); // Hora de inicio
      console.log('Hora de Fin:', dia.hastaHora);   // Hora de fin
      console.log('---'); // Separador para cada día
    });
  
      try {
        // Verifica que los datos estén bien formateados
        console.log('Preparando el POST...');
        console.log("Datos que se enviarán al backend:", JSON.stringify(datosServicio, null, 2));
  
        const response = await fetch(`${API_URL}/servicios/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(datosServicio),
        });
  
        console.log('Respuesta de la API:', response);
        
        const data = await response.json();
  
        if (!response.ok) {
          console.log('Respuesta no OK:', response.status, response.statusText);
          console.error("Detalles del error:", data);  // Muestra los detalles
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        
        console.log('Datos recibidos de la API:', data);
  
        Alert.alert('Éxito', 'Servicio creado exitosamente');
  
        const userId = await AsyncStorage.getItem('userId');
  
        const servicio = data[0].id;
      
      const fechaDesde = new Date().toISOString().split('T')[0];
      //obtiene la fecha actual en el formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ), y luego extrae solo la parte de la fecha (YYYY-MM-DD).
      const cuerpo = {
        servicio:servicio, // ID del servicio
        proveedor: userId, // ID del proveedor
        fechaDesde: fechaDesde, 
        fechaHasta: null //por ahora null
      };
  
  
      console.log('Datos que se enviarán:', JSON.stringify(cuerpo));
      // Se realiza la solicitud al backend para la vinculacion
      const respuesta = await fetch(`${API_URL}/proveedores-servicios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(cuerpo) 
      });
  
      // Manejo de la respuesta
      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Vinculación exitosa:', datos);
      } else {
        console.error('Error al vincular el servicio:', respuesta.status, respuesta.statusText);
      }
  
  
  
        navigation.navigate('MisServicios');  // Navegar a MisServicios
      } catch (error: any) {
        console.error('Error al guardar el servicio:', error);
        const errorMessage = error.message || 'Error desconocido';
        Alert.alert('Error', `No se pudo crear el servicio: ${errorMessage}`);
      }
    }

  return (
    <View style={EstilosAgregarServicio2.contenedorPrincipal}>
      <View style={EstilosAgregarServicio2.contenedorEncabezado}>
        <Text style={EstilosAgregarServicio2.encabezado}>Agregar un servicio (2/2)</Text>
      </View>
      <ScrollView contentContainerStyle={EstilosAgregarServicio2.contenedorDesplazable}>
        <Text style={EstilosAgregarServicio2.etiqueta}>Descripción del Servicio:</Text>
        <TextInput
          style={EstilosAgregarServicio2.campoDescripcion}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />

        <View style={EstilosAgregarServicio2.encabezadoDias}>
          <Text style={EstilosAgregarServicio2.etiquetaDia}>Día</Text>
          <Text style={EstilosAgregarServicio2.etiquetaHora}>Hora</Text>
        </View>

        {Object.keys(diasSeleccionados).map((dia) => (
          <View style={EstilosAgregarServicio2.filaDia} key={dia}>
            <Switch
              value={diasSeleccionados[dia as keyof typeof diasSeleccionados]}
              onValueChange={() => cambiarDia(dia)}
            />
            <Text style={EstilosAgregarServicio2.textoDia}>{dia}</Text>

             {/* Picker para la hora de inicio */}
             <View style={EstilosAgregarServicio2.pickerContainer}>
             <Picker
              selectedValue={horasSeleccionadas[dia as keyof typeof diasSeleccionados].inicio}
              onValueChange={(itemValue) => manejarCambioHora(dia, 'inicio', itemValue)}
              enabled={diasSeleccionados[dia as keyof typeof diasSeleccionados]}
              style={EstilosAgregarServicio2.picker}
            >
              {generarOpcionesHora()}
            </Picker>
            </View>

            <Text style={EstilosAgregarServicio2.textoSeparador}> a </Text>

              {/* Picker para la hora de fin */}
            <View style={EstilosAgregarServicio2.pickerContainer}>
            <Picker
              selectedValue={horasSeleccionadas[dia as keyof typeof diasSeleccionados].fin}
              onValueChange={(itemValue) => manejarCambioHora(dia, 'fin', itemValue)}
              enabled={diasSeleccionados[dia as keyof typeof diasSeleccionados]}
              style={EstilosAgregarServicio2.picker}
            >
              {generarOpcionesHora()}
            </Picker>
            </View>

          </View>
        ))}

        <View style={EstilosAgregarServicio2.contenedorBotones}>
          <TouchableOpacity style={EstilosAgregarServicio2.botonSiguiente} onPress={manejarGuardar}>
            <Text style={EstilosAgregarServicio2.textoBotonSiguiente}>Publicar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={EstilosAgregarServicio2.botonAtras} onPress={() => navigation.navigate('AgregarServicio1')}>
            <Text style={EstilosAgregarServicio2.textoBotonAtras}>Atrás</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <BarraNavegacionInferior/>
    </View>
  );
};

export default AgregarServicio2;