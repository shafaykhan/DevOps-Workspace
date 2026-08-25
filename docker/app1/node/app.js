const express = require("express");
const os = require("os");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV_VALUE || "No env set";
const HOSTNAME = os.hostname();

// Log every request
app.use((req, res, next) => {
      console.log(
          `[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}`
      );
      next();
});

// Home
app.get("/", (req, res) => {
      console.log("Home API called");

      res.json({
            message: "Hello from Simple App (Node.js Express)",
            env: ENV,
            container: HOSTNAME
      });
});

// Health
app.get("/health", (req, res) => {
      console.log("Health API called");

      res.json({
            status: "UP",
            timestamp: new Date().toISOString()
      });
});

// Info
app.get("/info", (req, res) => {
      console.log("Info API called");

      res.json({
            hostname: HOSTNAME,
            environment: ENV,
            nodeVersion: process.version,
            platform: process.platform
      });
});

// Greeting
app.get("/greet/:name", (req, res) => {
      console.log(`Greeting requested for ${req.params.name}`);

      res.json({
            message: `Hello, ${req.params.name}!`
      });
});


app.listen(PORT, () => {
      console.log("=================================");
      console.log("🚀 Node.js Application Started");
      console.log(`🌍 Environment : ${ENV}`);
      console.log(`📦 Container   : ${HOSTNAME}`);
      console.log(`🚪 Port        : ${PORT}`);
      console.log("=================================");
});
