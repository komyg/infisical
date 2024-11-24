import { z } from "zod";

import { readLimit } from "@app/server/config/rateLimiter";
import { verifyAuth } from "@app/server/plugins/auth/verify-auth";
import { AuthMode } from "@app/services/auth/auth-type";

export const registerWebsiteSecretRouter = async (server: FastifyZodProvider) => {
  server.route({
    method: "POST",
    url: "/:consumerSecretsId/raw/website-secret",
    config: {
      rateLimit: readLimit
    },
    schema: {
      params: z.object({
        consumerSecretsId: z
          .string()
          .uuid()
          .describe("The ID of the consumer secret that will contain this website secret")
      }),
      body: z.object({
        url: z.string().url(),
        username: z.string(),
        password: z.string()
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          url: z.string().url(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      }
    },
    onRequest: verifyAuth([AuthMode.JWT]),
    handler: async (req) => {
      const { url, username, password } = req.body;

      const websiteSecret = await server.services.websiteSecret.createWebsiteSecret({
        orgId: req.permission.orgId,
        consumerSecretsId: req.params.consumerSecretsId,
        url,
        username,
        password
      });

      return {
        id: websiteSecret.id,
        url: websiteSecret.url,
        createdAt: websiteSecret.createdAt,
        updatedAt: websiteSecret.updatedAt
      };
    }
  });

  server.route({
    method: "GET",
    url: "/:consumerSecretsId/website-secret",
    config: {
      rateLimit: readLimit
    },
    schema: {
      params: z.object({
        consumerSecretsId: z.string().uuid().describe("The ID of the consumer secret that contains the website secrets")
      }),
      response: {
        200: z.array(
          z.object({
            id: z.string().uuid(),
            url: z.string().url(),
            username: z.string(),
            password: z.string().optional(),
            createdAt: z.date(),
            updatedAt: z.date()
          })
        )
      }
    },
    onRequest: verifyAuth([AuthMode.JWT]),
    handler: async (req) => {
      const websiteSecrets = await server.services.websiteSecret.listWebsiteSecrets({
        orgId: req.permission.orgId,
        consumerSecretsId: req.params.consumerSecretsId
      });

      return websiteSecrets;
    }
  });
};
