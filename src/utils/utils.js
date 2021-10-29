export const validateProfileForm = formData => {
	const {
		photo,
		phone,
		name,
		location: {name:city},
	} = formData;

	return (photo !== null && phone.length === 8 && name.length > 0 && city !== null)
}
