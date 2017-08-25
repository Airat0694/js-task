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

  var posCells = {};
  var posImg = {};
  var cellFull = {};

  for (var i = 0; i < 9; i++) {

    var _cell = draw(i);
    cells.push(_cell);
    _cell.appendTo(grid);
    posCells[i] = _cell.position();

    var _img = paint(i);
    squares.push(_img);
    _img.appendTo(images);
    posImg[i] = _img.position();

    cellFull[i] = false;
  }

  data.cells = cells;
  data.squares = squares;
  data.posCells = posCells;
  data.posImg = posImg;
  data.cellFull = cellFull;

  var elems = $(".img");
  var parent = $(".scene");
  var cont = $("#images");
  var gridPos = $("#grid");
  var elem;

  elems.on('mousedown', function(event) {

    elem = $(this);
    var pos = {};
    var num = elem.attr("class").substr(-1);
    elem.index = num;
    pos.begin = data.posImg[num];

    pos.inner = {
      left: event.offsetX,
      top: event.offsetY
    };

    pos.parent = parent.offset();
    pos.cont = cont.offset();
    pos.grid = gridPos.offset();

    $(document).on('mousemove', function(event) {

      pos.cursor = {
        left: event.pageX,
        top: event.pageY
      };

      var new_pos = {
        left: getLeftPos(pos),
        top: getTopPos(pos)
      };
      pos.new_pos = new_pos;
      elem.css(new_pos);
    });

    $(document).on('mouseup', function(event) {
      $(document).off('mouseup');
      $(document).off('mousemove');

      var res = getGoodPos(pos.new_pos, data.cellFull); //проверка
      var leftFinal = res[0];
      var topFinal = res[1];
      data.cellFull = res[2];

      if (res[3] == 'no') {
        elem.animate({
          left: pos.begin.left,
          top: pos.begin.top
        }, 1000, function() {});
      } else if (res[3] == 'yes') {
        elem.animate({
          left: leftFinal,
          top: topFinal
        }, 1000, function() {});
      }

    });


  });


});
