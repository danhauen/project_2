var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/example.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/404.html"));
  });
};
