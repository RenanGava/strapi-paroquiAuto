/**
 * fiei service
 */

import { factories } from "@strapi/strapi";
import pLimit from "p-limit";

export default factories.createCoreService("api::fiei.fiei", ({ strapi }) => ({
  async createMany(data = []) {
    const CHUNK_SIZE = 100;
    const limit = pLimit(10);
    const listResolved = [];

    try {
      for (let i = 0; i <= data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        console.log("Chunk", i);

        await Promise.allSettled([
          limit(() =>
            chunk.map(async (fiel) => {

                const alreadyExistFiel = await strapi.documents("api::fiei.fiei").findFirst({
                  filters:{
                    cpf: {
                      $eq: fiel.cpf
                    }
                  }
                })

                console.log(alreadyExistFiel);
                
                await strapi.documents("api::fiei.fiei").create({
                  data: fiel,
                  status: "published",
                })
            }),
          ),
        ]);
      }

      return listResolved;
    } catch (error) {
      return error;
    }
  },
}));
