/**
 * fiei service
 */

import { factories } from "@strapi/strapi";
import pLimit from "p-limit";

export default factories.createCoreService("api::fiei.fiei", ({ strapi }) => ({
  async createMany(data = []) {
    const CHUNK_SIZE = 2;
    const limit = pLimit(1);
    const listResolved = [];

    try {
      for (let i = 0; i <= data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        console.log("Chunk", i);

        await Promise.allSettled([
          limit(() =>
            chunk.map(async (fiel) => {
                
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
