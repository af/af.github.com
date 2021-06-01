import React from 'react';
import './global.css'

type Props = {
  Component: React.ComponentType,
  pageProps: any
}

export default function App({ Component, pageProps }: Props) {
  return <Component {...pageProps} />
}
