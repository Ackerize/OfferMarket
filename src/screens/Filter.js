import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { map } from 'lodash';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import Tag from '../components/Tag';
import { useForm } from '../hooks/useForm';
import { categories } from '../utils/category';
import { ScrollView } from 'react-native-gesture-handler';
import LocationInput from '../components/Inputs/LocationInput';
import SaveButton from '../components/Buttons/SaveButton';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../actions/filter';

const Filter = ({ navigation }) => {
	const dispatch = useDispatch();

	const { category, condition, location, maxPrice, minPrice } = useSelector(
		state => state.filters,
	);

	const [categoriesArray] = useState(categories.slice(1));

	const [values, handleInputChange] = useForm({
		minPrice: minPrice || '',
		maxPrice: maxPrice || '',
	});

	const [statusSelected, setStatusSelected] = useState(condition);

	const [categorySelected, setCategorySelected] = useState(
		categories.find(cat => cat.name === category),
	);

	const onChangeCategory = newCategory => {
		setCategorySelected(newCategory);
	};

	const onSave = () => {
		const newFilters = {
			category: categorySelected?.name,
			condition: statusSelected,
			maxPrice: values.maxPrice.length > 0 ? values.maxPrice : null,
			minPrice: values.minPrice.length > 0 ? values.minPrice : null,
		};

		dispatch(setFilter(newFilters));
		navigation.goBack();
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<ScrollView style={styles.container}>
				<Text style={styles.label}>Precio:</Text>
				<View style={styles.optionsContainer}>
					<TextInput
						style={styles.input}
						placeholder="Desde"
						keyboardType="number-pad"
						value={`$ ${values.minPrice}`}
						onChangeText={e => handleInputChange('minPrice', e)}
					/>
					<Text style={styles.separator}> - </Text>
					<TextInput
						style={styles.input}
						placeholder="Hasta"
						keyboardType="number-pad"
						value={`$ ${values.maxPrice}`}
						onChangeText={e => handleInputChange('maxPrice', e)}
					/>
				</View>
				<Text style={styles.label}>Estado del producto:</Text>
				<View style={styles.optionsContainer}>
					<Tag
						name="Nuevo"
						selected={statusSelected === 'Nuevo'}
						onPress={() => setStatusSelected('Nuevo')}
					/>
					<Tag
						name="Usado"
						selected={statusSelected === 'Usado'}
						onPress={() => setStatusSelected('Usado')}
					/>
				</View>
				<Text style={styles.label}>Categoría:</Text>
				<View style={styles.optionsContainer}>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						{map(categoriesArray, catg => (
							<Tag
								key={catg.id}
								selected={categorySelected?.id === catg.id}
								onPress={() => onChangeCategory(catg)}
								name={catg.name}
							/>
						))}
					</ScrollView>
				</View>
				<Text style={styles.label}>Ubicación (radio de 5km): </Text>
				<View style={styles.optionsContainer}>
					<LocationInput onPress={() => console.log('UBICACIÓN')} />
				</View>
				<SaveButton onPress={onSave} text="Aplicar" />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Filter;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: 'white',
		height: '100%',
		width: '100%',
	},
	container: {
		marginTop: 75,
		marginHorizontal: 20,
	},
	label: {
		fontSize: 18,
		color: '#000',
		marginLeft: 10,
	},
	input: {
		borderRadius: 10,
		backgroundColor: '#EDEFF1',
		paddingHorizontal: 15,
		paddingVertical: 5,
		width: '35%',
	},
	optionsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
		marginBottom: 30,
	},
	separator: {
		fontSize: 32,
		color: '#000',
		marginHorizontal: 10,
	},
	btn: {
		backgroundColor: '#FFF',
		borderRadius: 10,
		paddingHorizontal: 2,
		paddingVertical: 2,
	},
	locationInput: {
		backgroundColor: '#EDEFF1',
		width: '95%',
		marginHorizontal: 10,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 10,
		justifyContent: 'space-between',
	},
	locationLabeL: {
		color: '#060948',
		fontSize: 15,
	},
});
