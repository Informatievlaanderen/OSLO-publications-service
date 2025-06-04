import { Languages } from '~/enum/language'
import { Class } from '~/types/class'

export const generateAnchorTag = ({
  entity,
  prop,
  language,
}: {
  entity: Class
  prop?: Class
  language: Languages
}): string => {
  const entityLabel =
    entity.applicationProfileLabel?.[
      language as keyof typeof entity.applicationProfileLabel
    ] || ''
  const propLabel =
    prop?.applicationProfileLabel?.[
      language as keyof typeof prop.applicationProfileLabel
    ] || ''

  if (!entityLabel) return ''
  const label = propLabel ? `${entityLabel}:${propLabel}` : entityLabel
  return encodeURIComponent(label.replace(/\s+/gu, ''))
}

export const replaceBaseURI = (input: string, baseURI?: string): string => {
  if (!baseURI) return input
  return input.replace(new RegExp(baseURI, 'g'), '')
}
