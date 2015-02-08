(function () {
  'use strict';
  $('form').on('submit', function (event) {
    $.ajax({
      url: "/login/salt", 
      type: 'GET',
      async: false,
      cache: false,
      success: function(salt) {
        var username = $('#username').val();
        var password = CryptoJS.SHA256($('#password').val());
        $('#password').val('');
        $('#passwordHash').val(CryptoJS.SHA256(username + password + salt).toString());
      }
    });
  });
})();