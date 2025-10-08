#!/usr/bin/env python3
"""
MkDocs hook to copy 2.x static docs to the site directory after build.
"""

import shutil
import os


def on_post_build(config, **kwargs):
    """Copy 2.x docs after the site is built."""
    source_path = 'static_assets/2.x'
    site_dir = config['site_dir']
    target_path = os.path.join(site_dir, '2.x')
    
    if os.path.exists(source_path) and os.path.isdir(source_path):
        # Remove existing target if it exists
        if os.path.exists(target_path):
            shutil.rmtree(target_path)
        
        # Copy the 2.x directory to the site
        shutil.copytree(source_path, target_path)
        print(f"Copied 2.x docs from {source_path} to {target_path}")
    else:
        print(f"Warning: 2.x docs source path {source_path} not found")