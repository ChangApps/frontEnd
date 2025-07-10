import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { Picker } from '@react-native-picker/picker';
import EstilosAgregarServicio2 from './estilos/EstilosAgregarServicio2';
import API_URL from '../../utils/API_URL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CampoDescripcion from '../../componentes/inputs/CampoDescripcion';
import { Button } from '../../componentes/Buttons';
import Colors from '../../assets/Colors';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import { NavBarInferior } from '../../componentes/NavBarInferior';

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

    // Formatea las horas para agregar ":00" al final
    const formatearHora = (hora: string) => {
      const [horaPartes, minutos] = hora.split(':');
      return `${horaPartes}:${minutos}:00`;
    };

    // Formatea la lista de días seleccionados
    const dias = datosSeleccionados.dias.map((dia: any) => ({
      dia: dia.dia,
      desdeHora: formatearHora(dia.desdeHora),
      hastaHora: formatearHora(dia.hastaHora),
    }));

    const userId = await AsyncStorage.getItem('userId');

    // Este es el objeto correcto que espera el backend
    const cuerpo = {
      nombreServicio: datosSeleccionados.nombreServicio,
      descripcion: datosSeleccionados.descripcion,
      dias: dias
    };

    console.log('Cuerpo que se enviará al backend:', JSON.stringify(cuerpo));

    try {
      const response = await fetch(`${API_URL}/servicios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(cuerpo),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Detalles del error:", data);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      Alert.alert('Éxito', 'Servicio creado exitosamente');

      // Proceso de vinculación como ya tenés:
      const servicio = data.id || data[0]?.id;

      const fechaDesde = new Date().toISOString().split('T')[0];
      const vinculo = {
        servicio,
        proveedor: userId,
        fechaDesde,
        fechaHasta: null
      };

      const respuesta = await fetch(`${API_URL}/proveedores-servicios/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(vinculo)
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Vinculación exitosa:', datos);
      } else {
        console.error('Error al vincular el servicio:', respuesta.status, respuesta.statusText);
      }

      navigation.navigate('MisServicios');
    } catch (error: any) {
      console.error('Error al guardar el servicio:', error);
      const errorMessage = error.message || 'Error desconocido';
      Alert.alert('Error', `No se pudo crear el servicio: ${errorMessage}`);
    }
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
    <View style={EstilosAgregarServicio2.container}>
      {/* NavBar Superior */}
      <NavBarSuperior
        titulo="Agregar un servicio"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightButtonType="none"
      />
      <ScrollView contentContainerStyle={EstilosAgregarServicio2.contenedorDesplazable}>
        <View style={EstilosAgregarServicio2.pasosWrapper}>
          <View style={EstilosAgregarServicio2.pasoInactivo}>
            <Text style={EstilosAgregarServicio2.pasoTextoInactivo}>1. Seleccionar categoría</Text>
          </View>
          <View style={EstilosAgregarServicio2.pasoActivo}>
            <Text style={EstilosAgregarServicio2.pasoTextoActivo}>2. Agregar detalles</Text>
          </View>
        </View>
        <Text style={EstilosAgregarServicio2.etiqueta}>Descripción del Servicio:</Text>
        <CampoDescripcion
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción"
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
          <Button
            titulo="Publicar"
            onPress={manejarGuardar}
            textSize={18}
            textColor={Colors.fondo}
            padding={14}
            borderRadius={25}
          />
          <Button
            titulo="Atrás"
            onPress={() => navigation.navigate('AgregarServicio1')}
            backgroundColor="transparent"
            textColor={Colors.naranja}
            textSize={18}
            padding={14}
            borderRadius={25}
          />
        </View>
      </ScrollView>

      {/* Barra de navegación inferior */}
      <NavBarInferior
        activeScreen="AgregarServicio2" // O el screen activo correspondiente
        onNavigate={handleNavigation}
      />
    </View>
  );
};

export default AgregarServicio2;