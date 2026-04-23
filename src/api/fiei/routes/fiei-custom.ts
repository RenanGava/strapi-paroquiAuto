import type {Core} from '@strapi/strapi'


const configRoute:Core.RouterConfig = {
    type: 'content-api',
    routes: [
        {

            method: "POST",
            path: '/fieis/fielSync',
            handler: 'api::fiei.fiei.fielSync',
            config:{
                auth: false
            }
        }
    ]
}


export default configRoute