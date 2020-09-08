const { useJquery } = require('web-crawl-util');

module.exports = () => {
  return {
    info: getGithubInfo(),
    title: getVueTitle(),
    remarks: 'Got data by npm package: web-crawl-util'
  };
};

function getGithubInfo() {
  const parentSelector = '.hello';
  const result = {
    isExit: useJquery.isExist(parentSelector)
  }
  
  if (result.isExit) {
    result.githubName = useJquery.getText('.github-user-name', parentSelector)
    result.githubURL = useJquery.getText('.github-html-url', parentSelector)

  }

  return result;
}

function getVueTitle() {
  const parentSelector = '.hello';
  const result = {
    isExit: useJquery.isExist(parentSelector)
  }
  
  if (result.isExit) {
    result.text = useJquery.getText('h1', parentSelector)
  }

  return result;
}
