$(document).ready(function() {
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

});
