@echo off
setlocal enabledelayedexpansion

echo [96m🚀 Starting WireMock documentation development server...[0m

REM Check if virtual environment exists
if not exist "venv" (
    echo [91m❌ Virtual environment not found. Please run init.bat first.[0m
    exit /b 1
)

REM Activate virtual environment
echo [93m🔋 Activating virtual environment...[0m
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo [91mError: Failed to activate virtual environment[0m
    exit /b 1
)

REM Check if dependencies are installed
pip show mkdocs >nul 2>&1
if errorlevel 1 (
    echo [93m⚠️  Dependencies not found. Installing...[0m
    pip install -r requirements.txt
    if errorlevel 1 (
        echo [91mError: Failed to install dependencies[0m
        exit /b 1
    )
)

REM Start the development server
echo [96m🌐 Starting development server...[0m
echo [92m📖 Documentation will be available at http://127.0.0.1:8000[0m
echo [92m🔄 Files will be watched for changes and automatically reloaded[0m
echo.
echo Press Ctrl+C to stop the server
echo.

mkdocs serve -q --watch-theme

endlocal
