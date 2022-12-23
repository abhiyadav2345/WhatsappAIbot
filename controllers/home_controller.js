const { Client } = require("whatsapp-web.js");
import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTAPIBrowser } from '../src'

// 

dotenv.config()


async function main() {
  const email = process.env.OPENAI_EMAIL
  const password = process.env.OPENAI_PASSWORD

  const api = new ChatGPTAPIBrowser({
    email: process.env.OPENAI_EMAIL,
    password: process.env.OPENAI_PASSWORD,
    isGoogleLogin: true
  })
  await api.initSession()

  const prompt =
    'Write a python version of bubble sort. Do not include example usage.'

  const res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })
  console.log(res.response)

  // close the browser at the end
  await api.closeSession()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

// 

module.exports.home = async function (req, res) {
  try {
    console.log("inside controller");
    const qrcode = require("qrcode-terminal");

    const { Client } = require("whatsapp-web.js");
    const client = new Client();

    client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on("ready", () => {
      console.log("Client is ready!");
    });

    client.on("message", (message) => {
      if (
        message.body ===
        "Write a python version of bubble sort. Do not include example usage"
      ) {
        message.reply(
          "def bubble_sort(arr):\nn = len(arr)\n\n# Traverse through all array elements\nfor i in range(n): \n # Last i elements are already in place\nfor j in range(0, n-i-1):\n # Swap if the element found is greater\n # than the next element\nif arr[j] > arr[j+1] :\narr[j], arr[j+1] = arr[j+1], arr[j]"
        );
      } else if (message.body === "hello" || message.body === "Hello") {
        message.reply("Hello your bot this side");
      } else if (message.body === "help" || message.body === "Help") {
        message.reply("How i can help you");
      } else {
        message.reply("Sorry, Can't assist you this time ");
      }
    });

    client.initialize();

    console.log("END kar do");
    // return res.render("home");
  } catch (err) {
    console.log("Error ", err);
    return;
  }
};
