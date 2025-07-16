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
    borderColor?: string;
    borderWidth?: number;
}

export function Button({
    titulo,
    onPress,
    backgroundColor = Colors.naranja, 
    textColor = Colors.blancoTexto,
    textSize = 16,
    padding = 15,
    borderRadius = 25,
    width,
    showIcon = false,
    iconName = 'arrow-forward',
    iconSize = 20,
    iconColor = '#FFFFFF',
    borderColor, 
    borderWidth,
}: ButtonProps) {

    const buttonStyles = [
        styles.button,
        {
            backgroundColor,
            padding,
            borderRadius,
            width,
            borderColor,
            borderWidth,
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
