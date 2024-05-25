import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRouter from './routes/adminRoutes';
import skillRouter from './routes/skillRoutes';
import recruiterRouter from './routes/recruiterRoutes';
import jobRouter from './routes/jobRoutes';
import jobRequirementsRouter from './routes/jobRequirementsRoutes';
import candidateSkillRouter from './routes/candidateSkillRoutes';
import companyRouter from './routes/companyRoutes';
import candidateRouter from './routes/candidateRoutes';
import applicationRouter from './routes/applicationRoutes';

dotenv.config();

const app: express.Application = express();
const port: string = process.env.PORT || '3001';
const address = `localhost:${port}`;
const route = '/api/v1/';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello world!');
});

app.use(`${route}admins`, adminRouter);

app.use(`${route}skills`, skillRouter);

app.use(`${route}recruiters`, recruiterRouter);

app.use(`${route}companies`, companyRouter);

app.use(`${route}jobs`, jobRouter);

app.use(`${route}jobrequirements`, jobRequirementsRouter);

app.use(`${route}candidateSkills`, candidateSkillRouter);

app.use(`${route}candidates`, candidateRouter);

app.use(`${route}applications`, applicationRouter);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
