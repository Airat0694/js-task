$(document).ready(function() {

  var cells = [],
    squares = [];
  var grid = $("#grid");
  var images = $("#images");

  for (var num = 0; num < 9; num++) {

    var _cell = draw(num);
    cells.push(_cell);
    _cell.appendTo(grid);

    var _img = paint(num);
    squares.push(_img);
    _img.appendTo(images);

  }

});
