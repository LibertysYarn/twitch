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
    var gameTitle = arrayGameLookup(userStatusAndGame, "game", "name", name);
    var statusColor = arrayNameLookup(userStatusAndGame, "name", name);
    var status = (gameTitle !== "") ? "online" : "offline";

    //filter//
    function arrayNameLookup(array, prop, val) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].hasOwnProperty(prop) && array[i][prop] === val) {
          return "darken-4";
        }
      }
      return "lighten-5";
    }

    function arrayGameLookup(array, prop, prop2, val) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].hasOwnProperty(prop) && array[i][prop2] === val) {
          return userStatusAndGame[i].game;
        }
      }
      return "";
    }
    //filter//

    twitch += '<li id="' + displayName + '" class="collection-item avatar ' + status +'"><span class="collapsible-header"><a href="http://www.twitch.tv/' + name + '"><img src="' + logo + '" alt="avatar imaeg" class="circle"></a>'
    twitch += '<a href="http://www.twitch.tv/' + name + '"><span class="title" alt="username ' + displayName + '">' + displayName + '</span></a>'
    twitch += '<p alt="stream title ' + displayName + '">' + gameTitle + '</p>'
    twitch += '<a href="http://www.twitch.tv/' + name + '" class="secondary-content"><i class="material-icons purple-text text-' + statusColor + '">grade</i></a></span>'
    twitch += '<span class="collapsible-body"><span class="col s11 bio"><p alt="bio '+displayName+'">' + bio + '</p></span></span>'
    twitch += '</li>'

    var content = document.getElementById('list');
    content.innerHTML = twitch;

  })
};
//working for user data//


    $('ul.tabs').tabs('select_tab', 'offline');
    var offline = document.getElementByClassName('offline');



     $('.collapsible').collapsible({
       accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
     });
  
