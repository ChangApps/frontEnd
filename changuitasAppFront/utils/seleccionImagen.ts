import { Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Manejador para la galería/cámara (mobile)
export const manejarRespuestaSelectorImagen = (
  resultado: ImagePicker.ImagePickerResult,
  setImageUri: (uri: string) => void
) => {
  if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
    setImageUri(resultado.assets[0].uri);
  } else {
    console.log("No se seleccionó ninguna imagen.");
  }
};

// Manejador para la selección de archivos en web
export const manejarCambioArchivoWeb = (
  event: Event,
  setImageUri: (uri: string) => void,
  setImageFile: (file: File | null) => void,
  setCropperVisible: (visible: boolean) => void
) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUri(imageUrl);
    setCropperVisible(true);  // Mostrar el recortador de imagen
  } else {
    console.log("No se seleccionó ningún archivo.");
  }
};

// Mostrar opciones según plataforma
export const mostrarOpcionesSelectorImagen = (
  setImageUri: (uri: string) => void,
  setImageFile: (file: File | null) => void,
  setCropperVisible: (visible: boolean) => void
) => {
  if (Platform.OS === "web") {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) =>
      manejarCambioArchivoWeb(event, setImageUri, setImageFile, setCropperVisible);
    fileInput.click();
  } else {
    Alert.alert("Seleccionar una imagen", "Elige la opción para seleccionar una imagen", [
      { text: "Cancelar", style: "cancel" },
      { text: "Tomar una foto", onPress: () => {
        abrirCamara(setImageUri);
      }},
      { text: "Elegir desde la galería", onPress: () => {
        abrirSelectorImagen(setImageUri);
      }},
    ]);
  }
};

// Abrir galería
export const abrirSelectorImagen = async (setImageUri: (uri: string) => void) => {
  const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permiso.granted) {
    alert("Has rechazado el acceso a la galería de imágenes.");
    return;
  }

  const resultado = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  manejarRespuestaSelectorImagen(resultado, setImageUri);
};

// Abrir cámara
export const abrirCamara = async (setImageUri: (uri: string) => void) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    alert("Se requieren permisos para acceder a la cámara.");
    return;
  }

  const resultado = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  manejarRespuestaSelectorImagen(resultado, setImageUri);
};
