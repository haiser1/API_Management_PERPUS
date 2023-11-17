import { DataTypes } from 'sequelize'
import db from '../config/Database.js'
import Users from './UserModels.js'
import Books from './BooksModels.js'
import Admin from './AdminModels.js'

const Peminjaman = db.define('peminjaman', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_book: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nim_peminjam: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name_peminjam: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title_book: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    name_admin: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    qty: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    deadline_pinjam: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTableName: true,
})

Users.hasMany(Peminjaman, {foreignKey: 'id_user'})
Peminjaman.belongsTo(Users, {foreignKey: 'id_user'})

Books.hasMany(Peminjaman, {foreignKey: 'id_book'})
Peminjaman.belongsTo(Books, {foreignKey: 'id_book'})

Admin.hasMany(Peminjaman, {foreignKey: 'id_admin'})
Peminjaman.belongsTo(Admin, {foreignKey: 'id_admin'})

export default Peminjaman

