import type { Class } from "~/types/class";
import type { NestedNavigationLink } from "~/types/linksOverview";
import type { NavigationLink } from '~/types/navigationLink'

import { SCOPE_EXTERNAL, SCOPE_IN_PACKAGE } from "~/constants/constants";

// Utility functions
const getLabel = (c: Class, language: string) => c.vocabularyLabel[language as keyof typeof c.vocabularyLabel] ?? "";
const compareLabels = (a: Class, b: Class, language: string) => getLabel(a, language).localeCompare(getLabel(b, language));
const toNestedNavigationLink = (c: Class, language: string): NestedNavigationLink => ({
    title: getLabel(c, language),
    href: c.id,
});

export const filterKeys = (obj: { [key: string]: any }, key: string) => {
    return Object.keys(obj).reduce((acc, k) => {
        if (!k.includes(key)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {} as { [key: string]: any });
}

const isInPackage = (c: Class) => c.scope === SCOPE_IN_PACKAGE;
const isExternal = (c: Class) => c.scope === SCOPE_EXTERNAL;

export const filterClasses = (classes: Class[], language: string): NestedNavigationLink[] =>
    classes.filter(isInPackage)
        .map(c => toNestedNavigationLink(c, language))
        .sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));

export const filterInScopeProperties = (classes: Class[], language: string): Class[] =>
    classes
        .filter(isInPackage)
        .sort((a, b) => compareLabels(a, b, language));

export const filterExternalProperties = (classes: Class[], language: string): Class[] =>
    classes
        .filter(isExternal)
        .sort((a, b) => compareLabels(a, b, language));

export const filterClassValues = (c: Class, language: string): Array<string | number | NavigationLink>[] => {
    const values: Array<string | number | NavigationLink>[] = [];
    const langKey = language as keyof typeof c.vocabularyDefinition ?? "nl";

    c?.id && values.push(["URI", c.id]);
    c?.vocabularyDefinition && values.push(["Definitie", c.vocabularyDefinition[langKey]]);
    c?.vocabularyUsageNote && values.push(["Gebruik", c.vocabularyUsageNote[langKey]]);

    return values;
}

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

export const filterExternalTerminologies = (c: Class, language: string): Array<string | number | NavigationLink>[] => {
    const values: Array<string | number | NavigationLink>[] = [];

    c?.id && values.push(["URI", c.id]);
    return values;
}