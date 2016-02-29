var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds"];
twitch = '';
var gameTitle = '';

for (var i = 0; i < users.length; i++) {
  var urlSt = 'https://api.twitch.tv/kraken/streams?channel=' + users[i] + '&callback=?';
  var urlUs = 'https://api.twitch.tv/kraken/users/' + users[i] + '?callback=?';

  $.getJSON(urlUs, function getUserData(userData) {
    console.assert(users, 'users not given.');
    console.log('user api called', userData);
    var displayName = userData.display_name;
    var name = userData.name;
    var logo = userData.logo;
    var url = userData._links.self;
    var userBio = userData.bio;
    var bio = (userBio !== null) ? userBio : '';


    $.getJSON(urlSt, function getStreamsData(streamsData) {
      console.log('stream api called', streamsData);
      for (streams in streamsData) {
        if (streamsData.streams[i] === null) {
          var status = "mdl-color--blue-grey-50";
        } else {
        //  var gameTitle = streamsData.streams[i].channel.game;
          var status = "mdl-color-text--purple";
        }
        console.log('stream  data touched');
      }


      twitch += '<li id="' + displayName + '" class="mdl-list__item mdl-list__item--three-line">';
      twitch += '<a href="http://www.twitch.tv/' + name + '"><span class="mdl-list__item-primary-content">';
      twitch += '<i src="' + logo + '" class="material-icons mdl-list__item-avatar"></i>';
      twitch += '<span>' + displayName + '</span></a>';
      twitch += '<span class="mdl-list__item-text-body"><p>' + bio + '</p>';
      twitch += '<p class="gameTitle">' + gameTitle + '</p></span></span>';
      twitch += '<span class="mdl-list__item-secondary-content">';
      twitch += '<a class="mdl-list__item-secondary-action" href="http://www.twitch.tv/' + name + '"></a>';
      twitch += '<i id="star" class="material-icons' + status + '"></i></span></li>';

      var content = document.getElementById('list');
      content.innerHTML = twitch;
    })
  })
}
