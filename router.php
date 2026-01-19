<?php
// Simple router for Grav admin
$request_uri = $_SERVER['REQUEST_URI'];

// Route admin requests
if (strpos($request_uri, '/grav-admin/') === 0) {
    // Serve admin files
    $file_path = __DIR__ . '/grav-admin' . substr($request_uri, 11);
    
    if (file_exists($file_path) && is_file($file_path)) {
        // Get file extension for MIME type
        $ext = pathinfo($file_path, PATHINFO_EXTENSION);
        $mime_types = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'php' => 'application/x-httpd-php'
        ];
        
        $mime_type = $mime_types[$ext] ?? 'text/plain';
        
        header('Content-Type: ' . $mime_type);
        header('Content-Length: ' . filesize($file_path));
        readfile($file_path);
        exit;
    }
    
    // Route to admin index
    require_once __DIR__ . '/grav-admin/vendor/autoload.php';
    $grav = new Grav\Common\Grav();
    $grav->process();
    exit;
}

// Serve static files or main HTML
$requested_file = __DIR__ . $request_uri;
if (file_exists($requested_file) && is_file($requested_file)) {
    $ext = pathinfo($requested_file, PATHINFO_EXTENSION);
    $mime_types = [
        'html' => 'text/html',
        'css' => 'text/css',
        'js' => 'application/javascript',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml'
    ];
    
    $mime_type = $mime_types[$ext] ?? 'text/plain';
    
    header('Content-Type: ' . $mime_type);
    header('Content-Length: ' . filesize($requested_file));
    readfile($requested_file);
    exit;
}

// Default to home.html
include __DIR__ . '/home.html';
