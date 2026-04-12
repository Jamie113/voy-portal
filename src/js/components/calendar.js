const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function fmt(date, opts) {
  return date.toLocaleDateString('en-GB', opts || { day: 'numeric', month: 'long', year: 'numeric' })
}

export function calendarData() {
  const today = new Date()
  const params = new URLSearchParams(window.location.search)
  const type = params.get('type') || 'delivery'
  const isBilling = type === 'billing'

  const currentOrderDate = isBilling
    ? new Date(today.getFullYear(), today.getMonth(), 18)
    : new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)

  return {
    isBilling,
    currentOrderDate,
    viewMonth: today.getMonth(),
    viewYear: today.getFullYear(),
    selectedDate: null,
    days: [],
    monthLabel: '',
    currentDateDisplay: isBilling ? '18 Aug 2025' : '',
    deliveryDateDisplay: '',
    orderLabel: isBilling ? 'Current billing date' : 'Next order on',
    confirmEnabled: false,
    showSuccess: false,
    successMsg: '',

    get modalTitle() {
      return this.isBilling ? 'Move billing date' : 'Manage order'
    },
    get modalSubtitle() {
      return this.isBilling ? 'Choose a new date for your next charge' : 'Choose a date for your next order'
    },
    get ctaLabel() {
      return this.isBilling ? 'Update billing date' : 'Update order date'
    },

    init() {
      this.renderDays()
    },

    renderDays() {
      this.monthLabel = MONTHS[this.viewMonth].toUpperCase() + ' ' + this.viewYear

      const firstDay = new Date(this.viewYear, this.viewMonth, 1)
      let startOffset = firstDay.getDay() - 1
      if (startOffset < 0) startOffset = 6

      const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate()

      const minDate = new Date(today)
      minDate.setDate(today.getDate() + 1)
      const maxDate = new Date(today)
      maxDate.setDate(today.getDate() + 60)

      const days = []
      // Empty offset cells
      for (let i = 0; i < startOffset; i++) {
        days.push({ empty: true })
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(this.viewYear, this.viewMonth, d)
        const isDisabled = date < minDate || date > maxDate
        const isSelected = this.selectedDate && date.toDateString() === this.selectedDate.toDateString()
        const isCurrent = date.toDateString() === this.currentOrderDate.toDateString()

        days.push({
          empty: false,
          day: d,
          date,
          isDisabled,
          isSelected,
          isCurrent,
          classes: [
            'day-btn',
            isDisabled ? 'disabled' : '',
            isSelected ? 'selected' : '',
            (!isSelected && isCurrent) ? 'current-date' : '',
          ].filter(Boolean).join(' ')
        })
      }
      this.days = days
    },

    prevMonth() {
      this.viewMonth--
      if (this.viewMonth < 0) { this.viewMonth = 11; this.viewYear-- }
      this.renderDays()
    },

    nextMonth() {
      this.viewMonth++
      if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++ }
      this.renderDays()
    },

    selectDay(date) {
      if (!date) return
      this.selectedDate = date

      if (!this.isBilling) {
        const delivery = new Date(date)
        delivery.setDate(delivery.getDate() + 4)
        this.deliveryDateDisplay = delivery.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
      }

      this.orderLabel = this.isBilling ? 'New billing date' : 'Next order on'
      this.currentDateDisplay = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      this.confirmEnabled = true
      this.renderDays()
    },

    confirm() {
      if (!this.selectedDate) return
      const formatted = fmt(this.selectedDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      const msg = this.isBilling
        ? `Your billing date has been moved to <strong>${formatted}</strong>.`
        : `Your delivery has been moved to <strong>${formatted}</strong>.`
      Alpine.store('sheet').open('date-success', { msg })
    }
  }
}
