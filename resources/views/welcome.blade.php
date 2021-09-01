
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>  
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Marco Ghibaudi</title>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body style = " background-color:#fffcfc">
<div class="container" style = "max-width: 1720px;">
<h2 style="width: 100%; margin: 3rem 0; text-align:center"> Laravel and React application </h2>
        <div id="root"></div>

    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</div>
</body>
</html>