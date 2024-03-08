
export const validateLocaleCookie = (locale?: string) => {
    const { defaultLocale, availableLocales } = useI18n()

    if (locale && availableLocales?.includes(locale)) {
        return locale
    }
    return defaultLocale;
}