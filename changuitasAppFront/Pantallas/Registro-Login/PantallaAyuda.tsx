import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import EstilosPantallaAyuda from './estilos/EstilosPantallaAyuda';

const PantallaAyuda = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={EstilosPantallaAyuda.contenedor}>
    <ScrollView>
      {/* Encabezado */}
      <View style={EstilosPantallaAyuda.encabezado}>
        <Text style={EstilosPantallaAyuda.textoInicio}>Ayuda</Text>
        <TouchableOpacity>
          <Text onPress={() => navigation.goBack()} style={EstilosPantallaAyuda.menuPuntos}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Datos Personales */}
      <Text style={EstilosPantallaAyuda.tituloAyuda}>MANUAL DE USUARIO</Text>
      <View style={EstilosPantallaAyuda.datosPreguntas}>
        <Text style={EstilosPantallaAyuda.tituloPregunta}>-¿Cómo buscar un servicio?</Text>
        <Text style={EstilosPantallaAyuda.infoPregunta}>Una vez iniciada la sesión, tocá la opción "Buscar" en la barra de navegación inferior. Seleccioná la categoría del servicio que necesitás y usá los filtros disponibles (como fecha y horario) para refinar la búsqueda. Luego, presioná el botón "Buscar". Si hay personas disponibles que coinciden con tu solicitud, se mostrará una lista. Al elegir a alguien, podrás ver sus detalles y contactarlo directamente por WhatsApp.</Text>
        <Text style={EstilosPantallaAyuda.tituloPregunta}>-¿Cómo ofrecer un servicio?</Text>
        <Text style={EstilosPantallaAyuda.infoPregunta}>Ingresá a tu perfil y abrí la pestaña "Mis servicios". Tocá el botón "Agregar servicio" y seleccioná la categoría que querés ofrecer. Después, escribí una breve descripción y elegí los días y horarios en los que estás disponible. Cuando termines, presioná el botón "Publicar". Tu servicio quedará visible para otros usuarios y podrá ser encontrado mediante el buscador.</Text>
      </View>
      <Text style={EstilosPantallaAyuda.tituloAyuda}>PREGUNTAS FRECUENTES</Text>
      <View style={EstilosPantallaAyuda.datosPreguntas}>
        <Text style={EstilosPantallaAyuda.tituloPregunta}>-¿Es segura la aplicación?</Text>
        <Text style={EstilosPantallaAyuda.infoPregunta}>Sí. Nos tomamos muy en serio la seguridad de nuestros usuarios. Toda la información personal y las comunicaciones están protegidas. Además, cada cuenta pasa por un proceso de verificación para garantizar un entorno confiable. También contamos con una función para bloquear usuarios en caso de comportamiento inapropiado.</Text>
        <Text style={EstilosPantallaAyuda.tituloPregunta}>-¿Puedo hablar con la otra persona antes de contratarlo?</Text>
        <Text style={EstilosPantallaAyuda.infoPregunta}>Sí. Antes de confirmar un trabajo, podés comunicarte con la otra persona directamente por WhatsApp. Desde la aplicación te facilitamos el acceso al contacto para que puedan coordinar todos los detalles de forma sencilla.</Text>
        <Text style={EstilosPantallaAyuda.tituloPregunta}>-¿Cómo funciona el sistema de pago?</Text>
        <Text style={EstilosPantallaAyuda.infoPregunta}>El pago se acuerda directamente entre el usuario que solicita el servicio y la persona que lo ofrece. La aplicación no interviene en el cobro ni retiene dinero. Recomendamos dejar en claro el monto y la forma de pago antes de comenzar el trabajo.</Text>
        <Text style={EstilosPantallaAyuda.tituloPregunta}>-¿Puedo contactarme con los desarrolladores?</Text>
        <Text style={EstilosPantallaAyuda.infoPregunta}>Sí. Si tenés dudas, sugerencias o encontrás algún problema, podés escribirnos directamente por correo electrónico a: [correo@ejemplo.com].</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PantallaAyuda;