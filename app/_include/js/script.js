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

  // var cellFull = {};

  for (var i = 0; i < 9; i++) {

    var _cell = draw(i);
    var _cellPos = {
      left: _cell.css('left'),
      top: _cell.css('top')
    };
    var cell = {
      self: _cell,
      pos: _cellPos
    };
    _cell.data({
      num: i,
      full: false
    });
    cells.push(cell);
    _cell.appendTo(grid);

    var _img = paint(i);
    var _imgPos = {
      left: _img.css('left'),
      top: _img.css('top')
    };
    _img.data({
      num: i,
      cellDo: -1
    });
    var square = {
      self: _img,
      pos: _imgPos
    };

    squares.push(square);
    _img.appendTo(images);

    // cellFull[i] = false;
  }
  //
  // console.log(cells);
  // console.log(squares);

  data.cells = cells;
  // console.log(data.cells);
  data.squares = squares;

  // data.cellFull = cellFull;
  // console.log(data);
  var elems = $(".img");
  var parent = $(".scene");
  var cont = $("#images");
  var gridPos = $("#grid");

  elems.on('mousedown', function(event) {

    var elem = $(this);
    var pos = {};
    var num = elem.data('num');
    var obj = data.squares[num];
    pos.begin = data.squares[num].pos;

    pos.inner = {
      left: event.offsetX,
      top: event.offsetY
    };

    pos.parent = parent.offset();
    pos.cont = cont.offset();
    pos.grid =
      gridPos.offset();

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
      var left = pos.begin.left;
      var top = pos.begin.top;
      if (inGrid(pos.new_pos)) {
        for (var i = 0; i < 9; i++) {
          var el = data.cells[i];
          var cellPos = el.self.position();
          if ((inCell(pos.new_pos, cellPos)) && (el.self.data(
              'full') == false)) {
            if ((data.squares[num].self.data('cellDo') != -1) && (
                data.squares[num].self.data('cellDo') != i)) {
              var cellInd = data.squares[num].self.data('cellDo');
              data.cells[cellInd].self.data('full', false);
            }
            el.self.data('full', true);
            data.squares[num].self.data('cellDo', i);
            left = cellPos.left - 460;
            top = cellPos.top;
          }
        }
      }
      if ((left == pos.begin.left) && (top == pos.begin.top) && (
          data.squares[num].self.data('cellDo') != -1)) {
        var cellInd = data.squares[num].self.data('cellDo');
        data.cells[cellInd].self.data('full', false);
        data.squares[num].self.data('cellDo', -1);
      }
      elem.animate({
        left: left,
        top: top
      }, 500, function() {});
    });


  });


});
