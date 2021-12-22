/**
 * simple example for an animation:
 * - the whole led strip will be filled with rainbow-colors
 * - 'offset' will be changed every loop, so that the rainbow circles through the strip
 *
 * see the 'loop()' function for the 'effect' animation
 */

const e131 = require('e131');
const config = require('./config');

const {numberOfLeds} = require('./config');
const {hsv2rgb, delay} = require('./helper');

const client = new e131.Client(config.ip); // or use a universe
const packet = client.createPacket(config.numberOfLeds * 3); // we want 8 RGB (x3) slots
const slotsData = packet.getSlotsData();
packet.setSourceName('test E1.31 client');
packet.setUniverse(0x01); // make universe number consistent with the client
packet.setOption(packet.Options.PREVIEW, true); // don't really change any fixture
packet.setPriority(packet.DEFAULT_PRIORITY); // not strictly needed, done automatically

/**
 * the color array holds our colors:
 * - one entry per led
 * - each value is a int, e.g. 0xFF0000 = red
 */
const colors = Array(numberOfLeds).fill(0);

let currentColor = 0; // iterator to rotate the colors
let delta = 360 / numberOfLeds; // delta to fill the whole strip with a rainbow

/**
 * arduino like:
 * - loop runs forever
 * - use `await delay(100)` to wait for 100ms
 *
 * add your fancy animation here
 */
async function loop() {
  for (let i = 0; i < config.numberOfLeds; i++) {
    colors[i] = hsv2rgb(currentColor, 100, 100); // hsv-color value (hue, saturation, value) w/ max values (360,100,100)
    currentColor = (currentColor + delta) % 360; // make the rainbow 
  }
  await delay(50); // wait 50 ms
  currentColor = currentColor - 10; // next round: offset the current color to move the rainbow
}

// ---------------------------------------
// just leave the stuff below as is is ;)
// ---------------------------------------

/**
 * syncs the color-array with e131 at 60fps
 */
function refreshColors() {
  for (let idx = 0; idx < config.numberOfLeds; idx++) {
    slotsData[idx * 3 + 2] = colors[idx] & 0xff;
    slotsData[idx * 3 + 1] = (colors[idx] >> 8) & 0xff;
    slotsData[idx * 3 + 0] = (colors[idx] >> 16) & 0xff;
  }

  client.send(packet, function () {
    setTimeout(refreshColors, 1000 / 60);
  });
}
refreshColors();

/**
 * run the loop function forever and ever and ever and.... until we reached eternity
 */
const runLoop = async () => {
  loop().then(() => {
    setTimeout(runLoop, 0);
  });
};
runLoop();
