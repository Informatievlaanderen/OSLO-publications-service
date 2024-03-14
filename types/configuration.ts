import type { Class } from '~/types/class'

export interface Configuration {
    baseURI?: string;
    title: string
    datePublished: string
    dateModified: string
    lastVersion: string
    classes?: Class[]
    attributes?: Class[]
    dataTypes: Class[]
    jsonLD?: string
}