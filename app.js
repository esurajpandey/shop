import fastify from "fastify";
import Autoload from '@fastify/autoload';
import path,{dirname} from 'path';
import cors from '@fastify/cors';
import requestContext from '@fastify/request-context';
import multer from 'fastify-multer';
import dotenv from 'dotenv';

dotenv.config();

const appContext = {
    userId: null,
    name: null,
    email: null,
    shopId: null
}
const __dirname = new URL('.', import.meta.url).pathname;
class App{
    constructor(opts){
        this.fastifyInstance = fastify(opts);
        this.context = appContext;
        this.initializeErrorHandler();
        this.initializePreHandlers();
        this.initializeRoutes();
    }

    async initializeErrorHandler() {
        this.fastifyInstance.setErrorHandler((error,request, reply) => {
            console.error({ error: error.stack || error });
            reply.status(error?.code).send(errorResponse(error));
        })
    }

    initializeRoutes() {
        const apiDirectory = path.join(__dirname, '/api')
        console.log(apiDirectory);
        this.fastifyInstance.register(Autoload,{
            dir : apiDirectory,
            options : {prefix : "/api"},
        })
    }

    initializePreHandlers() {
		this.fastifyInstance.register(cors, {
			origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://app.quickrecruit.com'],
			methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTION'],
			credentials: true,
			allowedHeaders: ['Content-Type', 'Authorization', 'Referer'],
			exposedHeaders: '*',
        });

        this.fastifyInstance.register(requestContext, {
            defaultStoreValues: this.context,
        });

        this.fastifyInstance.register(multer.contentParser);
    }

    listen(opts,callback){
        this.fastifyInstance.listen(opts,callback);
    }
    
}

export default App;