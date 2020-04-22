import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        if (user.id !== toId) {
          //room을 스스로 만들지 못하게 하기위함 && toId는 토큰아이디가 toId에게 메시지를 보냄
          room = await prisma.createRoom({
            participants: {
              connect: [
                { id: toId },
                { id: user.id } //user.id는 대화를 요청한 사람 toId는 대화를 요청받은 사람
              ]
            }
            //User과 Room을 연결시키려면 깊은 복사가 필요함 이에따라, fragment를 사용
          });
        }
      } else {
        room = await prisma.room({ id: roomId });
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getTo = room.participants.filter(
        (participant) => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
    }
  }
};
