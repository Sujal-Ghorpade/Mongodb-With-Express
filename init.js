const mongoose = require("mongoose");
const Chat = require("./models/chat");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main().then(() => {
  console.log("Connection Succesful");
});
let allChats = [
  {
    from: "Neha",
    to: "Priti",
    msg: "Send me notes for exam",
    created: new Date(),
  },
  {
    from: "Rohit",
    to: "Mohit",
    msg: "Teach me js callstacks",
    created: new Date(),
  },
  {
    from: "Amit",
    to: "Sumit",
    msg: "All the best",
    created: new Date(),
  },
];
Chat.insertMany(allChats);
