import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { API_HOST } from '../utils/constants';
import { ScrollView } from 'react-native-gesture-handler';
import ProductList from '../components/Products/ProductList';
import FilterButton from '../components/Buttons/FilterButton';
import { useSelector, useDispatch } from 'react-redux';
import { filterArray } from '../utils/utils';
import { clearFilter, setFilter } from '../actions/filter';
import { map } from 'lodash';
import { clear } from '../actions/profile';

const Search = ({ navigation }) => {
	const [value, setValue] = useState('');
	const [search, setSearch] = useState('');

	const dispatch = useDispatch();

	const [products, setProducts] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState(false);

	const filters = useSelector(state => state.filters);

	const debounced = useDebouncedCallback(value => {
		setSearch(value);
	}, 700);

	const onChange = newValue => {
		setValue(newValue);
		setProducts(null);
		setFilteredProducts(null);
		debounced(newValue);
	};

	useEffect(() => {
		if (products && products.length > 0) {
			const filtersArray = Object.entries(filters).filter(
				([key, value]) => value,
			);
			setFilteredProducts(filterArray(products, filtersArray));
		}
	}, [filters]);

	useEffect(() => {
		dispatch(clearFilter());
	}, []);

	useEffect(() => {
		if (search.length > 1) {
			axios
				.get(`${API_HOST}/products/search/${search}`)
				.then(({ data }) => {
					setProducts(data.products);
					setFilteredProducts(data.products);
				})
				.catch(err => console.log(err));
		}
	}, [search]);

	const onFilter = () => {
		navigation.navigate('Filter');
	};

	return (
		<SafeAreaView style={styles.container}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<View style={styles.header}>
				<Searchbar
					style={styles.search}
					value={value}
					onChangeText={onChange}
					iconColor="#003C95"
					autoFocus={true}
					focusable={true}
				/>
			</View>
			{products && products.length > 0 && (
				<View style={styles.ScrollView}>
					<ScrollView
						style={styles.filtersContainer}
						horizontal={true}
						showsHorizontalScrollIndicator={false}>
						<FilterButton onPress={onFilter} />
						<View style={styles.chipContainer}>
							{map(filters, (value, key) => {
								if (value) {
									return (
										<Chip
											key={key}
											style={styles.chip}
											onClose={() => {
												dispatch(
													setFilter({
														...filters,
														[key]: null,
													}),
												);

												if (key === 'location') {
													dispatch(clear());
												}
											}}>
											{key === 'minPrice' || key === 'maxPrice'
												? `${key.substring(0, 3)}: $${value}`
												: key === 'location'
												? `${value.name}`
												: `${value}`}
										</Chip>
									);
								}
							})}
						</View>
					</ScrollView>
				</View>
			)}

			<ScrollView>
				<ProductList navigation={navigation} data={filteredProducts} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Search;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
	},
	header: {
		paddingVertical: 3,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	search: {
		height: 50,
		width: '83%',
		borderRadius: 10,
		fontSize: 18,
		alignSelf: 'center',
		marginTop: 5,
		marginRight: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	chipContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	ScrollView: {
		width: '100%',
	},
	chip: {
		marginHorizontal: 5,
	},
});
