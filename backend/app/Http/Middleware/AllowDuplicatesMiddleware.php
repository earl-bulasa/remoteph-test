<?php

namespace App\Http\Middleware;

use Closure;
use App\Setting;

class AllowDuplicatesMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $allow_duplicates = Setting::select('value')->where('param', 'allow_duplicates')->first();
        if(empty($allow_duplicates)) {
            return response()->json([
                'msg' => "Allow duplicates setting doesn't exist"
            ], 400);
        }
        return $next($request);
    }
}
