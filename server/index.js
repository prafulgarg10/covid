const app = require('express')();
const fs = require('fs');
const path = require('path');

app.use(require('express').static(path.resolve(__dirname, '../client')));

// app.get('/*', (req, res) => {
//   try {
//     fs.readFile(
//       path.resolve(__dirname, '../client/index.html'),
//       'utf8',
//       (err, data) => {
//         if (!err) res.send(data);
//         else {
//           console.log(err);
//           res.json(err);
//         }
//       }
//     );
//   } catch (e) {
//     console.log(e);
//     res.json(e);
//   }
// });

app.listen(4000, () =>
  console.log('Server is running at http://localhost:4000')
);
