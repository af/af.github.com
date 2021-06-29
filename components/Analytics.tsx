import React from 'react'
import env from '../env'

const Analytics = () => {
  if (!env.CLOUDFLARE_ANALYTICS_BEACON) return null
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "${env.CLOUDFLARE_ANALYTICS_BEACON}"}'></script>`,
      }}
    />
  )
}

export default Analytics
