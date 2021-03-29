module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pessoa',
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('pessoa');
  }
};
