const notificationService = require('../service/notificationService');

module.exports = {
  sendMessage: async (req, res) => {
    const {
      title,
      body,
      tokens,
      data
    } = req.body;

    const response = notificationService.send(
      title,
      body,
      tokens,
      data,
      res
    );

    return response;
  }
}