import Validator from "validatorjs";
import RESPONSE from "./response.js";


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
