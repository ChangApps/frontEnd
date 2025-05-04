import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch,Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation,useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { Picker } from '@react-native-picker/picker';
import BarraNavegacionInferior from '../../auxiliares/BarraNavegacionInferior';

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

  return (
    <View style={estilos.contenedorPrincipal}>
      <View style={estilos.contenedorEncabezado}>
        <Text style={estilos.encabezado}>Agregar un servicio (2/2)</Text>
      </View>
      <ScrollView contentContainerStyle={estilos.contenedorDesplazable}>
        <Text style={estilos.etiqueta}>Descripción del Servicio:</Text>
        <TextInput
          style={estilos.campoDescripcion}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />

        <View style={estilos.encabezadoDias}>
          <Text style={estilos.etiquetaDia}>Día</Text>
          <Text style={estilos.etiquetaHora}>Hora</Text>
        </View>

        {Object.keys(diasSeleccionados).map((dia) => (
          <View style={estilos.filaDia} key={dia}>
            <Switch
              value={diasSeleccionados[dia as keyof typeof diasSeleccionados]}
              onValueChange={() => cambiarDia(dia)}
            />
            <Text style={estilos.textoDia}>{dia}</Text>

             {/* Picker para la hora de inicio */}
             <View style={estilos.pickerContainer}>
             <Picker
              selectedValue={horasSeleccionadas[dia as keyof typeof diasSeleccionados].inicio}
              onValueChange={(itemValue) => manejarCambioHora(dia, 'inicio', itemValue)}
              enabled={diasSeleccionados[dia as keyof typeof diasSeleccionados]}
              style={estilos.picker}
            >
              {generarOpcionesHora()}
            </Picker>
            </View>

            <Text style={estilos.textoSeparador}> a </Text>

              {/* Picker para la hora de fin */}
            <View style={estilos.pickerContainer}>
            <Picker
              selectedValue={horasSeleccionadas[dia as keyof typeof diasSeleccionados].fin}
              onValueChange={(itemValue) => manejarCambioHora(dia, 'fin', itemValue)}
              enabled={diasSeleccionados[dia as keyof typeof diasSeleccionados]}
              style={estilos.picker}
            >
              {generarOpcionesHora()}
            </Picker>
            </View>

          </View>
        ))}

        <View style={estilos.contenedorBotones}>
          <TouchableOpacity style={estilos.botonSiguiente} onPress={manejarGuardar}>
            <Text style={estilos.textoBotonSiguiente}>Publicar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botonAtras} onPress={() => navigation.navigate('AgregarServicio1')}>
            <Text style={estilos.textoBotonAtras}>Atrás</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <BarraNavegacionInferior/>
    </View>
  );
};
const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  contenedorEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#197278', // Color de fondo de la barra
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  encabezado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Color de texto blanco
  },
  contenedorDesplazable: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    marginTop: 20,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  campoDescripcion: {
    borderWidth: 1,
    borderColor: '#197278',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  encabezadoDias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  etiquetaDia: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
  },
  etiquetaHora: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '600',
  },
  filaDia: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  textoDia: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
    flex: 1,
  },
  campoHora: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    width: 60,
    textAlign: 'center',
    marginHorizontal: 5,
    padding: 5,
  },
  textoSeparador: {
    fontSize: 16,
    color: 'black',
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  botonAtras: {
    borderWidth: 1,
    borderColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  textoBotonAtras: {
    color: '#197278',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonSiguiente: {
    backgroundColor: '#197278',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  textoBotonSiguiente: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  barraNavegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconoNavegacion: {
    alignItems: 'center',
  },
  textoNavegacion: {
    fontSize: 12,
    color: 'gray',
  },
  picker: {
    height: 50,
    width: 121,
    marginVertical: 10,
  },
  pickerItem: {
    fontSize: 50, // Aumenta el tamaño de la fuente para que sea más fácil de leer
    paddingVertical: 30, // Da más espacio entre las opciones
  },
  pickerContainer: {
    borderWidth: 1, // Borde alrededor del contenedor
    borderColor: '#197278', // Color del borde
    borderRadius: 8, // Bordes redondeados
    backgroundColor: 'white', // Fondo blanco
    shadowColor: '#000', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    elevation: 4, // Elevación para Android
  },
});

export default AgregarServicio2;