const { Model, DataTypes } = require("sequelize");

class UsuarioDbModel extends Model {

    static init(sequelize) {

        super.init({

            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            login: DataTypes.STRING,
            senha: DataTypes.STRING,
            active: DataTypes.BOOLEAN
            
        }, { sequelize, tableName: 'usuario' })
    }

    static associate(models) {
        this.belongsTo(models.PessoaDbModel, { foreignKey: 'pessoa_id', as:'pessoa' })
    }
}

module.exports = UsuarioDbModel