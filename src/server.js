import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { sendSecretMail } from "./util";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

//sendSecretMail("weberydayofficial@gmail.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running On http://localhost: ${PORT}`)
);
