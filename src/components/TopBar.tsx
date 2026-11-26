import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ActiveView } from '../types/library';

interface TopBarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenAddModal: () => void;
}

const NAV_ITEMS: { id: ActiveView; label: string }[] = [
  { id: 'katalog', label: 'Katalog' },
  { id: 'rak', label: 'Rak Saya' },
  { id: 'catatan', label: 'Catatan' },
  { id: 'tentang', label: 'Tentang' }
];

export function TopBar({ activeView, onNavigate, onOpenAddModal }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ActiveView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/90 bg-[#FBF9F5]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        {/* Zona 1: Satu elemen wordmark bersih */}
        <button
          type="button"
          onClick={() => handleNavClick('katalog')}
          className="cursor-pointer font-serif text-xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]"
        >
          Pustaka Aksara
        </button>

        {/* Zona 2: Tautan navigasi satu baris */}
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer border-b-2 py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A] ${
                  isActive
                    ? 'border-[#1E3A8A] text-[#1C1917]'
                    : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zona 3: Satu aksi utama */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenAddModal}
            className="hidden cursor-pointer rounded-md bg-[#1E3A8A] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1E40AF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A] md:inline-flex"
          >
            Tambah Buku
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-stone-200 text-[#1C1917] transition-colors hover:bg-stone-100 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu seluler */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#FBF9F5] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Navigasi seluler">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex min-h-[44px] cursor-pointer items-center justify-between border-b border-stone-200/70 px-1 text-left text-sm font-medium ${
                    isActive ? 'text-[#1E3A8A]' : 'text-[#57534E]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#1E3A8A]">Aktif</span>}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAddModal();
              }}
              className="mt-2 min-h-[44px] w-full cursor-pointer rounded-md bg-[#1E3A8A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1E40AF]"
            >
              Tambah Buku
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
