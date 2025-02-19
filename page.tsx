import { ChatBot } from '@/components/ChatBot';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 className="text-4xl font-bold mb-8">Welcome to Technical Assistant</h1>
        <p className="text-lg text-muted-foreground">
          Ask me anything about C++, Python, Figma, Manufacturing, and Thermodynamics!
        </p>
      </div>
      <ChatBot />
    </main>
  );
}