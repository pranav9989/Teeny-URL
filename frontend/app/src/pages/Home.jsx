import react from "react";

function Home() {
    return (
        <>
            <form action="/post">
                <label htmlFor="">Enter URL : </label>
                <input type="text" />
                <button>SUBMIT</button>
            </form>

        </>
    );
}

export default Home;