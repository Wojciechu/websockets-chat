(function () {
  'use strict';

  $('form').on('submit', function (event) {
    var data = {
      username: $('#username').val()
    };
    $.ajax({
      url: "/login/salt", 
      type: 'POST',
      data: data,
      async: false,
      cache: false,
      success: function (salt) {
        $('#hash').val(CryptoJS.HmacSHA256($('#password').val(), salt).toString());
        $('#password').val('');
      }
    });
  });
})();