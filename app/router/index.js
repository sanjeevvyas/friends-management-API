import userRouter from './userRoutes/index.js'
import requestRouter from './requestRoutes/index.js';
import friendsRouter from './friendsRoutes/index.js'

const initRoutes = (app) =>{
    app.use('/user',userRouter())
    app.use('/request',requestRouter())
    app.use('/friends',friendsRouter())
}

export default initRoutes;