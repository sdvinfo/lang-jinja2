import { parser } from './jinja2.grammar'
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent } from '@codemirror/language'
import { styleTags, tags as t } from '@codemirror/highlight'
import { completeFromList } from "@codemirror/autocomplete"

export const jinja2Language = LRLanguage.define({
  parser: parser.configure({
    // props: [
    // indentNodeProp.add({
    //   Application: delimitedIndent({ closing: ')', align: false })
    //   Application: context => context.column(context.node.from) + context.unit
    // }),
    // foldNodeProp.add({
    //   Application: foldInside
    // }),
    // styleTags({
    //   // Variable: t.variableName,
    //   // String: t.string,
    // })
    // ]
  }),
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
