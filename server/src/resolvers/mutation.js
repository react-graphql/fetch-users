import { db } from "../../config/db.js";

export const Mutation = {
  createUser: async (_, { name, email, age, isActive }) => {
    const result = await db.run(
      `INSERT INTO users (name, email, age, isActive)
       VALUES (?, ?, ?, ?)`,
      [name, email, age ?? null, isActive ?? 0]
    );

    return {
      id: result.lastID,
      name,
      email,
      age,
      isActive,
    };
  },

  updateUser: async (_, { id, input }) => {
    const user = await db.get(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (!user) throw new Error("User not found");

    const updated = { ...user, ...input };

    await db.run(
      `UPDATE users
       SET name = ?, email = ?, age = ?, isActive = ?
       WHERE id = ?`,
      [
        updated.name,
        updated.email,
        updated.age,
        updated.isActive,
        id,
      ]
    );

    return updated;
  },

  deleteUser: async (_, { id }) => {
    const result = await db.run(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    return result.changes > 0;
  },
};
