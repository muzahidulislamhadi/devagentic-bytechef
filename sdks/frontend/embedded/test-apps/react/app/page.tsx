'use client';

import { useConnectDialog } from '@bytechef/embedded-react';
import { useEffect, useState } from 'react';

interface Integration {
    id: number;
    name: string;
}

export default function Home() {
    const [kid, setKid] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [name, setName] = useState('John Doe');
    const [externalUserId, setExternalUserId] = useState('1234567890');
    const [integrationId, setIntegrationId] = useState('');
    const [jwtToken, setJwtToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [integrationsLoading, setIntegrationsLoading] = useState(false);

    // Function to fetch integrations from the /integrations endpoint
    const fetchIntegrations = async () => {
        if (!jwtToken) {
            return;
        }

        setIntegrationsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/integrations', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch integrations');
            }

            setIntegrations(data);
            if (data.length > 0) {
                setIntegrationId(data[0].id.toString());
            }
        } catch (error) {
            console.error('Error fetching integrations:', error);
            setError(error instanceof Error ? error.message : 'Unknown error occurred');
        } finally {
            setIntegrationsLoading(false);
        }
    };

    // Function to calculate JWT token using server-side API
    const calculateJwtToken = async () => {
        if (!kid || !privateKey || !externalUserId || !name) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/generate-jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    kid,
                    privateKey,
                    externalUserId,
                    name,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate JWT token');
            }

            setJwtToken(data.token);
            alert('JWT Token calculated! You can now fetch integrations.');
        } catch (error) {
            console.error('Error calculating JWT token:', error);
            setError(error instanceof Error ? error.message : 'Unknown error occurred');
            alert('Error calculating JWT token. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    // Effect to fetch integrations when JWT token changes
    useEffect(() => {
        if (jwtToken) {
            fetchIntegrations();
        }
    }, [jwtToken]);

    const { openDialog } = useConnectDialog({
        baseUrl: 'http://127.0.0.1:5173',
        environment: 'DEVELOPMENT',
        integrationId: integrationId,
        jwtToken: jwtToken,
    });

    const handleConnect = () => {
        if (!jwtToken) {
            alert('Please calculate JWT token first');
            return;
        }
        openDialog();
    };

    return (
        <main style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
            <h1>DevAgentic Connection</h1>

            <div className="form-group">
                <label>
                    Key ID (kid):
                    <input
                        type="text"
                        value={kid}
                        onChange={(e) => setKid(e.target.value)}
                        placeholder="Enter Key ID"
                    />
                </label>
            </div>

            <div className="form-group">
                <label>
                    Private Key:
                    <textarea
                        value={privateKey}
                        onChange={(e) => setPrivateKey(e.target.value)}
                        placeholder="Enter Private Key (PEM format)"
                    />
                </label>
            </div>

            <div className="form-group">
                <label>
                    External User ID:
                    <input
                        type="text"
                        value={externalUserId}
                        onChange={(e) => setExternalUserId(e.target.value)}
                        placeholder="Enter External User ID"
                    />
                </label>
            </div>

            <div className="form-group">
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </label>
            </div>

            <div className="form-group">
                <label>
                    Integration:
                    <select
                        value={integrationId}
                        onChange={(e) => setIntegrationId(e.target.value)}
                        disabled={!jwtToken || integrationsLoading}
                        className={!jwtToken ? "disabled" : ""}
                    >
                        {integrations.length === 0 && !integrationsLoading && (
                            <option value="">No integrations available</option>
                        )}
                        {integrationsLoading && (
                            <option value="">Loading integrations...</option>
                        )}
                        {integrations.map((integration) => (
                            <option key={integration.id} value={integration.id}>
                                {integration.name}
                            </option>
                        ))}
                    </select>
                </label>
                {!jwtToken && (
                    <p className="help-text">Generate JWT token first to load integrations</p>
                )}
            </div>

            <div className="button-group">
                <button onClick={calculateJwtToken} className="success" disabled={isLoading}>
                    {isLoading ? 'Calculating...' : 'Calculate JWT Token'}
                </button>

                <button onClick={handleConnect} className="primary" disabled={!jwtToken || isLoading || integrationsLoading || !integrationId}>
                    Connect
                </button>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '20px' }}>Error: {error}</div>}

            <div className="token-display">
                <h3>Generated JWT Token:</h3>
                <pre>{jwtToken}</pre>
            </div>
        </main>
    );
}
