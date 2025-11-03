exports.config = { transaction: false };

exports.up = async function (knex) {
    // Check if the table exists before creating the index
    const tableExists = await knex.schema.withSchema('nango').hasTable('_nango_sync_jobs');
    
    if (tableExists) {
        return knex.schema.raw(
            'CREATE INDEX CONCURRENTLY "idx_jobs_id_status_type_where_delete" ON "_nango_sync_jobs" USING BTREE ("sync_id","status","type") WHERE deleted = false'
        );
    } else {
        console.log('Table nango._nango_sync_jobs does not exist yet. Skipping index creation.');
        return Promise.resolve();
    }
};

exports.down = function (knex) {
    return knex.schema.raw('DROP INDEX CONCURRENTLY IF EXISTS idx_jobs_id_status_type_where_delete');
};
