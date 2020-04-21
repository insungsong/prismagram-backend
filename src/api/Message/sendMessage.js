export default {
  Mutation: {
    sendMessage: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message } = args;

      return null;
    }
  }
};
