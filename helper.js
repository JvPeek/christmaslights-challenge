let convert = require('color-convert');

const limit = (v, min, max) => Math.max(Math.min(v, max), min);

const hsv2rgb = (h, s, v) => {
  let rgb = convert.hsv.rgb(
    limit(h % 360, 0, 360),
    limit(s, 0, 100),
    limit(v, 0, 100)
  );
  return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
};

const delay = time => new Promise(resolve => setTimeout(resolve, time));

module.exports = {
  limit,
  hsv2rgb,
  delay,
};
