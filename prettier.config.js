/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
  plugins: [import("prettier-plugin-tailwind")],
  tailwindFunctions: ["cn"],
};

module.exports = config;
