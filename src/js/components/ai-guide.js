const chatQuestions = [
  {
    message: "Hi! I'll help you find the plan that best fits where you are right now. Just answer 3 quick questions and I'll give you a personalised suggestion.",
    key: null, options: null
  },
  {
    message: "How long have you been on hair loss treatment?",
    key: "time",
    options: [
      { label: "Under 3 months", value: "early" },
      { label: "3 to 12 months", value: "mid" },
      { label: "More than 12 months", value: "long" }
    ]
  },
  {
    message: "Are you experiencing any side effects from your current medication?",
    key: "effects",
    options: [
      { label: "No — tolerating it well", value: "none" },
      { label: "Some mild side effects", value: "mild" },
      { label: "Yes, they affect me noticeably", value: "significant" }
    ]
  },
  {
    message: "How would you describe your progress so far?",
    key: "progress",
    options: [
      { label: "Still early — waiting to see results", value: "early" },
      { label: "Seeing improvement, still progressing", value: "improving" },
      { label: "I've reached my hair goals", value: "achieved" }
    ]
  }
]

const followUpResponses = [
  {
    triggers: ["side effect", "side effects", "effects", "tolerat"],
    response: "Side effects from finasteride affect around 2–5% of patients and are usually mild. If they're impacting your day-to-day life, the Prevention plan's lower dose may reduce them while still protecting your progress. Your clinician can also advise on temporary breaks if needed."
  },
  {
    triggers: ["how long", "timeline", "when will", "wait", "long"],
    response: "Most patients see stabilisation within 3–6 months. Visible regrowth, if it happens, typically starts around month 6–12. Consistency is the single biggest factor in outcomes — patience pays off."
  },
  {
    triggers: ["why", "reason", "explain", "because"],
    response: "My suggestion is based on how long you've been on treatment, whether you're experiencing side effects, and where you are with your progress. These are the same signals your clinician would use as a starting point in a consultation."
  },
  {
    triggers: ["cost", "price", "expensive", "cheaper", "afford", "money"],
    response: "All plans are priced annually. The Starter plan at £35/month is the most accessible option, though it uses Minoxidil alone without a DHT blocker. I'd always recommend discussing cost concerns with your clinician — they can suggest the most appropriate option within your constraints."
  }
]

const AI_AVATAR = `<div class="w-7 h-7 bg-voy-green rounded-full flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></div>`

export function aiGuideData() {
  return {
    open: false,
    typing: false,
    chatStep: 0,
    chatAnswers: {},
    messages: [],
    options: [],
    showOptions: false,
    showInput: false,
    followUpText: '',

    init() {
      // nothing needed on init
    },

    openSheet() {
      this.open = true
      this.chatAnswers = {}
      this.chatStep = 0
      this.messages = []
      this.options = []
      this.showOptions = false
      this.showInput = false
      this.followUpText = ''
      this.$nextTick(() => {
        setTimeout(() => this.aiMessage(chatQuestions[0].message, () => {
          setTimeout(() => this.nextQuestion(), 400)
        }), 650)
      })
    },

    closeSheet() {
      this.open = false
    },

    aiMessage(text, onDone) {
      this.typing = true
      this.scrollChat()
      const delay = Math.min(700 + text.length * 14, 2400)
      setTimeout(() => {
        this.typing = false
        this.messages.push({ type: 'ai', text })
        this.$nextTick(() => this.scrollChat())
        if (onDone) onDone()
      }, delay)
    },

    appendUserMessage(text) {
      this.messages.push({ type: 'user', text })
      this.$nextTick(() => this.scrollChat())
    },

    appendResultCard(plan, price, reason) {
      this.messages.push({ type: 'result', plan, price, reason })
      this.$nextTick(() => this.scrollChat())
    },

    scrollChat() {
      setTimeout(() => {
        const msgs = this.$refs.chatMessages
        if (msgs) msgs.scrollTop = msgs.scrollHeight
      }, 60)
    },

    nextQuestion() {
      this.chatStep++
      if (this.chatStep > 3) return
      const q = chatQuestions[this.chatStep]
      this.aiMessage(q.message, () => this.displayOptions(q.options))
    },

    displayOptions(opts) {
      this.options = opts
      this.showOptions = true
      this.$nextTick(() => this.scrollChat())
    },

    selectOption(value, label) {
      this.showOptions = false
      this.options = []
      const key = chatQuestions[this.chatStep].key
      this.chatAnswers[key] = value
      this.appendUserMessage(label)
      const step = this.chatStep
      if (step < 3) {
        const acks = ["Got it.", "Thanks.", "Noted."]
        const ack = acks[(step - 1) % acks.length]
        setTimeout(() => this.aiMessage(ack, () => setTimeout(() => this.nextQuestion(), 250)), 350)
      } else {
        setTimeout(() => this.showResult(), 350)
      }
    },

    showResult() {
      const { time, effects, progress } = this.chatAnswers
      let plan, price, reason

      if (effects === 'significant') {
        plan = 'Prevention'; price = '£89 / year'
        reason = "Given the side effects you've mentioned, the Prevention plan's lower-dose approach should work better for you — it still protects your progress without the same systemic load."
      } else if (progress === 'achieved' && time === 'long') {
        plan = 'Maintenance'; price = '£69 / year'
        reason = "You've been on treatment long enough and reached your goals — Maintenance is designed to protect what you've gained at a reduced dose and lower cost."
      } else if (time === 'early' || progress === 'early') {
        plan = 'Advanced'; price = '£125 / year'
        reason = "You're still early in treatment. Staying on the Advanced plan gives your follicles the dual-agent environment they need to stabilise and respond fully — it's worth staying the course."
      } else {
        plan = 'Advanced'; price = '£125 / year'
        reason = "Based on your responses, the Advanced plan's comprehensive dual-agent approach is most likely to serve you well at this stage of your journey."
      }

      this.aiMessage("Thanks — let me work out your best fit...", () => {
        setTimeout(() => {
          this.appendResultCard(plan, price, reason)
          setTimeout(() => {
            this.showInput = true
            this.$nextTick(() => this.scrollChat())
          }, 700)
        }, 700)
      })
    },

    sendFollowUp() {
      const text = this.followUpText.trim()
      if (!text) return
      this.followUpText = ''
      this.appendUserMessage(text)
      const lower = text.toLowerCase()
      const match = followUpResponses.find(r => r.triggers.some(t => lower.includes(t)))
      const response = match
        ? match.response
        : "That's worth discussing in more detail with your clinician. They'll be able to give you a fully personalised answer based on your complete treatment history — I'd suggest raising it at your next review."
      setTimeout(() => this.aiMessage(response), 450)
    },

    aiAvatar: AI_AVATAR
  }
}
