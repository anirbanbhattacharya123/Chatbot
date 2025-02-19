'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { programmingKnowledge } from '@/lib/programming-knowledge';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  code?: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    const lowercaseMsg = userMessage.toLowerCase();
    
    // Check for specific programming topics
    for (const [language, topics] of Object.entries(programmingKnowledge)) {
      if (lowercaseMsg.includes(language.toLowerCase())) {
        for (const [topic, details] of Object.entries(topics)) {
          if (lowercaseMsg.includes(topic.toLowerCase())) {
            setIsTyping(false);
            return {
              content: `${details.description}`,
              code: details.examples
            };
          }
        }
        
        // If language is mentioned but no specific topic
        const topicsList = Object.keys(topics)
          .map(t => topics[t].topic)
          .join(', ');
        setIsTyping(false);
        return {
          content: `I can help you with ${language}! Here are some topics I know about: ${topicsList}. What would you like to learn?`
        };
      }
    }

    // Default response
    setIsTyping(false);
    return {
      content: "I can help you with C++ and Python programming. Try asking about specific topics like 'C++ pointers' or 'Python generators'!"
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await generateResponse(input);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.content,
      code: response.code,
      isBot: true,
    };

    setMessages(prev => [...prev, botMessage]);
    if (!isOpen) {
      setHasNewMessage(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[400px] h-[600px] bg-background border rounded-lg shadow-xl flex flex-col animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-primary/10 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Technical Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me about programming concepts</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 hover:bg-primary/20 text-foreground"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                }}
                className="h-8 w-8 hover:bg-primary/20 text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-secondary/30">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm p-4">
                  <p className="mb-2">👋 Hello! I'm your technical assistant.</p>
                  <p>Ask me about C++, Python, or other technical topics!</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-2",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  {message.isBot && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2 shadow-sm",
                      message.isBot
                        ? "bg-card text-card-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <div className="text-sm">{message.content}</div>
                    {message.code && (
                      <pre className="mt-2 p-3 bg-muted rounded-lg border text-sm overflow-x-auto font-mono">
                        <code>{message.code}</code>
                      </pre>
                    )}
                  </div>
                  {!message.isBot && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-card text-card-foreground max-w-[85%] rounded-2xl px-4 py-2 shadow-sm">
                    <div className="flex gap-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-100">•</span>
                      <span className="animate-bounce delay-200">•</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 bg-secondary/30 border-secondary/30"
              />
              <Button type="submit" size="icon" className="h-10 w-10 rounded-full">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg relative bg-primary hover:bg-primary/90 animate-in fade-in duration-300"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
          {hasNewMessage && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full"
            >
              1
            </Badge>
          )}
        </Button>
      )}
    </div>
  );
}