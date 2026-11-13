import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import products, { type Product } from '../data/products'
import { site } from '../data/site'
import { cdn } from '../lib/image'
import { EnquiryForm } from './EnquiryForm'
import { FloatingContact, PhoneIcon, SiteFooter, SiteHeader } from './Layout'

export function ProductPage({ product }: { product: Product }) {
  const [productId, setProductId] = useState(product.id)
  const others = products.filter((p) => p.id !== product.id)
  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-5 py-12">
          <nav className="mb-8 text-sm text-steel-700">
            <Link to="/" className="hover:underline">
              الرئيسية
            </Link>
            <span className="mx-2">/</span>
            <Link to="/" hash="services" className="hover:underline">
              خدماتنا
            </Link>
            <span className="mx-2">/</span>
            <span className="font-bold text-steel-900">{product.name}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <img
              src={cdn(product.image, 1200)}
              alt={product.imageAlt}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <div>
              <h1 className="mb-5 text-4xl font-black sm:text-5xl">
                {product.name}
              </h1>
              <p className="mb-6 text-lg leading-loose text-steel-700">
                {product.description}
              </p>
              <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-semibold shadow-sm"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-spark-500 text-xs text-steel-950">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#enquiry"
                  className="action"
                  onClick={() => setProductId(product.id)}
                >
                  اطلب عرض سعر
                </a>
                <a
                  href={`tel:${site.phoneIntl}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-steel-900/20 px-6 py-3 font-bold hover:bg-white"
                >
                  <PhoneIcon />
                  <span dir="ltr">{site.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-5 pb-16">
          <h2 className="mb-6 text-2xl font-black">خدمات أخرى</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {others.map((p) => (
              <Link
                key={p.id}
                to="/services/$serviceId"
                params={{ serviceId: p.id }}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <img
                  src={cdn(p.image, 400)}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition group-hover:scale-105"
                />
                <p className="p-3 text-center font-bold">{p.name}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="px-5 pb-20">
          <EnquiryForm productId={productId} onProductChange={setProductId} />
        </div>
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  )
}
