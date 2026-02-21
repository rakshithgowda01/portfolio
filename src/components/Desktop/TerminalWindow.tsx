import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  onClose?: () => void;
}

interface OutputLine {
  type: 'command' | 'output' | 'error';
  content: string;
}

const COMMANDS: Record<string, string> = {
  help: 'help          - List available commands',
  about: 'about         - Display info about the portfolio owner',
  whoami: 'whoami        - Display current user',
  date: 'date          - Display current date and time',
  clear: 'clear         - Clear the terminal screen',
  exit: 'exit          - Close the terminal',
};

const ABOUT_TEXT = `
Hi, I'm Rakshith R — a creative mind who loves building websites and landing pages 
with clean design, cool UI, and smooth animations. I'm also exploring AI SaaS, 
cybersecurity, and a touch of design, always learning and experimenting to push 
ideas into reality.

Education: Pursuing BCA at Gopalan College in Bangalore.
Long-term goal: Build something big or work remotely in NYC while exploring the world.
`.trim();

export const TerminalWindow = ({ onClose }: TerminalWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [output, setOutput] = useState<OutputLine[]>([
    { type: 'output', content: "Welcome to Terminal. Type 'help' for available commands." },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const cardWrapperRef = useRef<HTMLDivElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const el = cardWrapperRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside as any);
    };
  }, [onClose]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const command = parts[0];

    if (!command) return;

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const addOutput = (type: OutputLine['type'], content: string) => {
      setOutput((prev) => [...prev, { type, content }]);
    };

    addOutput('command', `$ ${cmd}`);

    switch (command) {
      case 'help':
        addOutput('output', '');
        Object.values(COMMANDS).forEach((line) => addOutput('output', line));
        break;

      case 'about':
        addOutput('output', ABOUT_TEXT);
        break;

      case 'whoami':
        addOutput('output', 'rakshith');
        break;

      case 'date':
        addOutput('output', new Date().toString());
        break;

      case 'clear':
        setOutput([]);
        break;

      case 'exit':
        onClose?.();
        break;

      default:
        addOutput('error', `zsh: command not found: ${command}`);
        addOutput('output', "Type 'help' for available commands.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, type: 'spring', stiffness: 260, damping: 22 }}
      className="fixed inset-0 z-50"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="absolute inset-0" />
      <div ref={cardWrapperRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          drag={!isMinimized}
          dragMomentum={false}
          dragElastic={0}
          onDrag={(_, info) => {
            if (isMinimized) return;
            setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className={`transition-all duration-300 ease-in-out ${
            isMinimized ? 'w-64 h-16 md:w-80 md:h-20' : 'w-[95vw] sm:w-[600px] md:w-[700px] h-[70vh] sm:h-[450px] md:h-[500px]'
          } bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-700 overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ x: position.x, y: position.y }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          <div className={`relative w-full h-full ${isMinimized ? 'p-3 md:p-4' : 'p-0'} overflow-hidden`}>
            {/* Minimized View */}
            {isMinimized && (
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#2d2d2d] rounded flex items-center justify-center border border-gray-600">
                    <span className="text-emerald-400 text-sm font-mono">&gt;_</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold truncate text-gray-200">Terminal</h3>
                    <p className="text-gray-500 text-xs">zsh</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors"
                >
                  <span className="text-gray-300 text-sm">□</span>
                </button>
              </div>
            )}

            {/* Full View - macOS Terminal style */}
            {!isMinimized && (
              <>
                {/* Title Bar */}
                <div className="bg-[#323232] border-b border-gray-600 px-3 py-2 flex items-center justify-between rounded-t-xl cursor-grab active:cursor-grabbing">
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                    />
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
                    />
                    <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors" />
                  </div>
                  <div className="text-xs font-medium text-gray-400">Terminal — zsh</div>
                  <div className="w-12" />
                </div>

                {/* Terminal Content */}
                <div
                  className="p-4 h-[calc(100%-40px)] overflow-y-auto font-mono text-sm"
                  style={{ fontFamily: 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace' }}
                  onClick={() => inputRef.current?.focus()}
                >
                  <div className="space-y-1 text-gray-300">
                    {output.map((line, i) => (
                      <div
                        key={i}
                        className={
                          line.type === 'command'
                            ? 'text-emerald-400'
                            : line.type === 'error'
                              ? 'text-red-400'
                              : 'text-gray-300'
                        }
                      >
                        {line.content}
                      </div>
                    ))}
                  </div>
                  <div ref={outputEndRef} />

                  {/* Input area */}
                  <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
                    <span className="text-emerald-400 select-none">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-gray-300 outline-none border-none focus:ring-0 placeholder-gray-500"
                      placeholder="Type a command..."
                      autoFocus
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </form>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
