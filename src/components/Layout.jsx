import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/weeks', label: 'Weeks', icon: '📅' },
  { to: '/review', label: 'Review', icon: '🔄' },
  { to: '/progress', label: 'Progress', icon: '📊' },
];

export default function Layout({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f0f13', color: '#e8e6f0' }}>
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-56 fixed h-full z-10 border-r" style={{ backgroundColor: '#16161d', borderColor: '#2a2a3a' }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: '#2a2a3a' }}>
          <span className="text-2xl font-bold tracking-tight" style={{ color: '#c084fc' }}>漢字</span>
          <p className="text-xs mt-0.5" style={{ color: '#6b6b80' }}>N2 Self-Study</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon }) => {
            const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={active
                  ? { backgroundColor: '#2d1f47', color: '#c084fc' }
                  : { color: '#9b9bb0' }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#1e1e2a'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-56 pb-20 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Bottom nav — mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 flex z-10 border-t" style={{ backgroundColor: '#16161d', borderColor: '#2a2a3a' }}>
        {navItems.map(({ to, label, icon }) => {
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center py-2.5 text-xs font-medium transition-colors"
              style={{ color: active ? '#c084fc' : '#6b6b80' }}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span className="mt-0.5">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
