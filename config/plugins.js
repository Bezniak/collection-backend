module.exports = ({ env }) => ({
  meilisearch: {
    config: {
      host: env('MEILISEARCH_HOST', 'http://localhost:7700'),
      apiKey: env('MEILISEARCH_API_KEY', 'masterKey'),
    },
  },
});
