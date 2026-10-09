param(
  [int]$Port = 4173
)

$ErrorActionPreference = 'Stop'
$projectDirectory = $PSScriptRoot
$previewUrl = "http://127.0.0.1:$Port/"

Push-Location $projectDirectory
try {
  node build.mjs

  $ready = $false
  try {
    $existingResponse = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2
    $ready = $existingResponse.StatusCode -eq 200 -and $existingResponse.Content.Contains('Aaditya Creatives')
  } catch {
    $ready = $false
  }

  if (-not $ready) {
    $nodePath = (Get-Command node -ErrorAction Stop).Source
    $outputLog = Join-Path $env:TEMP 'aaditya-creatives-preview.log'
    $errorLog = Join-Path $env:TEMP 'aaditya-creatives-preview-error.log'

    Start-Process `
      -FilePath $nodePath `
      -ArgumentList 'server.mjs' `
      -WorkingDirectory $projectDirectory `
      -WindowStyle Hidden `
      -RedirectStandardOutput $outputLog `
      -RedirectStandardError $errorLog | Out-Null
  }

  for ($attempt = 0; $attempt -lt 20; $attempt++) {
    try {
      $response = Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2
      if ($response.StatusCode -eq 200 -and $response.Content.Contains('Aaditya Creatives')) {
        $ready = $true
        break
      }
    } catch {
      Start-Sleep -Milliseconds 250
    }
  }

  if (-not $ready) {
    throw "The preview server did not become available at $previewUrl. Check $errorLog for details."
  }

  Write-Output "Preview ready: $previewUrl"
} finally {
  Pop-Location
}
