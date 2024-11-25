import { z } from "zod";

import { readLimit } from "@app/server/config/rateLimiter";
import { verifyAuth } from "@app/server/plugins/auth/verify-auth";
import { AuthMode } from "@app/services/auth/auth-type";

export const registerConsumerSecretRouter = async (server: FastifyZodProvider) => {
  server.route({
    method: "GET",
    url: "/",
    config: {
      rateLimit: readLimit
    },
    schema: {
      response: {
        200: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
            orgId: z.string().uuid(),
            createdAt: z.date(),
            updatedAt: z.date()
          })
        )
      }
    },
    onRequest: verifyAuth([AuthMode.JWT]),
    handler: async (req) => {
      const consumerSecrets = await server.services.consumerSecrets.listConsumerSecrets({
        orgId: req.permission.orgId
      });
      return consumerSecrets;
    }
  });

  server.route({
    method: "POST",
    url: "/",
    config: {
      rateLimit: readLimit
    },
    schema: {
      body: z.object({
        name: z.string()
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          orgId: z.string().uuid(),
          name: z.string(),
          createdAt: z.date(),
          updatedAt: z.date()
        })
      }
    },
    onRequest: verifyAuth([AuthMode.JWT]),
    handler: async (req) => {
      const consumerSecret = await server.services.consumerSecrets.createConsumerSecret({
        name: req.body.name,
        orgId: req.permission.orgId
      });
      return consumerSecret;
    }
  });
};
