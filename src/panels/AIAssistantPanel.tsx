import { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/Icon/Icon';

interface Message {
  role: 'ai' | 'user';
  text: string;
  citations?: string[];
}

interface AIAssistantPanelProps {
  open: boolean;
  onClose: () => void;
  push?: (msg: string) => void;
}

const SUGGESTED_PROMPTS = [
  'Summarize this week',
  'Which deals are at risk?',
  'Draft a follow-up to Vertex Health',
  'Generate weekly digest email',
];

function generateMockReply(q: string): { text: string; citations?: string[] } {
  const ql = q.toLowerCase();
  if (ql.includes('risk') || ql.includes('churn')) {
    return {
      text: "I see <b>3 accounts</b> with elevated churn signals this week:<br/><br/>• <b>Vertex Health</b> — usage down 38% MTD, last login 12 days ago<br/>• <b>Glasswing Studio</b> — trial ending in 3 days, no decision-maker meeting scheduled<br/>• <b>Lumen Mobility</b> — support ticket open 9 days, sentiment negative<br/><br/>Want me to draft outreach for any of these?",
      citations: ['Vertex Health usage report', 'Glasswing trial timeline', 'Lumen support log'],
    };
  }
  if (ql.includes('week') || ql.includes('summary') || ql.includes('digest')) {
    return {
      text: "Here's your week at a glance:<br/><br/>• Pipeline up <b>12.4%</b> — $1.24M weighted<br/>• <b>2 deals closed</b> ($63.2k total) — Pearl Maritime, Orbit Studios<br/>• <b>3 deals stuck</b> in Negotiation more than 14 days<br/>• Top performer: <b>Amelia Rouse</b> with $412k closed-won<br/><br/>The biggest opportunity is converting the 3 stalled negotiations — they represent <b>$346k</b> in pipeline.",
      citations: ['Weekly pipeline report', 'Top performers'],
    };
  }
  if (ql.includes('draft') || ql.includes('follow') || ql.includes('email')) {
    return {
      text: "Here's a draft you can edit:<br/><br/><i>Hi Priya,</i><br/><br/><i>Following up on our integration scoping call — I've shared your questions about webhook retry behavior with our engineering team. Quick summary of their answers:</i><br/><br/><i>1. Exponential backoff (1s, 2s, 4s, 8s, max 64s) over 24 hours<br/>2. Metadata filtering is supported via the events query parameter<br/>3. At 4× your current volume, you'd remain comfortably within the Enterprise tier</i><br/><br/><i>Happy to set up a 30-minute follow-up this week.</i>",
    };
  }
  return {
    text: "I can help with pipeline analysis, drafting outreach, summarizing reports, and surfacing risk signals. What would you like to do?",
  };
}

export function AIAssistantPanel({ open, onClose }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi Mira — I'm Helix. I've reviewed your pipeline and have a few observations ready when you are." },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput('');
    setMessages(arr => [...arr, { role: 'user', text: q }]);
    setThinking(true);
    setTimeout(() => {
      const reply = generateMockReply(q);
      setThinking(false);
      setMessages(arr => [...arr, { role: 'ai', text: reply.text, citations: reply.citations }]);
    }, 1100 + Math.random() * 600);
  };

  return (
    <>
      <div className={'drawer-backdrop' + (open ? ' open' : '')} onClick={onClose}></div>
      <aside className={'ai-panel' + (open ? ' open' : '')} role="dialog" aria-label="AI assistant">
        <div className="ai-panel-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="ai-orb"><Icon name="sparkles" size={14} style={{ color: 'var(--bg)' }}/></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Ask Helix</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>AI assistant · analyzing 2,418 contacts</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="icon-btn" title="New chat"><Icon name="plus" size={15}/></button>
            <button className="icon-btn" title="History"><Icon name="refresh" size={15}/></button>
            <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={15}/></button>
          </div>
        </div>

        <div className="ai-panel-stream" ref={streamRef}>
          {messages.map((m, i) => (
            <div key={i} className={'ai-msg ' + m.role}>
              {m.role === 'ai' && (
                <div className="ai-orb" style={{ width: 22, height: 22, borderRadius: 5, flexShrink: 0 }}>
                  <Icon name="sparkles" size={11} style={{ color: 'var(--bg)' }}/>
                </div>
              )}
              <div className="ai-msg-body">
                <div className="ai-msg-text" dangerouslySetInnerHTML={{ __html: m.text }}/>
                {m.citations && (
                  <div className="ai-citations">
                    {m.citations.map((c, j) => (
                      <button key={j} className="ai-citation">{c}</button>
                    ))}
                  </div>
                )}
                {m.role === 'ai' && (
                  <div className="ai-msg-actions">
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Copy"><Icon name="copy" size={11}/></button>
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Regenerate"><Icon name="refresh" size={11}/></button>
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Good response">👍</button>
                    <button className="icon-btn" style={{ width: 22, height: 22 }} title="Bad response">👎</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="ai-msg ai">
              <div className="ai-orb" style={{ width: 22, height: 22, borderRadius: 5, flexShrink: 0 }}>
                <Icon name="sparkles" size={11} style={{ color: 'var(--bg)' }}/>
              </div>
              <div className="ai-msg-body">
                <div className="ai-typing"><span></span><span></span><span></span></div>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 2 && (
          <div className="ai-suggestions">
            <div className="ai-suggestions-h">Suggested</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTED_PROMPTS.map(p => (
                <button key={p} className="ai-pill" onClick={() => send(p)}>{p}</button>
              ))}
            </div>
          </div>
        )}

        <div className="ai-panel-input">
          <textarea
            className="search"
            placeholder="Ask anything about your pipeline, deals, or customers…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            style={{ paddingRight: 38, resize: 'none', minHeight: 38, maxHeight: 140 }}
          />
          <button className="ai-send" onClick={() => send()} disabled={!input.trim()} aria-label="Send">
            <Icon name="send" size={13}/>
          </button>
        </div>
        <div className="ai-panel-foot">
          <span>Helix can make mistakes. Verify critical decisions.</span>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>⏎ to send</span>
        </div>
      </aside>
    </>
  );
}
