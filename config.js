require('dotenv').config();

module.exports = {
  ip: process.env.IP,
  numberOfLeds: parseInt(process.env.NUMBER_OF_LEDS),
};
