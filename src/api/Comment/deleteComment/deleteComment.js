import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { commentId } = args;
      console.log(commentId);
      const deleteComment = await prisma.deleteComment({
        id: commentId
      });
      console.log(deleteComment);
      return deleteComment;
    }
  }
};
