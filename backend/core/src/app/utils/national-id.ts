import { NationalIDUtils, NationalId } from '@monorepo/utils';

export function validateNationalIdAndDobOrThrow(data: {
	nationalId: string;
	nationalIdType: string;
	dob: string;
}) {
	let parsed = null;
	if (data.nationalIdType === NationalId.Est) {
		parsed = NationalIDUtils.parseEstonianIdCode(data.nationalId);
	} else {
		parsed = NationalIDUtils.parseFinnishIdCode(data.nationalId);
	}

	if (!parsed) {
		throw new Error('Invalid national id');
	}

	// validate b day with national id
	const dateOfBirth = new Date(data.dob);
	const {
		meta: { fullBirthYear },
		birthMonth,
		birthDay,
	} = parsed;

	if (
		!(
			fullBirthYear === dateOfBirth.getFullYear() &&
			Number(birthMonth) === dateOfBirth.getMonth() + 1 &&
			Number(birthDay) === dateOfBirth.getDate()
		)
	) {
		throw new Error('Date of birth does not match the national id code');
	}

	return parsed;
}
