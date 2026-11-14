"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Code, 
  Database, 
  Layers, 
  Terminal,
  Eye,
  Copy,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Settings,
  Download,
  Upload,
  GitBranch,
  User,
  MessageSquare,
  PenTool,
} from "lucide-react";
import { PixelButton } from "./PixelButton";
import { BitmapText } from "./BitmapText";

interface Token {
  name: string;
  value: string;
  type: "color" | "spacing" | "typography" | "border" | "shadow" | "other";
  category: string;
  cssVar: string;
  figmaPath?: string;
  description?: string;
}

interface ComponentTokenMap {
  component: string;
  tokens: Token[];
}

const mockTokens: Token[] = [
  { name: "color-brand-primary", value: "#00FF88", type: "color", category: "Brand", cssVar: "--color-primary", figmaPath: "Brand/Primary/500", description: "Primary brand color - used for CTAs, links, active states" },
  { name: "color-brand-secondary", value: "#00CC6A", type: "color", category: "Brand", cssVar: "--color-secondary", figmaPath: "Brand/Primary/400", description: "Secondary brand color - hover states, secondary actions" },
  { name: "color-bg-0", value: "#0D0D0D", type: "color", category: "Background", cssVar: "--color-bg-0", figmaPath: "Background/0", description: "Deepest background - page canvas" },
  { name: "color-bg-100", value: "#1A1A2E", type: "color", category: "Background", cssVar: "--color-bg-100", figmaPath: "Background/100", description: "Elevated surface - cards, panels" },
  { name: "color-bg-200", value: "#2D2D44", type: "color", category: "Background", cssVar: "--color-bg-200", figmaPath: "Background/200", description: "Interactive surface - inputs, hover" },
  { name: "color-fg-0", value: "#FFFFFF", type: "color", category: "Foreground", cssVar: "--color-fg-0", figmaPath: "Text/Primary", description: "Primary text - headings, body" },
  { name: "color-fg-100", value: "#E0E0E0", type: "color", category: "Foreground", cssVar: "--color-fg-100", figmaPath: "Text/Secondary", description: "Secondary text - descriptions, labels" },
  { name: "color-border", value: "#3D3D5C", type: "color", category: "Border", cssVar: "--color-border", figmaPath: "Border/Default", description: "Default border - cards, inputs, tables" },
  { name: "space-1", value: "8px", type: "spacing", category: "Spacing", cssVar: "--space-1", figmaPath: "Spacing/8", description: "1 grid unit - base spacing" },
  { name: "space-2", value: "16px", type: "spacing", category: "Spacing", cssVar: "--space-2", figmaPath: "Spacing/16", description: "2 grid units - component padding" },
  { name: "space-4", value: "32px", type: "spacing", category: "Spacing", cssVar: "--space-4", figmaPath: "Spacing/32", description: "4 grid units - section spacing" },
  { name: "font-display", value: "Silkscreen", type: "typography", category: "Typography", cssVar: "--font-display", figmaPath: "Type/Display", description: "Bitmap display font - headlines" },
  { name: "font-mono", value: "JetBrains Mono", type: "typography", category: "Typography", cssVar: "--font-mono", figmaPath: "Type/Mono", description: "Monospace UI font - body, code" },
  { name: "radius-default", value: "4px", type: "border", category: "Border Radius", cssVar: "--radius-default", figmaPath: "Radius/4", description: "Default radius - buttons, cards" },
  { name: "shadow-default", value: "4px 4px 0 0", type: "shadow", category: "Shadow", cssVar: "--shadow-default", figmaPath: "Shadow/Default", description: "Hard drop shadow - elevated elements" },
];

const mockComponentMaps: ComponentTokenMap[] = [
  {
    component: "PixelButton",
    tokens: mockTokens.filter(t => ["color-brand-primary", "color-bg-100", "color-border", "space-2", "radius-default", "shadow-default", "font-mono"].includes(t.name)),
  },
  {
    component: "Card",
    tokens: mockTokens.filter(t => ["color-bg-100", "color-border", "space-4", "radius-default", "shadow-default"].includes(t.name)),
  },
  {
    component: "BitmapText",
    tokens: mockTokens.filter(t => ["font-display", "color-fg-0", "color-brand-primary"].includes(t.name)),
  },
  {
    component: "Input",
    tokens: mockTokens.filter(t => ["color-bg-0", "color-border", "color-fg-0", "space-1", "radius-default", "font-mono"].includes(t.name)),
  },
];

const mockCLICommands = [
  { cmd: "tokens export --format=json", desc: "Export all tokens as JSON" },
  { cmd: "tokens export --format=css", desc: "Export CSS custom properties" },
  { cmd: "tokens export --format=figma", desc: "Export Figma Variables JSON" },
  { cmd: "tokens export --format=sd", desc: "Export Style Dictionary config" },
  { cmd: "components lint", desc: "Lint all components for token usage" },
  { cmd: "components audit", desc: "Audit token coverage across components" },
  { cmd: "figma sync --pull", desc: "Pull latest tokens from Figma" },
  { cmd: "figma sync --push", desc: "Push local tokens to Figma" },
  { cmd: "build --watch", desc: "Build with file watching" },
  { cmd: "deploy --env=preview", desc: "Deploy to preview environment" },
];

export function DevToolsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"elements" | "tokens" | "components" | "console" | "network">("elements");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [consoleInput, setConsoleInput] = useState("");
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string>("");
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState(400);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.key === "i" && e.metaKey && e.altKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      const newHeight = Math.max(200, Math.min(800, window.innerHeight - e.clientY));
      setPanelHeight(newHeight);
    };
    const handleMouseUp = () => setIsResizing(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const filteredTokens = mockTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || token.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const tokenTypes = ["all", "color", "spacing", "typography", "border", "shadow", "other"];

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;
    
    const cmd = consoleInput.trim();
    setConsoleHistory(prev => [...prev, `\x3e ${cmd}`]);
    
    let output = "";
    if (cmd === "help") {
      output = mockCLICommands.map(c => `  ${c.cmd.padEnd(35)} ${c.desc}`).join("\n");
    } else if (cmd.startsWith("tokens export")) {
      output = `\u2713 Exported ${mockTokens.length} tokens\n  Output: ./dist/tokens.json`;
    } else if (cmd === "components lint") {
      output = `\u2713 Linted 24 components\n  0 errors, 2 warnings (unused tokens)`;
    } else if (cmd === "components audit") {
      output = `Token Coverage Report:\n  PixelButton: 100%\n  Card: 100%\n  BitmapText: 100%\n  Input: 100%\n  Overall: 100%`;
    } else if (cmd.startsWith("figma sync")) {
      output = `\u2713 Synced with Figma file \"Design System v3.2\"\n  142 tokens updated, 3 added, 0 removed`;
    } else if (cmd.startsWith("build")) {
      output = `\u2713 Build successful\n  Bundle: 47.2 kB gzipped\n  Tokens: 16 colors, 12 spacing, 4 typography`;
    } else if (cmd.startsWith("deploy")) {
      output = `\u2713 Deployed to preview\n  URL: https://portfolio-preview.vercel.app`;
    } else {
      output = `Command not found: ${cmd}\nType 'help' for available commands`;
    }
    
    setConsoleOutput(output);
    setConsoleInput("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const tabs = [
    { id: "elements", label: "Elements", icon: Code },
    { id: "tokens", label: "Tokens", icon: Database },
    { id: "components", label: "Components", icon: Layers },
    { id: "console", label: "Console", icon: Terminal },
    { id: "network", label: "Network", icon: Layers },
  ];

  if (!isOpen) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-[var(--z-tooltip)] btn-pixel-secondary px-3 py-2"
          aria-label="Open DevTools (F12)"
          title="Open DevTools (F12)"
        >
          <Code className="w-4 h-4" />
          <span className="hidden sm:inline">DevTools</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-mono-xs bg-[var(--color-bg-0)] border border-[var(--color-border)] rounded">F12</kbd>
        </button>
      </>
    );
  }

  return (
    <div
      ref={panelRef}
      className={cn(
        "devtools-panel expanded fixed bottom-0 left-0 right-0 z-[var(--z-devtools)]",
        "bg-[var(--color-bg-100)] border-t-2 border-[var(--color-border)]",
        "shadow-[var(--shadow-xl)]",
        "flex flex-col",
        "transition-transform duration-[200ms] ease-[steps(4)]"
      )}
      style={{ height: `${panelHeight}px` }}
      role="dialog"
      aria-label="Developer Tools"
    >
      <div
        onMouseDown={handleResizeStart}
        className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize bg-[var(--color-border)] hover:bg-[var(--color-primary)]"
        aria-label="Resize panel"
      />

      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-3 py-2 bg-[var(--color-bg-200)]">
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-mono-xs font-mono",
                "border border-transparent rounded-t-[4px]",
                "transition-[background-color,border-color,color] duration-[80ms] ease-[steps(2)]",
                "whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-[var(--color-bg-100)] border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-[var(--color-fg-200)] hover:text-[var(--color-fg-0)] hover:bg-[var(--color-bg-300)]"
              )}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <PixelButton variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close DevTools">
            <X className="w-4 h-4" />
          </PixelButton>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Elements Panel */}
        {activeTab === "elements" && (
          <div className="flex-1 overflow-auto p-4 font-mono text-mono-xs">
            <div className="space-y-1 font-code text-[var(--color-fg-200)]">
              <div className="flex gap-2"><span className="text-[var(--color-brand-0)]">{"<html>"}</span></div>
              <div className="ml-4 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<body.grid>"}</span></div>
              <div className="ml-8 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<header.nav>"}</span></div>
              <div className="ml-12 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<logo.bitmap>"}</span> <span className="text-[var(--color-fg-200)]">&quot;SUMIT.SHARMA&quot;</span></div>
              <div className="ml-12 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<nav.tabs>"}</span></div>
              <div className="ml-16 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<a>"}</span>Work<span className="text-[var(--color-brand-0)]">{"</a>"}</span></div>
              <div className="ml-16 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<a>"}</span>Systems<span className="text-[var(--color-brand-0)]">{"</a>"}</span></div>
              <div className="ml-16 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<a>"}</span>Writing<span className="text-[var(--color-brand-0)]">{"</a>"}</span></div>
              <div className="ml-16 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<a>"}</span>Contact<span className="text-[var(--color-brand-0)]">{"</a>"}</span></div>
              <div className="ml-8 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<main.case-study>"}</span></div>
              <div className="ml-12 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<h1.bitmap>"}</span> <span className="text-[var(--color-fg-200)]">&quot;Cars24 Design System&quot;</span></div>
              <div className="ml-12 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<spec-sheet>"}</span></div>
              <div className="ml-16 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<token-map>"}</span></div>
              <div className="ml-16 flex gap-2"><span className="text-[var(--color-brand-0)]">{"<metric>"}</span></div>
            </div>
          </div>
        )}

        {/* Tokens Panel */}
        {activeTab === "tokens" && (
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-200)]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-fg-300)]" />
                <input
                  type="text"
                  placeholder="Search tokens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-pixel pl-10"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-pixel w-auto min-w-[140px]"
              >
                {tokenTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <PixelButton variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(mockTokens, null, 2))}>
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </PixelButton>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="spec-table">
                <thead>
                  <tr className="sticky top-0 bg-[var(--color-bg-200)]">
                    <th className="w-8"></th>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>CSS Var</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTokens.map((token) => (
                    <tr
                      key={token.name}
                      className={cn(
                        "cursor-pointer transition-colors duration-[80ms]",
                        selectedToken?.name === token.name && "bg-[var(--color-brand-300)] text-[var(--color-bg-0)]"
                      )}
                      onClick={() => setSelectedToken(selectedToken?.name === token.name ? null : token)}
                    >
                      <td>
                        {token.type === "color" && (
                          <div
                            className="w-6 h-6 border border-[var(--color-border)]"
                            style={{ backgroundColor: token.value }}
                            title={token.value}
                          />
                        )}
                      </td>
                      <td className="font-mono text-mono-xs">{token.name}</td>
                      <td className="font-code text-mono-xs text-[var(--color-fg-100)]">{token.value}</td>
                      <td>
                        <span className={cn(
                          "badge-pixel text-mono-xs px-2 py-0.5",
                          token.type === "color" && "bg-[var(--color-brand-300)]",
                          token.type === "spacing" && "bg-[var(--color-warning-200)]",
                          token.type === "typography" && "bg-[var(--color-accent-300)]",
                          token.type === "border" && "bg-[var(--color-bg-300)]",
                          token.type === "shadow" && "bg-[var(--color-fg-200)] text-[var(--color-bg-0)]",
                        )}>
                          {token.type}
                        </span>
                      </td>
                      <td className="text-[var(--color-fg-200)]">{token.category}</td>
                      <td className="font-code text-mono-xs text-[var(--color-brand-0)]">{token.cssVar}</td>
                      <td className="text-right">
                        <PixelButton
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(token.cssVar); }}
                          aria-label={`Copy ${token.cssVar}`}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </PixelButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedToken && (
              <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-200)] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <BitmapText size="sm" color="primary">{selectedToken.name}</BitmapText>
                      <span className={cn(
                        "badge-pixel text-mono-xs",
                        selectedToken.type === "color" && "bg-[var(--color-brand-300)]",
                        selectedToken.type === "spacing" && "bg-[var(--color-warning-200)]",
                        selectedToken.type === "typography" && "bg-[var(--color-accent-300)]",
                      )}>
                        {selectedToken.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-mono-sm">
                      <div>
                        <span className="text-[var(--color-fg-300)]">Value:</span>
                        <span className="ml-2 font-code text-[var(--color-fg-0)]">{selectedToken.value}</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-fg-300)]">CSS Var:</span>
                        <span className="ml-2 font-code text-[var(--color-brand-0)]">{selectedToken.cssVar}</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-fg-300)]">Figma:</span>
                        <span className="ml-2 font-code text-[var(--color-fg-100)]">{selectedToken.figmaPath || "\u2014"}</span>
                      </div>
                      <div>
                        <span className="text-[var(--color-fg-300)]">Category:</span>
                        <span className="ml-2">{selectedToken.category}</span>
                      </div>
                    </div>
                    {selectedToken.description && (
                      <p className="mt-3 text-[var(--color-fg-100)] text-mono-sm">{selectedToken.description}</p>
                    )}
                  </div>
                  <PixelButton variant="ghost" size="sm" onClick={() => setSelectedToken(null)}>
                    <X className="w-4 h-4" />
                  </PixelButton>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Components Panel */}
        {activeTab === "components" && (
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {mockComponentMaps.map((map) => (
                <div key={map.component} className="card-pixel">
                  <div className="flex items-center justify-between mb-3">
                    <BitmapText size="sm" color="primary">{map.component}</BitmapText>
                    <PixelButton variant="ghost" size="sm" onClick={() => copyToClipboard(JSON.stringify(map.tokens, null, 2))}>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy Tokens</span>
                    </PixelButton>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {map.tokens.map((token) => (
                      <span
                        key={token.name}
                        className={cn(
                          "badge-pixel text-mono-xs px-2 py-1",
                          token.type === "color" && "bg-[var(--color-brand-300)]",
                          token.type === "spacing" && "bg-[var(--color-warning-200)]",
                          token.type === "typography" && "bg-[var(--color-accent-300)]",
                          token.type === "border" && "bg-[var(--color-bg-300)]",
                          token.type === "shadow" && "bg-[var(--color-fg-200)] text-[var(--color-bg-0)]",
                        )}
                      >
                        {token.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Console Panel */}
        {activeTab === "console" && (
          <div className="flex-1 overflow-hidden flex flex-col font-mono text-mono-xs">
            <div className="flex-1 overflow-auto p-4 bg-[var(--color-bg-0)] border-b border-[var(--color-border)]">
              <div className="space-y-1 text-[var(--color-fg-200)]">
                <div className="text-[var(--color-brand-0)]">Welcome to Portfolio DevTools</div>
                <div className="text-[var(--color-fg-300)]">Type &apos;help&apos; for available commands</div>
                {consoleHistory.map((line, i) => (
                  <div key={i} className="text-[var(--color-fg-100)]">{line}</div>
                ))}
                {consoleOutput && (
                  <pre className="whitespace-pre-wrap text-[var(--color-fg-100)]">{consoleOutput}</pre>
                )}
              </div>
            </div>

            <form onSubmit={handleConsoleSubmit} className="flex items-center gap-2 p-3 border-t border-[var(--color-border)] bg-[var(--color-bg-100)]">
              <span className="text-[var(--color-brand-0)]">\x3e</span>
              <input
                type="text"
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-mono text-mono-xs text-[var(--color-fg-0)] placeholder-[var(--color-fg-300)]"
                placeholder="Type a command..."
                autoFocus
              />
              <PixelButton variant="ghost" size="sm" type="submit">
                <Upload className="w-3.5 h-3.5" />
              </PixelButton>
            </form>
          </div>
        )}

        {/* Network Panel */}
        {activeTab === "network" && (
          <div className="flex-1 overflow-auto p-4 font-mono text-mono-xs">
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Time</th>
                  <th>Waterfall</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "index.html", status: 200, type: "document", size: "2.4 KB", time: "12ms", color: "brand" },
                  { name: "globals.css", status: 200, type: "stylesheet", size: "8.7 KB", time: "8ms", color: "brand" },
                  { name: "main.js", status: 200, type: "script", size: "47.2 KB", time: "45ms", color: "brand" },
                  { name: "tokens.json", status: 200, type: "json", size: "3.1 KB", time: "5ms", color: "brand" },
                  { name: "bitmap-font.woff2", status: 200, type: "font", size: "12.8 KB", time: "23ms", color: "warning" },
                  { name: "case-study-cars24.mdx", status: 200, type: "document", size: "1.9 KB", time: "6ms", color: "brand" },
                ].map((item, i) => (
                  <tr key={i}>
                    <td className="font-code">{item.name}</td>
                    <td>
                      <span className={cn(
                        "badge-pixel text-mono-xs",
                        item.status === 200 && "bg-[var(--color-brand-300)]"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-[var(--color-fg-200)]">{item.type}</td>
                    <td className="text-[var(--color-fg-200)]">{item.size}</td>
                    <td className="text-[var(--color-fg-200)]">{item.time}</td>
                    <td>
                      <div className="h-2 bg-[var(--color-bg-200)] rounded overflow-hidden" style={{ width: "100px" }}>
                        <div 
                          className="h-full" 
                          style={{ 
                            width: `${((i * 37) % 80) + 10}%`,
                            backgroundColor: item.color === "brand" ? "var(--color-primary)" : "var(--color-warning)"
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}