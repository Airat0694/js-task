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

function paint(i, num) {
  var x = (120 * (i % 4)) + "px";
  var y = (i < 4) ? "0px" : (i < 8) ? "120px" : "240px";
  var _div = $("<div>", {
      "class": "img img" + num
    })
    .css({
      "top": x,
      "right": y
    });
  return _div;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
