#!/usr/bin/env bash
# WireMock Documentation Site - Development Server

set -euo pipefail

echo "🚀 Starting WireMock documentation development server..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Please run ./init.sh first."
    exit 1
fi

# Activate virtual environment
echo "🔋 Activating virtual environment..."
source venv/bin/activate

# Check if dependencies are installed
if ! pip show mkdocs &> /dev/null; then
    echo "⚠️  Dependencies not found. Installing..."
    pip install -r requirements.txt
fi

# Start the development server
echo "🌐 Starting development server..."
echo "📖 Documentation will be available at http://127.0.0.1:8000"
echo "🔄 Files will be watched for changes and automatically reloaded"
echo ""
echo "Press Ctrl+C to stop the server"

mkdocs serve -q --watch-theme