import Fastify from "fastify";
import { ulid } from "ulidx";

function buildServer(config) {
  const opts = {
    logger: {
      level: config.LOG_LEVEL,
      transport: config.IS_DEV ? {
        target: "pino-pretty",
      } : undefined,
    },
    genReqId: ()=> ulid(),
  };

  const fastify = Fastify(opts);

  fastify.decorate("createSuccessResponse", (payload) => {
    return {
      statusCode: 200,
      message: "Successful",
      ...payload,
    };
  });

  fastify.addHook("onRequest", (request, _, next) => {
    console.log("onRequest hook", request.id);
    next();
  });

  fastify.get(
    "/health",
    async (req) => {
      return fastify.createSuccessResponse();
    }
  );

  fastify.register(import("./plugins/authenticate.js"), config);

  fastify.register(import("./routes/login.js"));
  fastify.register(import("./routes/user.js"));

  fastify.setErrorHandler((err, request, reply) => {
    request.log.debug(`Request url: ${request.raw.url}`)
    request.log.debug(`Payload: ${request.body}`)
    request.log.error(`Error occurred: ${err}`)

    const code = err.statusCode ?? 500

    reply.status(code).send({
      statusCode: code,
      error: err.name ?? 'Internal server error',
      message: err.message ?? err
    })
  })
  fastify.log.info("Fastify is starting up!");

  return fastify;
}

export default buildServer;
