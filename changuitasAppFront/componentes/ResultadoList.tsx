import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EstilosHistorial1 from '../Pantallas/Historial/estilos/EstilosHistorial1';

type Usuario = {
  id: number;
  first_name: string;
  last_name: string;
  fotoPerfil?: string;
  puntaje?: number | null;
};

type Solicitud = {
  id: number;
  fechaSolicitud: string | null;
  estado: 'PA' | 'I' | 'F' | 'C';
  cliente?: number;       // opcional
  proveedor_id?: number;  // opcional
};

type Props = {
  historial: Solicitud[];
  usuarios: Usuario[];
  navigation: any;
  claveUsuario: 'cliente' | 'proveedor_id'; // clave para acceder al ID
  mensajeVacio: string;
};

const formatearFecha = (fechaISO: string | null | undefined): string => {
  if (!fechaISO) {
    return 'Fecha no disponible';// Si la fecha es null o undefined, retorna un string por defecto
  }
  if (fechaISO.trim() === '') {// Aseguro que la cadena no esté vacía antes de intentar split
    return 'Fecha inválida';
  }
 
  try {
    const [fechaParte] = fechaISO.split('T'); // Obtener solo la parte de la fecha (YYYY-MM-DD)
    const [anio, mes, dia] = fechaParte.split('-');
    return `${dia}/${mes}/${anio}`;
  } catch (e) {
    console.log("Error al formatear la fecha:", fechaISO, e);
    return 'Formato de fecha inválido'; // Mensaje de error si el formato es incorrecto
  }
};

const ResultadoList = ({ historial, usuarios, navigation, claveUsuario, mensajeVacio }: Props) => {
  return (
    <FlatList
      data={historial}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const idUsuario = item[claveUsuario];
        const usuario = usuarios.find(u => u.id === idUsuario);
        const puntaje = usuario?.puntaje ? Math.round(usuario.puntaje) : 0;

        const esEstadoCritico = item.estado === 'F' || item.estado === 'C';

        const estadoLegible = {
          'PA': 'Pendiente',
          'I': 'Iniciado',
          'F': 'Finalizado',
          'C': 'Cancelado',
        }[item.estado] || item.estado;

        return (
          <View style={EstilosHistorial1.resultItem}>
            <Image
              style={EstilosHistorial1.image}
              source={{ uri: usuario?.fotoPerfil || 'https://via.placeholder.com/100' }}
            />
            <View style={EstilosHistorial1.resultDetails}>
              <View style={EstilosHistorial1.nombreConEstadoContainer}>
                <Text style={EstilosHistorial1.name}>
                  {`${usuario?.first_name || 'Nombre'} ${usuario?.last_name || ''}`}
                </Text>
                {esEstadoCritico ? (
                  <View style={EstilosHistorial1.estadoCriticoContainer}>
                    <Text style={EstilosHistorial1.estadoCriticoText}>{estadoLegible}</Text>
                  </View>
                ) : (
                  <View style={EstilosHistorial1.estadoNormalContainer}>
                    <Text style={EstilosHistorial1.estadoNormalText}>{estadoLegible}</Text>
                  </View>
                )}
              </View>

              <Text style={EstilosHistorial1.fecha}>
                Fecha: {formatearFecha(item.fechaSolicitud)}
              </Text>

              {item.estado === 'F' && (
                <View style={EstilosHistorial1.ratingStars}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={16}
                      color={i < puntaje ? "#FC6A30" : "#CCCCCC"}
                    />
                  ))}
                </View>
              )}

            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetalleTarea', {
                  id: usuario?.id?.toString() || 'No disponible',
                  idSolicitud: item.id.toString()
                });
              }}
              style={EstilosHistorial1.arrowButton}
            >
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
        );
      }}
      ListEmptyComponent={
        <View style={EstilosHistorial1.noResultsContainer}>
          <Image
            source={require('../Pantallas/Historial/estilos/service.png')}
            style={EstilosHistorial1.noResultsImage}
            resizeMode="contain"
          />
          <Text style={EstilosHistorial1.mensajeNoUsuarios}>
            {mensajeVacio}
          </Text>
        </View>
      }
    />
  );
};


export default ResultadoList;
