var exec = require('child_process').execFile;
var needle = require('needle');

function pingServer(callback) {
    needle.get('http://119.9.25.43/api/v1/users/jackson', function(error, response) {
        callback(!error
            && response.statusCode == 200
            && response.body.name
            && response.body.name.includes('Delahunt'));
    });    
}

function playAlarm() {
    exec('c:\\Program Files\\Windows Media Player\\wmplayer.exe', [__dirname + '\\alarm.mp3']);
}

function stopAlarm() {
    exec('taskkill', ['/f', '/im', 'wmplayer.exe']);
}

function checkServer() {
    var failureCount = 0;
    var pingInterval = 3000;
    setTimeout(function() {
        pingServer(function(success) {
            if (!success) {
                failureCount++;
                if (failureCount > 5)
                    playAlarm();
            } else {
                failureCount = 0;
                stopAlarm();
            }
            checkServer();
        });
    }, pingInterval);
}

checkServer();
