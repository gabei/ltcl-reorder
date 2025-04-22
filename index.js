import express from 'express';
import cors from 'cors';
import helmet from 'helmet';


const port = 3000;
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.static('public'));


app.get('/', async (req, res, next) => {
  res.status(200).send('Welcome!');
});


app.listen(port, (err)=> {
  if(err){
    console.log(err);
  }
  console.log(`App listening on port ${port}`);
})