var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds", "imaqtpie", "lirik"];
var twitch = '';
var emptyImg = 'https://static-cdn.jtvnw.net/jtv_user_pictures/undefined-profile_image-10dccf22c64c7c47-300x300.jpeg';

//working streams data//
var urlSt = 'https://api.twitch.tv/kraken/streams?channel=' + users + '&callback=?';
var userStatusAndGame = [];

$.getJSON(urlSt, function getStreamsData(streamsData) {
  var data = streamsData.streams;
  for (var i = 0; i < data.length; i++) {
    var onlineUsers = {
      name: data[i].channel.name,
      game: data[i].game,
      online: true
    };
    userStatusAndGame.push(onlineUsers);
  }
  console.log(userStatusAndGame);
});
//working streams data//

//working for user data//
for (var i = 0; i < users.length; i++) {
  var urlUs = 'https://api.twitch.tv/kraken/users/' + users[i] + '?callback=?';

  $.getJSON(urlUs, function getUserData(userData) {
    var displayName = userData.display_name;
    var name = userData.name;
    var userLogo = userData.logo;
    var logo = (userLogo !== null) ? userLogo : emptyImg;
    var url = userData._links.self;
    var userBio = userData.bio;
    var bio = (userBio !== null) ? userBio : '';
    var gameTitle = '';
    var statusColor = arrayLookup(userStatusAndGame, "name", name);
    //console.log(userStatusAndGame[0].game);

    //filter//
    function arrayLookup(array, prop, val) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {
          return "darken-4";
          //gameTitle = userStatusAndGame[this].game;
        }
      }
      return "lighten-5";
    }
    //filter//

    twitch += '<li id="' + displayName + '" class="collection-item avatar"><a href="http://www.twitch.tv/' + name + '"><img src="' + logo + '" alt="avatar imaeg" class="circle"></a>'
    twitch += '<a href="http://www.twitch.tv/' + name + '"><span class="title" alt="username ' + displayName + '">' + displayName + '</span></a>'
      //twitch += '<span class="col s11 bio"><p alt="bio '+displayName+'">' + bio + '</p></span>'
    twitch += '<p alt="stream title ' + displayName + '">' + gameTitle + '</p>'
    twitch += '<a href="http://www.twitch.tv/' + name + '" class="secondary-content"><i class="material-icons purple-text text-' + statusColor + '">grade</i></a>'
    twitch += '</li>'

    var content = document.getElementById('list');
    content.innerHTML = twitch;

  })
};
//working for user data//
