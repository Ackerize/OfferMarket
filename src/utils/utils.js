export const validateProfileForm = formData => {
	const {
		photo,
		phone,
		name,
		location: { name: city },
	} = formData;

	return (
		photo !== null && phone.length === 8 && name.length > 0 && city !== null
	);
};

export const validateProductForm = formData => {
	const { name, images, price, description } = formData;

	return (
		name.length > 0 &&
		images.length > 0 &&
		Number(price) > 0 &&
		description.length > 0
	);
};

export const countUnreadMessages = (messages, idUser) => {
	let count = 0;
	messages.forEach(item => {
		if (item.message.author != idUser && !item.message.read) count++;
	});
	return count;
};

export const filterArray = (array, filters) => {
	console.log(filters);
	filters.forEach(([key, value]) => {
		switch (key) {
			case 'minPrice':
				array = array.filter(item => item.price >= value);
				break;
			case 'maxPrice':
				array = array.filter(item => item.price <= value);
				break;
			default:
				array = array.filter(item => item[key] === value);
		}
	});
	return array;
};





