const NAV_ITEMS = [
  {
    id: 'index',
    href: 'index.html',
    label: 'Home',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`
  },
  {
    id: 'browse-addons',
    href: 'browse-addons.html',
    label: 'Explore',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`
  },
  {
    id: 'progress',
    href: '#',
    label: 'Progress',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`
  },
  {
    id: 'account',
    href: '#',
    label: 'Account',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`
  },
]

function currentPage() {
  const path = window.location.pathname.split('/').pop()
  return path.replace('.html', '') || 'index'
}

function sidebarItem(item, active) {
  const isActive = item.id === active
  const cls = isActive
    ? 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-voy-green bg-voy-green-pale font-medium text-sm'
    : 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-gray-50 text-sm transition-colors'
  return `<a href="${item.href}" class="${cls}">${item.icon}${item.label}</a>`
}

function mobileNavItem(item, active) {
  const isActive = item.id === active
  const cls = isActive ? 'text-voy-green' : 'text-gray-400'
  return `
    <a href="${item.href}" class="flex flex-col items-center gap-1 ${cls}">
      ${item.icon}
      <span class="text-[10px] font-medium">${item.label}</span>
    </a>`
}

export function initLayout() {
  const page = currentPage()

  const sidebarSlot = document.getElementById('sidebar-slot')
  if (sidebarSlot) {
    const el = document.createElement('aside')
    el.className = 'hidden md:flex flex-col w-56 bg-voy-light-stone border-r border-gray-100 fixed top-0 left-0 h-full z-20'
    el.innerHTML = `
      <div class="px-6 pt-8 pb-6 border-b border-gray-100">
        <span class="text-2xl font-bold tracking-tight text-gray-900">voy</span>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1">
        ${NAV_ITEMS.map(item => sidebarItem(item, page)).join('')}
      </nav>`
    sidebarSlot.replaceWith(el)
  }

  const mobileNavSlot = document.getElementById('mobile-nav-slot')
  if (mobileNavSlot) {
    const el = document.createElement('nav')
    el.className = 'md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-3 z-20'
    el.innerHTML = NAV_ITEMS.map(item => mobileNavItem(item, page)).join('')
    mobileNavSlot.replaceWith(el)
  }
}
