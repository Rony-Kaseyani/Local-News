'use strict'

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
    return [
      queryInterface.bulkInsert(
        'Categories',
        [
          {
            title: 'politics',
            description: 'politics',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'business',
            description: 'business',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'technology',
            description: 'technology',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'sports',
            description: 'sports',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'weather',
            description: 'weather',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: 'entertainment',
            description: 'entertainment',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      ),

      queryInterface.bulkInsert('user', [
        {
          first_name: 'Admin',
          last_name: 'User',
          email: 'admin@email.com',
          password: 'password',
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'Armin',
          last_name: 'Naimi',
          email: 'armin@email.com',
          password: 'password',
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'May',
          lastName: 'Naimi-Jones',
          email: 'may@email.com',
          password: 'password',
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Reema',
          lastName: 'Kaseyani-Jones',
          email: 'reema@email.com',
          password: 'password',
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Rony',
          lastName: 'Kaseyani',
          email: 'rony@email.com',
          password: 'password',
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),

      queryInterface.bulkInsert('News', [
        ({
          category: 'politics',
          title: 'Brexit',
          body: 'This is crap',
          image: '1542809049611-getty_brexit.jpg',
          approved: true,
          pinned: true,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'technology',
          title: 'Hackers',
          body: 'Dark web',
          image: '1542809049611-darkweb_skull.png',
          approved: true,
          pinned: true,
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'entertainment',
          title: 'Tom & Jerry',
          body: 'Best cartoon of all time.',
          image: '1543510355052-tom and jerry',
          approved: true,
          pinned: false,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'technology',
          title: 'Microsoft vs Apple',
          body: 'Microsoft is doing better actually.',
          image: '1543679152526-microsoft-beats-apple.jpg',
          approved: true,
          pinned: true,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'sports',
          title: 'Table Tennis or Ping-Pong',
          body: 'It is actually a sport.',
          image: '1542809049611-table tennis.jpg',
          approved: true,
          pinned: true,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'weather',
          title: 'Global warming protests.',
          body: 'Global warming needs attention say protesters',
          image: '1542809049611-protesters.jpg',
          approved: true,
          pinned: true,
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category: 'business',
          title: 'IKEA IPO opens',
          body: 'Finally ikea shares up for grabs.',
          image: '1542809049611-getty_brexit.jpg',
          approved: true,
          pinned: true,
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ])
    ]
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('user', null, {})
    return queryInterface.bulkDelete('Categories', null, {})
    return queryInterface.bulkDelete('News', null, {})
  }
}
