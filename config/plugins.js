require('dotenv').config();

module.exports = ({env}) => ({
  meilisearch: {
    config: {
      host: env('MEILISEARCH_HOST', process.env.MEILISEARCH_HOST),
      apiKey: env('MEILISEARCH_API_KEY', process.env.MEILISEARCH_API_KEY),
    },
  },
});

