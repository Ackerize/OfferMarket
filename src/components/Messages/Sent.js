import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Sent = ({ color = "#FFF" }) => {
	return <Icon name="done" size={18} style={styles.icon} color={color} />;
};

export default Sent;

const styles = StyleSheet.create({
	icon: {
		marginLeft: 5,
	},
});
