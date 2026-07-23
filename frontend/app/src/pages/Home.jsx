import React, { useState } from "react";
import api from "../api/api";
import "./Home.css";

function Home() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setShortUrl("");
        setCopied(false);

        try {
            const response = await api.post("/api/shorten", { originalUrl: url.trim() });

            if (response.data.success) {
                setShortUrl(response.data.shortUrl);
            }
        }
        catch (err) {
            const message = err.response?.data?.error || err.message || "Failed to reach server";
            setError(message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="home-container">
            <div className="home-card">
                <h1 className="home-title">SHORTEN YOUR LINK</h1>

                <form onSubmit={handleSubmit} className="shorten-form">
                    <div className="input-group">
                        <label className="input-label">Enter URL :</label>
                        <input
                            type="text"
                            className="url-input"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste a long URL..."
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "SHORTENING..." : "SUBMIT"}
                    </button>
                </form>

                {error ? <p className="error-message">{error}</p> : null}

                {shortUrl ? (
                    <div className="result-container">
                        <span className="result-label">Your Short Url</span>
                        <span className="short-url-link">{shortUrl}</span>
                        <button
                            className={`copy-btn ${copied ? "copied" : ""}`}
                            onClick={handleCopy}
                        >
                            {copied ? "COPIED!" : "COPY"}
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Home;