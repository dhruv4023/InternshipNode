import Validator from "validatorjs";
import RESPONSE from "./Response.js";

Validator.register('isEmailOrUsername', (value, requirement, attribute) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_]{3,20}$/.test(value);
});
Validator.register('password', (value, requirement, attribute) => {
    return value.length >= 5;
});

const isValidBody = async (dataToBeValidate, res, constraints) => {
    let validation = new Validator(dataToBeValidate, constraints);
    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        RESPONSE.error(res, validation.errors.first(firstMessage));
        return true;
    }
    return false
};

export default isValidBody;
