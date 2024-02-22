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
    summary: string
    status: string
    license: string
    conformance: string
    overview: string
    entities?: Class[]
    attributes?: Class[]
    terminologies: Definition[]
    datatypes: Entity[]
    jsonLD?: string
}