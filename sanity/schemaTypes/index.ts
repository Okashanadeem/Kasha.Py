import { type SchemaTypeDefinition } from 'sanity'
import project from '../schemas/project'
import fileNode from '../schemas/fileNode'
import agentProject from '../schemas/agentProject'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project,agentProject , fileNode],
}
