import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ImagePicker from '../components/ImagePickers/ImagePicker';
import Input from '../components/Inputs/Input';
import Select from '../components/Inputs/Select';
import SaveButton from '../components/Buttons/SaveButton';
import { categories } from '../utils/category';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { validateProductForm } from '../utils/utils';
import { finishLoading, startLoading } from '../actions/ui';
import { fileUpload } from '../utils/fileUpload';
import { createNewProduct, updateProduct } from '../api/products';
import Popup from '../components/Modals/Popup';
import { showToast } from '../components/Modals/CustomToast';
import LocationInput from '../components/Inputs/LocationInput';
import { selectLocation } from '../actions/profile';

const ProductForm = ({ navigation, route }) => {
	const product = route?.params?.product;
	const categoriesData = categories.map(category => ({
		id: category.id,
		value: category.name,
	}));

	categoriesData.shift();

	const dispatch = useDispatch();

	const {
		auth: { uid },
		ui: { loading },
		profile: { location },
	} = useSelector(state => state);

	const { name: city } = location;

	useEffect(() => {
		if (product) {
			dispatch(selectLocation({ ...product.location }));
		}
	}, []);

	const conditionData = [{ id: 1, value: 'Nuevo' }, { id: 2, value: 'Usado' }];

	const cat = product
		? categoriesData.find(cate => cate.value === product.category)
		: null;
	const cond = product
		? conditionData.find(condi => condi.value === product.condition)
		: null;

	const [categorySelected, setCategorySelected] = useState(
		cat ? cat : categoriesData[0],
	);
	const [conditionSelected, setConditionSelected] = useState(
		cond ? cond : conditionData[0],
	);
	const [images, setImages] = useState(product ? product.images : []);

	const initialValues = product
		? {
				name: product.name,
				price: product.price,
				description: product.description,
				brand: product.brand,
				images: product.images,
				category: product.category,
				condition: product.condition,
				location: product.location,
		  }
		: {
				name: '',
				images: null,
				brand: '',
				price: 0,
				description: '',
				category: null,
				condition: null,
				seller: uid,
				location,
		  };

	const onSubmit = async values => {
		if (!loading) {
			try {
				values = {
					...values,
					category: categorySelected.value,
					condition: conditionSelected.value,
					location: location,
					images,
				};

				const isValid = validateProductForm(values);

				if (isValid) {
					dispatch(startLoading());
					const urls = images.map(async image => {
						const source = 'data:image/jpg;base64,' + image.data;
						const fileUrl = await fileUpload(source);
						return fileUrl;
					});

					values.images = await Promise.all(urls);

					const { error, message } = await createNewProduct({
						...values,
						price: Number(values.price),
						brand: values.brand.length > 0 ? values.brand : null,
					});

					if (!error) {
						showToast('success', 'Producto creado', message);
						navigation.goBack();
					} else {
						showToast('error', '¡Oh no!', message);
					}
					dispatch(finishLoading());
				}
			} catch ({ message }) {
				dispatch(finishLoading());
				Popup.show({
					type: 'Danger',
					title: '¡Oh no!',
					textBody: message,
					buttontext: 'Aceptar',
					callback: () => Popup.hide(),
				});

			}
		}
	};

	const onUpdate = async values => {
		if (!loading) {
			try {
				values = {
					...values,
					category: categorySelected.value,
					condition: conditionSelected.value,
					location: location,
					images,
				};

				const isValid = validateProductForm(values);

				if (isValid) {
					dispatch(startLoading());
					const urls = images.map(async image => {
						if (image?.data) {
							const source = 'data:image/jpg;base64,' + image.data;
							const fileUrl = await fileUpload(source);
							return fileUrl;
						}
						if (image?.path) return image.path;
						return image;
					});
					const imageUploads = await Promise.all(urls);

					values.images = [...new Set(imageUploads)];
					const { error, message } = await updateProduct(
						{
							...values,
							price: Number(values.price),
							brand: (values?.brand && values.brand.length > 0) ? values.brand : null,
						},
						product._id,
					);

					if (!error) {
						showToast('success', 'Producto actualizado', message);
						navigation.goBack();
					} else {
						showToast('error', '¡Oh no!', message);
					}
					dispatch(finishLoading());
				}
			} catch ({ message }) {
				dispatch(finishLoading());
				Popup.show({
					type: 'Danger',
					title: '¡Oh no!',
					textBody: message,
					buttontext: 'Aceptar',
					callback: () => Popup.hide(),
				});
			}
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Formik
				initialValues={initialValues}
				onSubmit={product ? onUpdate : onSubmit}>
				{({ handleChange, handleBlur, handleSubmit, values }) => (
					<ScrollView style={styles.formContainer}>
						<View style={{ paddingBottom: 50 }}>
							<ImagePicker
								multiple={true}
								setImagesArray={setImages}
								imagesArray={images}
							/>
							<Input
								label="Nombre:"
								mandatory={true}
								value={values.name}
								onChangeText={handleChange('name')}
								onBlur={handleBlur('name')}
							/>
							<Input
								label="Marca:"
								value={values.brand}
								onChangeText={handleChange('brand')}
								onBlur={handleBlur('brand')}
							/>
							<Input
								label="Descripción:"
								mandatory={true}
								value={values.description}
								onChangeText={handleChange('description')}
								onBlur={handleBlur('description')}
							/>
							<Input
								label="Precio:"
								mandatory={true}
								type="numeric"
								value={values.price.toString()}
								onChangeText={handleChange('price')}
								onBlur={handleBlur('price')}
							/>
							<Select
								label="Categoría:"
								placeholder="Selecciona una categoría"
								data={categoriesData}
								onChange={setCategorySelected}
								value={categorySelected}
							/>
							<Select
								label="Condición:"
								placeholder="Selecciona la condición"
								data={conditionData}
								onChange={setConditionSelected}
								value={conditionSelected}
							/>
							<View style={styles.container}>
								<Text style={styles.label}>Ubicación: </Text>
								<LocationInput
									actualLocation={city}
									onPress={() => navigation.navigate('SearchLocation')}
								/>
							</View>
							<SaveButton
								text="Guardar"
								onPress={handleSubmit}
								loading={loading}
							/>
						</View>
					</ScrollView>
				)}
			</Formik>
		</SafeAreaView>
	);
};

export default ProductForm;

const styles = StyleSheet.create({
	mainContainer: {
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
	},
	formContainer: {
		paddingHorizontal: 25,
		marginTop: 30,
	},
	container: {
		marginVertical: 15,
	},
	label: {
		fontSize: 16,
		color: '#000000',
		marginBottom: 10,
	},
});
