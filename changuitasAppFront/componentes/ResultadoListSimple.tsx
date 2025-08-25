import React, { useState } from 'react';
import {View,Text,FlatList, Image, TouchableOpacity, ImageStyle,TextStyle,ViewStyle} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ModalSeleccionarServicio from './ModalSeleccionarServicio';


type Usuario = {
  id: number;
  first_name: string;
  last_name: string;
  fotoPerfil?: string;
};

type Solicitud = {
  id: number;
  cliente?: number;
  proveedor_id?: number;
  servicio_id?: number;
  nombreServicio?: string;
  fechaSolicitud?: string;
};

type Props = {
  historial: Solicitud[];          
  usuarios: Usuario[];                
  navigation: any;                  
  claveUsuario: 'cliente' | 'proveedor_id'; 
  estiloCard?: ViewStyle;
  estiloAvatar?: ImageStyle;
  estiloNombre?: TextStyle;
  estiloOficio?: TextStyle;
  onPerfilPress?: () => void;          
};

const ResultadoListSimple = ({
  historial,
  usuarios,
  navigation,
  claveUsuario,
  estiloCard,
  estiloAvatar,
  estiloNombre,
  onPerfilPress,
}: Props) => {
  const [modalServiciosVisible, setModalServiciosVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [serviciosModal, setServiciosModal] = useState<{ id: number; nombre?: string }[]>([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<any>(null);

  // función cuando el usuario selecciona un servicio en el modal
  const handleServicioSeleccionado = (servicio: any) => {
    console.log('Servicio seleccionado:', servicio);
    setModalServiciosVisible(false); // Cierra el modal
    navigation.navigate('PerfilProveedor', {
      id: proveedorSeleccionado.id,
      servicio: servicio.id,
    });
  };

  // agrupa el historial por usuario (cliente o proveedor) y lista los servicios únicos asociados
  const historialAgrupado = Object.values(
    historial.reduce((acc, item) => {
      const idUsuario = item[claveUsuario];
      const servicioId = item.servicio_id;
      const servicioNombre = item.nombreServicio;

      if (typeof idUsuario !== 'number' || typeof servicioId !== 'number') return acc;

      if (!acc[idUsuario]) {
        acc[idUsuario] = {
          ...item,
          servicios: [{ id: servicioId, nombre: servicioNombre }],
        };
      } else if (!acc[idUsuario].servicios.some((s) => s.id === servicioId)) {
        acc[idUsuario].servicios.push({ id: servicioId, nombre: servicioNombre });
      }

      return acc;
    }, {} as Record<number, Solicitud & { servicios: { id: number; nombre?: string }[] }>)
  );

  // ordena el historial agrupado por fecha de forma descendente (más reciente primero)
  const historialAgrupadoOrdenado = historialAgrupado.sort((a, b) => {
    if (!a.fechaSolicitud) return 1;
    if (!b.fechaSolicitud) return -1;
    return new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime();
  });

  return (
    <>
      <FlatList
        data={historialAgrupadoOrdenado} // lista ordenada por fecha
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const idUsuario = item[claveUsuario];
          const usuario = usuarios.find((u) => u.id === idUsuario);

          if (!usuario) return null; // si no se encuentra el usuario, no renderiza nada

          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  if (item.servicios.length > 1) {
                    // si tiene más de un servicio, muestra el modal para elegir
                    setServiciosModal(item.servicios);
                    setUsuarioSeleccionado(usuario);
                    setProveedorSeleccionado(usuario);
                    setModalServiciosVisible(true);
                  } else {
                    // si tiene solo un servicio, navega directo al perfil
                    if (onPerfilPress) onPerfilPress();
                    navigation.navigate("PerfilProveedor", {
                      id: usuario.id.toString(),
                      servicio: item.servicios[0].id,
                    });
                  }
                }}
                style={{ paddingLeft: 10 }}
              >
                <View style={estiloCard}>
                  <Image
                    style={estiloAvatar}
                    source={{
                      uri:
                        usuario.fotoPerfil || "https://via.placeholder.com/40",
                    }}
                  />

                  <Text
                    style={
                      estiloNombre || {
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 14,
                        textAlign: "center",
                        marginBottom: 4,
                      }
                    }
                  >
                    {`${usuario.first_name}\n${usuario.last_name}`}
                  </Text>

                  <Ionicons name="chevron-forward" size={20} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={<View style={{ width: 20 }} />}
      />

      {/* modal para seleccionar uno de los múltiples servicios del proveedor */}
      <ModalSeleccionarServicio
        visible={modalServiciosVisible}
        onClose={() => setModalServiciosVisible(false)}
        servicios={serviciosModal.map(s => ({
          id: s.id,
          nombreServicio: s.nombre || 'Sin nombre',
        }))}
        onSeleccionar={handleServicioSeleccionado}
      />
    </>
  );
};

export default ResultadoListSimple;