exports.config = { transaction: false };

/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
    // Check if the table exists before creating the index
    const tableExists = await knex.schema.withSchema('nango').hasTable('_nango_sync_jobs');
    
    if (tableExists) {
        await knex.raw(
            `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_syncid_running_createdat ON nango._nango_sync_jobs (sync_id, created_at DESC) WHERE status = 'RUNNING';`
        );
    } else {
        console.log('Table nango._nango_sync_jobs does not exist yet. Skipping index creation.');
    }
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function () {};
