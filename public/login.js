(function () {
  'use strict';
  $('form').on('submit', function (event) {
    $.ajax({
      url: "/login/salt", 
      type: 'GET',
      async: false,
      cache: false,
      success: function(salt) {
        $('#hash').val(CryptoJS.HmacSHA256($('#password').val(), salt).toString());
        $('#password').val('');
      }
    });
  });
})();