module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('conta_corrente',
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        pessoa_id:{
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'pessoa', key: 'id'},
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        saldo:{
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0
        },
        created_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
        active:{
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('conta_corrente');
  }
};
