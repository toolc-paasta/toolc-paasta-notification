const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const {
  Expo
} = require("expo-server-sdk");
const expo = new Expo();

const handlePushTokens = (
  title,
  body,
  tokens,
  data
) => {
  let notifications = [];
  for (let pushToken of tokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: data
    });
  }
  return notifications;
};

const sendNotification = async (notifications) => {
  let chunks = expo.chunkPushNotifications(notifications);

  for (let chunk of chunks) {
    let receipts = await expo.sendPushNotificationsAsync(chunk);
  }
}

module.exports = {
  send: async (
    title,
    body,
    tokens,
    data,
    res) => {
    if (!title || !body || !tokens || !data) {
      console.log('필요값 누락');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    try {
      const notifications = handlePushTokens(title, body, tokens, data);
      await sendNotification(notifications);

      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.OK, tokens));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    }
  }
}