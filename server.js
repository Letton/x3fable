// server.js
require("dotenv").config();
const http = require("http");
const https = require("https");
const { parse } = require("url");
const sequelize = require("./db");
const models = require("./models");
const next = require("next");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  app.prepare().then(() => {
    if (process.env.NODE_ENV === "production") {
      const options = {
        key: fs.readFileSync("/etc/letsencrypt/live/letton.tech/privkey.pem"),
        cert: fs.readFileSync("/etc/letsencrypt/live/letton.tech/cert.pem"),
        ca: fs.readFileSync("/etc/letsencrypt/live/letton.tech/chain.pem"),
      };
      https
        .createServer(options, (req, res) => {
          // Be sure to pass `true` as the second argument to `url.parse`.
          // This tells it to parse the query portion of the URL.
          const parsedUrl = parse(req.url, true);
          handle(req, res, parsedUrl);
        })
        .listen(port, (err) => {
          if (err) throw err;
          console.log(`> Ready on https://${hostname}:${port}`);
        });
    } else {
      http
        .createServer((req, res) => {
          // Be sure to pass `true` as the second argument to `url.parse`.
          // This tells it to parse the query portion of the URL.
          const parsedUrl = parse(req.url, true);
          handle(req, res, parsedUrl);
        })
        .listen(port, (err) => {
          if (err) throw err;
          console.log(`> Ready on http://${hostname}:${port}`);
        });
    }
  });
})();
