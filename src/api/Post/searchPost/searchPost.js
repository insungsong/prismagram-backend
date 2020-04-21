import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      await prisma.posts({
        where: {
          OR: [
            { location_starts_with: args.term },
            { location_ends_with: args.term }
          ]
        }
      });
    }
  }
};
