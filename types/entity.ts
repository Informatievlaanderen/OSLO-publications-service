import type { NavigationLink } from '~/types/navigationLink'
import type { Class } from '~/types/class'

enum Cardinality {
    ZERO = "0",
    ONE = "1",
    ZERO_TO_MANY = "0...*",
    ZERO_TO_ONE = "0...1",
    ONE_TO_MANY = "1...*",
}

export interface Entity {
    title?: string,
    href?: string,
    vocHref?: string,
    description?: string,
    usage?: string,
    properties?: Class[]
}