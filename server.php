<?php
// Simple PHP development server
$host = 'localhost';
$port = 8000;

$socket = stream_socket_server("tcp://$host:$port", $errno, $errstr);
if (!$socket) {
    echo "Error: $errstr\n";
    exit(1);
}

echo "Server running at http://$host:$port\n";

while ($conn = stream_socket_accept($socket)) {
    $request = fread($conn, 4096);
    $lines = explode("\r\n", $request);
    $request_line = $lines[0];
    $parts = explode(' ', $request_line);
    $path = $parts[1] ?? '/';

    // Route admin requests
    if (strpos($path, '/grav-admin/') === 0) {
        $file_path = __DIR__ . '/grav-admin' . substr($path, 11);
        if (file_exists($file_path) && is_file($file_path)) {
            $content = file_get_contents($file_path);
            $response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: " . strlen($content) . "\r\n\r\n$content";
        } else {
            $response = "HTTP/1.1 404 Not Found\r\nContent-Type: text/html\r\n\r\n<h1>404 Not Found</h1>";
        }
    } else {
        // Serve static files
        $file_path = __DIR__ . $path;
        if (file_exists($file_path) && is_file($file_path)) {
            $content = file_get_contents($file_path);
            $ext = pathinfo($file_path, PATHINFO_EXTENSION);
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
            $response = "HTTP/1.1 200 OK\r\nContent-Type: $mime_type\r\nContent-Length: " . strlen($content) . "\r\n\r\n$content";
        } else {
            // Default to home.html
            $content = file_get_contents(__DIR__ . '/home.html');
            $response = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nContent-Length: " . strlen($content) . "\r\n\r\n$content";
        }
    }

    fwrite($conn, $response);
    fclose($conn);
}

fclose($socket);
