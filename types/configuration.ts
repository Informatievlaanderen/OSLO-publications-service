import type { Class } from '~/types/class'

export interface Configuration {
  baseURI: string
  classes: Class[]
  dataTypes: Class[]
  properties: Class[]
  metadata: Class[]
  stakeholders: Class[]
}
