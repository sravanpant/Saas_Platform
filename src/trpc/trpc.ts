import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create(); // initialises the trpc backend for the database

const middleware = t.middleware; // Creates reusable middlewares

const isAuth = middleware(async (opts) => {
  const { getUser } = getKindeServerSession(); // obtain getUser function from the kindeServerSession
  const user = await getUser(); 

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      userId: user.id,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
