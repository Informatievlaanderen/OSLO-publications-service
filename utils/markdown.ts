import type { Markdown } from "~/types/markdown"

export const findMarkdownByTitle = (title: string, markdown: Markdown[]): Markdown | undefined => {
  return markdown?.find((md) => md.title === title)
}
