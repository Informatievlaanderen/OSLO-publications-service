export interface Metadata {
  title: string
  uri: string
  issued: string
  baseURI: string
  filename: string
  navigation: {
    self: string
  }
  license: string
  documenttype: string
  documentroot: string
  documentconfig: Record<string, unknown>
  status: string
  statuslabel: string
  repositoryurl: string
  changelogurl: string
  feedbackurl: string
  standaardregisterurl: string
  namespaces: string[]
  inDomainNamespaces: string[]
  uridomain: string
  hostname: string
  primaryLanguage: string
}
