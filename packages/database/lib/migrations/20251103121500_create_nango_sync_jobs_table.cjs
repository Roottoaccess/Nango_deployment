exports.up = async function(knex) {
  await knex.raw(`
    CREATE TABLE IF NOT EXISTS nango._nango_sync_jobs (
      id SERIAL PRIMARY KEY,
      sync_id TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      status TEXT
      -- Add other columns as needed!
    );
  `);
};

exports.down = async function(knex) {
  await knex.raw('DROP TABLE IF EXISTS nango._nango_sync_jobs');
};
