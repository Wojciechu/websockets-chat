(function () {
  'use strict';
  $('form').on('submit', function (event) {
    event.preventDefault();
    console.log($(this).serializeArray());
  });
})();