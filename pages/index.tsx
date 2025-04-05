import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, `You: ${userMessage}`]);
    setInput('');

    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (data?.response) {
        setMessages((prev) => [...prev, `Selene: ${data.response}`]);
      } else {
        setMessages((prev) => [...prev, 'Selene: Hmm, something went wrong.']);
      }
    } catch (err) {
      setMessages((prev) => [...prev, 'Selene: Sorry, I encountered an error.']);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <Head>
        <title>Selene AI</title>
        <meta name="description" content="Your celestial AI companion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white flex flex-col items-center justify-center p-6 animate-fadeIn">
        <h1 className="text-5xl font-bold mb-2 animate-slideUp">SELENE</h1>
        <p className="mb-6 text-lg text-gray-300 animate-fadeIn delay-300">Your celestial AI companion</p>

        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg animate-slideUp mb-6">
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className="bg-gray-700 rounded-md p-3 animate-slideUp">
                {msg}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2 animate-fadeIn delay-500">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-grow p-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Ask Selene something..."
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
