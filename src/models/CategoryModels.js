import { DataTypes } from 'sequelize'
import db from '../config/Database.js'
import Books from './BooksModels.js'

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    freezeTableName: true
})

export default Category