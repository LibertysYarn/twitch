users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds", "imaqtpie", "lirik"];
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
      preview: data[i].preview.medium,
      updates: data[i].channel.updated,
      followers: data[i].channel.followers,
      views: data[i].channel.views,
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
    var bio = (userBio !== null) ? 'Bio: ' + userBio : '  No bio.     So sad.  ';
    var gameTitle = arrayPreviewLookup(userStatusAndGame, "game", "name", name);
    var previewImg = arrayPreviewLookup(userStatusAndGame, "preview", "name", name);
    var userViews = arrayPreviewLookup(userStatusAndGame, "views", "name", name);
    var userFollowers = arrayPreviewLookup(userStatusAndGame, "followers", "name", name);
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


    function arrayPreviewLookup(array, prop, prop2, val) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i].hasOwnProperty(prop) && array[i][prop2] === val) {
          return userStatusAndGame[i][prop];
        }
      }
      return "";
    }




    //filter//

    twitch += '<li id="' + displayName + '" class="collection-item avatar ' + status + '"><span class="collapsible-header"><a href="http://www.twitch.tv/' + name + '"><img src="' + logo + '" alt="avatar imaeg" class="circle"></a>'
    twitch += '<a href="http://www.twitch.tv/' + name + '"><span class="title" alt="username ' + displayName + '">' + displayName + '</span></a>'
    twitch += '<p alt="stream title ' + displayName + '">' + gameTitle + '</p>'
    twitch += '<a href="http://www.twitch.tv/' + name + '" class="secondary-content"><i class="material-icons purple-text text-' + statusColor + '">grade</i></a></span>'
    twitch += '<span class="collapsible-body">'
    twitch += '<span class="col s12 bio"><img class="center-block" src="' + previewImg + '"><p alt="bio ' + displayName + '">' + bio + '<br><div class="center"><span class="chip">' + userViews + ' views</span>  <span class="chip">' + userFollowers + ' followers</span></div></p></span></span>'
    twitch += '</li>'

    var content = document.getElementById('list');
    content.innerHTML = twitch;

  })
};


$('.tab').click(function() {
  var value = $(this).attr("id");
  console.log(value);
  if (value == "listAll") {
    $('.collection-item').show();
    $('.searchLI').hide();
  } else if (value == "searchTab") {
    $('.searchLI').slideToggle();
  } else(value == "onlineTab") ? $('.online').show() && $('.offline').hide() : $('.offline').show() && $('.online').hide();
});


$('#close').click(function() {
  $('.searchLI').hide();
});

$('.collapsible').collapsible({
  accordion: false
});
