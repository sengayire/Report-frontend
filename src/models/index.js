
import Sequelize from 'sequelize';

// const sequelize = new Sequelize('postgres://postgres:12345@localhost:5432/reportapp');
const sequelize = new Sequelize({
  host: 'localhost',
  database: 'reportapp',
  username: 'postgres',
  password: '12345',
  port: '5432',
  dialect: 'postgres',
});

// User
const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  fullName: { type: Sequelize.STRING, allowNull: false },
  userName: { type: Sequelize.STRING, allowNull: false },
  phone: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: true },
  password: { type: Sequelize.STRING, allowNull: false },
  isAdmin: { type: Sequelize.BOOLEAN, allowNull: true },
});

// Report
const Report = sequelize.define('report', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: Sequelize.INTEGER, allowNull: true },
  organizationId: { type: Sequelize.INTEGER, allowNull: true },
  type: { type: Sequelize.STRING, allowNull: false },
  report: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: true },
  latitude: { type: Sequelize.DECIMAL, allowNull: true },
  longitude: { type: Sequelize.DECIMAL, allowNull: true },
  status: { type: Sequelize.STRING, allowNull: true },
});

// Organization
const Organization = sequelize.define('organization', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
});

// foreign keys
Report.belongsTo(User);
Report.belongsTo(Organization);

sequelize.sync().then(() => {
  console.log('tables created');
});

export { User, Report, Organization };