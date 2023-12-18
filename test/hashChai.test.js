const mongoose = require("mongoose");
const config = require("../src/config/config.js");
// const Assert = require("assert");
const chai = require("chai");
const UsersMongoDao = require("../src/dao/usersMongoDao.js");
const { describe, it } = require("mocha");

mongoose.connect(config.MONGO_URL, { dbName: config.DB_NAME });
