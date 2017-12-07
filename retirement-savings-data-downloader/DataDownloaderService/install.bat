cd C:\Work\private\retirement-savings\retirement-savings-data-downloader\DataDownloaderService\bin\Debug
C:\Windows\Microsoft.NET\Framework\v4.0.30319\installutil.exe DataDownloaderService.exe
pause
if ERRORLEVEL 1 goto error
exit
:error
echo There was a problem
pause