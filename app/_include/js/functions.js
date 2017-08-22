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

function paint(num) {
  var x = (120 * (num % 4)) + "px";
  var y = (num < 4) ? "0px" : (num < 8) ? "120px" : "240px";
  var z = (num < 3) ? 0 : (num < 6) ? 1 : 2;
  var _div = $("<div>", {
      "class": "img img" + num
    })
    .css({
      "top": x,
      "right": y,
      "background": "url(_include/img/" + z + "_" + (num % 3) + ".png)"
    });
  return _div;
}
