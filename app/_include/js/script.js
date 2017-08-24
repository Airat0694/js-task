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


  var elems = $(".img");
  var parent = $(".scene");
  var cont = $("#images");

  elems.on('mousedown', function(event) {

    var elem = $(this);
    var pos = {};

    pos.inner = {
      left: event.offsetX,
      top: event.offsetY
    };

    pos.parent = parent.offset();
    pos.cont = cont.offset();

    document.onmousemove = function(event) {

      pos.cursor = {
        left: event.pageX,
        top: event.pageY
      };

      var new_pos = {
        left: getLeftPos(pos),
        top: getTopPos(pos)
      };

      elem.css(new_pos);
    };

    document.onmouseup = function() {
      document.onmousemove = false;
    };

  });



});
