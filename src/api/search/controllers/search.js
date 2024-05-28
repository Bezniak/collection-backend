module.exports = {
  async search(ctx) {
    const { query } = ctx.request.query;

    if (!query) {
      console.log('Query parameter is missing');
      return ctx.badRequest('Query parameter is missing');
    }

    console.log('Received query:', query);

    try {
      const commentsResults = await strapi.entityService.findMany('api::comment.comment', {
        filters: {
          $or: [
            { text: { $containsi: query } },
          ],
        },
      });

      const collectionsResults = await strapi.entityService.findMany('api::collection.collection', {
        filters: {
          $or: [
            { name: { $containsi: query } },
            { description: { $containsi: query } },
            { category: { $containsi: query } },
            { fields: { $containsi: query } },
          ],
        },
      });

      const itemsResults = await strapi.entityService.findMany('api::item.item', {
        filters: {
          $or: [
            { name: { $containsi: query } },
            { tags: { $containsi: query } },
            { additionalFields: { $containsi: query } },
          ],
        },
      });

      const tagsResults = await strapi.entityService.findMany('api::tag.tag', {
        filters: {
          $or: [
            { tags: { $containsi: query } },
          ],
        },
      });

      const results = {
        comments: commentsResults,
        collections: collectionsResults,
        items: itemsResults,
        tags: tagsResults,
      };

      console.log('Search results:', results);
      ctx.send(results);
    } catch (error) {
      console.error('Search error:', error);
      ctx.internalServerError('An error occurred while searching');
    }
  },
};
