//var player = require('play-sound')(opts = {})
var player = require('play-sound')()
var needle = require('needle');

function pingServer(callback) {
    needle.get('http://119.9.25.43/api/v1/users/jacksondelahunt', (error, response) => {
        callback(!error
            && response.statusCode == 200
            && response.body.indexOf('Delahunt') > -1);
    });    
}

function checkServer() {
    setTimeout(() => {
        pingServer((success) => {
            if (success) {
                checkServer()
            } else {
                player.play('alarm.mp3');
            }
        });
    }, 30000);
}
