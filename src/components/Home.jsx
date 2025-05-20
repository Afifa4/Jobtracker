import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <h2>Welcome to Job Tracker</h2>
            <p>Keep track of your job applications easily and stay organized in your job hunt.</p>

            <div className="home-buttons">
                <button onClick={() => window.location.href = "/applications"}>View Applications</button>
                <button onClick={() => window.location.href = "/add"}>Add New Job</button>
            </div>
        </div>
    );
}

export default Home;
