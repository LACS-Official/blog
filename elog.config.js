module.exports = {
  write: {
    platform: 'notion',
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: { property: 'status', select: { equals: '已发布' }},
      catalog: {enable: true, property: "catalog"},
      categories: {enable: true, property: "categories"},
      tags: {enable: true, property: "tags"},
      title: {enable: true, property: "title"},
      date: {enable: true, property: "date"},
      updated: {enable: true, property: "updated"},
      permalink: {enable: true, property: "permalink"},
      cover: {enable: true, property: "cover"},
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './source/_posts',
      filename: 'title',
      format: 'markdown',
      frontMatter: {
        enable: true,
        include: ['catalog','categories', 'tags', 'title', 'date', 'updated', 'permalink', 'cover'],
        exclude: [], // 不输出exclude包含的属性
      }
    },
  },
  image: {
    enable: false,
    platform: 'local',
    local: {
      outputDir: './docs/images',
      prefixKey: '/images',
      pathFollowDoc: false,
    },
  },
};