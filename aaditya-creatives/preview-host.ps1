param(
  [int]$Port = 4173
)

$ErrorActionPreference = 'Stop'
$projectDirectory = $PSScriptRoot
$logDirectory = Join-Path $env:LOCALAPPDATA 'AadityaCreativesPreview'
$outputLog = Join-Path $logDirectory 'preview.log'
$errorLog = Join-Path $logDirectory 'preview-error.log'

New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
Set-Location -LiteralPath $projectDirectory

try {
  $env:AADITYA_PREVIEW_PORT = [string]$Port
  node build.mjs *>> $outputLog
  while ($true) {
    node server.mjs *>> $outputLog
    "[$(Get-Date -Format o)] Preview server stopped; restarting in 2 seconds." | Add-Content -LiteralPath $outputLog
    Start-Sleep -Seconds 2
  }
} catch {
  $_ | Out-String | Add-Content -LiteralPath $errorLog
  throw
}
