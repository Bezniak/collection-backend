module.exports = {
  lifecycles: {
    async afterCreate(result) {
      await strapi.plugin('meilisearch').service('meilisearch').addDocuments('comments', [result]);
    },
    async afterUpdate(result) {
      await strapi.plugin('meilisearch').service('meilisearch').updateDocuments('comments', [result]);
    },
    async afterDelete(result) {
      await strapi.plugin('meilisearch').service('meilisearch').deleteDocument('comments', result.id);
    },
  },
};
