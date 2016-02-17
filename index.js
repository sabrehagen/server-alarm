const exec = require('child_process').execFile;
const needle = require('needle');
const pingInterval = 3000;

const pingServer = (callback) => {
    needle.get('https://stemn.com/api/v1/users/jackson', (error, response) => {
        callback(!error
            && response.statusCode == 200
            && response.body.name
            && response.body.name.includes('Delahunt'));
    });
}

const playAlarm = () => {
    exec('c:\\Program Files\\Windows Media Player\\wmplayer.exe', [__dirname + '\\alarm.mp3']);
}

const stopAlarm = () => {
    exec('taskkill', ['/f', '/im', 'wmplayer.exe']);
}

const checkServer = (failureCount) => {
    setTimeout(() => {
        pingServer((success) => {
            if (!success) {
                if (failureCount > 5) {
                    playAlarm();
                }
                checkServer(failureCount + 1);
            } else {
                stopAlarm();
                checkServer(0);
            }
        });
    }, pingInterval);
}

const initialFailureCount = 0;
checkServer(initialFailureCount);
