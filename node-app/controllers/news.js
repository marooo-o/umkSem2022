"use strict";

const express = require("express");

const News = require("./../models/news.js");
const loggedin = require("./../middleware/auth.js").loggedin;
const admin = require("./../middleware/auth.js").admin;
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// returns all news
app.get("/all", (req, res) => {
  News.find({}, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    return res.status(200).json(result);
  });
});

// returns news with specified id
app.get("/", (req, res) => {
  if (req.query.id == undefined) {
    return res.sendStatus(400);
  }

  News.findById(req.query.id, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    if (result == null) {
      return res.sendStatus(404);
    }

    return res.status(200).json(result);
  });
});

// adds new news
app.post("/", loggedin, (req, res) => {
  if (!(req.body.title && req.body.content)) {
    return res.sendStatus(400);
  }

  const news = new News({
    title: req.body.title,
    content: req.body.content,
    date: Date.now(),
    author: req.user.name,
  });

  news.save((err, news) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    return res.status(201).json({ id: news._id });
  });
});

// updates news with specified id

app.patch("/", [loggedin, admin], (req, res) => {
  // check if user is admin

  if (!(req.body.id && req.body.title && req.body.content)) {
    return res.sendStatus(400);
  }

  News.updateOne(
    { _id: req.body.id },
    { title: req.body.title, content: req.body.content },
    (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      return res.sendStatus(200);
    }
  );
});

// deletes news with specified id
app.delete("/", [loggedin, admin], (req, res) => {
  // check if user is admin

  if (req.body.id == undefined) {
    return res.sendStatus(400);
  }

  News.deleteOne({ _id: req.body.id }, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    if (result.n < 1) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  });
});

module.exports = app;
