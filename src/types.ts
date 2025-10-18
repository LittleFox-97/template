/* MAIN */

interface VariableBoolean {
  type: 'boolean'
  default?: boolean
}

interface VariableString {
  type: 'string'
  default?: string
}

type Variable = (
  VariableBoolean
  | VariableString
)

interface MetadataGlobal {
  templates?: Record<string, MetadataLocal>
}

interface MetadataLocal {
  delimiters?: {
    start: string
    end: string
  }
  variables?: Record<string, Variable>
}

/* EXPORT */

export type { MetadataGlobal, MetadataLocal }
