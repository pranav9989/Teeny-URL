import React, { useState } from "react";
import api from "../api/api";
import "./Stats.css";

function Stats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setStats(null);

        let cleanCode = shortUrl.trim();
        if (cleanCode.includes('/')) {
            cleanCode = cleanCode.split('/').filter(Boolean).pop();
        }

        try {
            const response = await api.get(`/api/stats/${cleanCode}`);

            if (response.data.success) {
                setStats(response.data);
            }
        }
        catch (err) {
            const message = err.response?.data?.error || err.message || "Failed to load stats";
            setError(message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="stats-container">
            <div className="stats-card">
                <h1 className="stats-title">LINK ANALYTICS</h1>

                <form onSubmit={handleSubmit} className="stats-form">
                    <div className="input-group">
                        <label className="input-label">Short URL / Code :</label>
                        <input
                            type="text"
                            className="stats-input"
                            placeholder="Enter short code (e.g. x7NCiOs5)..."
                            onChange={(e) => setShortUrl(e.target.value)}
                            value={shortUrl}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "SEARCHING..." : "SEARCH"}
                    </button>
                </form>

                {error ? <p className="error-message">{error}</p> : null}

                {stats ? (
                    <div className="stats-result">
                        <div className="stat-item">
                            <span className="stat-label">Original URL:</span>
                            <a href={stats.originalUrl} target="_blank" rel="noreferrer" className="stat-link">
                                {stats.originalUrl}
                            </a>
                        </div>
                        <div className="stat-grid">
                            <div className="stat-box">
                                <span className="stat-number">{stats.clicks}</span>
                                <span className="stat-box-label">Total Clicks</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-number">
                                    {new Date(stats.createdAt).toLocaleDateString()}
                                </span>
                                <span className="stat-box-label">Created Date</span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Stats;