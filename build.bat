@echo off
setlocal enabledelayedexpansion

echo [96m🏗️  Building WireMock documentation site...[0m

REM Check if virtual environment exists
if not exist "venv" (
    echo [91m❌ Virtual environment not found. Please run init.bat first.[0m
    exit /b 1
)

REM Activate virtual environment
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo [91mError: Failed to activate virtual environment[0m
    exit /b 1
)

mkdocs --version

REM Clean up
if exist "site\" (
    echo Cleaning up old build...
    rmdir /s /q site
)

REM Build the site
mkdocs build -c
if errorlevel 1 (
    echo [91mError: Build failed[0m
    exit /b 1
)

echo.
echo [32m✅ Build complete! Site built to 'site\' directory[0m

endlocal
