const fs = require('fs');
const dotenv = require('dotenv');

// Válassz környezeti fájlt
const envFile = process.env.ENVFILE || '.env';

// Töltsd be
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`[babel.config.js] Loaded env from ${envFile}`);
} else {
  console.warn(`[babel.config.js] Env file ${envFile} not found`);
}

module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        ['module:react-native-dotenv', {
          "moduleName": "@env",
          "path": process.env.ENVFILE || '.env',
          "safe": false,
          "allowUndefined": true
        }]
      ]
    };
  };