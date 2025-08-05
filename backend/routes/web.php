<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/image/{filename}', function ($filename) {
    $path = storage_path('app/public/images/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file, 200)
        ->header('Content-Type', $type)
        ->header('Access-Control-Allow-Origin', '*');
});


require __DIR__.'/auth.php';
