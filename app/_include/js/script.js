$(document).ready(function() {

  var data = {
    'parent': $(".scene"),
    'title': $(".title"),
    'problem': $(".problem"),
    'grid': $("#grid"),
    'images': $("#images"),
    'button': $(":button"),
    'gridFull': false
  };

  //Сохранение пропорций
  var prop = {};
  var _parentProp = {
    'width': data.parent.width(),
    'height': data.parent.height(),
    'border': getBorder(data.parent)
  }
  prop.grid = data.grid.width();
  prop.parent = _parentProp;
  data.prop = prop;


  // Размещение клеток(cells) и фрагментов(squares)
  var cells = [],
    frags = [],
    num;

  for (var i = 0; i < 9; i++) {

    var _cell = drawCell(i);
    _cell.appendTo(grid);
    var _cellPos = _cell.position();

    _cell.data({
      num: i,
      full: false
    });

    var cell = {
      self: _cell,
      pos: _cellPos
    };

    cells.push(cell);

    var _img = drawImg(i);
    _img.appendTo(images);
    var _imgPos = _img.position();

    _img.data({
      num: i,
      cellInd: -1
    });

    var frag = {
      self: _img,
      pos: _imgPos
    };

    frags.push(frag);

  }

  data.prop.frag = frags[0].self.width();
  data.cells = cells;
  data.frags = frags;
  data.elems = $(".img");



  // Драг фрагментов:
  //1. Нажатие левой кнопкой мыши по фрагменту
  data.elems.on('mousedown', function(event) {

    var elem = $(this);
    elem.addClass('drag');
    var pos = {};
    var num = elem.data('num');
    pos.begin = data.frags[num].pos;
    $('button').addClass('disabled');

    //Освобождение клетки от фрагмента
    var _cellInd = data.frags[num].self.data('cellInd');

    if (_cellInd != -1) {
      data.cells[_cellInd].self.data('full', false);
      data.cells[_cellInd].self.addClass('border');
    }
    data.frags[num].self.data('cellInd', -1);

    pos.inner = {
      left: event.offsetX,
      top: event.offsetY
    };

    pos.parent = data.parent.offset();
    pos.cont = data.images.offset();
    pos.grid = data.grid.offset();
    pos.new_pos = getNewPos(pos, data.prop);

    elem.css(pos.new_pos);

    //2. Перенос фрагмента
    $(document).on('mousemove', function(event) {

      pos.new_pos = getNewPos(pos, data.prop);

      elem.css(pos.new_pos);
      elem.addClass('move');

      for (var i = 0; i < 9; i++) {

        var _cell = data.cells[i].self;
        var _cellPos = _cell.position();

        _cell.toggleClass('color', inCell(pos, _cellPos,
          prop.frag));

      }

    });

    // 3. Окончание переноса
    $(document).on('mouseup', function(event) {

      $(document).off('mouseup');
      $(document).off('mousemove');
      elem.removeClass('move');
      var left = pos.begin.left;
      var top = pos.begin.top;

      //Проверка постановки фрагмента
      if (inGrid(pos, data.prop)) {

        for (var i = 0; i < 9; i++) {

          var _cell = data.cells[i].self;
          var _cellPos = _cell.position();

          if ((inCell(pos, _cellPos, prop.frag)) && (_cell.data(
              'full') == false)) {

            if ((_cellInd != -1) && (_cellInd != i)) {
              data.cells[_cellInd].self.data('full', false);
            }

            _cell.data('full', true);
            _cell.removeClass('border');

            data.frags[num].self.data('cellInd', i);
            left = _cellPos.left - 460;
            top = _cellPos.top;

          }

        }

      }
      if ((left == pos.begin.left) && (top == pos.begin.top) &&
        (_cellInd != -1)) {
        data.cells[_cellInd].self.data('full', false);
        data.frags[num].self.data('cellInd', -1);
      }

      elem.animate({
        left: left,
        top: top
      }, 500, function() {

        elem.removeClass('drag');
        _cellInd = elem.data('cellInd');
        if (_cellInd != -1) {
          data.cells[_cellInd].self.removeClass('color');
        }
        //Активация кнопки "Готово"
        data.button.toggleClass('disabled', !gridFull(data.cells));

      });

    });

  });

  //Проверка постановки всех фрагментов,
  //Нажатие по кнопке "Готово"
  data.button.on('click', function() {

    if (gridFullTrue(data.frags)) {

      data.problem.text('');
      data.elems.addClass('disabled');
      data.parent.fadeOut(2000, function() {
        data.button.off('click');
      });

    } else {

      var actions = [];

      actions.push(elemsDisabled(data.elems));
      actions.push(buttonRed(data.button));

      var anim = [];

      $.when.apply($, actions).done(function() {

        for (var i = 0; i < 9; i++) {

          var _frag = data.frags[i];
          var _cellId = _frag.self.data('cellInd');
          var _cell = data.cells[_cellId].self;

          if (_cellId != i) {

            _cell.data('full', false);
            _cell.addClass('border');
            _frag.self.data('cellInd', -1);

            anim.push(_frag.self.animate(_frag.pos, 500, function() {}));

          }

        }
        $.when.apply($, anim).done(function() {
          data.problem.text('Неправильно. Попробуй еще раз.');
        });

      });

    }

    data.problem.addClass('disabled');

  });

});
