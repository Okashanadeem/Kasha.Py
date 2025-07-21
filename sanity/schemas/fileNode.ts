import { defineField, defineType } from 'sanity'

interface FileNodeData {
  name?: string
  type?: 'file' | 'folder'
  content?: string
  children?: FileNodeData[]
}

const fileNode = defineType({
  name: 'fileNode',
  title: 'File or Folder',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().min(1).error('Name is required'),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: 'File', value: 'file' },
          { title: 'Folder', value: 'folder' },
        ],
      },
    }),
    defineField({
      name: 'content',
      title: 'Code (only if file)',
      type: 'text',
      hidden: ({ parent }) => (parent as FileNodeData)?.type !== 'file',
      validation: (rule) =>
        rule.custom((content, context) => {
          const parent = context?.parent as FileNodeData
          if (parent?.type === 'file' && !content?.trim()) {
            return 'Content is required for files'
          }
          return true
        }),
    }),
    defineField({
      name: 'children',
      title: 'Children',
      type: 'array',
      of: [
        {
          type: 'fileNode', // Self-reference to create recursive structure
        },
      ],
      hidden: ({ parent }) => (parent as FileNodeData)?.type !== 'folder',
      validation: (rule) =>
        rule.custom((children, context) => {
          const parent = context?.parent as FileNodeData
          if (parent?.type === 'folder' && (!children || children.length === 0)) {
            return 'Folders should have at least one child (or change to file type)'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'type',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle === 'folder' ? '📂' : '📄'} ${subtitle || 'unknown'}`,
      }
    },
  },
})

export default fileNode