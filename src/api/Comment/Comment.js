import { prisma } from "../../../generated/prisma-client";

export default {
  Comment: {
    user: ({ id }) => {
      console.log(id);
      return prisma.comment({ id }).user();
    },
    post: ({ id }) => {
      console.log(id);
      return prisma.comment({ id }).post();
    }
  }
};
