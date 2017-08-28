$(document).ready(function() {

  var cells = [],
    squares = [],
    num;
  var data = {
    'title': $(".title"),
    'grid': $("#grid"),
    'images': $("#images"),
    'button': $(":button"),
    'gridFull': false
  };

  // Размещение клеток(cells) и фрагментов(squares)
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
      cellInd: -1
    });
    var square = {
      self: _img,
      pos: _imgPos
    };

    squares.push(square);
    _img.appendTo(images);

  }


  data.cells = cells;
  data.squares = squares;

  var elems = $(".img");
  var parent = $(".scene");
  var cont = $("#images");
  var gridPos = $("#grid");

  // Драг фрагментов:
  //1. Нажатие левой кнопкой мыши по фрагменту
  elems.on('mousedown', function(event) {

    var elem = $(this);
    var pos = {};
    var num = elem.data('num');
    pos.begin = data.squares[num].pos;

    //Освобождение клетки от фрагмента
    var _cellInd = data.squares[num].self.data('cellInd');
    if (_cellInd != -1) {
      data.cells[_cellInd].self.data('full', false);
    }
    data.squares[num].self.data('cellInd', -1);

    pos.inner = {
      left: event.offsetX,
      top: event.offsetY
    };

    pos.parent = parent.offset();
    pos.cont = cont.offset();
    pos.grid = gridPos.offset();

    pos.new_pos = {
      left: getLeftPos(pos),
      top: getTopPos(pos)
    };

    elem.css(pos.new_pos);

    //2. Перенос фрагмента
    $(document).on('mousemove', function(event) {

      pos.new_pos = {
        left: getLeftPos(pos),
        top: getTopPos(pos)
      };

      elem.css(pos.new_pos);

    });

    // 3. Окончание переноса
    $(document).on('mouseup', function(event) {

      $(document).off('mouseup');
      $(document).off('mousemove');
      var left = pos.begin.left;
      var top = pos.begin.top;

      //Проверка постановки фрагмента
      if (inGrid(pos.new_pos)) {

        for (var i = 0; i < 9; i++) {

          var _cell = data.cells[i].self;
          var _cellPos = _cell.position();

          if ((inCell(pos.new_pos, _cellPos)) && (_cell.data('full') ==
              false)) {

            if ((_cellInd != -1) && (_cellInd != i)) {
              data.cells[_cellInd].self.data('full', false);
            }

            _cell.data('full', true);
            data.squares[num].self.data('cellInd', i);
            left = _cellPos.left - 460;
            top = _cellPos.top;

          }

        }

      }
      if ((left == pos.begin.left) && (top == pos.begin.top) && (
          _cellInd != -1)) {
        data.cells[_cellInd].self.data('full', false);
        data.squares[num].self.data('cellInd', -1);
      }
      elem.animate({
        left: left,
        top: top
      }, 500, function() {});

      //Активация кнопки "Готово"
      $('button').attr('disabled', true).css('background', '');

      //Проверка решения
      if (gridFull(data.cells)) {

        $('button').attr('disabled', false).css('background', 'red');

        $('button').on('click', function() {
          for (var i = 0; i < 9; i++) {

            var square = data.squares[i];
            var _cellId = square.self.data('cellInd');

            if (square.self.data('cellInd') != i) {

              // console.log(i);
              // console.log(_cellId);

              data.cells[_cellId].self.data('full', false);
              square.self.data('cellInd', -1);

              square.self.animate({
                left: square.pos.left,
                top: square.pos.top
              }, 500, function() {});

            }
          }
          $('button').attr('disabled', true).css('background',
            '');
        });

      }

    });

  });

});
