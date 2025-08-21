import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../assets/Colors';
import { Ionicons } from '@expo/vector-icons';


interface NavBarSuperiorProps {
    titulo: string;
    // Botón izquierdo (opcional)
    showBackButton?: boolean;
    onBackPress?: () => void;
    // Botón derecho
    rightButtonType?: 'menu' | 'filter' | 'none';
    onRightPress?: () => void;
    // Personalización del título
    titleSize?: number;
    titleAlign?: 'left' | 'center' | 'right';
    // Personalización de tamaños
    navbarHeight?: number;
    buttonSize?: number;
    iconSize?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;
}

export function NavBarSuperior({
    titulo,
    showBackButton = false,
    onBackPress,
    rightButtonType = 'menu',
    onRightPress,
    titleSize = 25,
    titleAlign = 'left',
    navbarHeight = 60,
    buttonSize = 40,
    iconSize = 24,
    paddingHorizontal = 16,
    paddingVertical = 12
}: NavBarSuperiorProps) {

    const renderLeftButton = () => {
        if (!showBackButton) return <View style={[styles.buttonContainer, { width: buttonSize, height: buttonSize }]} />;

        return (
            <TouchableOpacity
                style={[styles.buttonContainer, { width: buttonSize, height: buttonSize }]}
                onPress={onBackPress}
                activeOpacity={0.7}
            >
                <View style={[styles.backButton, { width: buttonSize - 4, height: buttonSize - 4, borderRadius: (buttonSize - 4) / 2 }]}>
                    <MaterialIcons
                        name="arrow-back"
                        size={iconSize}
                        color={Colors.blancoTexto}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const renderRightButton = () => {
        if (rightButtonType === 'none') {
            return <View style={[styles.buttonContainer, { width: buttonSize, height: buttonSize }]} />;
        }

        return (
            <TouchableOpacity
                style={[styles.buttonContainer, { width: buttonSize, height: buttonSize }]}
                onPress={onRightPress}
                activeOpacity={0.7}
            >
                {rightButtonType === 'menu' ? (
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={iconSize}
                        color={Colors.blancoTexto}
                    />
                ) : (
                    <MaterialIcons
                        name="tune"
                        size={iconSize}
                        color={Colors.blancoTexto}
                    />
                )}
            </TouchableOpacity>
        );
    };

    const getTitleContainerStyle = () => {
        let alignItems: 'flex-start' | 'center' | 'flex-end' = 'flex-start';

        if (titleAlign === 'center') {
            alignItems = 'center';
        } else if (titleAlign === 'right') {
            alignItems = 'flex-end';
        }

        return {
            flex: 1,
            paddingHorizontal: showBackButton ? 30 : 0,
            alignItems
        };
    };

    return (
        <View style={[styles.navbar, {
            paddingHorizontal,
            paddingVertical,
            height: navbarHeight
        }]}>
            {renderLeftButton()}

            <View style={getTitleContainerStyle()}>
                <Text style={[styles.titulo, { fontSize: titleSize }]}>{titulo}</Text>
            </View>

            {renderRightButton()}
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    titulo: {
        fontWeight: '600',
        color: Colors.blancoTexto,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: Colors.naranja,
        alignItems: 'center',
        justifyContent: 'center',
    },
});