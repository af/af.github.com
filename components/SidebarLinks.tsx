import React from 'react'
import styles from './SidebarLinks.module.css'
import type { PinboardLink } from './types'

type Props = {
  links: Array<PinboardLink>
}

const SidebarLinks = ({ links }: Props) => {
  const latestLinks = links.slice(0, 10)
  const contents = latestLinks.map(l => (
    <article className={styles.item} key={l.u}>
      <h1>
        <a href={l.u}>{l.d}</a>
      </h1>
      <blockquote>{l.n}</blockquote>
      <ul className={styles.tags}>
        {l.t.map((tag: string) => (
          <li key={tag}>
            <a className={styles[`tag-${tag}`]} href={`https://pinboard.in/u:_af/t:${tag}`}>
              {tag}
            </a>
          </li>
        ))}
      </ul>
      <time>{l.dt.split('T')[0]}</time>
    </article>
  ))

  return <section className={styles.main}>{contents}</section>
}

export default SidebarLinks
