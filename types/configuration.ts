import type { Contributor } from '~/types/contributor'
import type { Entity } from '~/types/entity'
import type { NavigationLink } from '~/types/navigationLink'

interface Definition {
    title: string,
    description: string,
    href?: string,
    headers: string[],
    rows: Array<NavigationLink | string>
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
    classes?: Definition[]
    properties?: Definition[]
    terminologies: Definition[]
    entities: Entity[]
    datatypes: Entity[]
    jsonLD?: string
}