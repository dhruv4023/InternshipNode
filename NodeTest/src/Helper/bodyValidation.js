import Validator from "validatorjs";
import RESPONSE from "./response.js";

Validator.register('isEmailOrUsername', (value, requirement, attribute) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_]{3,20}$/.test(value);
},
    'The :attribute must be a valid email address or a username with 3-20 characters.'
);

Validator.register('password', (value, requirement, attribute) => {
    return value.length >= 5;
},
    'The :attribute must be at least 5 characters long.'
);

Validator.register('nameWithoutNumbers', (value, requirement, attribute) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(value);
},
    'The :attribute field cannot contain numbers.'
);

const isValidData = async (dataToBeValidate, res, constraints) => {
    let validation = new Validator(dataToBeValidate, constraints);

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        RESPONSE.error(res, validation.errors.first(firstMessage));
        return true;
    }

    return false;
};

export default isValidData;
