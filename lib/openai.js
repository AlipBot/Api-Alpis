const axios = require('axios');

async function openai(text, user, maxRetries = 3) {
  let retries = 0;
  let response;

  while (retries < maxRetries) {
    const payload = {
      app: {
        id: "besp15eb87j1695894870720",
        time: Date.now(),
        data: {
          sender: {
            id: user
          },
          message: [
            {
              id: Date.now(),
              time: Date.now(),
              type: "text",
              value: text
            }
          ]
        }
      }
    };

    const webhookUrl = 'https://webhook.botika.online/webhook/';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization' : "Bearer 0yqbiu-xz1s-qrnp2fjsj1z8cnav-f1g2rddjl5-x6fqf4b4"
    };

    try {
      const webhookResponse = await axios.post(webhookUrl, payload, { headers });
      const { data, status } = webhookResponse;

      if (status === 200) {
        const messages = data.app.data.message;

        if (Array.isArray(messages)) {
          const responseMessages = messages.map((message) => message.value);
          let replyMessage = responseMessages.join('\n');

          if (/(<BR>|<br>)/i.test(replyMessage)) {
            let newReplyMessage = replyMessage.replace(/<BR>|<br>/gi, '\n');
            newReplyMessage = newReplyMessage.replace(/```/g, '\n');
            let replyMessages = newReplyMessage.split('\n');
            let combinedResponse = '';

            for (const [index, message] of replyMessages.entries()) {
              combinedResponse += "\n\n" + message + '\n';
            }

            response = combinedResponse;
          } else {
            response = replyMessage;
          }

          if (response.includes("Maaf, aku belum mengerti dengan pertanyaanmu. Bisa kamu menjelaskannya lagi?")) {
            retries++;
          } else {
            break;
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      response = null;
    }
  }

  return response;
}

module.exports = {
  openai
};