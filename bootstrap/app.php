<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // tamu yang kena 'auth:admin'/'auth:manager' diarahkan ke login pengelola,
        // sisanya (guard 'web' / Penyewa) tetap ke /login seperti biasa
        $middleware->redirectGuestsTo(function ($request) {
            $routeMiddleware = $request->route()?->middleware() ?? [];

            if (in_array('auth:admin', $routeMiddleware) || in_array('auth:manager', $routeMiddleware)) {
                return route('login.pengelola');
            }

            return route('login');
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
