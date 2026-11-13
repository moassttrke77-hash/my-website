import { Link } from '@tanstack/react-router'
import { SiteFooter, SiteHeader } from './Layout'

export function NotFoundPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="mb-4 text-7xl font-black text-spark-500">404</p>
        <h1 className="mb-4 text-3xl font-black">الصفحة غير موجودة</h1>
        <p className="mb-8 text-steel-700">
          الصفحة أو الخدمة التي تبحث عنها غير متوفرة.
        </p>
        <Link to="/" className="action">
          العودة إلى الرئيسية
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
