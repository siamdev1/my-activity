# 🌐 WordPress & WooCommerce Custom Engineering

A collection of enterprise-grade custom plugins, REST API extensions, and high-performance theme snippets developed for WordPress & WooCommerce ecosystems.

## Directory Structure
```
wordpress-dev/
├── plugins/
│   └── siam-custom-toolkit/
│       ├── siam-custom-toolkit.php   # Main plugin bootstrap file
│       ├── inc/
│       │   ├── custom-post-types.php  # Custom post types & taxonomies registration
│       │   ├── rest-api-endpoints.php # Custom /wp-json/siam/v1/ REST routes
│       │   └── woocommerce-tweaks.php # WooCommerce checkout & price filters
│       └── readme.txt
├── theme-snippets/
│   └── functions-snippets.php         # Performance, security & header cleanup snippets
└── README.md
```

## Features
- **Object-Oriented Architecture:** Clean PSR-compliant PHP 8.1+ codebase.
- **REST API Extensions:** Custom endpoints with authorization checks and sanitization.
- **WooCommerce Optimizations:** Checkout field customization, dynamic discount calculations, and AJAX cart performance.
- **Security & Performance:** XML-RPC disabled, query transients caching, WP head bloat removal.
