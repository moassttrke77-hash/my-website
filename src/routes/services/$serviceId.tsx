import { createFileRoute, notFound } from '@tanstack/react-router'
import { findProduct } from '../../data/products'
import { site } from '../../data/site'
import { ProductPage } from '../../components/ProductPage'

export const Route = createFileRoute('/services/$serviceId')({
  loader: ({ params }) => {
    const product = findProduct(params.serviceId)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} في الرياض | ${site.shortName}` },
            { name: 'description', content: loaderData.shortDescription },
            {
              property: 'og:title',
              content: `${loaderData.name} في الرياض | ${site.shortName}`,
            },
            {
              property: 'og:description',
              content: loaderData.shortDescription,
            },
            {
              property: 'og:url',
              content: `${site.url}/services/${loaderData.id}`,
            },
          ],
          links: [
            {
              rel: 'canonical',
              href: `${site.url}/services/${loaderData.id}`,
            },
          ],
        }
      : {},
  component: ServiceRoute,
})

function ServiceRoute() {
  const product = Route.useLoaderData()
  return <ProductPage key={product.id} product={product} />
}
