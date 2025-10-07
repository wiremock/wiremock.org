#!/bin/bash

# Check links in MkDocs documentation
# This script runs the linkcheck plugin to validate all internal and external links

set -e

echo "Running MkDocs link checker..."
echo "================================"
echo ""

# Run mkdocs build with linkcheck plugin
mkdocs build --strict

echo ""
echo "================================"
echo "Link check complete!"
