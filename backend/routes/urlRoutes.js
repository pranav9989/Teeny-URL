const UrlController = require("../controllers/urlController");
const express = require("express");
const router = express.Router();

router.post("/api/shorten", (req, res, next) => UrlController.shortenUrl(req, res, next));
router.get("/:shortUrl", (req, res, next) => UrlController.redirectToOriginal(req, res, next));
router.get("/api/stats/:shortUrl", (req, res, next) => UrlController.getStats(req, res, next));

module.exports = router;