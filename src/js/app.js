import Alpine from 'alpinejs'
import { initLayout } from './layout.js'
import { aiGuideData } from './components/ai-guide.js'
import { calendarData } from './components/calendar.js'

// ── Alpine stores ────────────────────────────

Alpine.store('sheet', {
  active: null,
  data: {},
  open(id, data = {}) { this.active = id; this.data = data },
  close()             { this.active = null; this.data = {} },
  isOpen(id)          { return this.active === id }
})

// ── Alpine components ────────────────────────

Alpine.data('aiGuide', aiGuideData)
Alpine.data('calendar', calendarData)

// ── Layout injection ─────────────────────────

document.addEventListener('DOMContentLoaded', initLayout)

// ── Boot ─────────────────────────────────────

window.Alpine = Alpine
Alpine.start()
