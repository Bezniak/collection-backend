const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async delete(ctx) {
    const { id } = ctx.params;

    try {
      // Fetch the user to ensure it exists
      const user = await strapi.plugins['users-permissions'].services.user.fetch({ id });

      if (!user) {
        return ctx.throw(404, 'User not found');
      }

      // Fetch related data and delete it
      const deleteRelatedData = async (service, query) => {
        const relatedData = await service.find(query);
        await Promise.all(relatedData.map(item => service.delete({ id: item.id })));
      };

      await deleteRelatedData(strapi.services.collection, { user: id });
      await deleteRelatedData(strapi.services.item, { user: id });
      await deleteRelatedData(strapi.services.like, { user: id });
      await deleteRelatedData(strapi.services.comment, { user: id });

      // Delete the user
      const result = await strapi.plugins['users-permissions'].services.user.remove({ id });

      return sanitizeEntity(result, { model: strapi.plugins['users-permissions'].models.user });
    } catch (error) {
      console.error('Error deleting user and related data:', error);
      ctx.throw(500, 'Internal server error');
    }
  },
};
