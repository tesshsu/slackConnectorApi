import { useState, useEffect } from 'react';

function IntegrationLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('/api/integration-logs')
            .then(response => response.json())
            .then(data => setLogs(data));
    }, []);

    return (
        <div>
            <h1>Integration Logs</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Message Text</th>
                </tr>
                </thead>
                <tbody>
                {logs.map(log => (
                    <tr key={log.id}>
                        <td>{log.userId}</td>
                        <td>{log.messageText}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default IntegrationLogs;
