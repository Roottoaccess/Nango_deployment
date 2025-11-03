exports.config = { transaction: false };

/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
    // Check if the table exists before creating the index
    const tableExists = await knex.schema.withSchema('nango').hasTable('_nango_sync_jobs');
    
    if (tableExists) {
        await knex.schema.raw(`CREATE INDEX CONCURRENTLY IF NOT EXISTS "idx_sync_jobs_run_id" ON "_nango_sync_jobs" USING BTREE ("run_id") WHERE (deleted=false)`);
    } else {
        console.log('Table nango._nango_sync_jobs does not exist yet. Skipping index creation.');
    }
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
    await knex.schema.raw(`DROP INDEX CONCURRENTLY IF EXISTS "idx_sync_jobs_run_id"`);
};
