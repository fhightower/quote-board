import { useState, useEffect } from 'react';

interface Quote {
  id: number;
  name: string;
  email: string;
}

const QuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await fetch('/api/quotes');
      const data: Quote[] = await res.json();
      setQuotes(data);
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      <h1>Quotes</h1>
      <ul>
        {quotes.map(quote => (
          <li key={quote.id}>{quote.text}<br/>- {quote.source}</li>
        ))}
      </ul>

      <a href="/">Go back to home</a><br />
      <a href="/create-quote">Add a new quote</a>
    </div>
  );
};

export default QuotesPage;
