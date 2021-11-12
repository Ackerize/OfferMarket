import React from 'react';
import { Dialog, Portal, Button, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const ConfirmModal = ({ visible, setVisible, title, setConfirm }) => {
	const hideDialog = () => setVisible(false);

	const onSend = () => {
		setConfirm(true);
		hideDialog();
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title style={styles.title}>{title}</Dialog.Title>
				<Dialog.Actions style={styles.buttonContainer}>
					<Button style={styles.button} onPress={hideDialog} color="red">
						<Text style={styles.cancelText}>Cancelar</Text>
					</Button>
					<Button
						style={[styles.button, styles.send]}
						onPress={onSend}
						color="#085660">
						<Text style={styles.sendText}>Aceptar</Text>
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default ConfirmModal;

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		color: '#060948',
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 10,
	},
	button: {
		marginHorizontal: 10,
		paddingHorizontal: 15,
	},
	send: {
		backgroundColor: '#A1E6B8',
	},
	sendText: {
		color: '#085660',
		fontWeight: 'bold',
	},
	cancelText: {
		color: 'red',
		fontWeight: 'bold',
	},
});
