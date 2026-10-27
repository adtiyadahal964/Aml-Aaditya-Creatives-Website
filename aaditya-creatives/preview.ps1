param(
  [int]$Port = 4173
)

$ErrorActionPreference = 'Stop'
$projectDirectory = $PSScriptRoot
$previewUrl = "http://127.0.0.1:$Port/"
$hostScript = Join-Path $projectDirectory 'preview-host.ps1'
$taskName = 'Aaditya Creatives Local Preview'

Push-Location $projectDirectory
try {
  node build.mjs

  try {
    $task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
    if (-not $task) {
      $powerShell = (Get-Command powershell.exe).Source
      $arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$hostScript`" -Port $Port"
      $action = New-ScheduledTaskAction -Execute $powerShell -Argument $arguments -WorkingDirectory $projectDirectory
      $trigger = New-ScheduledTaskTrigger -AtLogOn -User "$env:USERDOMAIN\$env:USERNAME"
      $principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited
      $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) -ExecutionTimeLimit ([TimeSpan]::Zero)
      Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Description 'Keeps the Aaditya Creatives local preview available at 127.0.0.1:4173.' | Out-Null
      $task = Get-ScheduledTask -TaskName $taskName
    }
  } catch {
    Write-Warning "Could not register the sign-in task; the background preview will still start for this session."
    $task = $null
  }

  $listener = netstat -ano | Select-String "127\.0\.0\.1:$Port\s+.*LISTENING"
  if (-not $listener) {
    if ($task) {
      Start-ScheduledTask -TaskName $taskName
    } else {
      Start-Process `
        -FilePath 'powershell.exe' `
        -ArgumentList @('-NoProfile','-ExecutionPolicy','Bypass','-WindowStyle','Hidden','-File',"`"$hostScript`"",'-Port',[string]$Port) `
        -WorkingDirectory $projectDirectory `
        -WindowStyle Hidden | Out-Null
    }
  }

  Write-Output "Preview starting: $previewUrl"
  Write-Output "The persistent Windows sign-in task keeps this server available after Codex closes."
} finally {
  Pop-Location
}
