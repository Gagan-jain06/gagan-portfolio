"use client";

import { useState, useEffect, useRef } from "react";

export default function AIStudyAssistant() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<
  { role: string; content: string; time?: string; }[]
>([]);

const [chatTitle, setChatTitle] =
  useState("New Chat");
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);
useEffect(() => {
  const saved =
    localStorage.getItem("study-chat");

  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "study-chat",
    JSON.stringify(messages)
  );
}, [messages]);

  async function askAI() {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;
    if (messages.length === 0) {
  setChatTitle(
    currentQuestion.slice(0, 30)
  );
}

    setQuestion("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: currentQuestion,
      }),
    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.answer,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex">
      <div className="w-72 bg-slate-950/90 backdrop-blur-xl border-r border-slate-800 p-4">

  <h2 className="text-xl font-bold">
    Chats
  </h2>

  <button
    onClick={() => {
      setMessages([]);
      setChatTitle("New Chat");
    }}
    className="w-full mt-4 bg-cyan-500 text-black py-2 rounded-lg font-bold"
  >
    + New Chat
  </button>

  <div className="mt-6 bg-slate-900 p-3 rounded-lg">
    {chatTitle}
  </div>

</div>

      <div className="flex-1 p-6">

        <div className="text-center mt-10">

  <a
    href="/"
    className="inline-block mb-6 text-cyan-400 hover:text-cyan-300"
  >
    ← Back to Portfolio
  </a>

  <h1 className="text-5xl font-bold">
    AI Study Assistant
    <div className="mt-6 max-w-xl mx-auto bg-slate-900/70 backdrop-blur-lg border border-slate-700 rounded-xl p-4">

  <h3 className="font-bold text-lg">
    Technologies Used
  </h3>

  <div className="flex flex-wrap justify-center gap-2 mt-4">

  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
    Next.js
  </span>

  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
    React
  </span>

  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
    Tailwind CSS
  </span>

  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
    OpenRouter
  </span>

  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
    AI Models
  </span>

</div>

</div>
  </h1>

  <div className="flex flex-wrap justify-center gap-3 mt-6">

  <button
    onClick={() => setQuestion("Explain Artificial Intelligence")}
    className="bg-slate-800 px-4 py-2 rounded-lg"
  >
    AI
  </button>

  <button
    onClick={() => setQuestion("Explain Machine Learning")}
    className="bg-slate-800 px-4 py-2 rounded-lg"
  >
    ML
  </button>

  <button
    onClick={() => setQuestion("Explain Data Structures")}
    className="bg-slate-800 px-4 py-2 rounded-lg"
  >
    DSA
  </button>

  <button
    onClick={() => setQuestion("Explain Python Programming")}
    className="bg-slate-800 px-4 py-2 rounded-lg"
  >
    Python
  </button>

</div>

<p className="text-gray-400 mt-4">
  Ask questions, learn concepts, and improve your understanding with AI.
</p>

</div>

        <p className="text-center text-gray-400 mt-3">
          Powered by Next.js + OpenRouter
        </p>

        <div className="mt-10 space-y-4 min-h-[400px]">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl max-w-3xl ${
                msg.role === "user"
                  ? "bg-cyan-500 text-black ml-auto"
                  : "bg-slate-900/70 backdrop-blur-lg border border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">

  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
    {msg.role === "user" ? "U" : "AI"}
  </div>

  <p className="font-bold">
    {msg.role === "user"
      ? "You"
      : "AI Assistant"}
  </p>

</div>

              <p className="whitespace-pre-wrap">
                {msg.content}
              </p>
              <p className="text-xs text-gray-400 mt-2">
  {msg.time}
</p>
              {msg.role === "assistant" && (
  <button
    onClick={() =>
      navigator.clipboard.writeText(msg.content)
    }
    className="mt-3 text-sm text-cyan-400"
  >
    Copy Answer
  </button>
)}
            </div>
          ))}

          {loading && (
            <div className="bg-slate-900 p-4 rounded-xl">
              <div className="flex gap-2">
  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
</div>
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>

        <div className="mt-8">

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                askAI();
              }
            }}
            placeholder="Ask any question..."
            className="w-full h-36 p-4 rounded-xl bg-slate-900"
          />

          <div className="flex gap-4 mt-4">

            <button
              onClick={askAI}
              className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-bold"
            >
              Ask AI
            </button>

            <button
              onClick={() => setMessages([])}
              className="border border-gray-600 px-6 py-3 rounded-lg"
            >
              Clear Chat
            </button>
            <button
  onClick={() => {
    const content = messages
      .map(
        (m) =>
          `${m.role.toUpperCase()}:\n${m.content}`
      )
      .join("\n\n");

    const blob = new Blob(
      [content],
      { type: "text/plain" }
    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "study-chat.txt";
    a.click();
  }}
  className="border border-cyan-500 px-6 py-3 rounded-lg"
>
  Export Chat
</button>

          </div>

        </div>

      </div>

    </main>
  );
}