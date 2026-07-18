import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'
import './FloatButtons.css'

const BOT_RESPONSES = {
  default: "Thanks for reaching out! I'm here to help with equipment inquiries. You can ask about our products, pricing, or shipping — or call us directly at +91 88007 84466.",
  price: "Pricing depends on the model, specification, and order quantity — our team will get you the best quote within 12 hours. Would you like a custom quote for a specific machine?",
  jcb: "We stock multiple JCB models including the JCB JS 215LC Excavator, JCB Telehandler 5 Ton, and JCB 530-70 Telescopic Telehandler. Want full specs?",
  excavator: "We carry the Caterpillar 320D3 GC, Hyundai R215L Smart Plus, and JCB JS 215LC excavators. Shall I connect you with our team for a quote?",
  backhoe: "Our backhoe loaders include the CASE 770EX and CASE 570SV. All available ex-Faridabad, Haryana.",
  shipping: "We export globally — Russia, Africa, Middle East, and all Indian states. Shipping timelines vary by destination. Contact us for a logistics quote.",
  contact: "📞 +91 88007 84466\n📧 info@infinitetrade.com\n📍 House No 2 B Block, Vijay Nagar, Faridabad - 121004, Haryana",
  hello: "Hello! Welcome to Infinite Trade Solutions. I can help you with:\n• Equipment specs & quotes\n• Export & shipping info\n• Getting a custom quote\n\nWhat are you looking for?"
}

function getResponse(msg) {
  const m = msg.toLowerCase()
  if (m.match(/hello|hi|hey|namaste/)) return BOT_RESPONSES.hello
  if (m.match(/price|cost|rate|how much|usd/)) return BOT_RESPONSES.price
  if (m.match(/jcb/)) return BOT_RESPONSES.jcb
  if (m.match(/excavat/)) return BOT_RESPONSES.excavator
  if (m.match(/backhoe|loader/)) return BOT_RESPONSES.backhoe
  if (m.match(/ship|export|deliver|logistic/)) return BOT_RESPONSES.shipping
  if (m.match(/contact|phone|email|address|call/)) return BOT_RESPONSES.contact
  return BOT_RESPONSES.default
}

export default function FloatButtons() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! 👋 Welcome to Infinite Trade Solutions. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages(m => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { from: 'bot', text: getResponse(text) }])
    }, 1000)
  }

  const onKey = (e) => { if (e.key === 'Enter') send() }

  return (
    <>
      <div className="float-buttons" aria-label="Quick contact options">
        <a
          href="https://wa.me/918800784466?text=Hello%2C%20I%20am%20interested%20in%20your%20heavy%20equipment."
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn whatsapp"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
        <button
          className="float-btn chat"
          onClick={() => setChatOpen(o => !o)}
          aria-label="Open chatbot"
          title="Chat with us"
        >
          {chatOpen ? <X size={20} /> : <MessageSquare size={20} />}
        </button>
      </div>

      {chatOpen && (
        <div className="chatbot" role="dialog" aria-label="Live chat">
          <div className="chatbot-header">
            <div className="chatbot-avatar">ITS</div>
            <div>
              <div className="chatbot-name">Infinite Trade Support</div>
              <div className="chatbot-status">● Online</div>
            </div>
            <button className="chatbot-close" onClick={() => setChatOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                <div className="chat-bubble" style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot">
                <div className="chat-bubble typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="chatbot-quick">
            {['Prices', 'JCB Models', 'Shipping', 'Contact'].map(q => (
              <button key={q} className="quick-btn" onClick={() => {
                setMessages(m => [...m, { from: 'user', text: q }])
                setTyping(true)
                setTimeout(() => {
                  setTyping(false)
                  setMessages(m => [...m, { from: 'bot', text: getResponse(q) }])
                }, 800)
              }}>{q}</button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type a message..."
              aria-label="Chat message input"
            />
            <button onClick={send} aria-label="Send message" disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
