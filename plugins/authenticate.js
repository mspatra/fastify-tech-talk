async function authenticate(fastify, opts, done) {
  fastify.register(import("@fastify/jwt"), {
    secret: opts.JWT_SECRET,
  });

  fastify.decorate("authenticate", async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
  done();
}

authenticate[Symbol.for("skip-override")] = true;

export default authenticate;
