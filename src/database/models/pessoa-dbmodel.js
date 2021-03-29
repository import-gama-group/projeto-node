const { Model, DataTypes } = require('sequelize')

class PessoaDbModel extends Model {

    static init(sequelize) {
        
        super.init({

            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            nome: DataTypes.STRING,
            cpf: DataTypes.STRING,
            active: DataTypes.BOOLEAN
            
        }, { sequelize, tableName: 'pessoa' })
    }

    static associate(models) {
        this.hasOne(models.UsuarioDbModel, { foreignKey: 'pessoa_id', as: 'usuario' })
        this.hasOne(models.ContaCorrenteDbModel, { foreignKey: 'pessoa_id', as: 'conta_corrente' })
    }
}

module.exports = PessoaDbModel