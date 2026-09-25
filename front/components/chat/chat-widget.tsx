"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, ListChecks, Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { CHAT_CHROME, TOP_LEVEL_OPTIONS } from "@/lib/chat/data";
import { getBotReply } from "@/lib/chat/api";

const BOT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCFZm0thCmmQiPDtaWr0bChOKpScRGT8p1X7sC6grLXO-g3KvANuFYNQN7kunE7Yd1VlnsuzC7sqxTGifV1HnigDTfp07lN3P2Tmnfwjs80dZUNXR465alau64HEpkawgkZzkIy5mkU2T__Kl8HfyRF2g8mCPe1Ei4EO5Jz4R2f55MbC5bdBNpyrdTJhWJgNSuUpvfcqeyiBy3FHb13G2ehV948SsnrL6jRNBqQgfxOpbJi8d4D3LfWCVvsl03nua_dqg";

type BotMessage = { id: string; role: "bot"; text: string; options?: string[]; isGreeting?: boolean };
type UserMessage = { id: string; role: "user"; text: string };
type ChatMessage = BotMessage | UserMessage;

let idCounter = 0;
function uid() {
  idCounter += 1;
  return `sc-msg-${idCounter}`;
}

// Saca las opciones de los mensajes anteriores -- mismo criterio que
// clearAllOptions() en la versión vanilla: cada vez que el usuario
// actúa, el grupo de botones vigente (si había alguno) deja de estarlo.
function clearOldOptions(msgs: ChatMessage[]): ChatMessage[] {
  return msgs.map((m) => (m.role === "bot" ? { ...m, options: undefined } : m));
}

export function ChatWidget() {
  const { lang } = useLanguage();
  const chrome = CHAT_CHROME[lang];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);

  const sessionIdRef = useRef<string>("");
  if (!sessionIdRef.current && typeof window !== "undefined") {
    sessionIdRef.current = crypto.randomUUID();
  }

  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Scroll al final cada vez que cambia la conversación.
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  // Si el idioma cambia ANTES de que el usuario escriba algo, el saludo
  // (y sus opciones) se re-traduce. Si ya hay conversación, no se toca
  // el historial -- mismo criterio que refreshGreetingIfUntouched().
  useEffect(() => {
    setMessages((prev) => {
      const hasUserMessage = prev.some((m) => m.role === "user");
      if (hasUserMessage) return prev;
      return prev.map((m) =>
        m.role === "bot" && m.isGreeting
          ? { ...m, text: chrome.greeting, options: TOP_LEVEL_OPTIONS[lang] }
          : m
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  async function handleUserInput(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...clearOldOptions(prev), { id: uid(), role: "user", text }]);
    setInputValue("");
    setSending(true);
    setTyping(true);
    try {
      const res = await getBotReply(text, lang, sessionIdRef.current);
      setTyping(false);
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text: res.reply, options: res.options }]);
    } catch {
      setTyping(false);
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text: chrome.connectionErrorMsg }]);
    }
    setSending(false);
  }

  function openPanel() {
    setOpen(true);
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [{ id: "sc-greeting", role: "bot", text: chrome.greeting, options: TOP_LEVEL_OPTIONS[lang], isGreeting: true }];
    });
    requestAnimationFrame(() => inputRef.current?.focus());
  }
  function closePanel() {
    setOpen(false);
    btnRef.current?.focus();
  }

  function handleMenuClick() {
    const alreadyShowingOptions = messages.some((m) => m.role === "bot" && m.options && m.options.length > 0);
    if (alreadyShowingOptions) {
      const el = messagesRef.current;
      if (el) el.scrollTop = el.scrollHeight;
      return;
    }
    setMessages((prev) => [...prev, { id: uid(), role: "bot", text: chrome.menuPrompt, options: TOP_LEVEL_OPTIONS[lang] }]);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) closePanel();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        id="sc-chat-btn"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="sc-chat-panel"
        aria-label={open ? chrome.closeLabel : chrome.openLabel}
        onClick={() => (open ? closePanel() : openPanel())}
      >
        {open ? <X size={26} /> : <MessageSquare size={26} />}
      </button>

      {open && (
        <div id="sc-chat-panel" role="dialog" aria-modal="false" aria-labelledby="sc-chat-title">
          <div className="sc-chat-header">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BOT_AVATAR} alt="" aria-hidden="true" />
            <div className="sc-chat-header-text">
              <div id="sc-chat-title" className="sc-name">{chrome.title}</div>
              <div className="sc-status">
                <span className="sc-dot" /> {chrome.status}
              </div>
            </div>
            <button id="sc-chat-menu" type="button" aria-label={chrome.menuBtnLabel} onClick={handleMenuClick}>
              <ListChecks size={20} />
            </button>
            <button id="sc-chat-close" type="button" aria-label={chrome.closeBtnLabel} onClick={closePanel}>
              <X size={20} />
            </button>
          </div>

          <div className="sc-chat-disclaimer">{chrome.disclaimer}</div>

          <div id="sc-chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((m) =>
              m.role === "user" ? (
                <div className="sc-msg sc-user" key={m.id}>
                  <p className="sc-bubble">{m.text}</p>
                </div>
              ) : (
                <div key={m.id}>
                  <div className="sc-msg sc-bot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={BOT_AVATAR} alt="" aria-hidden="true" />
                    <p className="sc-bubble">{m.text}</p>
                  </div>
                  {m.options && m.options.length > 0 && (
                    <div className="sc-options">
                      {m.options.map((label) => (
                        <button
                          key={label}
                          type="button"
                          className="sc-option-btn"
                          onClick={() => handleUserInput(label)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            {typing && (
              <div className="sc-msg sc-bot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={BOT_AVATAR} alt="" aria-hidden="true" />
                <div className="sc-bubble sc-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          <form
            id="sc-chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleUserInput(inputValue);
            }}
          >
            <label htmlFor="sc-chat-input" className="sr-only">{chrome.inputLabel}</label>
            <input
              id="sc-chat-input"
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={chrome.placeholder}
              autoComplete="off"
              maxLength={400}
            />
            <button id="sc-chat-send" type="submit" aria-label={chrome.sendLabel} disabled={sending}>
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

