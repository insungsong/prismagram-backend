import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files, location } = args;

      const post = await prisma.createPost({
        location,
        caption,
        user: { connect: { id: user.id } }
      });
      files.forEach(async (file) => {
        //files는 많은 URL들의 array라는 것을 기억해야한다.
        await prisma.createFile({
          url: file,
          post: {
            connect: {
              id: post.id
            }
          }
        });
      });
      return post;
    }
  }
};
