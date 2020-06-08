const assert = require('assert');
const path = require('path');
const Application = require('spectron').Application;

const app = new Application({
  // path should point to exe file 
  path: 'D:/Desktop/electrons/learningelectronandspectron/exefolder/testingelctron.exe'
});

describe('Electron app tests', function () {
  this.timeout(10000);
  //Start the electron app before each test
  beforeEach(() => {
    return app.start();
  });

  //Stop the electron app after completion of each test
  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('display the electron app window', async () => {
    const count = await app.client.getWindowCount();
    return assert.equal(count, 1);
  });

  it('displays a title', async () => {
    const title = await app.client.getTitle();
    return assert.equal(title, 'Welcome');
  });

  it('has a input for name', async () => {
    const labelText = await app.client.getText('label[for="lname"]');
    return assert.equal(labelText, 'Enter your name:');
  });

  it('has a welcome on submitting name', async () => {
    app.client.element('//input[@id="lname"]').setValue("test").then(() => {
      app.client.element('//button[@id="sbm"]').click();
      const welcomeNote = app.client.getText('#newdiv h2');
      assert.equal(welcomeNote, 'Welcome,')
    })
  });
});