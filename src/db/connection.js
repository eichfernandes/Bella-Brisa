"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Admin_1 = require("@/models/Admin");
var mongoose_1 = require("mongoose");
require('dotenv').config();
(0, mongoose_1.connect)(process.env.DB_URI);
var test = new Admin_1.Admin({
    cpf: "123",
    senha: "123"
});
test.save().then(function () {
    console.log("saved");
});
