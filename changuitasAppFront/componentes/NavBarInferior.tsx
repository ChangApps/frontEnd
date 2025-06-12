import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../assets/Colors';

interface NavBarInferiorProps {
    activeScreen: string;
    onNavigate: (screen: string) => void;
}

interface NavButtonInferior {
    screen: string;
    iconName: keyof typeof Ionicons.glyphMap;
}

const navButtonsInferior: NavButtonInferior[] = [
    { screen: 'Home', iconName: 'home-outline' },
    { screen: 'Historial1', iconName: 'grid-outline'   },
    { screen: 'Add', iconName: 'add' }, // Boton del medio
    { screen: 'Notifications', iconName: 'notifications-outline' },
    { screen: 'PerfilUsuario',   iconName: 'person-outline'    },
];

export function NavBarInferior({ activeScreen, onNavigate }: NavBarInferiorProps) {
    const renderNavButtonInferior = (button: NavButtonInferior, index: number) => {
        const isActive = activeScreen === button.screen;
        const isCenter = index === 2; // Boton del medio
        
        return (
            <TouchableOpacity
                key={button.screen}
                style={[
                    styles.navButton,
                    isCenter && styles.centerButton
                ]}
                onPress={() => onNavigate(button.screen)}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={button.iconName}
                    size={isCenter ? 28 : 24}
                    color={isCenter ? Colors.blancoTexto : (isActive ? Colors.naranja : '#8E8E93')}
                />
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