import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RootStackParamList } from '../../navegacion/AppNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import EstilosPantallaAyuda from './estilos/EstilosPantallaAyuda';
import { useWindowDimensions } from 'react-native';
import { NavBarSuperior } from '../../componentes/NavBarSuperior';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../assets/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const PantallaAyuda = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={EstilosPantallaAyuda.safeContainer}>
      <LinearGradient colors={[Colors.degradeTop, Colors.degradeBottom]} style={EstilosPantallaAyuda.degradado}>
        <ScrollView>
          <View style={[EstilosPantallaAyuda.contenidoResponsivo, width > 600 && EstilosPantallaAyuda.contenidoWeb]}>
            {/* NavBar Superior */}
            <NavBarSuperior
              titulo="Ayuda"
              showBackButton={true}
              onBackPress={() => navigation.goBack()}
              rightButtonType="none"
            />

            {/* Datos Personales */}

            <Text style={EstilosPantallaAyuda.tituloAyuda}>MANUAL DE USUARIO</Text>
            <View style={EstilosPantallaAyuda.datosPreguntas}>
              <Text style={EstilosPantallaAyuda.tituloPregunta}>- ¿Cómo buscar un servicio o proveedor?</Text>
              <Text style={EstilosPantallaAyuda.infoPregunta}>
                Desde la pantalla principal de la aplicación, tenés varias formas de buscar lo que necesitás:
              </Text>

              <Text style={EstilosPantallaAyuda.infoPregunta}>1. Usando la barra de búsqueda:</Text>
              <Text style={EstilosPantallaAyuda.infoSubparrafo}>
                Podés escribir el nombre de una categoría, subcategoría o directamente el nombre de un proveedor.
              </Text>
              <Text style={EstilosPantallaAyuda.infoSubparrafo}>
                - Si ingresás el nombre de una persona, se abrirá su perfil para que puedas verlo y contratarla directamente.
              </Text>
              <Text style={EstilosPantallaAyuda.infoSubparrafo}>
                - Si ingresás una categoría o subcategoría, se te redirigirá a la pantalla de resultados con los perfiles disponibles.
              </Text>

              <Text style={EstilosPantallaAyuda.infoPregunta}>2. Tocando una categoría:</Text>
              <Text style={EstilosPantallaAyuda.infoSubparrafo}>
                Al tocar una de las categorías que aparecen en la pantalla (como Belleza, Mascotas, etc.), se desplegará un modal para aplicar filtros.
              </Text>
              <Text style={EstilosPantallaAyuda.infoSubparrafo}>
                Después de seleccionar los filtros (como subcategoría y franja horaria), se te redirigirá a los resultados.
              </Text>

              <Text style={EstilosPantallaAyuda.infoPregunta}>3. Desde "Últimas personas contratadas":</Text>
              <Text style={EstilosPantallaAyuda.infoSubparrafo}>
                Si ya contrataste a alguien, su perfil aparecerá en esta sección. Tocás el nombre y listo: podés volver a contratarlo/a fácilmente.
              </Text>

              <Text style={EstilosPantallaAyuda.tituloPregunta}>- ¿Cómo ofrecer un servicio?</Text>
              <Text style={EstilosPantallaAyuda.infoPregunta}>
                Ingresá a tu perfil y abrí la pestaña "Mis servicios". Tocá el botón "Agregar servicio" y seleccioná la categoría que querés ofrecer.
                Luego, escribí una breve descripción y elegí los días y horarios en los que estás disponible. Cuando termines, presioná el botón
                "Publicar". Tu servicio quedará visible para otros usuarios y podrá ser encontrado mediante el buscador.
              </Text>
            </View>

            <Text style={EstilosPantallaAyuda.tituloAyuda}>PREGUNTAS FRECUENTES</Text>
            <View style={EstilosPantallaAyuda.datosPreguntas}>
              <Text style={EstilosPantallaAyuda.tituloPregunta}>- ¿Es segura la aplicación?</Text>
              <Text style={EstilosPantallaAyuda.infoPregunta}>
                Sí. Nos tomamos muy en serio la seguridad de nuestros usuarios. Cada cuenta pasa por un proceso de verificación
                para garantizar un entorno confiable. También contamos con una función para bloquear usuarios en caso de comportamiento inapropiado.
              </Text>

              <Text style={EstilosPantallaAyuda.tituloPregunta}>- ¿Puedo hablar con la otra persona antes de contratarla?</Text>
              <Text style={EstilosPantallaAyuda.infoPregunta}>
                Sí. Antes de confirmar un trabajo, podés comunicarte con la otra persona directamente por WhatsApp. Desde la aplicación te facilitamos
                el acceso al contacto para que puedan coordinar todos los detalles de forma sencilla.
              </Text>

              <Text style={EstilosPantallaAyuda.tituloPregunta}>- ¿Cómo funciona el sistema de pago?</Text>
              <Text style={EstilosPantallaAyuda.infoPregunta}>
                El pago se acuerda directamente entre la persona que solicita el servicio y quien lo ofrece. La aplicación no interviene en el cobro
                ni retiene dinero. Recomendamos dejar en claro el monto y la forma de pago antes de comenzar el trabajo.
              </Text>

              <Text style={EstilosPantallaAyuda.tituloPregunta}>- ¿Puedo contactarme con los desarrolladores?</Text>
              <Text style={EstilosPantallaAyuda.infoPregunta}>
                Sí. Si tenés dudas, sugerencias o encontrás algún problema, podés escribirnos directamente por correo electrónico a:
                changuitasapp@gmail.com
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PantallaAyuda;