import express from "express";
import Joi from "joi";
const router = express.Router();

// Temporary in-memory storage (replace with database)
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff",
    points: 245,
    role: "user",
    bio: "Computer Science student passionate about web development",
    university: "Tech University",
    year: "Senior",
    totalUploads: 12,
    totalDownloads: 89,
    averageRating: 4.7,
    badges: ["Top Contributor", "JavaScript Expert"],
    createdAt: new Date("2024-01-01").toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Jane+Smith&background=9333EA&color=fff",
    points: 189,
    role: "user",
    bio: "Mathematics major with interest in data science",
    university: "Science Institute",
    year: "Junior",
    totalUploads: 8,
    totalDownloads: 56,
    averageRating: 4.5,
    badges: ["Math Genius", "Rising Star"],
    createdAt: new Date("2024-02-15").toISOString(),
    lastActive: new Date().toISOString(),
  },
];

// Validation schemas
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  bio: Joi.string().max(200),
  university: Joi.string().max(100),
  year: Joi.string().valid(
    "Freshman",
    "Sophomore",
    "Junior",
    "Senior",
    "Graduate"
  ),
});

// @route   GET /api/users
// @desc    Get all users with pagination and sorting
// @access  Public
router.get("/", (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = "points",
      order = "desc",
    } = req.query;

    let sortedUsers = [...users];

    // Sorting
    sortedUsers.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "createdAt" || sortBy === "lastActive") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (order === "desc") {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    // Remove sensitive information
    const publicUsers = paginatedUsers.map((user) => {
      const { password, email, ...publicUser } = user;
      return publicUser;
    });

    res.json({
      success: true,
      data: {
        users: publicUsers,
        totalCount: users.length,
        totalPages: Math.ceil(users.length / limit),
        currentPage: parseInt(page),
        hasNext: endIndex < users.length,
        hasPrev: startIndex > 0,
      },
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/users/leaderboard
// @desc    Get top users for leaderboard
// @access  Public
router.get("/leaderboard", (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Sort users by points in descending order
    const topUsers = [...users]
      .sort((a, b) => b.points - a.points)
      .slice(0, limit)
      .map((user, index) => {
        const { password, email, ...publicUser } = user;
        return {
          ...publicUser,
          rank: index + 1,
        };
      });

    res.json({
      success: true,
      data: { users: topUsers },
    });
  } catch (error) {
    console.error("Get leaderboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Public
router.get("/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove sensitive information
    const { password, email, ...publicUser } = user;

    res.json({
      success: true,
      data: { user: publicUser },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private (own profile only)
router.put("/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // In real app, check if user is authenticated and updating own profile
    // if (req.user.userId !== userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Not authorized to update this profile'
    //   });
    // }

    // Validate input
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...value,
      lastActive: new Date().toISOString(),
    };

    // Remove sensitive information
    const { password, ...updatedUser } = users[userIndex];

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { user: updatedUser },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   POST /api/users/:id/points
// @desc    Award points to user
// @access  Private (admin only or system)
router.post("/:id/points", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { points, reason } = req.body;

    if (!points || typeof points !== "number") {
      return res.status(400).json({
        success: false,
        message: "Valid points amount required",
      });
    }

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Award points
    users[userIndex].points += points;
    users[userIndex].lastActive = new Date().toISOString();

    res.json({
      success: true,
      message: `${points} points awarded${reason ? ` for ${reason}` : ""}`,
      data: {
        totalPoints: users[userIndex].points,
        pointsAwarded: points,
      },
    });
  } catch (error) {
    console.error("Award points error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   GET /api/users/:id/statistics
// @desc    Get user statistics
// @access  Public
router.get("/:id/statistics", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Calculate additional statistics
    const stats = {
      totalPoints: user.points,
      totalUploads: user.totalUploads || 0,
      totalDownloads: user.totalDownloads || 0,
      averageRating: user.averageRating || 0,
      badges: user.badges || [],
      memberSince: user.createdAt,
      lastActive: user.lastActive,
      rank: users.filter((u) => u.points > user.points).length + 1,
      // Calculate additional metrics
      pointsPerUpload:
        user.totalUploads > 0 ? Math.round(user.points / user.totalUploads) : 0,
      downloadToUploadRatio:
        user.totalUploads > 0
          ? Math.round((user.totalDownloads / user.totalUploads) * 100) / 100
          : 0,
    };

    res.json({
      success: true,
      data: { statistics: stats },
    });
  } catch (error) {
    console.error("Get user statistics error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// @route   POST /api/users/:id/follow
// @desc    Follow/unfollow user
// @access  Private
router.post("/:id/follow", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const followerId = 1; // Replace with authenticated user ID

    if (userId === followerId) {
      return res.status(400).json({
        success: false,
        message: "Cannot follow yourself",
      });
    }

    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // In real app, manage followers/following relationships
    // This is just a simple response
    res.json({
      success: true,
      message: "User followed successfully",
      data: {
        isFollowing: true,
      },
    });
  } catch (error) {
    console.error("Follow user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
