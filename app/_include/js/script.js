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

  for (var i = 0; i < 9; i++) {

    var _cell = draw(i);
    cells.push(_cell);
    _cell.appendTo(grid);

    var _img = paint(i);
    squares.push(_img);
    _img.appendTo(images);

  }

  data.cells = cells;
  data.squares = squares;

});
