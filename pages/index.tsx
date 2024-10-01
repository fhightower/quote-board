import { useState, useEffect } from 'react';
import '../app/globals.css';

interface Quote {
  id: number;
  name: string;
  email: string;
}

const QuotePage: React.FC = () => {
  const [quote, setQuote] = useState<Quote>();

  useEffect(() => {
    const fetchQuote = async () => {
      const res = await fetch('/api/quote');
      const data: Quote = await res.json();
      setQuote(data);
    };

    fetchQuote();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {quote && quote.text}
        <br/><br/>
        - {quote && quote.source}
      </main>
    </div>
  );
};

export default QuotePage;
