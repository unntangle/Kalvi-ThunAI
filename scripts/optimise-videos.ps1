# Re-encode the concept videos in public/videos for the web.
#
# Run from anywhere:  powershell -ExecutionPolicy Bypass -File scripts\optimise-videos.ps1
#
# Two things happen to each file:
#
#   CRF 23        Constant quality rather than constant bitrate. For animated
#                 explainers this is visually indistinguishable from the source
#                 while being far smaller, because flat colour and hard edges
#                 compress extremely well.
#
#   +faststart    Moves the file index from the end to the front. Without it a
#                 browser must download the whole file before the first frame
#                 appears, which on a 67 MB file is several seconds of black
#                 screen. This is the part that actually matters for a demo.
#
# Originals are kept alongside as .original.mp4 until you delete them, so a bad
# encode never costs you the source.

$ErrorActionPreference = "Stop"

$videoDir = Join-Path $PSScriptRoot "..\public\videos"
$videoDir = (Resolve-Path $videoDir).Path

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "ffmpeg not found on PATH." -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $videoDir -Filter *.mp4 |
         Where-Object { $_.Name -notlike "*.original.mp4" }

if ($files.Count -eq 0) {
    Write-Host "No .mp4 files in $videoDir" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Optimising $($files.Count) file(s) in $videoDir"
Write-Host ""

$totalBefore = 0
$totalAfter  = 0

foreach ($file in $files) {
    $before = $file.Length
    $totalBefore += $before

    $temp     = Join-Path $videoDir ("_tmp_" + $file.Name)
    $original = Join-Path $videoDir ($file.BaseName + ".original.mp4")

    Write-Host ("  {0}" -f $file.Name) -ForegroundColor Cyan
    Write-Host ("    before  {0,8:N1} MB" -f ($before / 1MB))

    # -pix_fmt yuv420p is not optional. Some renderers output 4:4:4, which Safari
    # and most mobile browsers refuse to decode, giving audio with a black frame.
    & ffmpeg -v error -y -i $file.FullName `
        -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p `
        -movflags +faststart `
        -c:a aac -b:a 128k `
        $temp

    if ($LASTEXITCODE -ne 0) {
        Write-Host "    failed, leaving the original in place" -ForegroundColor Red
        if (Test-Path $temp) { Remove-Item $temp -Force }
        $totalAfter += $before
        continue
    }

    $after = (Get-Item $temp).Length

    # A re-encode that grew the file is not worth keeping.
    if ($after -ge $before) {
        Write-Host ("    after   {0,8:N1} MB  - no saving, keeping original" -f ($after / 1MB)) -ForegroundColor Yellow
        Remove-Item $temp -Force
        $totalAfter += $before
        continue
    }

    Move-Item $file.FullName $original -Force
    Move-Item $temp $file.FullName -Force

    $totalAfter += $after
    $saved = 100 - ($after / $before * 100)
    Write-Host ("    after   {0,8:N1} MB   ({1:N0}% smaller)" -f ($after / 1MB), $saved) -ForegroundColor Green
}

Write-Host ""
Write-Host ("  Total  {0:N1} MB  ->  {1:N1} MB" -f ($totalBefore / 1MB), ($totalAfter / 1MB))
Write-Host ""
Write-Host "  Originals kept as *.original.mp4. Check playback in the app, then:"
Write-Host "    Remove-Item '$videoDir\*.original.mp4'"
Write-Host ""
