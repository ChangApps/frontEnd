import React from 'react';
import { StyleSheet, TouchableOpacity, Text, DimensionValue, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../assets/Colors';

interface ButtonProps {
    titulo: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    textSize?: number;
    // Props para la forma del boton
    padding?: number;
    borderRadius?: number;
    width?: DimensionValue;
    // Props para el icono
    showIcon?: boolean;
    iconName?: keyof typeof MaterialIcons.glyphMap;
    iconSize?: number;
    iconColor?: string;
}

export function Button({
    titulo,
    onPress,
    backgroundColor = Colors.naranja, // Color naranja como en tus imágenes
    textColor = Colors.blancoTexto,
    textSize = 16,
    padding = 15,
    borderRadius = 25,
    width = '100%',
    showIcon = false,
    iconName = 'arrow-forward',
    iconSize = 20,
    iconColor = '#FFFFFF',
}: ButtonProps) {

    const buttonStyles = [
        styles.button,
        {
            backgroundColor,
            padding,
            borderRadius,
            width,
        }
    ];

    const textStyles = [
        styles.buttonText,
        {
            color: textColor,
            fontSize: textSize
        }
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            activeOpacity={0.8}>
            <View style={styles.buttonContent}>
                {showIcon && (
                    <MaterialIcons
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                        style={styles.icon}
                    />
                )}
                <Text style={textStyles}>{titulo}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: '600',
        textAlign: 'center',
    },
    icon: {
        marginRight: 8,
    },
});
