import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const Read = () => {
	return <Icon name="done-all" color="#6EDBFF" size={18} style={styles.icon} />;
};

export default Read;

const styles = StyleSheet.create({
	icon: {
		marginLeft: 5,
	},
});
