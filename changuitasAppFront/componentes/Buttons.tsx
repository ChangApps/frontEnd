import React from 'react';
import { StyleSheet, TouchableOpacity, Text, DimensionValue, View } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, AntDesign, Entypo, Feather } from '@expo/vector-icons';
import Colors from '../assets/Colors';

interface ButtonProps {
    titulo: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    textSize?: number;
    // Forma del botón
    padding?: number;
    borderRadius?: number;
    width?: DimensionValue;
    borderColor?: string;
    borderWidth?: number;
    // Iconos
    showIcon?: boolean;
    iconSet?: 'MaterialIcons' | 'FontAwesome' | 'Ionicons' | 'AntDesign' | 'Entypo' | 'Feather';
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
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
    borderColor, 
    borderWidth,
    showIcon = false,
    iconSet = 'MaterialIcons',
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

    const renderIcon = () => {
        if (!showIcon || !iconName) return null;
        switch (iconSet) {
            case 'FontAwesome':
                return <FontAwesome name={iconName as keyof typeof FontAwesome.glyphMap} size={iconSize} color={iconColor} style={styles.icon} />;
            case 'Ionicons':
                return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={iconSize} color={iconColor} style={styles.icon} />;
            case 'AntDesign':
                return <AntDesign name={iconName as keyof typeof AntDesign.glyphMap} size={iconSize} color={iconColor} style={styles.icon} />;
            case 'Entypo':
                return <Entypo name={iconName as keyof typeof Entypo.glyphMap} size={iconSize} color={iconColor} style={styles.icon} />;
            case 'Feather':
                return <Feather name={iconName as keyof typeof Feather.glyphMap} size={iconSize} color={iconColor} style={styles.icon} />;
            default:
                return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={iconSize} color={iconColor} style={styles.icon} />;
        }
    };

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            activeOpacity={0.8}>
            <View style={styles.buttonContent}>
                {renderIcon()}
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
