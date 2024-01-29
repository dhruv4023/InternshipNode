import Validator from 'validatorjs';
import { namePattern } from './custom_validation_patterns/name_pattern.helper';
import { passwordPattern } from './custom_validation_patterns/password_pattern.helper';
import { uidPattern } from './custom_validation_patterns/uid_pattern.helper';

namePattern(); // add custom validation - name 
passwordPattern(); // add custom validation - password
uidPattern()

const validateData = (data, rules, customMessages = {}) => {
    const validation = new Validator(data, rules, customMessages);

    if (validation.fails()) {
        const firstMessage = Object.keys(validation.errors.all())[0];
        return validation.errors.first(firstMessage);
    }

    return null; // No validation errors
};

export default validateData