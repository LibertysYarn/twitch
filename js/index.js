$(document).ready(function() {
  reqListener();

  function reqListener() {
    var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds"];
    $.getJSON("https://api.twitch.tv/kraken/users/" + users[i] + "?callback=?", function(results) {
      var data = JSON.stringify(results);
      var twitch = '';
      var bio = data.bio;
      var game = (data.status !== null) ? data.status : '';
      var logo = data.logo;
      var name = data.display_name;
      var status = (data.status === null) ? "mdl-color--blue-grey-50" : "mdl-color-text--purple";
      var url = "http://twitch.tv/" + name;

      for (var i = 0; i < users.length; i++) {
        twitch += '<li class="mdl-list__item mdl-list__item--three-line"><a href="' + url[i] + '"<span class="mdl-list__item-primary-content"><i src="' + logo[i] + '" class="material-icons mdl-list__item-avatar"></i></a>';
        twitch += '<span>' + name[i] + '</span><span class="mdl-list__item-text-body"><p>' + game[i] + '</p>';
        twitch += '"</span></span><span class="mdl-list__item-secondary-content"><a class="mdl-list__item-secondary-action" href="' + url[i] + '"></a><i class="material-icons' + status[i] + '">star</i></span></li>"';
      }
      content = document.getElementById('list');
      content.innerHTML = twitch;
    })
  }

});

//   function reqListener() {
//
//     if (status === 200) {
//       var twitch = '';
//       for (var i = 0; i < 1; i++) {
//
//         twitch += '<li class="mdl-list__item mdl-list__item--three-line"><a href="' + url[i] + '"<span class="mdl-list__item-primary-content"><i src="' + logo[i] + '" class="material-icons mdl-list__item-avatar"></i></a>';
//         twitch += '<span>' + name[i] + '</span><span class="mdl-list__item-text-body"><p>' + game[i] + '</p>';
//         twitch += '"</span></span><span class="mdl-list__item-secondary-content"><a class="mdl-list__item-secondary-action" href="' + url[i] + '"></a><i class="material-icons' + status[i] + '">star</i></span></li>"';
//       }
//       content = document.getElementById('list');
//       content.innerHTML = twitch;
//     }
//   }
// });
