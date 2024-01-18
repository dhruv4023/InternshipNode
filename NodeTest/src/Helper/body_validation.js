import Validator from "validatorjs";
import RESPONSE from "./Response";
const isValidBody = (req, res, constraints) => {
    let validation = new Validator(req.body, constraints);
    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
}

export default isValidBody