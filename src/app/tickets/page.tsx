'use client'
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import { PlusIcon } from "@/assets/icons";


// ---------------- MOCK API DATA ----------------
const tickets = [
  { _id: "t1", title: "Order not received" },
  { _id: "t2", title: "Payment issue" },
  { _id: "t3", title: "Refund request" },
];

const conversations = [
  { _id: "c1", ticketId: "t1", user: "John Doe" },
  { _id: "c2", ticketId: "t1", user: "Support Agent" },
  { _id: "c3", ticketId: "t2", user: "Jane Smith" },
  { _id: "c4", ticketId: "t3", user: "Jane Smith" },
];

const messages = [
  { _id: "m1", conversationId: "c1", sender: "user", text: "My order is late" },
  { _id: "m2", conversationId: "c1", sender: "agent", text: "We are checking it" },
  { _id: "m3", conversationId: "c3", sender: "user", text: "Payment failed" },
  { _id: "m4", conversationId: "c4", sender: "user", text: "help me bro" },
];
// ------------------------------------------------

const TicketsPage = () => {
  const [activeTicketId, setActiveTicketId] = useState("t1");
  const [activeConversationId, setActiveConversationId] = useState("c1");

  const filteredConversations = conversations.filter(
    (c) => c.ticketId === activeTicketId
  );

  const filteredMessages = messages.filter(
    (m) => m.conversationId === activeConversationId
  );

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <Breadcrumb pageName="Tickets" />

      <div className="flex justify-between items-center mb-4">
        <Button
          label="Add ticket"
          variant="green"
          shape="full"
          size="small"
          icon={<PlusIcon />}
        />
      </div>

      <div className="flex flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-boxdark">
        {/* Tickets */}
        <aside className="w-72 border-r overflow-y-auto hidden md:block">
          <div className="p-4 font-semibold">Tickets</div>
          <ul className="space-y-1 px-2">
            {tickets.map((ticket) => (
              <li
                key={ticket._id}
                onClick={() => setActiveTicketId(ticket._id)}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm ${
                  activeTicketId === ticket._id
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {ticket.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Conversations */}
        <aside className="w-80 border-r overflow-y-auto hidden lg:block">
          <div className="p-4 font-semibold">Conversations</div>
          <ul className="space-y-2 px-3">
            {filteredConversations.map((conv) => (
              <li
                key={conv._id}
                onClick={() => setActiveConversationId(conv._id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer ${
                  activeConversationId === conv._id
                    ? "bg-green-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                  {conv.user[0]}
                </div>
                <p className="text-sm font-medium">{conv.user}</p>
              </li>
            ))}
          </ul>
        </aside>

        {/* Messages */}
        <main className="flex flex-1 flex-col">
          <div className="border-b p-4 font-semibold">Conversation</div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {filteredMessages.map((msg) => (
              <div
                key={msg._id}
                className={`max-w-md rounded-xl p-3 shadow text-sm ${
                  msg.sender === "agent"
                    ? "ml-auto bg-green-500 text-white"
                    : "bg-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-3">
              <input
                placeholder="Type your message..."
                className="flex-1 rounded-lg border px-4 py-2 text-sm"
              />
              <Button label="Send" variant="green" size="small" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TicketsPage;