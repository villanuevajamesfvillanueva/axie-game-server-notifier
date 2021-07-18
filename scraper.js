const puppeteer = require('puppeteer');
var player = require('play-sound')({ player: "C:\\Program\ Files\ (x86)\\VideoLAN\\VLC\\vlc.exe" })
                                                // link to mp3 player executable
async function scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const URL = 'https://axie.zone/axie-infinity-server-status?fbclid=IwAR3j_6SPFZpnuhnSEPhQOoQSyDEU7yk6ebQmDq6_7A0C-aAxHghUuNhPoWs';
    await page.goto(URL);

    await page.waitForSelector('.ss_gameserver');

    let gameServerStatuses = ['//*[@id="status_maintenance"]', '//*[@id="status_login"]', '//*[@id="status_battles"]'];
    
    // checking if green exists in each of the three conditions: maintenance, login, and battle
    const maintenance = await page.$x(gameServerStatuses[0]);
    maintenanceArr = (maintenance[0]['_remoteObject']['description']).split('.');
    let condition1 = maintenanceArr.indexOf('green');

    const login = await page.$x(gameServerStatuses[1]);
    loginArr = (login[0]['_remoteObject']['description']).split('.');
    let condition2 = loginArr.indexOf('green');

    const battle = await page.$x(gameServerStatuses[2]);
    battleArr = (battle[0]['_remoteObject']['description']).split('.');
    let condition3 = battleArr.indexOf('green');

    let status = ((condition1 >= 0) && (condition2 >= 0) && (condition3 >= 0)) ? true : false;
    console.log(status);

    // if all conditions are green, play an alert
    if (status) {
        player.play('.\\yeet.mp3', function (err) {
            if (err) throw err;
            console.log("Audio finished");
          });
    }
    browser.close();
}

setInterval(scrape, 10000);