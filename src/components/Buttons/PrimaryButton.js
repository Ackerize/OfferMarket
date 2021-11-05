import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const PrimaryButton = ({icon = null, children, onPress}) => {
	return (
		<>
			{icon ? (
				<Button
					mode="contained"
					style={styles.btnPrimary}
					icon={() => icon}
					onPress={onPress}>
					<Text style={[styles.btnText, styles.btnPrimaryText]}>
						{ children }
					</Text>
				</Button>
			) : (
				<Button mode="contained" style={styles.btnPrimary} onPress={onPress}>
					<Text style={[styles.btnText, styles.btnPrimaryText]}>
						{ children }
					</Text>
				</Button>
			)}
		</>
	);
};

export default PrimaryButton;

const styles = StyleSheet.create({
	btnPrimary: {
		backgroundColor: '#070B59',
		borderRadius: 10,
	},
	btnPrimaryText: {
		color: 'white',
	},
	btnText: {
		fontSize: 12,
	},
});
