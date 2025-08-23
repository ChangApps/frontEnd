import React from 'react';
import { Snackbar } from 'react-native-paper';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  message: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

const CustomSnackbar = ({ visible, setVisible, message, actionLabel, onActionPress }: Props) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      duration={Snackbar.DURATION_SHORT}
      action={
        actionLabel && onActionPress
          ? {
              label: actionLabel,
              onPress: () => {
                setVisible(false);
                onActionPress();
              },
            }
          : undefined
      }
      style={{
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        zIndex: 500000,
      }}
    >
      {message}
    </Snackbar>
  );
};

export default CustomSnackbar;