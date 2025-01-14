#!/bin/bash

# Build Script for Google Sheets Mimic Project

echo "Starting build process..."

# Step 1: Check for required files
if [ ! -f index.html ] || [ ! -f styles.css ] || [ ! -f script.js ]; then
  echo "Error: Missing required files (index.html, styles.css, or script.js)."
  exit 1
fi

# Step 2: Bundle files into a single build folder (if needed)
BUILD_DIR="build"
rm -rf $BUILD_DIR
mkdir $BUILD_DIR
cp index.html styles.css script.js $BUILD_DIR

# Step 3: Minify CSS and JavaScript (optional if minification tools are available)
# Example: Using Terser for JS and CSSNano for CSS
# terser script.js -o $BUILD_DIR/script.min.js
# cssnano styles.css $BUILD_DIR/styles.min.css

# Step 4: Notify build completion
echo "Build process completed successfully."
echo "Build directory: $BUILD_DIR"
