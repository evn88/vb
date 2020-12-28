const axios = require('axios');
const http = require('http');
const serverPort = 3001;

const elastic = axios.create({
  baseURL: 'http://localhost:9200/vblob/comments/',
  headers: {
    'Content-Type': 'application/json'
  }
});

const requestHandler = async (request, response) => {
  // Access-Control-Allow-Origin: https://amazing.site
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
  })
  console.log(request.url)
  if (request.url === '/api/v1/') {
    const result = await getComments();

    response.end(JSON.stringify(result.data.hits.hits));
    // console.log(result.data.hits.hits);


  } else {
    response.end('Hello Node.js Server!')
  }
}

const server = http.createServer(requestHandler);
server.listen(serverPort, (err) => {
  if (err) {
      return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${serverPort}`)
})

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
      "_source": ["id", "postId", "name", "email"]
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

// getComments().then(result => {
//   return result.data.hits.hits;
// }).then(e => {
//   e.forEach(element => {
//     console.log(element);
//   });
// });



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