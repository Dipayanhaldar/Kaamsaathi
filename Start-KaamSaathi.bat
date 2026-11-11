@echo off
setlocal
cd /d "%~dp0"
title KaamSaathi — local app

where py >nul 2>nul
if %errorlevel%==0 (
  py -3 backend\server.py
  goto :end
)

where python >nul 2>nul
if %errorlevel%==0 (
  python backend\server.py
  goto :end
)

echo Python 3 was not found on this computer.
echo Install Python 3 from https://www.python.org/downloads/windows/ and try again.
echo During setup, enable the option to add Python to PATH.
pause

:end
endlocal

