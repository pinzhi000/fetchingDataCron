const path = require("path");
const express = require("express");
const volleyball = require("volleyball");

const app = express();
module.exports = app;

// logging middleware
app.use(volleyball);

// Routes that will be accessed via AJAX should be prepended with /api so they are isolated from our GET /* wildcard.
// app.use("/api", require("./api"));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static file-serving middleware --> no publi folder
// app.use(express.static(path.join(__dirname, "..", "public")));

// This middleware will catch any URLs resembling a file extension, for example: .js, .html, .css
// This allows for proper 404s instead of the wildcard '#<{(|' catching URLs that bypass express.static because the given file does not exist.
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

// Sends our index.html from client folder (don't have right now)
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
