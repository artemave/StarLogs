/**
 * @param {string} repo
 * @returns {Promise<Array<string>>} messages
 */
export default async function fetchCommitMessages(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=100`)
  const commits = await response.json()
  return commits.map(commit => commit.commit.message)
}
