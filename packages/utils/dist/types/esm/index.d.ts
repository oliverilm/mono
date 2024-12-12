export declare enum NationalId {
    Est = "estid",
    Fin = "finid"
}
export declare const NationalIDUtils: {
    parseEstonianIdCode: (idCode: string) => {
        meta: {
            fullBirthYear: number;
            gender: string;
            birthYearStart: number;
            birthYearEnd: number;
        };
        genderDigit: string;
        birthYearLastTwoDigits: string;
        birthMonth: string;
        birthDay: string;
        sequenceDigits: string;
        checksumDigit: string;
    };
    parseFinnishIdCode: (idCode: string) => {
        meta: {
            fullBirthYear: number;
            birthYearStart: number;
            birthYearEnd: number;
            gender: string;
        };
        birthDay: string;
        birthMonth: string;
        birthYearLastTwoDigits: string;
        centuryCharacter: string;
        sequenceDigits: string;
        checksumCharacter: string;
    };
    parseLatvianIdCode: (idCode: string) => never;
};
