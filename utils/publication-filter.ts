import type { Class } from "~/types/class";
import type { NestedNavigationLink } from "~/types/linksOverview";
import type { NavigationLink } from '~/types/navigationLink'

export const filterKeys = (obj: { [key: string]: any }, key: string) => {
    return Object.keys(obj).reduce((acc, k) => {
        if (!k.includes(key)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {} as { [key: string]: any });
}

export const filterClasses = (classes: Class[], language: string): NestedNavigationLink[] =>
    classes.map(c => ({
        title: c.vocabularyLabel[language as keyof typeof c.vocabularyLabel ?? "nl"],
        href: c.id,
    }));

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
    if (c?.id) {
        values.push(["URI", c.id]);
    }
    if (c?.domain && c?.domain?.id) {
        values.push(["Domein", c.domain.id]);
    }
    if (c?.range && c?.range?.id) {
        values.push(["Bereik", c.range.id]);
    }
    if (c?.vocabularyDefinition) {
        values.push(["Definitie", c.vocabularyDefinition[language as keyof typeof c.vocabularyDefinition ?? "nl"]]);
    }
    if (c?.vocabularyUsageNote) {
        values.push(["Gebruik", c.vocabularyUsageNote[language as keyof typeof c.vocabularyUsageNote ?? "nl"]]);
    }
    return values;
}

