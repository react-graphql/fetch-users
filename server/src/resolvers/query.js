import { db } from "../../config/db.js";

export const Query = {
  getUsers: async () => {
    return await db.all("SELECT * FROM users");
  },

  getUserById: async (_, { id }) => {
    return await db.get(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
  },
};
