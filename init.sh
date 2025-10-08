#!/usr/bin/env bash

set -e

echo "Initializing Python virtual environment for WireMock.org development..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo " ---> Creating virtual environment"
    python3 -m venv venv
else
    echo " ---> Virtual environment already exists"
fi

# Activate virtual environment
echo " ---> Activating virtual environment"
source venv/bin/activate

# Upgrade pip
echo " ---> Upgrading pip"
pip install --upgrade pip -q

# Install dependencies
echo " ---> Installing dependencies from requirements.txt"
pip install -r requirements.txt -q

echo "✓ Initialization complete. Virtual environment is ready."
echo ""
echo "To activate the virtual environment manually, run:"
echo "  source venv/bin/activate"
echo ""
echo "To start the development server, run:"
echo "  ./serve.sh"
