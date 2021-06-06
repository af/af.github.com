
const renderRepos = response => {
    const repos = response.data
    const containers = document.querySelectorAll('.ossProjects > li')
    const NUM_REPOS_TO_SHOW = containers.length

    const myRepos = repos.filter(r => !r.fork)
        .filter(r => r.stargazers_count > 2)
        .sort((r1, r2) => (r1.pushed_at < r2.pushed_at ? 1 : -1))
        .slice(0, NUM_REPOS_TO_SHOW)

    const fill = (root, selector, text) => root.querySelector(selector).textContent = text
    containers.forEach((el, idx) => {
        // overeager camel-case error here
        // eslint-disable-next-line
        const {name, description, stargazers_count, html_url} = myRepos[idx] || {}
        const link = el.querySelector('a')
        link.href = html_url  // eslint-disable-line camelcase
        link.classList.remove('loading')
        fill(el, '.projectTitle', name)
        fill(el, '.projectDesc', description)
        fill(el, '.projectStars', stargazers_count)
    })
}


const homepageMain = async () => {
    // Render latest links from pinboard
    const links = await window._linksPromise
    renderLinkSidebar(links)

    const repos = await window._reposPromise
    renderRepos(repos)

    renderTimeline(document.querySelector('.timelineChart'))
}

export default homepageMain
