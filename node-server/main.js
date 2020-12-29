const axios = require("axios");
const http = require("http");
const serverPort = 3001;
const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
}

//инициализируем axios для запросов к Elasticsearch
const elastic = axios.create({
  baseURL: "http://localhost:9200/vblob/comments/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Реализация API
const requestHandler = async (request, response) => {
  response.writeHead(200, header);
  console.log(request.url);

  if (request.url === "/api/v1/comments/") {
    const result = await getComments();
    response.end(JSON.stringify(result.data.hits.hits));
  } else if (request.url.match("(/api/v1/comment/)([0-9])")) {
    //поиск ID в строке запроса
    const [url, path, id] = request.url.match("(/api/v1/comment/)([0-9]+)");
    if (id) {
      const result = await getComment(id);
      if (result !== undefined) {
        response.end(JSON.stringify(result.data._source));
      } else {
        response.writeHead(404,header);
        response.statusMessage = 'Not found';
        response.end('Not found item by id: '+id);
      }
    } else {
      response.writeHead(500,header);
      response.end("Error ID", id);
    }
  } else {
    response.end("Hello Node.js Server!");
  }
};

// Создаем сервер и слушаем 3001 порт
const server = http.createServer(requestHandler);
server.listen(serverPort, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${serverPort}`);
});

//получаем комментарий по ID
const getComment = async (id) => {
  try {
    return await elastic.get(id.toString());
  } catch (err) {
    // console.log(err);
  }
};

//получаем все комментарии
const getComments = async () => {
  try {
    const data = JSON.stringify({
      size: 5,
      _source: ["id", "postId", "name", "email"],
      // q: '*:*'
    });
    return await elastic.get("_search", { data: data });
  } catch (err) {
    console.error(err);
  }
};

// const search = async (query, args = [])=> {
//   try {
//     const data = JSON.stringify({
//       "_source": true,
//       "query": {
//         "match": {
//           "body": query
//         }
//       }
//     });

//     return await elastic.get('_search', { data: data });
//   } catch (err) {
//     console.error( err );
//   }
// }

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
