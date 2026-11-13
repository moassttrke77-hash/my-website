import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import products from '../data/products'
import { site } from '../data/site'
import { cdn } from '../lib/image'
import { EnquiryForm } from './EnquiryForm'
import {
  FloatingContact,
  PhoneIcon,
  SiteFooter,
  SiteHeader,
  WhatsAppIcon,
} from './Layout'

const areas = [
  'شمال الرياض',
  'جنوب الرياض',
  'شرق الرياض',
  'غرب الرياض',
  'وسط الرياض',
  'ضواحي الرياض',
]

export function MarketingPage() {
  const [productId, setProductId] = useState(products[0]?.id ?? '')
  return (
    <>
      <SiteHeader />
      <main>
        <section
          id="top"
          className="relative isolate overflow-hidden bg-steel-950 text-white"
        >
          <img
            src={cdn('/img/hero.png', 1800)}
            alt="إنشاء هنجر حديد بتغطية سندويش بنل في الرياض"
            className="absolute inset-0 -z-10 size-full object-cover opacity-55"
            fetchPriority="high"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-l from-steel-950 via-steel-950/80 to-steel-950/20" />
          <div className="mx-auto max-w-7xl px-5 py-24 sm:py-32">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-spark-400/40 bg-spark-500/10 px-4 py-1.5 text-sm font-semibold text-spark-400">
                <span className="size-2 rounded-full bg-spark-400" />
                {site.shortName}
              </p>
              <h1 className="mb-6 text-4xl font-black leading-[1.25] sm:text-6xl">
                حداد مظلات سواتر
                <span className="block text-spark-400">سندويش بنل</span>
              </h1>
              <p className="mb-8 text-lg leading-loose text-white/80 sm:text-xl">
                حداد أبواب ليزر، توريد وتركيب مظلات، مستودعات، هناجر، وسندويش
                بنل في كل مناطق الرياض.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${site.phoneIntl}`} className="action text-lg">
                  <PhoneIcon />
                  اتصل الآن <span dir="ltr">{site.phone}</span>
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-ghost text-lg"
                >
                  <WhatsAppIcon />
                  واتساب
                </a>
              </div>
            </div>
          </div>
          <div className="stripes h-2" />
        </section>

        <section
          id="services"
          className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20"
        >
          <div className="mb-12 max-w-2xl">
            <p className="mb-2 font-bold text-spark-600">خدماتنا</p>
            <h2 className="text-3xl font-black sm:text-4xl">
              كل أعمال الحدادة والإنشاءات المعدنية
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-steel-900/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link
                  to="/services/$serviceId"
                  params={{ serviceId: product.id }}
                  className="block overflow-hidden"
                >
                  <img
                    src={cdn(product.image, 640)}
                    alt={product.imageAlt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-extrabold">
                    {product.name}
                  </h3>
                  <p className="mb-6 flex-1 leading-relaxed text-steel-700">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href="#enquiry"
                      className="action !px-4 !py-2 text-sm"
                      onClick={() => setProductId(product.id)}
                    >
                      اطلب عرض سعر
                    </a>
                    <Link
                      to="/services/$serviceId"
                      params={{ serviceId: product.id }}
                      className="text-sm font-bold text-steel-700 underline-offset-4 hover:underline"
                    >
                      التفاصيل ←
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why" className="scroll-mt-20 bg-steel-900 text-white">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <h2 className="mb-12 text-3xl font-black sm:text-4xl">
              لماذا مؤسسة السبيعي؟
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {site.benefits.map((benefit, i) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="mb-4 block text-4xl font-black text-spark-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mb-2 text-lg font-bold">{benefit.title}</h3>
                  <p className="leading-relaxed text-white/70">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="areas"
          className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20"
        >
          <div className="grid items-center gap-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-steel-900/5 sm:p-12 lg:grid-cols-2">
            <div>
              <p className="mb-2 font-bold text-spark-600">مناطق العمل</p>
              <h2 className="mb-4 text-3xl font-black">
                نخدمك في كل مناطق الرياض
              </h2>
              <p className="mb-6 leading-loose text-steel-700">
                فرقنا تصل إلى موقعك أينما كنت في الرياض للمعاينة والتركيب —
                للمنازل والفلل والاستراحات والمزارع والمصانع والمحلات التجارية.
              </p>
              <a href={`tel:${site.phoneIntl}`} className="action">
                <PhoneIcon />
                <span dir="ltr">{site.phone}</span>
              </a>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {areas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-3 rounded-xl bg-[#f6f4ef] px-4 py-4 font-bold"
                >
                  <span className="size-2.5 rounded-full bg-spark-500" />
                  {area}
                </li>
              ))}
            </ul>
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
