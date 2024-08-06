<?php

return [

    'defaults' => [
        'guard' => 'web',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users', 
            'timeout' => 10800,
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\Users::class,
        ],

    ],

    'api' => [
        'driver' => 'sanctum',
        'provider' => 'users',
    ],
];

