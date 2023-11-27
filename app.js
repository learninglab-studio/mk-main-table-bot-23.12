const { App } = require('@slack/bolt');
const path = require('path');
const llog = require('learninglab-log')

require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

global.ROOT_DIR = path.resolve(__dirname);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

app.message(/.*/, async ({message, say}) => {
    console.log(JSON.stringify(message, null, 4));
    const result = await say("got it");
    console.log(JSON.stringify(result, null, 4))
});

(async () => {
  // Start your app
  await app.start();
  llog.yellow('⚡️ Bolt app is running!');
})();