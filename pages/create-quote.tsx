import { useState } from 'react';
import { useRouter } from 'next/router';


const CreateQuotePage: React.FC = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Call the API to create a new quote
    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, source }),
    });

    if (res.ok) {
      // Redirect to the /quotes page after successful creation
      router.push('/quotes');
    } else {
      const errorData = await res.json();
      setError(errorData.error || 'Failed to create quote');
    }
  };

  return (
    <div>
      <h1>Create New Quote</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Text:</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="source">Source:</label>
          <input
            type="source"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>
        <button type="submit">Create Quote</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <a href="/">Go back to home</a><br />
      <a href="/quotes">View quotes</a>
    </div>
  );
};

export default CreateQuotePage;
