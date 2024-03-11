import type { Class } from '~/types/class'

export interface Entity {
    title?: string,
    href?: string,
    vocHref?: string,
    description?: string,
    usage?: string,
    language: string,
    type?: string,
    properties?: Class[]
}