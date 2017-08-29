function draw(num) {

  var x = (120 * (num % 3)) + "px";
  var y = (num < 3) ? "0px" : (num < 6) ? "120px" : "240px";

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
      "left": y
    });
  return _div;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getLeftPos(pos) {

  var left = event.pageX - pos.inner.left -
    pos.cont.left;
  var leftMax = pos.parent.left - pos.cont.left + 846;
  var leftMin = pos.parent.left - pos.cont.left + 6;
  return (left < leftMin) ? leftMin : (left > leftMax) ? leftMax : left;

}

function getTopPos(pos) {

  var top = event.pageY - pos.inner.top -
    pos.cont.top;
  var topMin = pos.parent.top - pos.cont.top + 6;
  var topMax = pos.parent.top - pos.cont.top + 446;
  return (top < topMin) ? topMin : (top > topMax) ? topMax : top;

}

function inGrid(pos) {

  if ((pos.left > -520) && (pos.left <= -160) &&
    (pos.top > -60) && (pos.top <= 300)) {
    return true;
  }
  return false;
}

function inCell(pos, cellPos) {

  if ((pos.left > cellPos.left - 520) && (pos.left <= cellPos.left - 400) &&
    (pos.top > cellPos.top - 60) && (pos.top <= cellPos.top + 60)) {
    return true;
  }
  return false;

}

function gridFull(cells) {

  for (var i = 0; i < 9; i++) {
    if ((cells[i].self.data('full')) == false) {
      return false;
    }
  }
  return true;

}

function gridFullTrue(squares) {

  for (var i = 0; i < 9; i++) {
    if (squares[i].self.data('cellInd') != i) {
      return false;
    }
  }
  return true;

}

function elemsDisabled(elems) {

  var def = $.Deferred();
  elems.addClass('disabled');
  setTimeout(function() {
    elems.removeClass('disabled');
    def.resolve();
  }, 1000);

  return def;
}

function buttonRed() {

  var def = $.Deferred();
  $('button').addClass('wrong');
  setTimeout(function() {
    $('button').removeClass('wrong');
    def.resolve();
  }, 1000);

  return def;
}
