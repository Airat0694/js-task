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

  var left = pos.cursor.left - pos.inner.left -
    pos.cont.left;
  var leftMax = pos.parent.left - pos.cont.left + 846;
  var leftMin = pos.parent.left - pos.cont.left + 6;
  return (left < leftMin) ? leftMin : (left > leftMax) ? leftMax : left;

}

function getTopPos(pos) {

  var top = pos.cursor.top - pos.inner.top -
    pos.cont.top;
  var topMin = pos.parent.top - pos.cont.top + 6;
  var topMax = pos.parent.top - pos.cont.top + 446;
  return (top < topMin) ? topMin : (top > topMax) ? topMax : top;

}

function inGrid(pos) {

  if ((pos.left > -520) && (pos.left < -160) &&
    (pos.top > -60) && (pos.top < 300)) {
    return true;
  }
  return false;
}

function attractLeft(left) {
  left = (left < (-400)) ? -460 : (left < (-280)) ? -340 : -220;
  return left;
}

function attractTop(top) {
  top = (top < 60) ? 0 : (top < 180) ? 120 : 240;
  return top;
}

function getGoodPos(pos, cellFull) {

  var left = pos.left;
  var top = pos.top;
  var result;
  var fold = 'no';

  if ((left > -520) && (left < -160) &&
    (top > -60) && (top < 300)) {
    fold = 'yes';
  }

  if (fold == 'yes') {
    if (top < 60) {
      if ((left < (-400)) && (cellFull[0] == false)) {
        result = [-460, 0];
        cellFull[0] = true;
      } else if ((left < (-280)) && (cellFull[1] == false)) {
        result = [-340, 0];
        cellFull[1] = true;
      } else if ((left >= (-280)) && (cellFull[2] == false)) {
        result = [-220, 0];
        cellFull[2] = true;
      }
    } else if (top < 180) {
      if ((left < (-400)) && (cellFull[3] == false)) {
        result = [-460, 120];
        cellFull[3] = true;
      } else if ((left < (-280)) && (cellFull[4] == false)) {
        result = [-340, 120];
        cellFull[4] = true;
      } else if ((left >= (-280)) && (cellFull[5] == false)) {
        result = [-220, 120];
        cellFull[5] = true;
      }
    } else {
      if ((left < (-400)) && (cellFull[6] == false)) {
        result = [-460, 240];
        cellFull[6] = true;
      } else if ((left < (-280)) && (cellFull[7] == false)) {
        result = [-340, 240];
        cellFull[7] = true;
      } else if ((left >= (-280)) && (cellFull[8] == false)) {
        result = [-220, 240];
        cellFull[8] = true;
      }
    }
    if (result != undefined) {
      return [result[0], result[1], cellFull, fold];
    }
  }
  return [left, top, cellFull, 'no'];
}
