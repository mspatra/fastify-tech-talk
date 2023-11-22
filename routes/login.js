import S from "fluent-json-schema";

const schema = {
  body: S.object()
    .prop("username", S.string().required())
    .prop("password", S.string().required()),
};

export default async function login(fastify) {
  fastify.decorate("isEqual", (a, b)=> a === b);
  fastify.post("/login", { schema }, (req, reply) => {
    const { username, password } = req.body;
    req.log.info(typeof fastify.isEqual === 'function');
    if (username !== password) {
      return reply.code(401).send({
        message: "Invalid Credential",
        error: "Unauthorized",
        statusCode: 401,
      });
    }
    const res = fastify.createSuccessResponse({
      token: fastify.jwt.sign({ username }),
    });
    reply.send(res);
  });
}
