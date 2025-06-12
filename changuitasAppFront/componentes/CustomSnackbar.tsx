import React from 'react';
import { Snackbar } from 'react-native-paper';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  message: string;
};

const CustomSnackbar = ({ visible, setVisible, message }: Props) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={Snackbar.DURATION_SHORT}
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        zIndex: 100000,  // Alto para asegurarse de que esté encima de otros elementos
      }}
    >
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;