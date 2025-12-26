// Fetch GitHub repositories for eslamghanm
const username = 'eslamghanm';
const apiUrl = `https://api.github.com/users/${username}/repos`;

fetch(apiUrl)
  .then(response => response.json())
  .then(repos => {
    console.log('GitHub Repositories for eslamghanm:');
    repos.forEach(repo => {
      console.log(`- ${repo.name}: ${repo.description} (${repo.language}) - Stars: ${repo.stargazers_count}`);
    });
  })
  .catch(error => {
    console.error('Error fetching repositories:', error);
  });
