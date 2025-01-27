// Code generated by automation script, DO NOT EDIT.
// Automated by pulling database and generating zod schema
// To update. Just run npm run generate:schema
// Written by akhilmhdh.

import { z } from "zod";

import { zodBuffer } from "@app/lib/zod";

import { TImmutableDBKeys } from "./models";

export const WebsitesSecretsSchema = z.object({
  id: z.string().uuid(),
  consumerSecretsId: z.string().uuid(),
  url: z.string(),
  username: z.string(),
  encryptedPassword: zodBuffer.nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type TWebsitesSecrets = z.infer<typeof WebsitesSecretsSchema>;
export type TWebsitesSecretsInsert = Omit<z.input<typeof WebsitesSecretsSchema>, TImmutableDBKeys>;
export type TWebsitesSecretsUpdate = Partial<Omit<z.input<typeof WebsitesSecretsSchema>, TImmutableDBKeys>>;
