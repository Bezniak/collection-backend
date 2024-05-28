module.exports = {
  lifecycles: {
    async afterCreate(result) {
      await strapi.plugin('meilisearch').service('meilisearch').addDocuments('collection', [result]);
    },
    async afterUpdate(result) {
      await strapi.plugin('meilisearch').service('meilisearch').updateDocuments('collection', [result]);
    },
    async afterDelete(result) {
      await strapi.plugin('meilisearch').service('meilisearch').deleteDocument('collection', result.id);
    },
  },
};
