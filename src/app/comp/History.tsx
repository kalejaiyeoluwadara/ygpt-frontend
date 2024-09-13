"use client";

import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useRouter } from "next/navigation";

// Define the type for each chat history item
type TChatHistory = {
  _id: string;
  createdAt: string;
  messages: {
    sender: string;
    text: string;
    _id: string;
    timestamp: string;
  }[];
};

function History() {
  const [chatHistory, setChatHistory] = useState<TChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch("/api/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setChatHistory(data.chatHistory || []); // Ensure chatHistory is an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  // Handle clicking a chat history item (navigate to the chat)
  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  // Get the most recent chat for highlighting
  const mostRecentChat = chatHistory.length > 0 ? chatHistory[0] : null;

  return (
    <section className="mt-8 h-[360px] overflow-auto font-semibold text-white">
      <p className="mb-2 text-sm">Recently</p>
      <div className="w-full flex flex-col gap-2">
        {loading ? (
          <p className="text-sm text-gray-400">Loading chat history...</p>
        ) : chatHistory.length > 0 ? (
          chatHistory.map((chat) => {
            // Derive a title from the first message or use a placeholder
            const chatTitle =
              chat.messages[0]?.text.substring(0, 30) || "Untitled Chat"; // Limit the title length to 30 characters

            return (
              <div
                key={chat._id}
                className={`w-full  group flex justify-between items-center px-2 py-3 rounded-md cursor-pointer transition-all ${
                  chat._id === mostRecentChat?._id
                    ? "bg-stone-800" // Highlight most recent chat
                    : "hover:bg-stone-800"
                }`}
                onClick={() => handleChatClick(chat._id)} // Navigate to chat when clicked
              >
                <div>
                  <p className="text-sm w-[140px]  truncate">{chatTitle}</p>
                  {/* <p className="text-xs text-gray-400">
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p> */}
                </div>
                <IoIosMore
                  size={20}
                  className={`text-gray-300 flex-shrink-0 ${
                    chat._id === mostRecentChat?._id
                      ? "opacity-100" // Highlight most recent chat
                      : "opacity-0 group-hover:opacity-100 transition-all"
                  }`}
                />
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400">No chat history available.</p>
        )}
      </div>
    </section>
  );
}

export default History;
