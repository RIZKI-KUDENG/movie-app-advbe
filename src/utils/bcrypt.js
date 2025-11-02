import bcrypt from "bcrypt";

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
}

const comparePassword = (password, hashed) => {
    const result = bcrypt.compareSync(password, hashed);
    return result;
}

export { hashPassword, comparePassword }