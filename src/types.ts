interface VariableBoolean {
  type: 'boolean'
  default?: boolean
}

interface VariableString {
  type: 'string'
  default?: string
}

type Variable = (VariableBoolean | VariableString
)

export interface MetadataGlobal {
  templates?: Record<string, MetadataLocal>
}

export interface MetadataLocal {
  delimiters?: {
    start: string
    end: string
  }
  variables?: Record<string, Variable>
}
