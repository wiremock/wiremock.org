#!/usr/bin/env python3
"""
Script to fix all absolute URLs in 2.x docs to be relative to the current site
"""

import os
import re

def fix_links_in_file(file_path):
    """Fix absolute URLs in a single HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Replace absolute URLs with relative ones
    # Main documentation links
    content = re.sub(r'https://wiremock\.org/docs/([^"\']*)', r'/2.x/docs/\1', content)
    
    # Replace root wiremock.org links that should go to the main site
    content = re.sub(r'href="https://wiremock\.org/"', r'href="/"', content)
    content = re.sub(r'href="https://wiremock\.org"', r'href="/"', content)
    
    # Fix asset links (images, css, js) to be relative within 2.x
    content = re.sub(r'https://wiremock\.org/images/', r'/2.x/images/', content)
    content = re.sub(r'https://wiremock\.org/assets/', r'/2.x/assets/', content)
    
    # Fix src attributes for images and scripts
    content = re.sub(r'src="https://wiremock\.org/images/', r'src="/2.x/images/', content)
    content = re.sub(r'src="https://wiremock\.org/assets/', r'src="/2.x/assets/', content)
    
    # Fix relative links that should stay within 2.x docs
    content = re.sub(r'href="\./', r'href="/2.x/docs/', content)
    content = re.sub(r'href="\.\./', r'href="/2.x/', content)
    
    # Only write if content changed
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {file_path}")
        return True
    return False

def main():
    """Main function to process all HTML files in 2.x docs"""
    docs_dir = 'static_assets/2.x'
    
    if not os.path.exists(docs_dir):
        print(f"Directory {docs_dir} not found!")
        return
    
    updated_count = 0
    total_count = 0
    
    # Walk through all HTML files
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                total_count += 1
                if fix_links_in_file(file_path):
                    updated_count += 1
    
    print(f"Processed {total_count} HTML files, updated {updated_count} files")

if __name__ == '__main__':
    main()