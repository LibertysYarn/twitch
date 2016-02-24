$(document).ready(function() {


  var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds"];

  var a1 = $.get(('https://api.twitch.tv/kraken/users/' + users[i]), function(data) {
    var logo = data.logo;
    var name = data.display_name;
    var bio = data.bio;
    console.log(bio);
  }, 'jsonp');

  var a2 = $.get(('https://api.twitch.tv/kraken/streams/' + users[i]), function(data) {
    var game = data.game;
    var url = data.url;
    var status = (status == null) ? "mdl-color--blue-grey-50" : "mdl-color-text--purple";
  }, 'jsonp');

  $.when(a1, a2).done(function(r1, r2) {
    function reqListener() {
      if (status === 200) {
        var twitch = '';
        for (var i = 0; i < users.length; i++) {

          twitch += '<li class="mdl-list__item mdl-list__item--three-line"><a href="' + r2.url[i] + '"<span class="mdl-list__item-primary-content"><i src="' + r1.logo[i] + '" class="material-icons mdl-list__item-avatar"></i></a>';
          twitch += '<span>' + r1.name[i] + '</span><span class="mdl-list__item-text-body"><p>' + r1.bio[i] + '</p>';
          twitch += '"</span></span><span class="mdl-list__item-secondary-content"><a class="mdl-list__item-secondary-action" href="' + r2.url[i] + '"></a><i class="material-icons' + r2.status[i] + '">star</i></span></li>"';
        }
        content = document.getElementById('list');
        content.innerHTML = twitch;
      }
    }
  });

});
