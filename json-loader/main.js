const axios = require('axios');
const fs = require('fs');
const comments = JSON.parse(fs.readFileSync('comments.json'));

let meta = {};
let data = '';
let log = '';

for (let i = 0; i < comments.length; i++) {
  meta = {
    index: {
      "_index": "vblob",
      "_type": "comments",
      "_id": comments[i].id
    }
  }
  data += JSON.stringify(meta, null, 0)+'\n'+ JSON.stringify(comments[i], null, 0)+'\n';
  // if (i >= 5) break;
}

const config = {
  method: 'post',
  url: 'http://localhost:9200/_bulk',
  headers: {
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
  .then(function (response) {
    for (let i = 0; i < response.data.items.length; i++) {
      let { _id, result, _version } = response.data.items[i].index;
      log += `
        id: ${_id}
        result: ${result}
        version: ${_version}
      `;
    }
  })
  .then(() => {
    fs.writeFileSync("load.log", log);
    console.log('Complete!');
  })
  .catch(function (error) {
    console.log(error);
  });
