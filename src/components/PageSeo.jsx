import { useEffect } from 'react'

export function PageSeo({ title, description }) {
  useEffect(() => {
    document.title = title

    const ensureMetaTag = (name, attribute = 'name') => {
      let meta = document.head.querySelector(`meta[${attribute}="${name}"]`)

      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }

      return meta
    }

    ensureMetaTag('description').setAttribute('content', description)
    ensureMetaTag('og:title', 'property').setAttribute('content', title)
    ensureMetaTag('og:description', 'property').setAttribute('content', description)
    ensureMetaTag('og:type', 'property').setAttribute('content', 'website')
  }, [title, description])

  return null
}
