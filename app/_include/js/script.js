$(document).ready(function() {

  var cells = [],
    squares = [],
    num;
  var data = {
    'title': $(".title"),
    'grid': $("#grid"),
    'images': $("#images"),
    'button': $(":button")
  };

  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (var i = 0; i < 9; i++) {

    var _cell = draw(i);
    cells.push(_cell);
    _cell.appendTo(grid);

    num = getRandomInt(0, arr.length);
    var _img = paint(i, arr[num]);
    arr.splice(num, 1);
    squares.push(_img);
    _img.appendTo(images);

  }

  data.cells = cells;
  data.squares = squares;

});
