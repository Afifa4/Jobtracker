import { useState } from "react";
import axios from "axios";
import "./AddNewJob.css";

function AddJob() {
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        status: "Applied",
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.company.trim()) newErrors.company = "Company is required";
        if (!formData.position.trim()) newErrors.position = "Position is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            // Replace this URL with your real API endpoint
            await axios.post("http://127.0.0.1:8000/api/jobs", formData);

            setMessage("Job application added successfully!");
            setFormData({ company: "", position: "", status: "Applied" });
            setErrors({});
        } catch (error) {
            console.error("Error adding job:", error);
            setMessage("Failed to add job. Try again.");
        }
    };

    return (
        <div className="add-job-container">
            <h2>Add New Job Application</h2>
            <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                    <label>Company:</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                    />
                    {errors.company && <span className="error">{errors.company}</span>}
                </div>

                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Job Position"
                    />
                    {errors.position && <span className="error">{errors.position}</span>}
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <button type="submit">Add Job</button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
}

export default AddJob;
