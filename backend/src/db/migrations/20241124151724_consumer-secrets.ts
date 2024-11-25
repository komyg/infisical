import { Knex } from "knex";

import { TableName } from "../schemas";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TableName.ConsumerSecrets, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    t.uuid("orgId").notNullable();
    t.foreign("orgId").references("id").inTable(TableName.Organization).onDelete("CASCADE");
    t.string("name").notNullable();
    t.timestamps(true, true, true);
  });

  await knex.schema.createTable(TableName.WebsitesSecrets, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    t.uuid("consumerSecretsId").notNullable();
    t.foreign("consumerSecretsId").references("id").inTable(TableName.ConsumerSecrets).onDelete("CASCADE");
    t.string("url").notNullable();
    t.string("username").notNullable();
    t.binary("encryptedPassword");
    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TableName.WebsitesSecrets);
  await knex.schema.dropTableIfExists(TableName.ConsumerSecrets);
}
