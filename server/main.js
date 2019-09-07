const PORT = 8000;
const server = require("./index");
const { db } = require("./db/index");

db.sync({ force: true }).then(() => {
  server.listen(PORT, () =>
    console.log(`Listening on port ${PORT}
    http://localhost:${PORT}/`)
  );
});
