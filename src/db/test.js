"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Admin_1 = require("../models/Admin");
var test = new Admin_1.Admin("123", "123");
await test.save();
