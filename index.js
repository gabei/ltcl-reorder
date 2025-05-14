import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import reorderRouter from './routes/reorder/reorderRouter.js';

const app = express();
const PORT = process.env.LOCAL_PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.static('public'));
app.use('/reorder', reorderRouter);


app.get('/', async (req, res, next) => {
  res.status(200).send('Welcome!');
});


app.listen(PORT, (err)=> {
  if(err){
    console.log(err);
  }
  console.log(`App listening on port ${PORT}`);
})

