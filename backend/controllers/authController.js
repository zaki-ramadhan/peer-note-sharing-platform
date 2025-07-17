import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { db } from "../config/db.js";

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  university: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// JWT secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "joaFAZaYMi";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    console.log("Registration request received:", req.body);

    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, email, university, password } = value;
    console.log("Validated data:", { name, email, university });

    // Test database connection
    try {
      const [testResult] = await db.execute("SELECT 1 as test");
      console.log("Database connection test:", testResult);
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    console.log("Existing users check:", existingUsers);

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed successfully");

    // Generate avatar URL
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=3B82F6&color=fff`;

    // Insert user into database
    console.log("Attempting to insert user...");
    const [result] = await db.execute(
      `INSERT INTO users (name, email, university, password, avatar, points, role, total_uploads, total_downloads, average_rating, badges, bio, year, is_active, email_verified) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        university,
        hashedPassword,
        avatar,
        0, // points
        "user", // role
        0, // total_uploads
        0, // total_downloads
        0.0, // average_rating
        JSON.stringify([]), // badges
        "", // bio
        "", // year
        true, // is_active
        false, // email_verified
      ]
    );

    console.log("Insert result:", result);
    const userId = result.insertId;
    console.log("New user ID:", userId);

    if (!userId) {
      throw new Error("Failed to create user - no insert ID returned");
    }

    // Get the created user (without password)
    const [users] = await db.execute(
      "SELECT id, name, email, university, avatar, points, role, total_uploads, total_downloads, average_rating, badges, bio, year, is_active, email_verified, created_at, updated_at FROM users WHERE id = ?",
      [userId]
    );

    console.log("Retrieved user:", users);

    if (users.length === 0) {
      throw new Error("User was created but could not be retrieved");
    }

    const user = users[0];

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("User created successfully:", user.id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    console.log("Login request received:", req.body);

    // Validate input
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      console.log("Login validation error:", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = value;
    console.log("Login attempt for email:", email);

    // Check if user exists
    const [users] = await db.execute(
      "SELECT id, name, email, university, password, avatar, points, role, total_uploads, total_downloads, average_rating, badges, bio, year, is_active, email_verified, created_at, last_active FROM users WHERE email = ? AND is_active = true",
      [email]
    );

    console.log("Found users:", users.length);

    if (users.length === 0) {
      console.log("No user found with email:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = users[0];
    console.log("User found:", {
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match for user:", email);
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last active
    await db.execute("UPDATE users SET last_active = NOW() WHERE id = ?", [
      user.id,
    ]);

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove password from response
    const { password: _, ...userResponse } = user;

    console.log("Login successful for user:", user.id);

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const [users] = await db.execute(
      "SELECT id, name, email, university, avatar, points, role, total_uploads, total_downloads, average_rating, badges, bio, year, is_active, email_verified, created_at, last_active FROM users WHERE id = ? AND is_active = true",
      [req.user.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = (req, res) => {
  try {
    // In a real app, you might want to blacklist the token
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Middleware to authenticate token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }
    req.user = user;
    next();
  });
};
