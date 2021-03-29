module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario',
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        login:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        senha:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        pessoa_id:{
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'pessoa', key: 'id'},
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
     await queryInterface.dropTable('usuario');
  }
};
