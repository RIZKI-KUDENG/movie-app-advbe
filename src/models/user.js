import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";
import { hashPassword } from "../utils/bcrypt.js";

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hashed = hashPassword(value);
        this.setDataValue("password", hashed);
      },
    },
  },
  {
    tableName: "users",
  }
);
sequelize.sync();
export default User;
