import Validator from 'validatorjs';
const namePattern = () => {
    Validator.register(
        'nameWithoutNumbers',
        (value) => {
            return value.match(
                /^[a-zA-Z]+$/
            );
        },
        'The :attribute field cannot contain numbers.'
    );
};
export { namePattern }; 