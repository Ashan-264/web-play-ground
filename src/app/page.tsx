"use client"; // For Next.js app router (if applicable)

import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface Post {
  title: string;
}

// Modal Component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="mt-4">{children}</div>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default function Page() {
  // State Variables
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [apiData, setApiData] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  // const [countInfo, setCountInfo] = useState<CountInfo>()

  // interface CountInfo {
  //   startTime: string,
  //   endtime:string;
  // }

  // Fetching Data from API (Example)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data: Post[]) => setApiData(data.map((item) => item.title)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">React Components Playground</h1>

      {/* Counter Example */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Counter</h2>
        <p className="text-gray-700">Current Count: {count}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>
      </div>

      {/* Input Example */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Controlled Input</h2>
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <p className="text-gray-500 mt-2">You typed: {inputValue}</p>
      </div>

      {/* API Data Fetching */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Fetched API Data</h2>
        {apiData.length > 0 ? (
          <ul className="list-disc pl-4">
            {apiData.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Loading data...</p>
        )}
      </div>

      {/* Modal Example */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Modal Example</h2>
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setShowModal(true)}
        >
          Open Modal
        </button>
      </div>

      {/* Render Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="My Modal"
      >
        <p>This is a simple modal window.</p>
      </Modal>
    </div>
  );
}
