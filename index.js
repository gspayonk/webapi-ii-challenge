const express = require("express");
const server = express();
const postsRouter = require("./data/posts-router");

server.use(express.json());

server.use("/api/posts", postsRouter);

server.listen(8000, () => console.log("server is listening on 8000"));