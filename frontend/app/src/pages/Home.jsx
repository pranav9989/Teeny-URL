import react, { useState } from "react";
import api from "../api/api";


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
            const response = await api.post("/api/shorten", { originalUrl: url.trim() }); //this name should match the backend controller

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
        <>
            <h1>SHORTEN YOUR LINK</h1>
            <form action="/post" onSubmit={handleSubmit}>
                <label htmlFor="">Enter URL : </label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste a long URL..." required />
                <button type="submit" disabled={loading}>{loading ? "SHORTENING..." : "SUBMIT"}</button>
            </form>

            {error ? <p>{error}</p> : null}

            {
                shortUrl ?
                    <div>
                        <span>Your Short Url : {shortUrl}</span>
                        <button onClick={handleCopy}>{copied ? "COPIED!" : "COPY"}</button>
                    </div> :
                    null
            }

        </>
    );
}

export default Home;