import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewJobAplications.css";

function ViewApplications() {
    const [applications, setApplications] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentApp, setCurrentApp] = useState(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/jobs");
            const data = response.data.map((item) => ({
                id: item.id,
                company: item.company?.name || "N/A",
                position: "Software Engineer",
                status: "Applied",
            }));
            setApplications(data);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const handleDelete = (id) => {
        setApplications(applications.filter((app) => app.id !== id));
    };

    const handleEditClick = (app) => {
        setCurrentApp(app);
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        setApplications(
            applications.map((app) =>
                app.id === currentApp.id ? { ...app, ...currentApp } : app
            )
        );
        setIsEditing(false);
        setCurrentApp(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentApp((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="applications-container">
            <h2>Your Job Applications</h2>

            <table className="applications-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.company}</td>
                            <td>{app.position}</td>
                            <td>{app.status}</td>
                            <td>
                                <button onClick={() => handleEditClick(app)}>Edit</button>
                                <button onClick={() => handleDelete(app.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && currentApp && (
                <div className="edit-job-modal">
                    <h3>Edit Job Application</h3>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>
                            Company:
                            <input
                                type="text"
                                name="company"
                                value={currentApp.company}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Position:
                            <input
                                type="text"
                                name="position"
                                value={currentApp.position}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                name="status"
                                value={currentApp.status}
                                onChange={handleChange}
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Offered">Offered</option>
                            </select>
                        </label>
                        <button onClick={handleSaveEdit}>Save Changes</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ViewApplications;
