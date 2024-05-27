module.exports = {
  async search(ctx) {
    const { query } = ctx.request.query;

    if (!query) {
      console.log('Query parameter is missing');
      return ctx.badRequest('Query parameter is missing');
    }

    console.log('Received query:', query);

    try {
      // Пример поиска в модели `articles`
      const results = await strapi.entityService.findMany('api::article.article', {
        filters: {
          $or: [
            { title: { $containsi: query } },
            { description: { $containsi: query } },
          ],
        },
      });

      console.log('Search results:', results);
      ctx.send(results);
    } catch (error) {
      console.error('Search error:', error);
      ctx.internalServerError('An error occurred while searching');
    }
  },
};
