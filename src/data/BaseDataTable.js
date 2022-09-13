const Datastore = require('../utils/dbQueryPromise');

class BaseDataTable {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async checkIfTableExist() {
    const result = await Datastore('SHOW TABLES LIKE "' + this.tableName + '"');
    if (!result) throw Error();
    if (result[0].length === 0) {
      console.info("table " + this.tableName + " not found", result);
      return false;
    }
    return true;
  }

  async insert(data) {
    return await Datastore("INSERT INTO " + this.tableName + " SET ?", [data]);
  }

  async find(data) {
    return await Datastore(
      "SELECT * FROM " + this.tableName + " WHERE ? ",
      data
    );
  }

  async findQuery(query) {
    return await Datastore("SELECT * FROM " + this.tableName + " WHERE "+ query);
  }

  async findAll() {
    const [result] = await Datastore("SELECT * FROM " + this.tableName);
    return result;
  }

  async update(id, data) {
    return await Datastore(
      "UPDATE " + this.tableName + " SET ? WHERE id=" + id,
      [data]
    );
  }

  async remove(id) {
    return await Datastore("DELETE FROM " + this.tableName + " WHERE id=" + id);
  }
}

module.exports = BaseDataTable;
