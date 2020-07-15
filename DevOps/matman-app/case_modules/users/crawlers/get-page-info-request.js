const { useJquery } = require('web-crawl-util');

module.exports = () => {
  return {
    githubName: getGithubName(),
    githubURL: getGithubUrl(),
    remarks: 'Got data by npm package: web-crawl-util'
  };
};

function getGithubName() {
  const parentSelector = '.hello';
  const result = {
    isExit: useJquery.isExist(parentSelector)
  }
  
  if (result.isExit) {
    result.githubName = useJquery.getText('.github-user-name', parentSelector)
  }

  return result;
}

function getGithubUrl() {
  const parentSelector = '.hello';
  const result = {
    isExit: useJquery.isExist(parentSelector)
  }
  
  if (result.isExit) {
    result.githubURL = useJquery.getText('.github-html-url', parentSelector)
  }

  return result;
}