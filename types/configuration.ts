import type { Class } from '~/types/class'

export interface Configuration {
  baseURI?: string
  title: string
  datePublished: string
  dateModified: string
  lastVersion: string
  entities: Class[]
  inPackageMerged: Class[]
  inPackageClasses: Class[]
  scopedDataTypes: Class[]
  inPackageDataTypes: Class[]
  inPackageProperties: Class[]
  externalProperties: Class[]
  metadata: Class[]
  stakeholders: Class[]
  jsonLD?: string
}
