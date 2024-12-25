@echo off
echo Starting the server...
java -jar .\libs\demo-0.0.1-SNAPSHOT.jar
if %ERRORLEVEL% NEQ 0 (
    echo Failed to start the server. Please check the path and Java installation.
    pause
    exit /b %ERRORLEVEL%
)
echo Server started successfully.
pause
