import type { Class } from "~/types/class";
import type { NavigationLink } from '~/types/navigationLink'

import { AP, VOC, SCOPE_EXTERNAL, SCOPE_IN_PACKAGE } from "~/constants/constants";

// Utility functions
const isInPackage = (c: Class) => c?.scope === SCOPE_IN_PACKAGE;
const isExternal = (c: Class) => c?.scope === SCOPE_EXTERNAL;
const isScoped = (c: Class) => c?.scope;

export const getLabel = (c: Class, language: string, type?: string) => {
    switch (type) {
        case AP:
            return c.applicationProfileLabel?.[language as keyof typeof c.applicationProfileLabel] ?? "";
        case VOC:
            return c.vocabularyLabel?.[language as keyof typeof c.vocabularyLabel] ?? "";
        default:
            return c.vocabularyLabel?.[language as keyof typeof c.vocabularyLabel] ?? "";
    }
};

export const getDefinition = (c: Class, language: string, type?: string) => {
    switch (type) {
        case AP:
            return c.applicationProfileDefinition?.[language as keyof typeof c.applicationProfileDefinition] ?? "";
        case VOC:
            return c.vocabularyDefinition?.[language as keyof typeof c.vocabularyDefinition] ?? "";
        default:
            return c.vocabularyDefinition?.[language as keyof typeof c.vocabularyDefinition] ?? "";
    }
};

export const getUsage = (c: Class, language: string, type?: string) => {
    switch (type) {
        case AP:
            return c.applicationProfileUsageNote?.[language as keyof typeof c.applicationProfileUsageNote] ?? "";
        case VOC:
            return c.vocabularyUsageNote?.[language as keyof typeof c.vocabularyUsageNote] ?? "";
        default:
            return c.vocabularyUsageNote?.[language as keyof typeof c.vocabularyUsageNote] ?? "";
    }
};

const toPascalCase = (str: string): string => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}


export const getAnchorTag = (c: Class, language?: string, type?: string) => {
    let domain: string = "";
    // AP can be less strict since it's only being used for internal navigation
    if (type === AP) {
        return toPascalCase(`${getLabel(c, language ?? "nl", type)}`)
    }
    // VOC needs to be strict since it's being used for external navigation
    if (c?.id && c?.id?.includes('#')) {
        domain = `${c?.id?.split('#').pop()}`;
    }
    return domain;
}

const compareLabels = (a: Class, b: Class, language: string, type?: string) => getLabel(a, language, type).localeCompare(getLabel(b, language, type));

const toNavigationLink = (c: Class, language: string, type?: string): NavigationLink => ({
    title: getLabel(c, language, type),
    href: `#${getAnchorTag(c, language, type)}`,
});

export const filterEntities = (entities: Class[], language: string, type?: string): NavigationLink[] =>
entities.filter(isInPackage)
        .map((c: Class) => toNavigationLink(c, language, type))
        .sort((a: NavigationLink, b: NavigationLink) => (a?.title ?? "").localeCompare(b?.title ?? ""));

export const filterDatatypes = (classes: Class[], language: string, type?: string): NavigationLink[] => classes
    .filter(isScoped)
    .map((c: Class) => toNavigationLink(c, language, type))
    .sort((a: NavigationLink, b: NavigationLink) => (a?.title ?? "").localeCompare(b?.title ?? ""));

export const filterInScopeClasses = (classes: Class[], language: string, type?: string): Class[] =>
    classes
        .filter(isInPackage)
        .sort((a: Class, b: Class) => compareLabels(a, b, language, type));

export const filterExternalClasses = (classes: Class[], language: string, type?: string): Class[] =>
    classes
        .filter(isExternal)
        .sort((a: Class, b: Class) => compareLabels(a, b, language, type));


export const sortClasses = (classes: Class[], language: string, type: string): Class[] =>
    classes.sort((a: Class, b: Class) => compareLabels(a, b, language, type));

export const filterClassValues = (c: Class, language: string): Array<string | number | NavigationLink>[] => {
    const values: Array<string | number | NavigationLink>[] = [];
    const langKey = language as keyof typeof c.vocabularyDefinition ?? "nl";

    c?.id && values.push(["URI", c.id]);
    c?.vocabularyDefinition && values.push(["Definitie", c.vocabularyDefinition[langKey]]);
    c?.vocabularyUsageNote && values.push(["Gebruik", c.vocabularyUsageNote[langKey]]);

    return values;
}

export const filterScopedClasses = (classes: Class[], language: string, type?: string): Class[] =>
    classes
        .filter(isScoped)
        .sort((a: Class, b: Class) => compareLabels(a, b, language, type));

export const filterPropertyValues = (c: Class, language: string): Array<string | number | NavigationLink>[] => {
    const values: Array<string | number | NavigationLink>[] = [];
    const langKey = language as keyof typeof c.vocabularyDefinition ?? "nl";

    c?.id && values.push(["URI", c.id]);
    c?.range && c?.range?.id && values.push(["Bereik", c.range.id]);
    c?.domain && values.push(["Domein", c.domain]);
    c?.vocabularyDefinition && values.push(["Definitie", c.vocabularyDefinition[langKey]]);
    c?.vocabularyUsageNote && values.push(["Gebruik", c.vocabularyUsageNote[langKey]]);
    return values;
}

export const filterExternalTerminologies = (c: Class): Array<string | number | NavigationLink>[] => {
    const values: Array<string | number | NavigationLink>[] = [];

    c?.id && values.push(["URI", c.id]);
    return values;
}
