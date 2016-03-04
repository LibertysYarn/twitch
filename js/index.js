users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds", "imaqtpie", "lirik"];
var twitch = '';
var emptyImg = 'https://static-cdn.jtvnw.net/jtv_user_pictures/undefined-profile_image-10dccf22c64c7c47-300x300.jpeg';


//filter//
function arrayLookup(array, prop, prop2, val) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i].hasOwnProperty(prop) && array[i][prop2] === val) {
      return array[i][prop];
    }
  }
  return "";
}
//filter//

//working streams data//
var urlSt = 'https://api.twitch.tv/kraken/streams?channel=' + users + '&callback=?';
var userStatusAndGame = [];

$.getJSON(urlSt, function getStreamsData(streamsData) {
  var data = streamsData.streams;
  for (var i = 0; i < data.length; i++) {
    var onlineUsers = {
      name: data[i].channel.name,
      game: data[i].channel.status,
      preview: data[i].preview.medium,
      online: "darken-4"
    };
    userStatusAndGame.push(onlineUsers);
  }
});
//working streams data//

//search channels info//
var searchChannelData = [];

for (var i = 0; i < users.length; i++) {
  var urlSr = 'https://api.twitch.tv/kraken/search/channels?q=' + users[i]+ '&callback=?';
$.getJSON(urlSr, function getUserData(searchData) {
      //console.log(searchData);
      var channelSearch = {
        name: searchData.channels[0].name,
        total: searchData._total,
        followers: searchData.channels[0].followers,
        views: searchData.channels[0].views
      };
      searchChannelData.push(channelSearch);
    })
    //console.log(searchChannelData);
  }
//search channels info//




//working for users data//
for (var i = 0; i < users.length; i++) {
  var urlUs = 'https://api.twitch.tv/kraken/users/' + users[i] + '?callback=?';
  $.getJSON(urlUs, function getUserData(userData) {

      var displayName = userData.display_name;
      var name = userData.name;
      var userLogo = userData.logo;
      var url = userData._links.self;
      var userBio = userData.bio;

      var logo = (userLogo !== null) ? userLogo : emptyImg;
      var updated = jQuery.timeago(new Date(userData.updated_at));
      var bio = (userBio !== null) ? 'Bio: ' + userBio : '  No bio.     So sad.  ';
      var gameTitle = arrayLookup(userStatusAndGame, "game", "name", name);
      var previewImg = arrayLookup(userStatusAndGame, "preview", "name", name);
      var userViews = arrayLookup(searchChannelData, "views", "name", name);
      var userFollowers = arrayLookup(searchChannelData, "followers", "name", name);
      var statusColor = arrayLookup(userStatusAndGame, "online", "name", name);
      var total = arrayLookup(searchChannelData, "total", "name", name);
      var status = (gameTitle !== "") ? "online" : "offline";
      var folNum = (userFollowers == '') ? 'hide' : userFollowers;
      var viewNum = (userViews == '') ? 'hide' : userViews;
      var totalNum = (total == '') ? 'hide' : total;
      //working for users data//


      //content//
      twitch += '<li id="' + displayName + '" class="collection-item avatar ' + status + '"><span class="collapsible-header"><a href="http://www.twitch.tv/' + name + '"><img src="' + logo + '" alt="avatar imaeg" class="circle"></a>'
      twitch += '<a href="http://www.twitch.tv/' + name + '"><span class="title" alt="username ' + displayName + '">' + displayName + '</span></a>'
      twitch += '<p alt="stream title ' + displayName + '">' + gameTitle + '</p>'
      twitch += '<a href="http://www.twitch.tv/' + name + '" class="secondary-content"><i class="material-icons purple-text text-lighten-5 text-' + statusColor + '">grade</i></a></span>'
      twitch += '<span class="collapsible-body">'
      twitch += '<span class="col s12 bio"><img class="center-block" src="' + previewImg + '">'
      twitch += '<p alt="bio ' + displayName + '">' + bio + '<br>'
      twitch += '<div class="center"><span class="chip ' + updated + '">updated ' + updated + '</span>   <span class="chip ' + totalNum + '">' + totalNum + ' videos</span>  <span class="chip ' + viewNum + '">' + userViews + ' views</span>  <span class="chip ' + folNum + '">' + userFollowers + ' followers</span></div></p></span></span>'
      twitch += '</li>'

      var content = document.getElementById('list');
      content.innerHTML = twitch;
    })
    //content//
}




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

jQuery("time.timeago").timeago();
