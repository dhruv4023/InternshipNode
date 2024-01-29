import Validator from 'validatorjs';
const uidPattern = () => {
    Validator.register(
        'isEmailOrUsername',
        (value) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_]{3,20}$/.test(value);
        },
        'The :attribute must be a valid email address or a username with 3-20 characters.'
    );
};
export { uidPattern }; 