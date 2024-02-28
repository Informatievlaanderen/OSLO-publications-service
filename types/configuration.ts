import type { Contributor } from '~/types/contributor'
import type { Entity } from '~/types/entity'
import type { NavigationLink } from '~/types/navigationLink'
import type { Class } from '~/types/class'

interface Definition {
    title: string,
    description: string,
    href?: string,
    headers: string[],
    rows: Array<NavigationLink | string | number>
}

export interface Configuration {
    title: string
    datePublished: string
    dateModified: string
    lastVersion: string
    authors: Contributor[]
    contributors: Contributor[]
    editors: Contributor[]
    classes?: Class[]
    attributes?: Class[]
    dataTypes: Class[]
    jsonLD?: string
}