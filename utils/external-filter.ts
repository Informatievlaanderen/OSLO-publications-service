import { EXTERNAL_SCOPE } from '~/constants/constants'
import { Languages } from '~/enum/language'
import { Class } from '~/types/class'
import { Configuration } from '~/types/configuration'
import { ExternalTermRow } from '~/types/externalRow'

export const externalEntities = (entities: Class[]): Class[] =>
  entities?.filter((c: Class) => c.scope == EXTERNAL_SCOPE) ?? []

export const flatExternalEntities = (entities: Class[]): Class[] => {
  const combined: Class[] = []
  const extEntities: Class[] = externalEntities(entities)
  combined.push(...extEntities)

  extEntities?.forEach((c: Class) => {
    console.log(externalEntities(c.properties))
    combined.push(...externalEntities(c.properties))
  })
  return combined
}

export const generateExternalTermsTable = (
  ap: Configuration,
  language: Languages = Languages.NL,
): (ExternalTermRow | ExternalTermRow)[][] => {
  const rows: (ExternalTermRow | ExternalTermRow)[][] = []

  // Process classes (matches the first loop in Jinja template)
  if (ap.classes) {
    ap.classes.forEach((entity: Class) => {
      if (
        entity.applicationProfileLabel?.[
          language.toLowerCase() as keyof typeof entity.applicationProfileLabel
        ]
      ) {
        // Add external class itself
        if (entity.scope === EXTERNAL_SCOPE) {
          rows.push([
            {
              text: entity.applicationProfileLabel[
                language.toLowerCase() as keyof typeof entity.applicationProfileLabel
              ],
              url: `#${generateAnchorTag({ entity, language })}`,
            },
            {
              text: entity.id,
            },
          ])
        }

        // Add external properties of this class
        if (entity.properties) {
          entity.properties.forEach((prop) => {
            if (
              prop.scope === EXTERNAL_SCOPE &&
              prop.applicationProfileLabel?.[
                language.toLowerCase() as keyof typeof prop.applicationProfileLabel
              ]
            ) {
              rows.push([
                {
                  text: `${entity.applicationProfileLabel[language.toLowerCase() as keyof typeof entity.applicationProfileLabel]}.${prop.applicationProfileLabel[language.toLowerCase() as keyof typeof prop.applicationProfileLabel]}`,
                  url: `#${generateAnchorTag({ entity, prop, language })}`,
                },
                {
                  text: prop.id,
                },
              ])
            }
          })
        }
      }
    })
  }

  // Process dataTypes (matches the second loop in Jinja template)
  if (ap.dataTypes) {
    ap.dataTypes.forEach((entity: Class) => {
      if (
        entity.applicationProfileLabel?.[
          language.toLowerCase() as keyof typeof entity.applicationProfileLabel
        ]
      ) {
        // Add external dataType itself
        if (entity.scope === EXTERNAL_SCOPE) {
          rows.push([
            {
              text: entity.applicationProfileLabel[
                language.toLowerCase() as keyof typeof entity.applicationProfileLabel
              ],
              url: `#${generateAnchorTag({ entity, language })}`,
            },
            {
              text: entity.id,
            },
          ])
        }

        // Add external properties of this dataType
        if (entity.properties) {
          entity.properties.forEach((prop) => {
            if (
              prop.scope === EXTERNAL_SCOPE &&
              prop.applicationProfileLabel?.[
                language.toLowerCase() as keyof typeof prop.applicationProfileLabel
              ]
            ) {
              rows.push([
                {
                  text: `${entity.applicationProfileLabel[language.toLowerCase() as keyof typeof entity.applicationProfileLabel]}.${prop.applicationProfileLabel[language.toLowerCase() as keyof typeof prop.applicationProfileLabel]}`,
                  url: `#${generateAnchorTag({ entity, prop, language })}`,
                },
                {
                  text: prop.id,
                },
              ])
            }
          })
        }
      }
    })
  }

  return rows
}
