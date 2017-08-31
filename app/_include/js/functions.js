function getBorder(div) {

  var str = div.css('border-width');
  return +str.substring(0, str.length - 2);

}

function drawCell(i) {

  var x = (120 * (i % 3)) + "px";
  var y = (i < 3) ? "0px" : (i < 6) ? "120px" : "240px";
  var _div = $("<div>", {
      "class": "cell cell" + i + " border"
    })
    .css({
      "left": x,
      "top": y
    });
  return _div;

};

function drawImg(i) {

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

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getNewPos(pos, prop) {

  var left, leftMax, leftMin, top, topMax, topMin, new_pos;

  left = event.pageX - pos.inner.left - pos.cont.left;
  leftMax = pos.parent.left - pos.cont.left + prop.parent.width - prop.frag;
  leftMin = pos.parent.left - pos.cont.left + prop.parent.border;
  left = (left < leftMin) ? leftMin : (left > leftMax) ? leftMax : left;

  top = event.pageY - pos.inner.top - pos.cont.top;
  topMin = pos.parent.top - pos.cont.top + prop.parent.border;
  topMax = pos.parent.top - pos.cont.top + prop.parent.height - prop.frag;
  top = (top < topMin) ? topMin : (top > topMax) ? topMax : top;

  return {
    left: left,
    top: top
  };

}

function inGrid(pos, prop) {

  var new_pos = pos.new_pos;
  var gridLeft, gridRight, gridTop, gridBottom;

  gridLeft = pos.grid.left - pos.cont.left - prop.frag / 2;
  gridRight = pos.grid.left - pos.cont.left - prop.frag / 2 + prop.grid;
  gridTop = -prop.frag / 2;
  gridBottom = prop.grid - prop.frag / 2;

  if ((new_pos.left > gridLeft) && (new_pos.left <= gridRight) &&
    (new_pos.top > gridTop) && (new_pos.top <= gridBottom)) {
    return true;
  }
  return false;
}

function inCell(pos, cellPos, fragProp) {

  var cellLeft, cellRight, cellTop, cellBottom;
  var newPos = pos.new_pos;

  cellLeft = cellPos.left + pos.grid.left - pos.cont.left - fragProp / 2;
  cellRight = cellPos.left + pos.grid.left - pos.cont.left + fragProp / 2;
  cellTop = cellPos.top - fragProp / 2;
  cellBottom = cellPos.top + fragProp / 2;

  if ((newPos.left > cellLeft) && (newPos.left <= cellRight) &&
    (newPos.top > cellTop) && (newPos.top <= cellBottom)) {
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

function gridFullTrue(frags) {

  for (var i = 0; i < 9; i++) {
    if (frags[i].self.data('cellInd') != i) {
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

function buttonRed(button) {

  var def = $.Deferred();
  button.addClass('wrong');
  setTimeout(function() {
    button.removeClass('wrong');
    def.resolve();
  }, 1000);
  return def;

}
