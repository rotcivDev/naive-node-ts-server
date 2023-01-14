"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    console.log(req.url);
    res.end("sk3lw0rk3r coal mine");
});
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening on port 8000");
});
