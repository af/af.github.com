import { cleanEnv, str } from 'envalid'

const env = cleanEnv(process.env, {
  CLOUDFLARE_ANALYTICS_BEACON: str({ default: '' }),
})

export default env
