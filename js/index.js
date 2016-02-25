// var game = (status !== null) ? status : '';
// var status = (status === null) ? "mdl-color--blue-grey-50" : "mdl-color-text--purple";
// var tvUrl = "http://twitch.tv/" + name;
//   $.getJSON('https://api.twitch.tv/kraken/streams?channel=' + users + '&callback=jsonp', function(news) {
//var url = 'https://api.twitch.tv/kraken/streams?channel=' + users + '&callback=jsonp';
//'freecodecamp,storbeck,terakilobyte,habathcx,RobotCaleb,thomasballinger,noobs2ninjas,beohoff,NoCopyrightSounds'

var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "NoCopyrightSounds"];
var names = users.join(',').toLowerCase();
var url = 'https://api.twitch.tv/kraken/streams?channel=' + names + '&callback=jsonp';


$.ajax({
  url: 'https://api.twitch.tv/kraken/streams?',
  data: names,
  dataType: 'jsonp',
  success: function(data) {
    var twitch = '';
    console.log(data);
    $.map(data, function(f) {

      twitch += '<li class="mdl-list__item mdl-list__item--three-line"><a href="http://twitch.tv/' + f.streams[i].name + '"<span class="mdl-list__item-primary-content"><i src="' + f.streams[i].channel.logo + '" class="material-icons mdl-list__item-avatar"></i></a>';
      twitch += '<span>' + f.streams[i].channel.name + '</span><span class="mdl-list__item-text-body"><p>' + f.streams[i].game + '</p>';
      twitch += '"</span></span><span class="mdl-list__item-secondary-content"><a class="mdl-list__item-secondary-action" href="' + f.streams[i].name + '"></a><i class="material-icons' + f.streams[i].channel.game + '">star</i></span></li>"';
    });
    var content = document.getElementById('list');
    content.innerHTML = twitch;
  }
});
