/**
 * fiei controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::fiei.fiei', ({strapi}) =>({

    async fielSync (ctx) {
        try {
            // console.log(ctx.request.body)
            
            ctx.body = await strapi.service('api::fiei.fiei').createMany(ctx.request.body)
        } catch (error) {
            ctx.body = error
            
        }
    }
    
}));
