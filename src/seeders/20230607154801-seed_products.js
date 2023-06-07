/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        id: 'product-01',
        name: 'Laundry Kiloan',
        price: 7000,
      },
      {
        id: 'product-02',
        name: 'Dry Cleaning',
        price: 10000,
      },
      {
        id: 'product-03',
        name: 'Ironing',
        price: 8000,
      },
      {
        id: 'product-04',
        name: 'Shoe & Bag Care',
        price: 18000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
