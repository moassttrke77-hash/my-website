import { useEffect, useRef, useState, type FormEvent } from 'react'
import products from '../data/products'
import { enquiryForm, site } from '../data/site'

type Submission =
  | { status: 'idle' | 'pending' | 'error' }
  | { status: 'success'; productName: string }

export function EnquiryForm({
  productId,
  onProductChange,
}: {
  productId: string
  onProductChange: (id: string) => void
}) {
  const [submission, setSubmission] = useState<Submission>({ status: 'idle' })
  const submitting = useRef(false)
  const product = products.find((item) => item.id === productId)

  useEffect(() => {
    if (!submitting.current) setSubmission({ status: 'idle' })
  }, [productId])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || submission.status === 'success' || !product)
      return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    submitting.current = true
    setSubmission({ status: 'pending' })
    try {
      const response = await fetch(enquiryForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Enquiry was not accepted')
      setSubmission({ status: 'success', productName: product.name })
    } catch {
      setSubmission({ status: 'error' })
    } finally {
      submitting.current = false
    }
  }

  return (
    <section
      id="enquiry"
      tabIndex={-1}
      aria-labelledby="enquiry-heading"
      className="mx-auto grid max-w-7xl scroll-mt-20 overflow-hidden rounded-3xl bg-steel-950 text-white shadow-2xl lg:grid-cols-5"
    >
      <div className="relative p-8 sm:p-12 lg:col-span-2">
        <div className="stripes absolute inset-x-0 top-0 h-2" />
        <h2 id="enquiry-heading" className="mb-4 text-3xl font-black">
          اطلب عرض سعر مجاني
        </h2>
        <p id="enquiry-note" className="mb-8 leading-loose text-white/70">
          اكتب لنا نوع العمل والحي والمقاسات التقريبية، ونتواصل معك لتحديد موعد
          المعاينة وتقديم السعر. أو اتصل بنا مباشرة:
        </p>
        <a
          href={`tel:${site.phoneIntl}`}
          className="block text-4xl font-black text-spark-400"
          dir="ltr"
        >
          {site.phone}
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-bold text-[#25D366] hover:underline"
        >
          أو راسلنا على واتساب
        </a>
      </div>
      <form
        name={enquiryForm.name}
        method="POST"
        action={enquiryForm.endpoint}
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={submit}
        aria-busy={submission.status === 'pending'}
        onChange={() => {
          if (!submitting.current) setSubmission({ status: 'idle' })
        }}
        className="space-y-5 bg-[#f6f4ef] p-8 text-steel-900 sm:p-12 lg:col-span-3"
      >
        <input type="hidden" name="form-name" value={enquiryForm.name} />
        <input
          type="hidden"
          name="subject"
          value={`طلب عرض سعر: ${product?.name ?? ''}`}
        />
        <input type="hidden" name="service-name" value={product?.name ?? ''} />
        <p hidden>
          <label>
            اترك هذا الحقل فارغاً
            <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>
        <fieldset
          disabled={
            submission.status === 'pending' || submission.status === 'success'
          }
          className="space-y-5 disabled:opacity-70"
        >
          <legend className="sr-only">طلب عرض سعر</legend>
          <div>
            <label htmlFor="enquiry-product" className="form-label">
              نوع الخدمة
            </label>
            <select
              id="enquiry-product"
              name="service-id"
              value={productId}
              onChange={(event) => onProductChange(event.target.value)}
              required
              className="form-input"
            >
              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="enquiry-name" className="form-label">
                الاسم
              </label>
              <input
                id="enquiry-name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="enquiry-phone" className="form-label">
                رقم الجوال
              </label>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                placeholder="05XXXXXXXX"
                required
                pattern="[0-9+\s]{9,15}"
                className="form-input text-right"
              />
            </div>
          </div>
          <div>
            <label htmlFor="enquiry-district" className="form-label">
              الحي في الرياض
            </label>
            <input
              id="enquiry-district"
              name="district"
              maxLength={100}
              placeholder="مثال: حي النرجس"
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="enquiry-message" className="form-label">
              تفاصيل العمل
            </label>
            <textarea
              id="enquiry-message"
              name="message"
              required
              minLength={5}
              maxLength={2000}
              rows={4}
              placeholder="المقاسات التقريبية، نوع الخامة، أو أي ملاحظات"
              className="form-input"
            />
          </div>
          <button
            type="submit"
            aria-describedby="enquiry-note"
            className="action w-full text-lg"
          >
            {submission.status === 'pending' ? 'جارٍ الإرسال…' : 'أرسل الطلب'}
          </button>
        </fieldset>
        <p role="status" className="sr-only">
          {submission.status === 'pending' ? 'جارٍ إرسال طلبك…' : ''}
        </p>
        {submission.status === 'error' && (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-800">
            تعذّر إرسال الطلب. بياناتك ما زالت محفوظة، حاول مرة أخرى أو اتصل بنا
            على <span dir="ltr">{site.phone}</span>.
          </p>
        )}
        {submission.status === 'success' && (
          <div className="rounded-xl bg-green-50 p-4 text-green-900">
            <p role="status">
              تم استلام طلبك بخصوص «{submission.productName}». سنتواصل معك
              قريباً.
            </p>
            <button
              type="button"
              className="mt-3 font-bold underline"
              onClick={() => setSubmission({ status: 'idle' })}
            >
              إرسال طلب آخر
            </button>
          </div>
        )}
      </form>
    </section>
  )
}
