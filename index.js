const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server Is Working Well");
});

// ejs setup
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// Mongodb Setup
const mongoose = require("mongoose");
const Chat = require("./models/chat");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main().then(() => {
  console.log("Connection Succesful");
});

// let chat1=new Chat({
//     // here we can write anything but monngodb stores only those part which are in database. if we write name:"myra " it not stored bcz no name in schema
//         from:"Neha",
//         to:"Priya",
//         msg:"Send me your examsheets",
//         created: new Date()
//     });
//     chat1.save() .then((res)=>{
//         console.log(res);
//     });

app.get("/chats", async (req, res) => {
  let chats = await Chat.find({});
  console.log(chats);
  res.render("index.ejs", { chats });
});

// new chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// Editing msg
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  console.log(chat);
  res.render("edit.ejs", { chat });
});

//updating route for editing
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log("Updated  Chat: ", updatedChat);
  res.redirect("/chats");
});

// Delete
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log("Deleted  Chat: ");
  res.redirect("/chats");
});
