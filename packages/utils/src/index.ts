const parseEstonianIdCode = (idCode: string) => {
    const estonianIdCodeRegExp = /^\d{11}$/;

    if (!estonianIdCodeRegExp.test(idCode)) {
        throw new Error("Invalid estonian id format");
    }

    const getMetaInfoFromGenderDigit = (genderDigit: number) => {
        if (genderDigit === 1) {
            return {
                gender: 'm',
                birthYearStart: 1800,
                birthYearEnd: 1899,
            };
        }

        if (genderDigit === 3) {
            return {
                gender: 'm',
                birthYearStart: 1900,
                birthYearEnd: 1999,
            };
        }

        if (genderDigit === 5) {
            return {
                gender: 'm',
                birthYearStart: 2000,
                birthYearEnd: 2099,
            };
        }

        if (genderDigit === 7) {
            return {
                gender: 'm',
                birthYearStart: 2100,
                birthYearEnd: 2199,
            };
        }

        if (genderDigit === 2) {
            return {
                gender: 'f',
                birthYearStart: 1800,
                birthYearEnd: 1899,
            };
        }

        if (genderDigit === 4) {
            return {
                gender: 'f',
                birthYearStart: 1900,
                birthYearEnd: 1999,
            };
        }

        if (genderDigit === 6) {
            return {
                gender: 'f',
                birthYearStart: 2000,
                birthYearEnd: 2099,
            };
        }

        if (genderDigit === 8) {
            return {
                gender: 'f',
                birthYearStart: 2100,
                birthYearEnd: 2199,
            };
        }

        throw new Error("Invalid gender digit");
    };

    const idCodeComponents = {
        genderDigit: idCode.charAt(0),
        birthYearLastTwoDigits: idCode.slice(1, 3),
        birthMonth: idCode.slice(3, 5),
        birthDay: idCode.slice(5, 7),
        sequenceDigits: idCode.slice(7, 10),
        checksumDigit: idCode.charAt(10),
    };

    const genderDigitMetaInfo = getMetaInfoFromGenderDigit(Number(idCodeComponents.genderDigit));

    return {
        ...idCodeComponents,
        meta: {
            ...genderDigitMetaInfo,
            fullBirthYear: genderDigitMetaInfo.birthYearStart + Number(idCodeComponents.birthYearLastTwoDigits),
        },
    };
};

const parseLatvianIdCode = (idCode: string) => {
    throw new Error("Latvian id code not implemented yet")
}

const parseFinnishIdCode = (idCode: string) => {
    const finnishIdCodeRegExp =
        /^(?<birthDay>[0-9]{2})(?<birthMonth>[0-9]{2})(?<birthYear>[0-9]{2})(?<centuryCharacter>[-+ABCDEFYXWVU]{1})(?<sequenceDigits>[0-9]{3})(?<checksumCharacter>[0-9ABCDEFHJKLMNPRSTUVWXY]{1})$/;

    if (!finnishIdCodeRegExp.test(idCode)) {
        throw new Error("Invalid finnish id code");
    }

    const getMetaInfoFromCenturyCharacter = (centuryCharacter: string) => {
        if (centuryCharacter === '+') {
            return {
                birthYearStart: 1800,
                birthYearEnd: 1899,
            };
        }

        if (['-', 'Y', 'X', 'W', 'V', 'U'].includes(centuryCharacter)) {
            return {
                birthYearStart: 1900,
                birthYearEnd: 1999,
            };
        }

        if (['A', 'B', 'C', 'D', 'E', 'F'].includes(centuryCharacter)) {
            return {
                birthYearStart: 2000,
                birthYearEnd: 2099,
            };
        }

        throw new Error("Unexpected century character")
    };

    const idCodeComponents = {
        birthDay: idCode.slice(0, 2),
        birthMonth: idCode.slice(2, 4),
        birthYearLastTwoDigits: idCode.slice(4, 6),
        centuryCharacter: idCode.slice(6, 7),
        sequenceDigits: idCode.slice(7, 10),
        checksumCharacter: idCode.charAt(10),
    };

    const metaInfoFromCenturyCharacter = getMetaInfoFromCenturyCharacter(idCodeComponents.centuryCharacter);

    return {
        ...idCodeComponents,
        meta: {
            gender: Number(idCodeComponents.sequenceDigits) % 2 === 0 ? 'f' : 'm',
            ...metaInfoFromCenturyCharacter,
            fullBirthYear:
                metaInfoFromCenturyCharacter.birthYearStart + Number(idCodeComponents.birthYearLastTwoDigits),
        },
    };
};

export enum NationalId {
    Est = "estid",
    Fin = "finid",
}

export const NationalIDUtils = {
    parseEstonianIdCode,
    parseFinnishIdCode,
    parseLatvianIdCode
};
