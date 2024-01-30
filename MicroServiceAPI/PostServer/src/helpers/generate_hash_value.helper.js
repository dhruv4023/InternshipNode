import bcrypt from "bcrypt"
export const hashValueGenerator = async (password) => {
    try {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Error generating hash value: ");
    }
}
