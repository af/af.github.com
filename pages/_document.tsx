import Document, { Html, Head, Main, NextScript } from 'next/document'
import env from '../env'

const beaconToken = env.CLOUDFLARE_ANALYTICS_BEACON
const beaconJson = `{"token": "${env.CLOUDFLARE_ANALYTICS_BEACON}"}`

// Custom Document subclass (run server-side only) for conditionally adding an analytics script. See:
// https://nextjs.org/docs/advanced-features/custom-document
class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />

          {beaconToken ? (
            <script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={beaconJson}
            ></script>
          ) : null}
        </body>
      </Html>
    )
  }
}

export default CustomDocument
