"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var mongodb_1 = require("mongodb");
require('dotenv').config();
var client = new mongodb_1.MongoClient(process.env.DB_URI);
var db = client.db('bella-brisa');
var Users = db.collection('usuarios');
exports.Users = Users;
