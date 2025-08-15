import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function ProblemAI() {
    const { problem } = useOutletContext();
    const [messages, setMessages] = useState([]);
    const [thinking, setThinking] = useState(false);
    const messagesEndRef = useRef(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        scrollToBottom();
    }, [messages, thinking]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    async function getAnswer(d) {
        async function fetchreply(d) {
            const response = await axiosClient.post("/ai/chat", d);
            const reply = response.data;
            setThinking(false);
            setMessages((prev) => [...prev, { role: "model", parts: [{ text: reply }] }]);
        }
        reset();
        setMessages((prev) => [...prev, { role: "user", parts: [{ text: d?.prompt }] }]);
        setThinking(true);
        fetchreply(d);
    }

    return (
        <div className="h-full w-full flex flex-col bg-neutral-900 rounded-xl border border-neutral-700 overflow-hidden">
            {/* Header */}
            <div className="bg-neutral-900 p-4 flex items-center border-b-2">
                <div className="bg-white p-2 rounded-full mr-3">
                    {/* <Bot className="h-6 w-6 text-blue-400" /> */}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-white">AI Assistant: Drago</h2>
                </div>
            </div>
            
            {/* Chat Container */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                {/* Welcome Message */}
                <div className="flex mb-6">
                    <div className="mr-3 mt-1 flex-shrink-0">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-full">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                    </div>
                    <div className="bg-neutral-800 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                        <p className="text-white">
                            {`Hi, I'm Drago. I can solve any queries you have regarding "${problem?.title}". I can debug your code, provide optimal solutions, and more. Just ask, and I'll assist you!`}
                        </p>
                        <div className="flex items-center mt-3">
                            <Sparkles className="h-4 w-4 text-yellow-400 mr-1" />
                            <span className="text-xs text-neutral-400">Powered by advanced AI</span>
                        </div>
                    </div>
                </div>
                
                {/* Messages */}
                {messages.map((val, index) => {
                    if (val?.role === "user") {
                        return (
                            <div key={index} className="flex justify-end mb-6">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                                    <p className="text-white">{val?.parts[0]?.text}</p>
                                </div>
                                {/* <div className="ml-3 mt-1 flex-shrink-0">
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-full">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                </div> */}
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className="flex mb-6">
                                {/* <div className="mr-3 mt-1 flex-shrink-0">
                                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-full">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                </div> */}
                                <div className="bg-neutral-800 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                                    <p className="text-white">{val?.parts[0]?.text}</p>
                                </div>
                            </div>
                        );
                    }
                })}
                
                {/* Thinking Indicator */}
                {thinking && (
                    <div className="flex mb-6">
                        <div className="mr-3 mt-1 flex-shrink-0">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-full">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                        </div>
                        <div className="bg-neutral-800 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                            <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t border-neutral-700 p-3">
                <form onSubmit={handleSubmit(getAnswer)} className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <textarea
                            {...register('prompt', { required: true })}
                            rows={1}
                            className="w-full bg-neutral-800 text-white rounded-xl py-3 px-4 pr-12 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none custom-scrollbar"
                            placeholder="Ask me anything about this problem..."
                            onInput={(e) => {
                                e.target.style.height = "auto";
                                e.target.style.height = (e.target.scrollHeight) + "px";
                            }}
                        />
                        {errors.prompt && (
                            <p className="absolute bottom-0 left-0 transform translate-y-full mt-1 text-xs text-red-400">
                                Please enter a question
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 p-3 rounded-xl flex-shrink-0"
                    >
                        <Send className="h-5 w-5 text-white" />
                    </button>
                </form>
            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #2a2a2a;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3d3d3d;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4a4a4a;
                }
            `}</style>
        </div>
    );
}