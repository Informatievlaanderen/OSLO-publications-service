import type { Class } from '~/types/class'

export interface Configuration {
  entities: Class[]
  inPackageMerged: Class[]
  inPackageClasses: Class[]
  scopedDataTypes: Class[]
  inPackageDataTypes: Class[]
  inPackageProperties: Class[]
  externalProperties: Class[]
  metadata: Class[]
  stakeholders: Class[]
}
