var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds"];
var names = users.join(',').toLowerCase();


for (var i = 0; i < users.length; i++) {

  var urlSt = 'https://api.twitch.tv/kraken/streams?channel=' + names + '&callback=?';
  var urlUs = 'https://api.twitch.tv/kraken/users/' + users[i] + '?callback=?';

  $.getJSON(urlUs, function(u) {
    var displayName = u.display_name;
    var logo = u.logo;
    var url = u._links.self;
    var bio = u.bio;
    console.log(u);

    $.getJSON(urlSt, function(s) {
      for (i in s) {
        if (s.streams !== null) {
          var game = s.streams[i].channel.game;
          var gameTitle = (s.streams[i] !== null) ? game : '';
          var status = (data.streams[i] === null) ? "mdl-color--blue-grey-50" : "mdl-color-text--purple";
          console.log(s);
        }
      }

      twitch = '';
      twitch += '<li class="mdl-list__item mdl-list__item--three-line"><a href="' + url[i] + '"<span class="mdl-list__item-primary-content"><i src="' + logo[i] + '" class="material-icons mdl-list__item-avatar"></i></a>';
      twitch += '<span>' + displayName[i] + '</span><span class="mdl-list__item-text-body"><p>' + bio[i] + '</p><p class="gameTitle">' + gameTitle[i] + '</p>';
      twitch += '"</span></span><span class="mdl-list__item-secondary-content"><a class="mdl-list__item-secondary-action" href="' + url[i] + '"></a><i id="star"  class="material-icons' + status[i] + '">star</i></span></li>"';
    })
    var content = document.getElementById('list');
    content.innerHTML = twitch;

  });
}
