import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateEmail = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/generate-email', {
        prompt: prompt,
      });
      setEmail(response.data.email);
    } catch (err) {
      setError('Error generating email. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Email Generator</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={generateEmail} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Email'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {email && (
        <div>
          <h2>Generated Email</h2>
          <textarea
            rows="10"
            cols="50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
