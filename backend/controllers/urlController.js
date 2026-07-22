const validUrl = require('valid-url');
const UrlService = require('../services/urlService');


class UrlController {
    async shortenUrl(req, res, next) {
        try {
            const { originalUrl } = req.body;
            console.log(req.body);
            console.log("EXTRACTED URL:", originalUrl);

            if (!originalUrl || !validUrl.isUri(originalUrl)) {
                return res.status(400).json({ success: false, error: "Invalid URL format. Please enter a valid URL starting with http:// or https://" });
            }

            const result = await UrlService.createShortUrl(originalUrl, req.get("host"))

            return res.status(200).json({ success: true, ...result });

        }
        catch (error) {
            next(error);
        }
    }

    async redirectToOriginal(req, res, next) {
        try {
            const { shortUrl } = req.params;


            const originalUrl = await UrlService.getAndIncrementUrl(shortUrl);

            if (!originalUrl) {
                return req.status(400).json({ success: false, error: "This teenyurl was valid for 7 days and may have expired" });
            }

            return res.redirect(originalUrl);
        }
        catch (error) {
            next(error);
        }
    }

    async getStats(req, res, next) {
        try {
            const { shortUrl } = req.params;

            const stats = await UrlService.getUrlStats(shortUrl);

            if (!stats) {
                return res.status(400).json({ success: false, error: "Url Expired or not found" });
            }
            return res.status(200).json({ success: true, ...stats });
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new UrlController();