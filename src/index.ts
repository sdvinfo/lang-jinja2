import { parser } from './jinja2.grammar'
import { LRLanguage, LanguageSupport } from '@codemirror/language'
// import { styleTags, tags as t } from '@codemirror/highlight'
import { completeFromList } from "@codemirror/autocomplete"

export const jinja2Language = LRLanguage.define({
  parser: parser.configure({}),
  languageData: {
    commentTokens: { block: { open: "{#", close: "#}" } }
  }
})

export const jinja2Completion = jinja2Language.data.of({
  autocomplete: completeFromList([
    { label: "extends", type: "keyword" },
    { label: "from", type: "keyword" },
    { label: "import", type: "function" },
  ])
})

export function jinja2 () {
  return new LanguageSupport(jinja2Language, [jinja2Completion])
}
