#!/usr/bin/env python3
"""
Script to update 2.x docs with MkDocs-style header and add discrete 2x badge
"""

import os
import re
from pathlib import Path

def get_mkdocs_header():
    """Return the MkDocs-style header HTML with 2x badge"""
    return '''<header class="md-header md-header--shadow md-header--lifted" data-md-component="header">
  <nav class="md-header__inner md-grid" aria-label="Header">
    <!-- Link to home -->
    <a
      href="/"
      title="WireMock"
      class="md-header__button md-logo"
      aria-label="WireMock"
      data-md-component="logo"
    >
      <img src="/assets/images/wiremock-oss-logo.png" alt="logo">
    </a>

    <!-- Button to open drawer -->
    <label class="md-header__button md-icon" for="__drawer">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
    </label>

    <!-- Header title with 2x badge -->
    <div class="md-header__title" data-md-component="header-title">
      <div class="md-header__ellipsis">
        <div class="md-header__topic">
          <span class="md-ellipsis"> WireMock </span>
        </div>
        <div class="md-header__topic" data-md-component="header-topic">
          <span class="md-ellipsis">
            2.x Documentation
            <span class="version-badge">2x</span>
          </span>
        </div>
      </div>
    </div>

    <div class="header__links">
      <div class="dropdown">
        <a href="/docs/" class="header__link"> Docs </a>
        <div class="dropdown-content">
          <a href="/docs/"> WireMock </a>

          <a href="/docs/mock-api-templates/">
            Mock API Templates
          </a>

          <a
            href="https://docs.wiremock.io/getting-started/?utm_source=wiremock.org&amp;utm_medium=masthead_doc-links&amp;utm_campaign=2022_baseline"
            target="_blank"
          >
            WireMock Cloud
          </a>

          <a href="/2.x/docs/"> WireMock 2.x (Archive) </a>
        </div>
      </div>

      <div class="dropdown">
        <a href="/docs/support/" class="header__link">
          Need Help?
        </a>
        <div class="dropdown-content">
          <a href="https://slack.wiremock.org/" target="_blank"> Q&amp;A on Slack </a>

          <a href="https://stackoverflow.com/questions/tagged/wiremock" target="_blank">
            StackOverflow
          </a>

          <a href="/docs/commercial/">
            Commercial Options
          </a>
        </div>
      </div>

      <div class="dropdown">
        <a href="https://wiremock.org/participate" class="header__link" target="_blank">
          Participate
        </a>
        <div class="dropdown-content">
          <a href="https://slack.wiremock.org/" target="_blank"> Community Slack </a>

          <a
            href="https://github.com/wiremock/community/blob/main/contributing/README.md"
            target="_blank"
          >
            Contributor Guide
          </a>

          <a href="https://github.com/wiremock/" target="_blank"> Our GitHub </a>

          <a href="https://github.com/wiremock/wiremock.org" target="_blank"> This Website </a>

          <a
            href="https://github.com/wiremock/.github/blob/main/CODE_OF_CONDUCT.md"
            target="_blank"
          >
            Code of Conduct
          </a>
        </div>
      </div>

      <div class="dropdown">
        <a href="/external-resources/" class="header__link">
          Resources
        </a>
        <div class="dropdown-content">
          <a href="https://library.wiremock.org/" target="_blank">
            Mock API Templates Library
          </a>

          <a href="https://github.com/wiremock/ecosystem" target="_blank">
            WireMock Ecosystem
          </a>

          <a href="https://twitter.com/wiremockorg" target="_blank"> Twitter </a>

          <a href="https://fosstodon.org/@wiremock" target="_blank"> Mastodon </a>

          <a href="https://community.wiremock.io/" target="_blank"> Slack Archive </a>

          <a href="/external-resources/">
            External Resources
          </a>
        </div>
      </div>

      <div class="header__link">
        <div class="masthead__cta">
          <a
            href="https://wiremock.io/product?utm_source=wiremock.org&amp;utm_medium=masthead&amp;utm_campaign=homepage_2022_baseline"
            title="WireMock Cloud"
            class="btn t-6"
            target="_blank"
          >
            Try WireMock Cloud
          </a>
        </div>
      </div>
    </div>
  </nav>
</header>'''

def get_mkdocs_css_imports():
    """Return the CSS imports needed for MkDocs styling"""
    return '''
  <!-- MkDocs Material CSS -->
  <link rel="stylesheet" href="/assets/stylesheets/main.e53b48f4.min.css">
  <link rel="stylesheet" href="/assets/stylesheets/palette.06af60db.min.css">
  <link rel="stylesheet" href="/assets/stylesheets/extra.css">
  
  <!-- Custom 2x styling -->
  <style>
    .version-badge {
      background: #1976d2;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7em;
      margin-left: 8px;
      font-weight: 500;
    }
    
    /* Ensure header links work properly */
    .header__links .dropdown {
      position: relative;
      display: inline-block;
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
      display: inline-block;
    }
    
    .header__link:hover {
      color: #1976d2;
    }
    
    .header__links {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    /* Hide mobile hamburger for now */
    .md-header__button.md-icon[for="__drawer"] {
      display: none;
    }
    
    @media (max-width: 768px) {
      .header__links {
        display: none;
      }
      .md-header__button.md-icon[for="__drawer"] {
        display: block;
      }
    }
  </style>'''

def update_html_file(file_path):
    """Update a single HTML file with MkDocs header"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Add MkDocs CSS imports before </head>
        css_imports = get_mkdocs_css_imports()
        content = re.sub(r'</head>', css_imports + '\n</head>', content, flags=re.IGNORECASE)
        
        # Replace the existing header/masthead section
        new_header = get_mkdocs_header()
        
        # Find and replace the masthead section
        masthead_pattern = r'<div class="masthead">.*?</div>\s*</div>\s*</div>'
        if re.search(masthead_pattern, content, re.DOTALL):
            content = re.sub(masthead_pattern, new_header, content, flags=re.DOTALL)
        else:
            # If no masthead found, try to find the body tag and insert after it
            body_pattern = r'(<body[^>]*>)'
            if re.search(body_pattern, content):
                content = re.sub(body_pattern, r'\1\n' + new_header, content)
        
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
    """Main function to update all HTML files in 2.x docs"""
    docs_dir = Path('static_assets/2.x')
    
    if not docs_dir.exists():
        print(f"Directory {docs_dir} not found!")
        return
    
    updated_count = 0
    total_count = 0
    
    # Walk through all HTML files
    for html_file in docs_dir.rglob('*.html'):
        total_count += 1
        if update_html_file(html_file):
            updated_count += 1
    
    print(f"Processed {total_count} HTML files, updated {updated_count} files")

if __name__ == '__main__':
    main()