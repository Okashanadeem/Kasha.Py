const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'code', title: 'Code', type: 'text' },
    { name: 'demoUrl', title: 'Live Demo URL', type: 'url' },
  ],
}

export default project
