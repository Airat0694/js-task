function draw(num) {

  var x = (120 * (num % 3)) + "px";
  var y = (num < 3) ? "0px" : (num < 6) ? "120px" : "240px";
  // y = y + "px";
  var _div = $("<div>", {
      "class": "square square" + num
    })
    .css({
      "left": x,
      "top": y
    });
  return _div;

};

function paint(i) {

  var x = getRandom(0, 2) * 120 + "px";
  var y = getRandom(0, 2) * 120 + "px";
  var _div = $("<div>", {
      "class": "img img" + i
    })
    .css({
      "top": x,
      "right": y
    });
  return _div;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
