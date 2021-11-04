const express = require("express");
const winston = require("winston");

const PORT = process.env.PORT;

const log = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ],
});

const app = express();

app.use("/profile", require("./routes/profile"))

app.get("/", (req, res) => res.send("Success!"))

app.listen({port: PORT}, () =>
  log.info(`App started on port ${PORT}`),
);