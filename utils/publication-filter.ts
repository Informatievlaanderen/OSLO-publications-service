import type { Class } from '~/types/class'
import type { NavigationLink } from '~/types/navigationLink'

import { AP, VOC } from '~/constants/constants'

export const getLabel = (c: Class, language: string, type?: string) => {
  switch (type) {
    case AP:
      return (
        c.applicationProfileLabel?.[
          language as keyof typeof c.applicationProfileLabel
        ] ?? ''
      )
    case VOC:
      return (
        c.vocabularyLabel?.[language as keyof typeof c.vocabularyLabel] ?? ''
      )
    default:
      return (
        c.vocabularyLabel?.[language as keyof typeof c.vocabularyLabel] ?? ''
      )
  }
}

export const getDefinition = (c: Class, language: string, type?: string) => {
  switch (type) {
    case AP:
      return (
        c.applicationProfileDefinition?.[
          language as keyof typeof c.applicationProfileDefinition
        ] ?? ''
      )
    case VOC:
      return (
        c.vocabularyDefinition?.[
          language as keyof typeof c.vocabularyDefinition
        ] ?? ''
      )
    default:
      return (
        c.vocabularyDefinition?.[
          language as keyof typeof c.vocabularyDefinition
        ] ?? ''
      )
  }
}

export const getUsage = (c: Class, language: string, type?: string) => {
  switch (type) {
    case AP:
      return (
        c.applicationProfileUsageNote?.[
          language as keyof typeof c.applicationProfileUsageNote
        ] ?? ''
      )
    case VOC:
      return (
        c.vocabularyUsageNote?.[
          language as keyof typeof c.vocabularyUsageNote
        ] ?? ''
      )
    default:
      return (
        c.vocabularyUsageNote?.[
          language as keyof typeof c.vocabularyUsageNote
        ] ?? ''
      )
  }
}

export const getSpecialization = (c: Class, language: string): string => {
  return c.parents?.map((parent: Class) => parent.id).join(',') ?? ''
}

export const getStatus = (c: Class): string | undefined => {
  return c.status
}

const toPascalCase = (str: string): string => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
}

export const getAnchorTag = (c: Class, language?: string, type?: string) => {
  let domain: string = ''
  // AP can be less strict since it's only being used for internal navigation
  if (type === AP) {
    return toPascalCase(`${getLabel(c, language ?? 'nl', type)}`)
  }
  // VOC needs to be strict since it's being used for external navigation
  if (c?.id && c?.id?.includes('#')) {
    domain = `${c?.id?.split('#').pop()}`
  }
  return domain
}

const toNavigationLink = (
  c: Class,
  language: string,
  type?: string,
): NavigationLink => ({
  title: getLabel(c, language, type),
  href: `#${getAnchorTag(c, language, type)}`,
})

const toExternalNavigationLink = (
  c: Class,
  language: string,
  type?: string,
): NavigationLink => ({
  title: getLabel(c, language, type),
  href: `#${getLabel(c, language, type)}`,
})

export const entitiesToNavigation = (
  entities: Class[],
  language: string,
  type?: string,
): NavigationLink[] =>
  entities.map((c: Class) => toNavigationLink(c, language, type))

export const externalEntitiesToNavigation = (
  entities: Class[],
  language: string,
  type?: string,
): NavigationLink[] =>
  entities.map((c: Class) => toExternalNavigationLink(c, language, type))
