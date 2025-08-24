const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("hamlog", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

const QSO = sequelize.define("QSO", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  callsign: {
    type: DataTypes.STRING,
    allowNull: false
  },
  signal_report: DataTypes.STRING,
  channel: DataTypes.STRING,
  name: DataTypes.STRING,
  device: DataTypes.STRING,
  power: DataTypes.STRING,
  qth: DataTypes.STRING
}, {
  tableName: "qsos",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false
});

module.exports = { sequelize, QSO };
