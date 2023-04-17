import React from "react";

const IntegrationLogs = () => {
    const logs = [
        { userId: 1, messageText: "Hello World!" },
        { userId: 2, messageText: "How are you?" },
        { userId: 3, messageText: "Nice to meet you" },
    ];

    return (
        <div>
            <h1>Integration Logs</h1>
            <table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Message Text</th>
                </tr>
                </thead>
                <tbody>
                {logs.map((log, index) => (
                    <tr key={index}>
                        <td>{log.userId}</td>
                        <td>{log.messageText}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default IntegrationLogs;

