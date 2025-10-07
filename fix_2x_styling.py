#!/usr/bin/env python3
"""
Script to fix alignment and footer issues in 2x docs
"""

import os
import re
from pathlib import Path

def get_improved_css():
    """Return improved CSS for 2x docs"""
    return '''
  <!-- MkDocs Material CSS -->
  <link rel="stylesheet" href="/assets/stylesheets/main.e53b48f4.min.css">
  <link rel="stylesheet" href="/assets/stylesheets/palette.06af60db.min.css">
  <link rel="stylesheet" href="/assets/stylesheets/extra.css">
  
  <!-- Custom 2x styling -->
  <style>
    /* 2x Badge styling */
    .version-badge {
      background: #1976d2;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7em;
      margin-left: 8px;
      font-weight: 500;
    }
    
    /* Header layout fixes */
    .md-header__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 1rem;
      height: 64px;
    }
    
    .md-header__title {
      flex: 1;
      margin-right: 16px;
    }
    
    .header__links {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-left: auto;
      height: 100%;
    }
    
    .header__links .dropdown {
      position: relative;
      display: inline-block;
      height: 100%;
      display: flex;
      align-items: center;
    }
    
    .header__links .dropdown-content {
      display: none;
      position: absolute;
      background-color: white;
      min-width: 200px;
      box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
      z-index: 1000;
      border-radius: 4px;
      padding: 8px 0;
      top: 100%;
      left: 0;
    }
    
    .header__links .dropdown:hover .dropdown-content {
      display: block;
    }
    
    .header__links .dropdown-content a {
      color: #333;
      padding: 8px 16px;
      text-decoration: none;
      display: block;
      border-bottom: 1px solid #eee;
    }
    
    .header__links .dropdown-content a:hover {
      background-color: #f1f1f1;
    }
    
    .header__links .dropdown-content a:last-child {
      border-bottom: none;
    }
    
    .header__link {
      color: #333;
      text-decoration: none;
      padding: 8px 16px;
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
      height: 100%;
    }
    
    .header__link:hover {
      color: #1976d2;
    }
    
    /* Button alignment fix - ensure proper vertical alignment */
    .masthead__cta {
      display: flex;
      align-items: center;
      height: 100%;
    }
    
    .btn.t-6 {
      background: #1976d2;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-size: 14px;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: auto;
      line-height: 1.2;
    }
    
    .btn.t-6:hover {
      background: #1565c0;
      color: white;
    }
    
    /* Fix the floating "free forever" text - move it inside header */
    .wiremock-cloud-logo-note {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: #666;
      background: rgba(255, 255, 255, 0.9);
      padding: 4px 8px;
      border-radius: 4px;
      z-index: 100;
      white-space: nowrap;
      margin-top: 2px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    /* Make sure header has relative positioning for absolute child */
    .md-header {
      position: relative;
    }
    
    /* Alternative: hide the floating text if it's problematic */
    @media (max-width: 1024px) {
      .wiremock-cloud-logo-note {
        display: none;
      }
    }
    
    /* Hide mobile hamburger for now */
    .md-header__button.md-icon[for="__drawer"] {
      display: none;
    }
    
    /* REMOVE ORIGINAL FOOTER AND PAGE ACTION BUTTONS */
    .page__footer {
      display: none !important;
    }
    
    .page__meta-title {
      display: none !important;
    }
    
    /* SIMPLE NEW FOOTER - JavaScript positioned at content bottom */
    .simple-footer {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      background: #333;
      color: white;
      padding: 12px 0;
      text-align: center;
      font-size: 14px;
      z-index: 1000;
      margin-top: 2rem;
    }
    
    .simple-footer a {
      color: #87ceeb;
      text-decoration: none;
    }
    
    .simple-footer a:hover {
      text-decoration: underline;
    }
    
    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .header__links {
        gap: 8px;
      }
      
      .header__link {
        padding: 6px 12px;
        font-size: 14px;
      }
      
      .btn.t-6 {
        padding: 8px 16px;
        font-size: 13px;
      }
    }
    
    @media (max-width: 768px) {
      .header__links {
        display: none;
      }
      
      .md-header__button.md-icon[for="__drawer"] {
        display: block;
      }
      
      .md-header__title {
        flex: 1;
        margin: 0 1rem;
      }
    }
  </style>'''

def fix_html_file(file_path):
    """Fix styling issues in a single HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace the CSS section with improved version
        improved_css = get_improved_css()
        
        # Find the existing CSS section and replace it
        css_pattern = r'<!-- MkDocs Material CSS -->.*?</style>'
        if re.search(css_pattern, content, re.DOTALL):
            content = re.sub(css_pattern, improved_css, content, flags=re.DOTALL)
        else:
            # If pattern not found, try alternative approach
            head_close_pattern = r'</head>'
            if re.search(head_close_pattern, content):
                content = re.sub(head_close_pattern, improved_css + '\n</head>', content)
        
        # Remove any existing footer divs
        existing_footer_pattern = r'<!-- Simple Footer HTML -->\s*<div class="simple-footer">.*?</div>'
        content = re.sub(existing_footer_pattern, '', content, flags=re.DOTALL)
        
        # Add footer at the end of body
        footer_html = '''
  <!-- Simple Footer HTML -->
  <div class="simple-footer">
    © 2025 WireMock Inc. | <a href="https://wiremock.org">WireMock</a> | <a href="https://github.com/wiremock/wiremock">GitHub</a>
  </div>
  
  <script>
  // Position footer at actual bottom of page content
  function positionFooter() {
    const footer = document.querySelector('.simple-footer');
    if (!footer) return;
    
    const body = document.body;
    const html = document.documentElement;
    
    // Get the actual height of all content
    const contentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    
    // Position footer at the bottom of all content
    footer.style.top = (contentHeight - footer.offsetHeight) + 'px';
  }
  
  // Position footer when page loads and on resize
  document.addEventListener('DOMContentLoaded', positionFooter);
  window.addEventListener('resize', positionFooter);
  window.addEventListener('load', positionFooter);
  </script>'''
        
        body_close_pattern = r'</body>'
        if re.search(body_close_pattern, content):
            content = re.sub(body_close_pattern, footer_html + '\n</body>', content)
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
            return True
        else:
            print(f"No changes needed: {file_path}")
            return False
            
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    """Main function to fix styling in all HTML files in 2.x docs"""
    docs_dir = Path('static_assets/2.x')
    
    if not docs_dir.exists():
        print(f"Directory {docs_dir} not found!")
        return
    
    updated_count = 0
    total_count = 0
    
    # Walk through all HTML files
    for html_file in docs_dir.rglob('*.html'):
        total_count += 1
        if fix_html_file(html_file):
            updated_count += 1
    
    print(f"Processed {total_count} HTML files, updated {updated_count} files")

if __name__ == '__main__':
    main()