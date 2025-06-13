import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Desktop visual encapsulation only (md and up) */}
      <div className="hidden md:fixed md:inset-0 md:flex md:justify-center md:px-8 pointer-events-none z-0" aria-hidden="true">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full ring-1 bg-zinc-900 ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col text-zinc-400 z-10">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
