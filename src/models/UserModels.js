import { DataTypes } from "sequelize"
import db from "../config/Database.js"
import Admin from "./AdminModels.js"


const Users = db.define('users', {
    nim: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        },
        unique: true
    },
    class: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.ENUM('users'),
        defaultValue: 'users'
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
})

Admin.hasMany(Users, {foreignKey: 'id_admin'})
Users.belongsTo(Admin, {foreignKey: 'id_admin'})

export default Users