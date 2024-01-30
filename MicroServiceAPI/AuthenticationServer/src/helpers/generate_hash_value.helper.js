import bcrypt from "bcrypt"
export const hashValueGenerator = async (data) => {
    try {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(data, salt);
    } catch (error) {
        throw new Error("Error generating hash value: ");
    }
}
