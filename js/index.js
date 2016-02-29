var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds"];
var twitch = '';
var status = "lighten-5";


for (var i = 0; i < users.length; i++) {
  //var urlSt = 'https://api.twitch.tv/kraken/streams?channel=' + users[i] + '&callback=?';
  var urlUs = 'https://api.twitch.tv/kraken/users/' + userName + '?callback=?';
  var userName = users[i];

  $.getJSON(urlUs, function getUserData(userData) {
    var displayName = userData.display_name;
    var name = userData.name;
    var userLogo = userData.logo;
    var logo = (userLogo !== null) ? userLogo : ''; 
    var url = userData._links.self;
    var userBio = userData.bio;
    var bio = (userBio !== null) ? userBio : '';
    var gameTitle = '';
    console.assert(users, 'users not given.');
    console.log(userName, 'user api called');
    testOnline(userName);

        twitch += '<li id="' + displayName + '" class="collection-item avatar"><img src="' + logo + '" alt="" class="circle">'
        twitch += '<span class="title">' + displayName + '</span>'
        twitch += '<p>' + bio + '</p>'
        twitch += '<p>' + gameTitle + '</p>'
        twitch += '<a href="http://www.twitch.tv/' + name + '" class="secondary-content"><i class="material-icons purple-text text-' + status + '">grade</i></a>'
        twitch += '</li>'

        var content = document.getElementById('list'); content.innerHTML = twitch;
  })
};

function testOnline(userName) {
  $.getJSON('https://api.twitch.tv/kraken/streams?channel=' + userName + '&callback=?', function getStreamsData(streamsData) {
    console.log(userName, 'streams api called');
    for (users in streamsData) {
      if (streamsData.streams[i] !== null) {
        var status = 'darken-4'
        //var gameTitle = streamsData.streams[i].channel.game;
      } else {
        console.log('offline');
      }
      console.log(userName, 'streams  data touched');
    }
  })
}
// twitch += '<li id="' + displayName + '" class="mdl-list__item mdl-list__item--three-line">';
// twitch += '<a href="http://www.twitch.tv/' + name + '"><span class="mdl-list__item-primary-content">';
// twitch += '<i src="' + logo + '" class="material-icons mdl-list__item-avatar"></i>';
// twitch += '<span>' + displayName + '</span></a>';
// twitch += '<span class="mdl-list__item-text-body"><p>' + bio + '</p>';
// twitch += '<p class="gameTitle">' + gameTitle + '</p></span></span>';
// twitch += '<span class="mdl-list__item-secondary-content">';
// twitch += '<a class="mdl-list__item-secondary-action" href="http://www.twitch.tv/' + name + '"></a>';
// twitch += '<i id="star" class="material-icons ' + status + '">star</i></span></li>';
