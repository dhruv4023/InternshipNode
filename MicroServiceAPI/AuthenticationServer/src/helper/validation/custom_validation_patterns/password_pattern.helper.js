import Validator from 'validatorjs';
const passwordPattern = () => {
    Validator.register(
        'password',
        (value) => {
            return value.length >= 5;
        },
        'The :attribute must be at least 5 characters long.'
    );
};
export { passwordPattern };