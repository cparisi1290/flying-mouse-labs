<?php
/**
 * Grav CMS Entry Point
 */

// Get the Grav instance
$grav = require __DIR__ . '/grav-admin/vendor/autoload.php';
$grav = new Grav\Common\Grav();

// Process the request
$grav->process();
