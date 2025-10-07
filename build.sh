#!/bin/bash
# WireMock Documentation Site - Build Only

set -euo pipefail

echo "🏗️  Building WireMock documentation site..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run ./init.sh first."
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

mkdocs --version

# Clean up
rm -rf site/

# Build the site
mkdocs build -c

echo "✅ Build complete! Site built to 'site/' directory"