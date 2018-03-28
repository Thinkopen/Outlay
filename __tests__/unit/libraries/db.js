const { Sequelize, sequelize, sync } = require('../../../app/libraries/db');

describe('Libraries -> DB', () => {
  test('it should export sequelize objects', () => {
    expect(Sequelize).toBeDefined();

    expect(sequelize).toBeDefined();
    expect(sequelize).toBeInstanceOf(Sequelize);

    expect(sync).toBeDefined();
    expect(sync).toBeInstanceOf(Function);
  });

  describe('sync', () => {
    test('it should import all models and sync \'em all', () => expect(sync())
      .resolves.toBeDefined());
  });
});
