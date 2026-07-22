const { nanoid } = require('nanoid');
const Url = require("../models/Url");

class UrlService {
    async createShortUrl(originalUrl, baseUrl) {
        let existingUrl = await Url.findOne({ originalUrl });

        if (existingUrl) {
            return {
                shortUrl: `${baseUrl}/${existingUrl.shortUrl}`,
                shortId: existingUrl.shortUrl,
                originalUrl: existingUrl.originalUrl,
                isExisting: true
            };
        }

        const shortId = nanoid(8);
        const newUrl = new Url({
            shortUrl: shortId,
            originalUrl: originalUrl
        });

        await newUrl.save();

        return {
            shortUrl: `${baseUrl}/${shortId}`,
            shortId,
            originalUrl,
            isExisting: false
        };
    }

    async getAndIncrementUrl(shortUrl) {
        const urlDoc = await Url.findOne({ shortUrl });

        if (!urlDoc) {
            return null;
        }

        urlDoc.clicks++;
        await urlDoc.save();

        return urlDoc.originalUrl;
    }

    /**
     * Business Logic to get analytics/stats for a short URL
     * @param {string} shortUrl
     */
    async getUrlStats(shortUrl) {
        const urlDoc = await Url.findOne({ shortUrl });
        if (!urlDoc) return null;

        return {
            originalUrl: urlDoc.originalUrl,
            shortUrl: urlDoc.shortUrl,
            clicks: urlDoc.clicks,
            createdAt: urlDoc.createdAt
        };
    }
}

module.exports = new UrlService();