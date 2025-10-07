#!/usr/bin/env python3
"""
MkDocs hook to copy 2.x static docs to the site directory after build.
"""

import shutil
import os

def on_post_build(config, **kwargs):
    """Copy 2.x docs after the site is built."""
    site_dir = config['site_dir']
    
    copy_directory('static_assets/assets/js', os.path.join(site_dir, 'assets/js'))
    copy_file('static_assets/html/index.html', os.path.join(site_dir, 'index.html'))
    copy_directory('static_assets/svg', os.path.join(site_dir, 'assets/svg'))
    copy_directory('static_assets/images', os.path.join(site_dir, 'images'))

def copy_directory(source_path, target_path):
    if os.path.exists(source_path) and os.path.isdir(source_path):
        if os.path.exists(target_path):
            shutil.rmtree(target_path)
        shutil.copytree(source_path, target_path)
        print(f"Copied directory from {source_path} to {target_path}")
    else:
        print(f"Warning: directory source path {source_path} not found")

def copy_file(source_path, target_path):
    if os.path.exists(source_path) and os.path.isfile(source_path):
        shutil.copy(source_path, target_path)
        print(f"Copied file from {source_path} to {target_path}")
    else:
        print(f"Warning: file source path {source_path} not found")