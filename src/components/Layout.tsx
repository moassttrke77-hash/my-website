import { Link } from '@tanstack/react-router'
import products from '../data/products'
import { site } from '../data/site'

export function PhoneIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
    </svg>
  )
}

export function WhatsAppIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z" />
    </svg>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-steel-950/90 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-spark-500 text-lg font-black text-steel-950">
            س
          </span>
          <span className="leading-tight">
            <span className="block font-extrabold">{site.shortName}</span>
            <span className="block text-xs text-white/60">
              حداد · مظلات · سواتر · سندويش بنل
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-white/80 lg:flex">
          <a href="/#services" className="hover:text-spark-400">
            خدماتنا
          </a>
          <a href="/#why" className="hover:text-spark-400">
            لماذا نحن
          </a>
          <a href="/#areas" className="hover:text-spark-400">
            مناطق العمل
          </a>
          <a href="/#enquiry" className="hover:text-spark-400">
            طلب عرض سعر
          </a>
        </nav>
        <a
          href={`tel:${site.phoneIntl}`}
          className="action !px-4 !py-2 text-sm"
          dir="ltr"
        >
          <PhoneIcon className="size-4" />
          {site.phone}
        </a>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-steel-950 text-white/70">
      <div className="stripes h-2" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="mb-3 text-lg font-extrabold text-white">
            {site.shortName}
          </p>
          <p className="leading-relaxed">{site.description}</p>
        </div>
        <div>
          <p className="mb-3 font-bold text-white">خدماتنا</p>
          <ul className="grid grid-cols-2 gap-2">
            {products.map((p) => (
              <li key={p.id}>
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: p.id }}
                  className="hover:text-spark-400"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-bold text-white">تواصل معنا</p>
          <p className="mb-2">{site.area}</p>
          <a
            href={`tel:${site.phoneIntl}`}
            className="block text-2xl font-black text-spark-400"
            dir="ltr"
          >
            {site.phone}
          </a>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-sm">
        © {new Date().getFullYear()} {site.shortName} — الرياض
      </p>
    </footer>
  )
}

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
      >
        <WhatsAppIcon className="size-7" />
      </a>
      <a
        href={`tel:${site.phoneIntl}`}
        aria-label={`اتصل ${site.phone}`}
        className="grid size-14 place-items-center rounded-full bg-spark-500 text-steel-950 shadow-xl transition hover:scale-105"
      >
        <PhoneIcon className="size-6" />
      </a>
    </div>
  )
}
