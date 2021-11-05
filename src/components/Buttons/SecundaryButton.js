import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const SecundaryButton = ({ icon = null, onPress, children }) => {
	return (
		<>
			{icon ? (
				<Button
					mode="contained"
					style={styles.btnSecundary}
					icon={() => icon}
					onPress={onPress}>
					<Text style={[styles.btnText, styles.btnSecundaryText]}>
						{ children }
					</Text>
				</Button>
			) : (
				<Button mode="contained" style={styles.btnSecundary} onPress={onPress}>
					<Text style={[styles.btnText, styles.btnSecundaryText]}>
						{ children }
					</Text>
				</Button>
			)}
		</>
	);
};

export default SecundaryButton;

// chat-bubble-outline
const styles = StyleSheet.create({
    btnSecundary: {
		backgroundColor: '#F1F3F4',
		borderRadius: 10,
	},
	btnText: {
		fontSize: 12,
	},
	btnSecundaryText: {
		color: '#1F224D',
	},
});
