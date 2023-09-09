import { DataTypes } from "sequelize"
import db from "../config/Database.js"


const Admin = db.define('admin', {
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
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('admin'),
        defaultValue: 'admin'
    }
}, {
    freezeTableName: true
})

export default Admin