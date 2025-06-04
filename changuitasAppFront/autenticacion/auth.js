import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        token: "",
        usuario:null,
    });

    useEffect(() => {
        const loadFromAsyncStorage = async () => {
            const data = await AsyncStorage.getItem("@auth");
            const parsed = JSON.parse(data);
            if (parsed?.token) {
            setState({ token: parsed.token, usuario: parsed.usuario });
            }
        };
        loadFromAsyncStorage();
        }, []);

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

