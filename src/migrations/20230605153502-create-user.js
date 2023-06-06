/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6],
            msg: 'Password must be more than 6 characters',
          },
        },
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};