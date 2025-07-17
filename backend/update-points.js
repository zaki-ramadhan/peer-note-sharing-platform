import { db } from "./config/db.js";

async function updateUserPoints() {
  try {
    // Update user Riley Edwards (id: 7) dengan beberapa poin
    await db.execute(
      "UPDATE users SET points = ?, total_uploads = ?, total_downloads = ? WHERE id = ?",
      [1250, 5, 12, 7]
    );

    console.log("User points updated successfully!");

    // Tampilkan hasil update
    const [users] = await db.execute(
      "SELECT id, name, email, points, total_uploads, total_downloads FROM users"
    );

    console.log("Current users with points:");
    users.forEach((user) => {
      console.log(
        `- ${user.name}: ${user.points} points (${user.total_uploads} uploads, ${user.total_downloads} downloads)`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("Error updating user points:", error);
    process.exit(1);
  }
}

updateUserPoints();
