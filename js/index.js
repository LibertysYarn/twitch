var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds"];
var usersToString = users.join(',').toLowerCase();


for (var i = 0; i < users.length; i++) {

  var urlSt = 'https://api.twitch.tv/kraken/streams?channel=' + usersToString + '&callback=?';
  var urlUs = 'https://api.twitch.tv/kraken/users/' + users[i] + '?callback=?';

  $.getJSON(urlUs, function getUserData(userData) {
    console.assert(users, 'users not given.');
    var displayName = userData.display_name;
    var logo = userData.logo;
    var url = userData._links.self;
    var bio = userData.bio;
    console.log(userData);

    $.getJSON(urlSt, function getStreamsData(streamsData) {
      for (i in streamsData) {
        if (streamsData.streams !== null) {
          var game = streamsData.streams[i].channel.game;
          var gameTitle = (streamsData.streams[i] !== null) ? game : '';
          var status = (data.streams[i] === null) ? "mdl-color--blue-grey-50" : "mdl-color-text--purple";
          console.log(streamsData);
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
