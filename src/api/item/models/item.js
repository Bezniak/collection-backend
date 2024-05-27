module.exports = {
  lifecycles: {
    async afterCreate(result) {
      await strapi.plugin('meilisearch').service('meilisearch').addDocuments('items', [result]);
    },
    async afterUpdate(result) {
      await strapi.plugin('meilisearch').service('meilisearch').updateDocuments('items', [result]);
    },
    async afterDelete(result) {
      await strapi.plugin('meilisearch').service('meilisearch').deleteDocument('items', result.id);
    },
  },
};
