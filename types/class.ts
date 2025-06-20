import { Languages } from '~/enum/language'

export interface Class {
  id: string
  vocabularyLabel: {
    [key in Languages]: string
  }
  applicationProfileLabel: {
    [key in Languages]: string
  }
  vocabularyUsageNote: {
    [key in Languages]: string
  }
  applicationProfileUsageNote: {
    [key in Languages]: string
  }
  vocabularyDefinition: {
    [key in Languages]: string
  }
  applicationProfileDefinition: {
    [key in Languages]: string
  }
  scope: string
  // change name to entity
  properties: Class[]
  domain: string
  range: Class
  status?: string
  parents?: Class[]
  minCount?: string
  maxCount?: string
  codelist?: string
}
