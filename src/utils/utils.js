export const validateProfileForm = formData => {
	const {
		photo,
		phone,
		name,
		location: {name:city},
	} = formData;

	return (photo !== null && phone.length === 8 && name.length > 0 && city !== null)
}

export const validateProductForm = formData => {
	const {
		name,
		images,
		price,
		description,
	} = formData;

	return (name.length > 0 && images.length > 0 && Number(price) > 0 && description.length > 0)
}

export const countUnreadMessages = (messages, idUser) => {
	let count = 0;
	messages.forEach(message => {
		if (message.author != idUser && !message.read) count++;
	});
	return count;
}