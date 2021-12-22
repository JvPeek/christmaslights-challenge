const e131 = require('e131');
const config = require('./config');

const client = new e131.Client(config.ip); // or use a universe
const packet = client.createPacket(config.numberOfLeds * 3); // we want 8 RGB (x3) slots
const slotsData = packet.getSlotsData();
packet.setSourceName('test E1.31 client');
packet.setUniverse(0x01); // make universe number consistent with the client
packet.setOption(packet.Options.PREVIEW, true); // don't really change any fixture
packet.setPriority(packet.DEFAULT_PRIORITY); // not strictly needed, done automatically

// slotsData is a Buffer view, you can use it directly
let color = 0;
function cycleColor() {
  for (let idx = 0; idx < slotsData.length; idx++) {
    slotsData[idx] = color % 0xff;
    color = color + 90;
  }
  client.send(packet, function () {
    setTimeout(cycleColor, 25);
  });
}
cycleColor();
