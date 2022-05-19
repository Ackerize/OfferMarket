import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import {
	Paragraph,
	Dialog,
	Portal,
	TextInput,
	Button,
	Text,
} from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import Popup from './Popup';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_HOST } from '../../utils/constants';

const ModalRating = ({ visible, setVisible, seller }) => {
	const hideDialog = () => setVisible(false);

	const { uid } = useSelector(state => state.auth);

	const [review, setReview] = useState({
		rating: 0,
		comment: '',
		seller,
		author: uid,
	});

	const [loading, setLoading] = useState(false);

	const onSend = () => {
		if (!loading) {
			setLoading(true);
			axios
				.post(`${API_HOST}/reviews`, review)
				.then(({ data }) => {
					const { error, message } = data;
					if (error) {
						Popup.show({
							type: 'Danger',
							title: '¡Oh no!',
							textBody: message,
							buttontext: 'Aceptar',
							callback: () => Popup.hide(),
						});
					} else {
						Popup.show({
							type: 'Success',
							title: '¡Calificación enviada!',
							textBody: message,
							buttontext: 'Aceptar',
							callback: () => Popup.hide(),
						});
					}
				})
				.catch(({ response: { data } }) => {
					const { error, message, errorMessage } = data;
					if (error) {
						Popup.show({
							type: 'Danger',
							title: '¡Oh no!',
							textBody: message,
							buttontext: 'Aceptar',
							callback: () => Popup.hide(),
						});
						console.log({ errorMessage });
					}
				});
			hideDialog();
		}
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={hideDialog}>
				<Dialog.Title style={styles.title}>
					Califica tu experiencia
				</Dialog.Title>
				<Dialog.Content>
					<AirbnbRating
						showRating={false}
						defaultRating={0}
						onFinishRating={rating => setReview({ ...review, rating })}
						starContainerStyle={styles.ratingContainer}
					/>
					<Paragraph style={styles.subtitle}>Comentario (opcional): </Paragraph>
					<TextInput
						mode="outlined"
						multiline
						numberOfLines={4}
						onChangeText={comment => setReview({ ...review, comment })}
						theme={{
							colors: { primary: '#003C95', underlineColor: 'transparent' },
						}}
					/>
				</Dialog.Content>
				<Dialog.Actions style={styles.buttonContainer}>
					<Button style={styles.button} onPress={hideDialog} color="red" disabled={loading}>
						<Text style={styles.cancelText}>Cancelar</Text>
					</Button>
					<Button
						style={[styles.button, styles.send]}
						onPress={onSend}
						loading={loading}
						color="#085660">
						<Text style={styles.sendText}>Enviar</Text>
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default ModalRating;

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		color: '#060948',
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 17,
		color: '#060948',
		marginBottom: 5,
		marginTop: 10,
	},
	ratingContainer: {
		marginBottom: 15,
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
