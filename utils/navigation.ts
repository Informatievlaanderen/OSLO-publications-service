const getNavigationLinks = (): NavigationLink[] => {
  return [
    {
      href: '#introduction',
      title: t('introduction'),
    },
    {
      href: '#summary',
      title: t('summary'),
    },
    {
      href: '#sotd',
      title: t('documentState'),
    },
    {
      href: '#license',
      title: t('license'),
    },
    {
      href: '#conformance',
      title: t('conformance'),
    },
    {
      href: '#overview',
      title: t('overview'),
    },
    {
      href: '#jsonld',
      title: 'JSON-LD context',
    },
    {
      href: '#shacl',
      title: 'SHACL template',
    },
  ]
}
