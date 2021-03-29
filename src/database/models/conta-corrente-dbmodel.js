const { Model, DataTypes } = require("sequelize");

class ContaCorrenteDbModel extends Model {

    static init(sequelize) {

        super.init({

            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            saldo: DataTypes.FLOAT,
            active: DataTypes.BOOLEAN

        }, { sequelize, tableName: 'conta_corrente'})
    }

    static associate(models) {
        this.belongsTo(models.PessoaDbModel, { foreignKey: 'pessoa_id', as:'pessoa' })
    }
}

module.exports = ContaCorrenteDbModel