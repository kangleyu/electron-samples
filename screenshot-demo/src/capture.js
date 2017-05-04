const { electron, ipcRenderer, desktopCapturer, screen } = require('electron');
const path = require('path');
const fs = require('fs');

ipcRenderer.on('capture', onCapture);

function getMainSource(desktopCapturer, screen, done) {
  const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize };
  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.log('cannot capture screen:', err);

    const isMainSource = source => source.name == 'Entire screen' || source.name == 'Screen 1';
    done(sources.filter(isMainSource)[0]);
  });
}

function onCapture(evt, targetDir) {
  getMainSource(desktopCapturer, screen, source => {
    const png = source.thumbnail.toPng();
    const filePath = path.join(targetDir, new Date() + '.png');
    writeScreenshot(png, filePath);
  });
}

function writeScreenshot(png, filePath) {
  fs.writeFile(filePath, png, err => {
    if (err) return console.log('failed to write screen:', err);
  });
}