import { Knex } from "knex";

import { TableName } from "../schemas";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TableName.ConsumerCredentials, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    t.uuid("orgId").notNullable();
    t.foreign("orgId").references("id").inTable(TableName.Organization).onDelete("CASCADE");
    t.string("name").notNullable();
    t.string("slug").notNullable();
    t.timestamps(true, true, true);
    t.unique(["orgId", "slug"]);
  });

  await knex.schema.createTable(TableName.WebsitesSecrets, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    t.uuid("customerSecretsId").notNullable();
    t.foreign("customerSecretsId").references("id").inTable(TableName.ConsumerCredentials).onDelete("CASCADE");
    t.string("url").notNullable();
    t.string("username").notNullable();
    t.binary("encryptedPassword").notNullable();
    t.timestamps(true, true, true);
  });

  await knex.schema.createTable(TableName.CreditCardsSecrets, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    t.uuid("customerSecretsId").notNullable();
    t.foreign("customerSecretsId").references("id").inTable(TableName.ConsumerCredentials).onDelete("CASCADE");
    t.string("cardName").notNullable();
    t.string("cardHolderName").notNullable();
    t.binary("encryptedCardNumber").notNullable();
    t.binary("encryptedCvv").notNullable();
    t.binary("encryptedExpirationDate").notNullable();
    t.timestamps(true, true, true);
  });

  await knex.schema.createTable(TableName.SecureNotesSecrets, (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    t.uuid("customerSecretsId").notNullable();
    t.foreign("customerSecretsId").references("id").inTable(TableName.ConsumerCredentials).onDelete("CASCADE");
    t.string("title").notNullable();
    t.binary("encryptedNote").notNullable();
    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TableName.WebsitesSecrets);
  await knex.schema.dropTableIfExists(TableName.CreditCardsSecrets);
  await knex.schema.dropTableIfExists(TableName.SecureNotesSecrets);
  await knex.schema.dropTableIfExists(TableName.ConsumerCredentials);
}
