import type { NavigationLink } from '~/types/navigationLink'

export interface NestedNavigationLink extends NavigationLink {
    children?: NavigationLink[]
}

export interface OverviewLinks {
    links?: NestedNavigationLink[]

}