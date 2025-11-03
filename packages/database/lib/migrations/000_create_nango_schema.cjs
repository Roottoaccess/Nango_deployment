exports.up = async function(knex) {
  await knex.raw('CREATE SCHEMA IF NOT EXISTS nango;');
};

exports.down = async function(knex) {
  await knex.raw('DROP SCHEMA IF EXISTS nango CASCADE;');
};