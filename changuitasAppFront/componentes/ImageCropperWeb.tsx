import React, { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { StyleSheet, TouchableOpacity } from 'react-native';
import "react-image-crop/dist/ReactCrop.css";
import { Text } from 'react-native';
import Colors from "../assets/Colors";

interface Props {
  imageUri: string;
  setImageUri: (uri: string) => void;
  setCropperVisible: (visible: boolean) => void;
}

export const ImageCropperWeb: React.FC<Props> = ({
  imageUri,
  setImageUri,
  setCropperVisible,
}) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    width: 100,
    height: 100,
    x: 0,
    y: 30,
  });

  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [error, setError] = useState<string | null>(null); // Agregar estado de error
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    imgRef.current = img;
  }, []);

  const handleSave = () => {
    if (
      completedCrop &&
      completedCrop.width &&
      completedCrop.height &&
      imgRef.current
    ) {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.log("No se pudo obtener el contexto del canvas");
        setError("Error al obtener el contexto de la imagen.");
        return;
      }

      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setImageUri(url);
          setCropperVisible(false); // Ocultar el recortador
        } else {
          console.log("Error al procesar el recorte.");
          setError("Error al procesar el recorte.");
        }
      }, "image/jpeg");
    } else {
      console.log("No se ha seleccionado un área de recorte.");
      setError("Por favor, seleccione un área para recortar.");
    }
  };

  return (
   <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // fondo modal
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      boxSizing: "border-box",
      zIndex: 1000,
    }}
  >
      <ReactCrop
        crop={crop}
        onChange={(newCrop) => {
          setCrop(newCrop);
        }}
        onComplete={(c) => {
          setCompletedCrop(c);
        }}
        ruleOfThirds
      >
        <img
          src={imageUri}
          onLoad={(e) => onImageLoad(e.currentTarget)}
          style={{
            maxWidth: "100%",
            maxHeight: "70vh",
            display: "block",
            borderRadius: "8px",
            border: "1px solid #ddd",
            objectFit: "contain",
          }}
        />
      </ReactCrop>
      {error && <p style={{ color: "red" }}>{error}</p>}
         <div
      style={{
        marginTop: 20,
        display: "flex",
        gap: 10,
      }}
    >
      <TouchableOpacity onPress={() => setCropperVisible(false)} style={[styles.boton, styles.botonCancelar]}>
        <Text style={styles.textoBoton}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSave} style={[styles.boton, styles.botonGuardar]}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>
        </div>
    </div>
  );
};

const styles = StyleSheet.create({
  boton: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  botonGuardar: {
    backgroundColor:Colors.naranja, 
    borderWidth: 1,
    borderColor: Colors.negro, 
  },
  botonCancelar: {
    backgroundColor: Colors.naranja, 
    borderWidth: 1,
    borderColor: Colors.negro, 
  },
  textoBoton: {
    color: Colors.blancoTexto, 
    fontSize: 16,
    fontWeight: 'bold',
  },
});
