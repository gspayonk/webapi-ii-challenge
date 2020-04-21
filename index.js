const express = require("express");
const server = express();
const postsRouter = require("./data/posts-router");

server.use(express.json());

server.use("/api/posts", postsRouter);

server.get('/', (req,res) =>{
    res.status(200).send({hello:'Web 23'});
});

server.listen(8000, () => console.log("server is listening on 8000"));