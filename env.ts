import envalid from 'envalid'

const env = envalid.cleanEnv(process.env, {
  CLOUDFLARE_ANALYTICS_BEACON: envalid.str({ default: '' }),
})

export default env
