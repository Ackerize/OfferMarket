import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ImagePicker from '../components/ImagePickers/ImagePicker';
import Input from '../components/Inputs/Input';
import Select from '../components/Inputs/Select';
import SaveButton from '../components/SaveButton';
import { categories } from '../utils/category';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { validateProductForm } from '../utils/utils';
import { finishLoading, startLoading } from '../actions/ui';
import { fileUpload } from '../utils/fileUpload';
import { createNewProduct } from '../api/products';
import Popup from '../components/Modals/Popup';
import { showToast } from '../components/Modals/CustomToast';

const ProductForm = ({ navigation }) => {
	const categoriesData = categories.map(category => ({
		id: category.id,
		value: category.name,
	}));
	const dispatch = useDispatch();
	const {
		auth: { uid },
		ui: { loading },
	} = useSelector(state => state);
	const conditionData = [{ id: 1, value: 'Nuevo' }, { id: 2, value: 'Usado' }];

	const [categorySelected, setCategorySelected] = useState(categoriesData[0]);
	const [conditionSelected, setConditionSelected] = useState(conditionData[0]);
	const [images, setImages] = useState([]);

	const initialValues = {
		name: '',
		images: null,
		brand: '',
		price: 0,
		description: '',
		category: null,
		condition: null,
		seller: uid,
	};

	console.log(loading);

	const onSubmit = async values => {
		if (!loading) {
			values = {
				...values,
				category: categorySelected.value,
				condition: conditionSelected.value,
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
			} else {
				Popup.show({
					type: 'Danger',
					title: '¡Oh no!',
					textBody: 'Debe de llenar todos los campos obligatorios',
					buttontext: 'Aceptar',
					callback: () => Popup.hide(),
				});
			}
		}
	};

	return (
		<SafeAreaView style={styles.mainContainer}>
			<FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
			<Formik initialValues={initialValues} onSubmit={onSubmit}>
				{({ handleChange, handleBlur, handleSubmit, values }) => (
					<ScrollView style={styles.formContainer}>
						<View style={{ paddingBottom: 50 }}>
							<ImagePicker multiple={true} setImagesArray={setImages} />
							<Input
								label="Nombre: (*)"
								value={values.name}
								onChangeText={handleChange('name')}
								onBlur={handleBlur('name')}
							/>
							<Input
								label="Marca: (*)"
								value={values.brand}
								onChangeText={handleChange('brand')}
								onBlur={handleBlur('brand')}
							/>
							<Input
								label="Descripción: (*)"
								value={values.description}
								onChangeText={handleChange('description')}
								onBlur={handleBlur('description')}
							/>
							<Input
								label="Precio: (*)"
								type="numeric"
								value={values.price.toString()}
								onChangeText={handleChange('price')}
								onBlur={handleBlur('price')}
							/>
							<Select
								label="Categoría: (*)"
								placeholder="Selecciona una categoría"
								data={categoriesData}
								onChange={setCategorySelected}
								value={categorySelected}
							/>
							<Select
								label="Condición: (*)"
								placeholder="Selecciona la condición"
								data={conditionData}
								onChange={setConditionSelected}
								value={conditionSelected}
							/>
							<SaveButton text="Guardar" onPress={handleSubmit} loading={loading} />
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
});
