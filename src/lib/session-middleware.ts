import "server-only";

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Storage as StorageType,
  type Users as UsersType,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/constants";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    try {
      console.log("========== SESSION MIDDLEWARE ==========");

      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

      console.log("Client criado");

      const session = getCookie(c, AUTH_COOKIE);

      console.log("Cookie encontrado:", !!session);

      if (!session) {
        console.log("Sessão não encontrada");

        return c.json({ error: "Unauthorized" }, 401);
      }

      console.log("Tamanho da sessão:", session.length);

      client.setSession(session);

      console.log("Session configurada");

      const account = new Account(client);
      const databases = new Databases(client);
      const storage = new Storage(client);

      console.log("Chamando account.get()...");

      const user = await account.get();

      console.log("Usuário autenticado:");
      console.log({
        id: user.$id,
        email: user.email,
        name: user.name,
      });

      c.set("account", account);
      c.set("databases", databases);
      c.set("storage", storage);
      c.set("user", user);

      await next();
    } catch (error: any) {
      console.error("========== SESSION MIDDLEWARE ERROR ==========");

      console.dir(error, {
        depth: null,
      });

      console.error("name:", error?.name);
      console.error("message:", error?.message);
      console.error("code:", error?.code);
      console.error("type:", error?.type);
      console.error("response:", error?.response);

      if (error?.cause) {
        console.error("========== CAUSE ==========");

        console.dir(error.cause, {
          depth: null,
        });

        console.error("cause code:", error.cause.code);
        console.error("cause errno:", error.cause.errno);
        console.error("cause syscall:", error.cause.syscall);
        console.error("cause message:", error.cause.message);
      }

      console.error("==============================================");

      return c.json(
        {
          error: "Authentication failed",
          message: error?.message,
        },
        401
      );
    }
  }
);