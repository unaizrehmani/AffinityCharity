const cloudinary = require("cloudinary");

let configVars;
try {
  configVars = require("../../config.json");
} catch (err) {
  console.log(err);
}

cloudinary.config({
  cloud_name: process.env.cloud_name || configVars.cloud_name,
  api_key: process.env.api_key || configVars.api_key,
  api_secret: process.env.api_secret || configVars.api_secret
});

module.exports = cloudinary;
