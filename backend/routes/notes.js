import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { db } from "../config/db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
try {
  await fs.access(uploadsDir);
} catch {
  await fs.mkdir(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF, DOC, DOCX, PPT, PPTX are allowed."
        )
      );
    }
  },
});

// Upload note endpoint
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, subject, description, tags } = req.body;
      const userId = req.user.id;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      // Parse tags if it's a string
      let parsedTags = [];
      try {
        parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags || [];
      } catch (error) {
        parsedTags = [];
      }

      // Insert note into database
      const [result] = await db.execute(
        `INSERT INTO notes (user_id, title, subject, description, file_name, file_path, file_size, tags, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          userId,
          title,
          subject,
          description,
          req.file.originalname,
          req.file.filename,
          req.file.size,
          JSON.stringify(parsedTags),
        ]
      );

      // Award points to user for uploading
      const pointsAwarded = 15;
      await db.execute("UPDATE users SET points = points + ? WHERE id = ?", [
        pointsAwarded,
        userId,
      ]);

      // Get updated user data
      const [userRows] = await db.execute(
        "SELECT id, name, email, points FROM users WHERE id = ?",
        [userId]
      );

      res.status(201).json({
        success: true,
        message: "Note uploaded successfully",
        data: {
          noteId: result.insertId,
          pointsAwarded,
          user: userRows[0],
        },
      });
    } catch (error) {
      console.error("Upload error:", error);

      // Clean up uploaded file if database insertion failed
      if (req.file) {
        try {
          await fs.unlink(path.join(uploadsDir, req.file.filename));
        } catch (unlinkError) {
          console.error("Error deleting uploaded file:", unlinkError);
        }
      }

      res.status(500).json({
        success: false,
        message: "Failed to upload note",
        error: error.message,
      });
    }
  }
);

// Get all notes
router.get("/", async (req, res) => {
  try {
    const [notes] = await db.execute(`
      SELECT n.*, u.name as author_name, u.email as author_email
      FROM notes n
      JOIN users u ON n.user_id = u.id
      ORDER BY n.created_at DESC
    `);

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Get notes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
});

// Get user's notes
router.get("/my-notes", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [notes] = await db.execute(
      `
      SELECT * FROM notes 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
      [userId]
    );

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Get user notes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user notes",
      error: error.message,
    });
  }
});

export default router;
