var exec = require('child_process').exec;
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
                checkServer();
            } else {
                exec('wmplayer alarm.mp3');
            }
        });
    }, 1000);
}
