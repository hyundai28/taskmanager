"use server";

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
  try {
    console.log("========== GET CURRENT ==========");

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    console.log("Client criado");

    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE);

    console.log("Cookie encontrado:", !!session);

    if (!session) {
      console.log("Sessão não encontrada");
      return null;
    }

    console.log("Tamanho da sessão:", session.value.length);

    client.setSession(session.value);

    console.log("Session setada no client");

    const account = new Account(client);

    console.log("Chamando account.get()...");

    const user = await account.get();

    console.log("Usuário retornado com sucesso:");
    console.log({
      id: user.$id,
      email: user.email,
      name: user.name,
    });

    return user;
  } catch (error: any) {
    console.error("========== ERRO EM GET CURRENT ==========");

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

    console.error("========================================");

    return null;
  }
};