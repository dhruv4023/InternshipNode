'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Posts', {
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade', // Adjust as needed (e.g., 'restrict', 'set null')
      onUpdate: 'cascade', // Adjust as needed (e.g., 'restrict', 'set null')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Posts', 'Posts_userId_fkey');
  },
};
