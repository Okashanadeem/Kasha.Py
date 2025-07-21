import { defineType, defineField } from 'sanity'

const agentProject = defineType({
  name: 'agentProject',
  title: 'Agentic AI Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'code',
      title: 'Main Code',
      type: 'text',
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'files',
      title: 'File Structure',
      type: 'array',
      of: [{ type: 'fileNode' }],
    }),
  ],
})

export default agentProject
