import envSchema from 'env-schema'
import S from 'fluent-json-schema'

const schema = S.object()
  .prop('LOG_LEVEL', S.string().default('debug'))
  .prop('IS_DEV', S.boolean())
  .prop('JWT_SECRET', S.string().required())

export default envSchema({
  schema,
  dotenv: true,
})