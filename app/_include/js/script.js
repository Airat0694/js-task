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
  var elem;

  elems.on('mousedown', function(event) {

    elem = $(this);
    var pos = {};

    pos.inner = {
      left: event.offsetX,
      top: event.offsetY
    };

    pos.begin = elem.position();
    pos.parent = parent.offset();
    pos.cont = cont.offset();

    $(document).on('mousemove', function(event) {

      pos.cursor = {
        left: event.pageX,
        top: event.pageY
      };

      console.log(getLeftPos(pos));
      // console.log(pos.parent.left - pos.cont.left);

      var new_pos = {
        left: getLeftPos(pos),
        top: getTopPos(pos)
      };

      elem.css(new_pos);
    });

    $(document).on('mouseup', function() {

      $(document).off('mousemove');
      // console.log();
      elem.animate({
        left: pos.begin.left,
        top: pos.begin.top
      }, 1000, function() {});

    });


  });



});
