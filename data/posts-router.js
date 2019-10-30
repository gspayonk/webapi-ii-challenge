const router = require("express").Router();
const db = require("./db.js");
const {
    find,
    findById,
    insert,
    update,
    remove,
    findPostComments,
    findCommentById,
    insertComment
} = db;

router.post("/", (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
    res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
    });
    } else if (title && contents) {
    insert({ title, contents })
        .then(postid => {
        const id = postid.id;
        res.status(201).json({ title, contents, id });
        })
        .catch(() => {
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        });
        });
    }
});

router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
    const { text, post_id } = req.body;
    id &&
    text &&
    id === post_id &&
    insertComment({ text, post_id })
        .then(comment => {
        const { id } = comment;
        res.status(201).json({ text, post_id, id });
        })
        .catch(() => {
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        });
        });

    if (!id || id !== post_id) {
    res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (!text) {
    res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    }
});

router.get("/", (req, res) => {
    find()
    .then(posts => res.status(200).json(posts))
    .catch(() =>
        res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    findById(id)
    .then(post => {
        if (post.length) {
        res.status(200).json(post);
        }else {
        res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(() => {
        res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
    findPostComments(id)
    .then(comments => {
        if (comments.length) {
        res.status(200).json(comments);
        } else {
        res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(() => {
        res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const result = findById(id).then(post => {
    res.status(200).json(post);
    });

    if (!id) {
    res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }

    result.length &&
    remove(id)
        .then(() => {
        return result;
        })
        .catch(() => {
        res.status(500).json({ error: "The post could not be removed" });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!id) {
    res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else if (!title || !contents) {
    res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
    });
    } else {
    update(id, { title, contents })
        .then(count => {
        res.status(200).json(count);
        })
        .catch(() => {
        res.status(500).json({ error: "The post could not be removed" });
        });
    }
});

module.exports = router;