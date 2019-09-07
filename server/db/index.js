const db = require("./db");

// define table in db
const BetOddsTable = require("./BetOddsTable");

// associations go here if you have multiple tables; examples below

// Author.hasMany(Story)
// Story.belongsTo(Author)

// Author.hasMany(Comment)
// Comment.belongsTo(Author)

// Story.hasMany(Comment)
// Comment.belongsTo(Story)

module.exports = {
  db,
  BetOddsTable
};
