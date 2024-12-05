import { Admin } from "../models/Admin";

const test = new Admin("123", "123");
await test.save()
