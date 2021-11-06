import { isPointWithinRadius } from 'geolib';

export const validateProfileForm = formData => {
	const {
		photo,
		phone,
		name,
		location: { name: city },
	} = formData;

	const regexPhoneDash = /^[0-9]{4}-[0-9]{4}$/;
	const regexPhone = /^[0-9]{8}$/;
	if (!regexPhone.test(phone) && !regexPhoneDash.test(phone)) {
		throw new Error('Número de teléfono no válido');
	} else if (
		photo === null ||
		photo === undefined ||
		name.length === 0 ||
		city === null ||
		city === undefined
	) {
		throw new Error('Por favor, complete todos los campos');
	}
	return true;
};

export const validateProductForm = formData => {
	const { name, images, price, description, location } = formData;
	if (name.length === 0 || description.length === 0)
		throw new Error('Por favor, complete todos los campos');
	if (!images?.length) throw new Error('Debe incluir al menos una imagen');
	if (Number(price) < 0)
		throw new Error('El precio debe ser mayor o igual a 0');
	if (!location?.name) {
		throw new Error('Debe elegir una ubicación');
	}
	return true;
};

export const countUnreadMessages = (messages, idUser) => {
	let count = 0;
	messages.forEach(item => {
		if (item.message.author != idUser && !item.message.read) count++;
	});
	return count;
};

export const validLogin = (username, password) => {
	if (username.length < 1 || password.length < 1)
		throw new Error('Correo electrónico y contraseña son requeridos');
	return true;
};

export const validRegister = (name, username, password, passwordConfirm) => {
	if (
		username.length < 1 ||
		password.length < 1 ||
		passwordConfirm.length < 1 ||
		name.length < 1
	)
		throw new Error('Los campos son requeridos son requeridos');
	if (password.length < 6)
		throw new Error('La contraseña debe de contener por lo menos 6 caracteres');
	if (password !== passwordConfirm)
		throw new Error('Las contraseñas no coinciden');
	return true;
};

export const filterArray = (array, filters) => {
	filters.forEach(([key, value]) => {
		switch (key) {
			case 'minPrice':
				array = array.filter(item => item.price >= value);
				break;
			case 'maxPrice':
				array = array.filter(item => item.price <= value);
				break;
			case 'location':
				array = array.filter(item =>
					isPointWithinRadius(
						{
							latitude: item.location.latitude,
							longitude: item.location.longitude,
						},
						value,
						750,
					),
				);
				break;
			default:
				array = array.filter(item => item[key] === value);
		}
	});
	return array;
};
