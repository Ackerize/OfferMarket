import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Received = ({ color = "#FFF" }) => {
	return <Icon name="done-all" size={18} style={styles.icon} color={color} />;
};

export default Received;

const styles = StyleSheet.create({
	icon: {
		marginLeft: 5,
	},
});
