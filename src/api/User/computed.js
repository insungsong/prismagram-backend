import { prisma } from "../../../generated/prisma-client";

export default {
  //parents에 해당하는 부분이다. 즉, 메인 resolvers(= seeUser)에서
  //즉, header jwt의 계정과 메인 query가 끝나면 sub Query를 쓸수있는데
  //sub Query의 첫번째 매개변수에는 parent라는 변수에 해당 매개변수에
  //들어간 쿼리 json을 받을 수 있다.
  User: {
    fullName: (parent, _, { request }) => {
      console.log(parent);
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        });
      } catch (error) {
        return false;
      }
    },

    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
