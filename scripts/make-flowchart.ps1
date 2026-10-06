Add-Type -AssemblyName System.Drawing
$width = 1800
$height = 1300
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear([System.Drawing.Color]::FromArgb(247, 246, 240))

$ink = [System.Drawing.Color]::FromArgb(35, 49, 43)
$green = [System.Drawing.Color]::FromArgb(40, 83, 64)
$blue = [System.Drawing.Color]::FromArgb(49, 93, 123)
$gold = [System.Drawing.Color]::FromArgb(183, 125, 55)
$muted = [System.Drawing.Color]::FromArgb(96, 108, 101)
$fontTitle = New-Object System.Drawing.Font('Georgia', 36, [System.Drawing.FontStyle]::Bold)
$font = New-Object System.Drawing.Font('Arial', 19, [System.Drawing.FontStyle]::Regular)
$fontSmall = New-Object System.Drawing.Font('Arial', 16, [System.Drawing.FontStyle]::Regular)
$fontLabel = New-Object System.Drawing.Font('Arial', 16, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush($ink)
$textBrush = New-Object System.Drawing.SolidBrush($ink)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(124, 139, 129), 4)
$linePen.EndCap = [System.Drawing.Drawing2D.LineCap]::ArrowAnchor

$graphics.DrawString('ZeeTeach | Program Flowchart', $fontTitle, $titleBrush, 70, 45)
$graphics.DrawString('Student journey through the learning site', $fontSmall, (New-Object System.Drawing.SolidBrush($muted)), 74, 100)

function Box([int]$x,[int]$y,[int]$w,[int]$h,[string]$label,[System.Drawing.Color]$color,[int]$fontSize=19) {
    $rect = New-Object System.Drawing.Rectangle($x,$y,$w,$h)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $radius=22
    $path.AddArc($x,$y,$radius,$radius,180,90); $path.AddArc($x+$w-$radius,$y,$radius,$radius,270,90)
    $path.AddArc($x+$w-$radius,$y+$h-$radius,$radius,$radius,0,90); $path.AddArc($x,$y+$h-$radius,$radius,$radius,90,90); $path.CloseFigure()
    $fill=New-Object System.Drawing.SolidBrush($color); $graphics.FillPath($fill,$path)
    $f=New-Object System.Drawing.Font('Arial',$fontSize,[System.Drawing.FontStyle]::Bold)
    $sf=New-Object System.Drawing.StringFormat; $sf.Alignment=[System.Drawing.StringAlignment]::Center; $sf.LineAlignment=[System.Drawing.StringAlignment]::Center
    $graphics.DrawString($label,$f,$whiteBrush,[System.Drawing.RectangleF]::new(($x+10),($y+6),($w-20),($h-12)),$sf)
}
function Arrow([int]$x1,[int]$y1,[int]$x2,[int]$y2) { $graphics.DrawLine($linePen,$x1,$y1,$x2,$y2) }
function Label([int]$x,[int]$y,[string]$text) { $graphics.DrawString($text,$fontSmall,(New-Object System.Drawing.SolidBrush($muted)),$x,$y) }

Box 650 155 500 85 'Open ZeeTeach' $green 24
Box 650 300 500 85 'Choose Class XI or Class XII' $green 21
Arrow 900 240 900 295
Box 60 445 420 105 'Class XI / Plus One: Coming soon' $muted 19
Arrow 775 385 450 440
Label 560 404 'Class XI'
Box 650 445 500 85 'Select grade and syllabus' $green 21
Arrow 900 385 900 440
Box 650 590 500 85 'Is this curriculum available?' $gold 20
Arrow 900 530 900 585
Box 60 750 420 105 'Show coming later options' $muted 19
Box 690 750 420 105 'Choose Commerce or Humanities' $blue 19
Arrow 780 675 370 744
Arrow 1020 675 900 744
Label 320 690 'No'
Label 1020 690 'Yes'
Box 680 925 440 82 'Open Economics' $blue 22
Arrow 900 855 900 920
Box 680 1060 440 82 'Chapter 1 lesson page' $green 22
Arrow 900 1007 900 1055

# Learning activity branches
Box 60 1060 390 82 'Presentation' $blue 20
Box 500 1060 390 82 'Study guide' $blue 20
Box 940 1060 390 82 'Chapter quiz' $blue 20
# Branch connectors from lesson
Arrow 770 1142 255 1210
Arrow 900 1142 695 1210
Arrow 1030 1142 1135 1210
Box 60 1215 390 65 'Navigate slides; share / print / save' $gold 16
Box 500 1215 390 65 'Read chapter notes and explanations' $gold 16
Box 940 1215 390 65 'Review missed questions' $gold 16

$graphics.DrawString('Server: routes pages, assets, downloads and JSON endpoints', $fontLabel, (New-Object System.Drawing.SolidBrush($muted)), 70, 1280)
$bitmap.Save((Join-Path (Get-Location) 'docs\flowchart.jpg'), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$graphics.Dispose(); $bitmap.Dispose()
