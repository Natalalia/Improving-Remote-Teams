exports.up = function(knex) {
    return knex.schema.createTable("mood_messages", moodMessagesTable => {
        moodMessagesTable.increments("mood_message_id").primary();
        moodMessagesTable.string("message");
        moodMessagesTable.datetime("created_at").defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable("mood_messages");
};
