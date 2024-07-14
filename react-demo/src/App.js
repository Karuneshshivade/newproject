import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [selectedFrontends, setSelectedFrontends] = useState([]);
    const [selectedBackends, setSelectedBackends] = useState([]);
    const [selectedDBMSs, setSelectedDBMSs] = useState([]);

    const handleCheckboxChange = (setSelected, selected, value) => {
        if (selected.includes(value)) {
            setSelected(selected.filter(item => item !== value));
        } else {
            setSelected([...selected, value]);
        }
    };

    const fetchData = () => {
        axios.get('http://127.0.0.1:5000/search', {
            params: {
                frontend: selectedFrontends.join(','),
                backend: selectedBackends.join(','),
                dbms: selectedDBMSs.join(',')
            }
        })
        .then(response => {
            setTopics(response.data);
            setError(null); // Reset error
        })
        .catch(error => {
            setError("There was an error fetching the data!");
            console.error("Error fetching data:", error);
        });
    };

    return (
        <div>
            <div>
                <h3>Select Frontend</h3>
                {['React','CSS','HTML','Vue'].map(framework => (
                    <label key={framework}>
                        <input
                            type="checkbox"
                            value={framework}
                            checked={selectedFrontends.includes(framework)}
                            onChange={() => handleCheckboxChange(setSelectedFrontends, selectedFrontends, framework)}
                        />
                        {framework}
                    </label>
                ))}
            </div>

            <div>
                <h3>Select Backend</h3>
                {['Python','Java','Node.js','Express'].map(language => (
                    <label key={language}>
                        <input
                            type="checkbox"
                            value={language}
                            checked={selectedBackends.includes(language)}
                            onChange={() => handleCheckboxChange(setSelectedBackends, selectedBackends, language)}
                        />
                        {language}
                    </label>
                ))}
            </div>

            <div>
                <h3>Select DBMS</h3>
                {['SQL Lite', 'MySQL','MongoDB','PostgreSQL'].map(dbms => (
                    <label key={dbms}>
                        <input
                            type="checkbox"
                            value={dbms}
                            checked={selectedDBMSs.includes(dbms)}
                            onChange={() => handleCheckboxChange(setSelectedDBMSs, selectedDBMSs, dbms)}
                        />
                        {dbms}
                    </label>
                ))}
            </div>

            <button onClick={fetchData}>Fetch Topics</button>
            {error && <p>{error}</p>}
            <div>
                {topics.map((topic, index) => (
                    <div key={index}>
                        <h2>{topic.Topic}</h2>
                        <p>{topic.Description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
