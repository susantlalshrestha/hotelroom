const { connect } = require("../database/mongo");

const connectMongo = (req, res, next) => {
  connect()
    .then((connectedClient) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1); // Exit the application if the database connection fails
    });

  return next(); // Proceed to the next middleware or route handler
};

module.exports = { connectMongo };
