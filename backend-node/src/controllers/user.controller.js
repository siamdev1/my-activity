const getProfile = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        bio: "Full Stack Engineer specializing in Node.js, React, Python, and WordPress systems.",
        github: "https://github.com/siamdev1",
        skills: ["Node.js", "Express", "React", "Python", "FastAPI", "WordPress", "WooCommerce", "PostgreSQL", "Docker"],
        stats: {
          totalCommits: 2540,
          repositoriesCount: 24,
          pullRequests: 86,
          issuesResolved: 112
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

const getActivitySummary = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        totalCommits: 2540,
        recentActivity: [
          { date: "2026-09-20", action: "feature", title: "Rate limiting middleware implementation", repo: "my-activity" },
          { date: "2026-09-19", action: "optimization", title: "ETL pipeline batch performance boost", repo: "data-worker" },
          { date: "2026-09-18", action: "plugin", title: "WooCommerce custom hook filters update", repo: "siam-toolkit" },
          { date: "2026-09-17", action: "ui", title: "Glassmorphism UI cards for dashboard", repo: "frontend-portal" }
        ],
        stackBreakdown: {
          JavaScript: 40,
          Python: 30,
          PHP: 20,
          Other: 10
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfile,
  getActivitySummary,
};
