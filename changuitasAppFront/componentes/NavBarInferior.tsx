import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Colors from '../assets/Colors';

interface NavBarInferiorProps {
    activeScreen: string;
    onNavigate: (screen: string) => void;
}

interface NavButtonInferior {
    screen: string;
    iconName: string;
    iconLibrary?: 'Ionicons' | 'MaterialIcons' | 'FontAwesome'; 
}

const navButtonsInferior: NavButtonInferior[] = [
    { screen: 'Home', iconName: 'home-outline', iconLibrary: 'Ionicons' },
    { screen: 'Historial1', iconName: 'history', iconLibrary: 'MaterialIcons' },
    { screen: 'Add', iconName: 'add', iconLibrary:  'Ionicons' }, // Botón central
    { screen: 'Notifications', iconName: 'notifications-outline', iconLibrary: 'Ionicons' },
    { screen: 'PerfilUsuario', iconName: 'person-outline', iconLibrary: 'Ionicons' },
];

export function NavBarInferior({ activeScreen, onNavigate }: NavBarInferiorProps) {
    const renderIcon = (button: NavButtonInferior, size: number, color: string) => {
        switch (button.iconLibrary) {
            case 'MaterialIcons':
                return <MaterialIcons name={button.iconName as any} size={size} color={color} />;
            case 'FontAwesome':
                return <FontAwesome name={button.iconName as any} size={size} color={color} />;
            default:
                return <Ionicons name={button.iconName as any} size={size} color={color} />;
        }
    };

    const renderNavButtonInferior = (button: NavButtonInferior, index: number) => {
        const isActive = activeScreen === button.screen;
        const isCenter = index === 2;

        return (
            <TouchableOpacity
                key={button.screen}
                style={[styles.navButton, isCenter && styles.centerButton]}
                onPress={() => onNavigate(button.screen)}
                activeOpacity={0.7}
            >
                {renderIcon(
                    button,
                    isCenter ? 28 : 24,
                    isCenter ? Colors.blancoTexto : (isActive ? Colors.naranja : '#8E8E93')
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {navButtonsInferior.map((button, index) => renderNavButtonInferior(button, index))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.fondo, 
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#48484A',
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    centerButton: {
        backgroundColor: Colors.naranja,
        borderRadius: 25,
        width: 50,
        height: 50,
        padding: 0,
    },
});