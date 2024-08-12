import type { NavigationLink } from '~/types/navigationLink'

export interface DataTable {
  headers?: Array<string | number>
  rows?: Array<string | number | NavigationLink>[]
  footer?: Array<string | number>
}
