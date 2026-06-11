import { useEffect, useRef } from 'react'
import PageHeader from '../components/PageHeader'

const IFRAME_DOC = `
<!doctype html>
<html>
  <head>
    <style>
      body { font-family: system-ui, sans-serif; padding: 16px; color: #1f2937; }
      .box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; }
      button { padding: 6px 12px; border-radius: 6px; border: 1px solid #2563eb; background: #2563eb; color: #fff; cursor: pointer; }
      .msg { margin-top: 8px; color: #16a34a; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="box">
      <h3>Inventory Widget (inside iframe)</h3>
      <label>Quick note:
        <input id="frame-input" data-testid="frame-input" placeholder="Type inside iframe" />
      </label>
      <button id="frame-button" data-testid="frame-button" onclick="document.getElementById('frame-msg').textContent='Saved inside iframe!'">Save</button>
      <p class="msg" id="frame-msg" data-testid="frame-msg"></p>
    </div>
  </body>
</html>
`

function ShadowWidget() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || host.shadowRoot) return
    const shadow = host.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        .card { font-family: system-ui, sans-serif; border: 1px dashed #7c3aed; border-radius: 8px; padding: 12px; }
        .count { font-size: 24px; font-weight: 700; color: #7c3aed; }
        button { margin-top: 8px; padding: 6px 12px; border-radius: 6px; border: 1px solid #7c3aed; background: #fff; color: #7c3aed; cursor: pointer; }
      </style>
      <div class="card">
        <p>Encapsulated stock counter (Shadow DOM)</p>
        <div class="count" data-testid="shadow-count">0</div>
        <button data-testid="shadow-increment">Add stock</button>
      </div>
    `
    const count = shadow.querySelector('[data-testid="shadow-count"]') as HTMLElement
    const btn = shadow.querySelector('[data-testid="shadow-increment"]') as HTMLElement
    let value = 0
    btn.addEventListener('click', () => {
      value += 1
      count.textContent = String(value)
    })
  }, [])

  return <div ref={hostRef} data-testid="shadow-host" />
}

export default function FramesPage() {
  return (
    <div data-testid="frames-page">
      <PageHeader title="Frames & Tabs" subtitle="iframes, new tabs/windows and shadow DOM" />

      <div className="panel" data-testid="iframe-section">
        <h2>Embedded iframe</h2>
        <iframe
          title="inventory-widget"
          data-testid="inventory-iframe"
          srcDoc={IFRAME_DOC}
          className="demo-iframe"
        />
      </div>

      <div className="panel" data-testid="newtab-section">
        <h2>New Tab / Window</h2>
        <p className="muted">Opens the public documentation in a new browser tab.</p>
        <a
          href="https://playwright.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          data-testid="open-new-tab"
        >
          Open Playwright Docs ↗
        </a>
        <button
          type="button"
          className="btn btn-ghost"
          data-testid="open-popup"
          onClick={() => window.open('https://playwright.dev/docs/intro', '_blank', 'noopener')}
        >
          Open Popup Window
        </button>
      </div>

      <div className="panel" data-testid="shadow-section">
        <h2>Shadow DOM Widget</h2>
        <ShadowWidget />
      </div>
    </div>
  )
}
