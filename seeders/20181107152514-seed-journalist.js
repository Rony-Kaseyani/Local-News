'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Journalists', [{
      firstName: 'Armin',
      lastName: 'Naimi',
      userName: 'anaimi',
      passWord: 'maysy',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
        firstName: 'May',
        lastName: 'Naimi-Jones',
        userName: 'mjones',
        passWord: 'mrman',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      }, {
          firstName: 'Reema',
          lastName: 'Kaseyani-Jones',
          userName: 'rjones',
          passWord: 'wony',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        }, {
            firstName: 'Rony',
            lastName: 'Kaseyani',
            userName: 'rkaseyani',
            passWord: 'weemsy',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()          
  }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Journalists', null, {})
  }
}
