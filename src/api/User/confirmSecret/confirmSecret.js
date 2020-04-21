import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../util";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      console.log(user);
      if (user.loginSecret === secret) {
        //JMT
        await prisma.updateUser({
          data: {
            loginSecret: secret
          },
          where: { id: user.id }
        });
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret convination");
      }
    }
  }
};
