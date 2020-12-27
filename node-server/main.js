const axios = require('axios');
const http = require('http');
const elastic = axios.create({
  baseURL: 'http://localhost:9200/vblob/comments/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// const server = http.createServer(requestListener);

const getComment = async (id)=> {
  try {
    return await elastic.get(id.toString());
  } catch (err) {
    console.log(err);
  }
}

const getComments = async ()=> {
  try {
    const data = JSON.stringify({
      "size": 5,
      // "_source": ["name", "email"]
      // q: '*:*'
    });
    return await elastic.get('_search', { data: data });
  } catch (err) {
    console.error(err);
  }
}

const search = async (query, args = [])=> {
  try {
    const data = JSON.stringify({
      "_source": true,
      "query": {
        "match": {
          "body": query
        }
      }
    });

    return await elastic.get('_search', { data: data });
  } catch (err) {
    console.error( err );
  }
}


// search('quam').then(result => {
//   return result.data.hits.hits;
// }).then(e => {
//   console.log(e);
//   // e.forEach(element => {
//   //   console.log(element);
//   // });
// });

// getComment(2).then(result => {
//   console.log(result.data._source);
// });

getComments().then(result => {
  return result.data.hits.hits;
}).then(e => {
  e.forEach(element => {
    console.log(element);
  });
});



// {
//   "from" : 0,
//   "size" : 2,
//   "_source": true,
//   "query": {
//     "bool": {
//         "must": [{
//             "prefix": { "body": "com" }
//         },{
//             "prefix": { "body": "to" }
//         }]
//     }
//   }
// }