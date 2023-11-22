export default function user(fastify, _, done) {
  fastify.get(
    "/user",
    {
      onRequest: [fastify.authenticate],
    },
    (req) => {
      req.log.info(typeof fastify.isEqual === 'function');
      return fastify.createSuccessResponse(req.user);
    }
  );
  done();
}
