'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

'use strict';

module.exports = function (trendType, period, language) {
  return new Promise((resolve, reject) => {

    if (typeof language === 'undefined') {
      language = '';
    }
    if (typeof trendType === 'undefined') {
      trendType = 'repositories';
    }


// FOR GitHiub
    if(trendType == 'repositories'){
      // var config = {
      //   headers: {'Access-Control-Allow-Origin': '*'}
      // };      
      var url = 'https://github.com/trending/' + encodeURIComponent(language) + '?since=' + period;

      return axios.get(url)
      .then(response => {
        const $ = cheerio.load(response.data);
        const repos = [];

        $('li', 'ol.repo-list').each((index, repo) => {
          const title = $(repo).find('h3').text().trim();

          const starLink = '/' + title.replace(/ /g, '') + '/stargazers';
          const forkLink = '/' + title.replace(/ /g, '') + '/network';

          repos.push({
            author: title.split(' / ')[0],
            name: title.split(' / ')[1],
            href: 'https://github.com/' + title.replace(/ /g, ''),
            description: $(repo).find('p', '.py-1').text().trim() || null,
            language: $(repo).find('[itemprop=programmingLanguage]').text().trim(),
            stars: parseInt($(repo).find('[href="' + starLink + '"]').text().trim().replace(',', '') || 0),
            forks: parseInt($(repo).find('[href="' + forkLink + '"]').text().trim().replace(',', '') || 0)
          });
        });

        resolve(repos);
      })
      .catch(err => {
        reject(err);
      });
    }else{
      //to catch github trending developers
      var url = 'https://github.com/trending/developers' + encodeURIComponent(language) + '?since=' + period;
      return axios.get(url)

      .then(response => {
        const $ = cheerio.load(response.data);
        const repos = [];

        $('li', 'ol.list-style-none').each((index, repo) => {
          const developer =  $(repo).find('h2', '.f3').find('a').text().replace(/ /g, '').replace(/\r?\n|\r/g, '').trim();
          var devOutput = developer.replace('(',' ').replace(')','');
          var res = devOutput.split(" ");
          var username = res[0];
          var name = res[1];
          if (typeof name === 'undefined') {
            name = '';
          }else
            name = '(' + name + ')';
          const descr_1 = $(repo).find($('.repo')).text().replace(/\r?\n|\r/g, '').trim();
          const descr_2 = $(repo).find($('.repo-snipit-description')).text().replace(/\r?\n|\r/g, '').trim();
          const descr = descr_1 + ' ' + descr_2;
          const image = $(repo).find($('.rounded-1')).attr('src');
          const href = $(repo).find('h2', 'f3').find('a').attr('href');
          console.log(image);
          repos.push({
            username: username,
            name: name,
            href: 'https://github.com' + href,
            avatar: image,
            description: descr,
          });
        });

        resolve(repos);
      })
      .catch(err => {
        reject(err);
      });


    }
    
  
  });
}