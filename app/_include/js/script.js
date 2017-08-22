$(document).ready(function() {
<<<<<<< HEAD

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

=======
  // for (var i = 0; i < 9; i++) {
  //   $("#grid").append("<span></span>");
  // }
  // alert('sssss');

  function draw(i) {
    var y = (i < 3) ? 0 : (i < 6) ? 120 : 240;
    var x = 120 * (i % 3);
    $("#grid").append('<div class="square square' + i +
      '"style="left:' + x + 'px; top:' + y + 'px;"></div>'
    );
  }

  for (var i = 0; i < 9; i++) {
    draw(i);
  }
>>>>>>> caa11fe0bcdd43868977bdbe3dbc1b3bc34ea21f

});
