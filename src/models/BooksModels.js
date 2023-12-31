import { DataTypes } from "sequelize"
import db from "../config/Database.js"
import Admin from "./AdminModels.js"
import Category from "./CategoryModels.js"


const Books = db.define('books', {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    author: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    publisher: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    publication_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name_category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
})

Admin.hasMany(Books, {foreignKey: 'id_admin'})
Books.belongsTo(Admin, {foreignKey: 'id_admin'})

Category.hasMany(Books, {foreignKey: 'id_category'})
Books.belongsTo(Category, {foreignKey: 'id_category'})

export default Books