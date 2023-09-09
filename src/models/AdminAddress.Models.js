import { DataTypes } from "sequelize"
import db from "../config/Database.js"
import Admin from "./AdminModels.js"


const Address = db.define('address', {
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    street: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    postal_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

Admin.hasOne(Address, {foreignKey: 'id_admin'})
Address.belongsTo(Admin, {foreignKey: 'id_admin'})

export default Address