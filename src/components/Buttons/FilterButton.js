import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const FilterButton = ({ onPress }) => {
	return (
		<Button
			mode="contained"
            onPress={onPress}
			icon={() => <Icon name="tune" size={20} color="#FFF" />}
            style={styles.button}
            >
			Filtros
		</Button>
	);
};

export default FilterButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#003C95",
        width: 120,
        borderRadius: 10,
        marginLeft: 15,
        marginTop: 12,
        marginBottom: 12,
    }
});
