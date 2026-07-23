import react from "react";

function Stats() {
    return (
        <>
            <form action="get">
                <label htmlFor="">ShortUrl</label>
                <input type="text" />

                <button>Submit</button>
            </form>
        </>
    );
}

export default Stats;