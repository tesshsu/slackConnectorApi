import { useState, useEffect } from 'react';
import styles from '../public/styles/Integration-logs.module.css';

function IntegrationLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/integration-logs`)
            .then(response => response.json())
            .then(logs => {
                setLogs(logs);
                console.log(logs);
            })
            .catch(error => console.error('Error fetching integration logs:', error));
    }, []);

    return (
        <div className="container mt-3">
            <h1>Integration Logs</h1>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th style={{ width: "20%" }}>User ID</th>
                    <th style={{ width: "60%" }}>Message Text</th>
                    <th style={{ width: "20%" }}>Created At</th>
                </tr>
                </thead>
                <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td>{log.user_id}</td>
                        <td>{log.message}</td>
                        <td>{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default IntegrationLogs;
