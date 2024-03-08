import type { Contributor } from '~/types/contributor'
import type { Class } from '~/types/class'

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
    shacl?: string
}