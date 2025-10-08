@echo off
setlocal enabledelayedexpansion

echo Initializing Python virtual environment for WireMock.org development...

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo  ---^> Creating virtual environment
    python -m venv venv
    if errorlevel 1 (
        echo Error: Failed to create virtual environment
        echo Please ensure Python 3 is installed and available in PATH
        exit /b 1
    )
) else (
    echo  ---^> Virtual environment already exists
)

REM Activate virtual environment
echo  ---^> Activating virtual environment
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo Error: Failed to activate virtual environment
    exit /b 1
)

REM Upgrade pip
echo  ---^> Upgrading pip
python -m pip install --upgrade pip -q
if errorlevel 1 (
    echo Warning: Failed to upgrade pip
)

REM Install dependencies
echo  ---^> Installing dependencies from requirements.txt
pip install -r requirements.txt -q
if errorlevel 1 (
    echo Error: Failed to install dependencies
    exit /b 1
)

echo.
echo [32m✓ Initialization complete. Virtual environment is ready.[0m
echo.
echo To activate the virtual environment manually, run:
echo   venv\Scripts\activate.bat
echo.
echo To start the development server, run:
echo   serve.bat
echo.

endlocal
