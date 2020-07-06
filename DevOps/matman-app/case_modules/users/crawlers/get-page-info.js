const { useJquery } = require('web-crawl-util');

module.exports = () => {
  return {
    title: getVueTitle(),
    remarks: 'Got data by npm package: web-crawl-util'
  };
};

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
