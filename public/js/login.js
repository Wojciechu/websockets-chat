'use-strict';

var loginModule = (function () {
  var _private = {
    /**
     * Submits user credentials
     */
    submitCredentials: function () {
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
    }
  };

  return {
    init: function () {
      $('form').on('submit', _private.submitCredentials);
      $('input').on('keyup', function () {
        $('.error').hide();
      });
    }
  };
})();

(function () {
  loginModule.init();
})();