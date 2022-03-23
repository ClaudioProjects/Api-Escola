"use strict";const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'Luiz 4',
          email: 'luiz4@hotmail.com',
          password_hash: await bcryptjs.hash('321515', 12),
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          nome: 'Outro',
          email: 'outro@hotmail.com',
          password_hash: await bcryptjs.hash('5324234', 12),
          created_at: new Date(),
          updated_at: new Date(),
        },

      ],
      {},
    );
  },

  down: () => {},
};
