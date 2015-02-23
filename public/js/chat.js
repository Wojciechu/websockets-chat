'use-strict';

var chatModule = (function () {
  var socket = io();

  var _private = {
    /**
     * Function which submits message
     */
    submitMessage: function () {
      var $message = $('.send-box input');
      socket.emit('chat-message', $message.val());
      $message.val('');
      return false;
    },

    /**
     * Function toggles sount notification between on/off
     */
    toggleSoundNotification: function () {
      var $this = $(this);
      if ($this.hasClass('sound-on')) {
        $this.removeClass('sound-on');
      }
      else {
        $this.addClass('sound-on');
      }
    },

    /**
     * Binds websocket events which are called by server
     */
    bindSocketEvents: function () {
      var urlPattern = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      
      /**
       * Called when message comes 
       * @param   {Object}  data      Message related data
       * @param   {Number}  data.id   Temp message id
       * @param   {String}  data.user Name of user which sent message
       * @param   {String}  data.msg  Message content
       * @param   {String}  data.time Time of sending message
       */
      socket.on('chat-message', function (data) {
        var message = data.msg;
        var notification = $('.notify-sound').hasClass('sound-on');

        message = message.replace(urlPattern, function (value) {
          return '<a href="{0}" target="_blank">{0}</a>'.format(value);
        });

        message = '<li><span class="nr">#{0}</span><span class="who">{1}:</span><span>{2}</span><span class="time">{3}</span></li>'.format(data.id, data.user, message, data.time);

        if(notification) {
          $('#notification')[0].play();
        }

        $('.messages').prepend(message);
      });

      /**
       * Called when user list changes
       * @param  {Array}  users   String array contains usernames
       */
      socket.on('registered-users', function (users) {
        var $users = $('.users-list');
        var $count = $('.count');

        $count.empty();
        $count.append(users.length);

        $users.empty();

        users.forEach(function (value) {
          $users.append('<li>{0}</li>'.format(value));
        });
      });
    }
  };

  return {
    init: function () {
      var name = $('.name').attr('data-username'); 
      socket.emit('name-addition', name);

      $('.send-box').on('submit', _private.submitMessage);
      $('.notify-sound').on('click', _private.toggleSoundNotification);
      _private.bindSocketEvents();
    }
  };
})();

(function () {
  chatModule.init();
})();