const express = require('express');
const app = express();
const path = require('path');

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dramaController = require('./controllers/dramaControllers')

//handling static files from public I hope...
app.use(express.static(path.resolve(__dirname, '../public')));


app.get('/entries',
    dramaController.getAllEntries, 
    (req, res) => {
        console.log("this worked")
        res.status(200).send(res.locals.allEntries)
    }
)
app.post('/', 
    dramaController.createEntry, 
    (req, res) => {
        res.status(200).send(res.locals.entry)
    }
)


app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  app.use((req, res, next) => {
    console.error('Server.js 404');
    return res.sendStatus(404);
  });
  
  /**
   * start server
   */
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });
  
  module.exports = app;