import type { Affiliation } from '~/types/affiliation'

export interface Stakeholder {
    firstName: string,
    lastName: string,
    email: string,
    affiliation: Affiliation
}

export interface Stakeholders {
    contributors?: Stakeholder[];
    authors?: Stakeholder[];
    editors?: Stakeholder[];
}
