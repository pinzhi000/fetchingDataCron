const Sequelize = require("sequelize");
const db = require("./db");

const BetOddsTable = db.define("betoddstable", {
  name: {
    type: Sequelize.STRING
  },
  OPENING: {
    type: Sequelize.STRING
  },
  BETONLINE: {
    type: Sequelize.STRING
  },
  INTERTOPS: {
    type: Sequelize.STRING
  },
  SPORTSBETTING: {
    type: Sequelize.STRING
  },
  GTBETS: {
    type: Sequelize.STRING
  },
  "5DIMES": {
    type: Sequelize.STRING
  },
  SPORTBET: Sequelize.STRING
});

module.exports = BetOddsTable;

// implement version control
