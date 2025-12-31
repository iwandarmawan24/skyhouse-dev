<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        // Check if user is authenticated
        if (!auth()->check()) {
            return redirect()->route('admin.login');
        }

        $user = auth()->user();

        // Check if user is active
        if (!$user->isActive()) {
            auth()->logout();
            return redirect()->route('admin.login')->with('error', 'Your account is inactive. Please contact administrator.');
        }

        // If no roles specified, allow access for authenticated active users
        if (empty($roles)) {
            return $next($request);
        }

        // Check if user has required role
        if (!in_array($user->role, $roles)) {
            abort(403, 'Unauthorized. You do not have permission to access this resource.');
        }

        return $next($request);
    }
}
