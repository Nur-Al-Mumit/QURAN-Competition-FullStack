<?php

return [

    'max_registrations' => env('REGISTRATION_MAX', 50),

    'schedule' => [
        'start_time' => env('REGISTRATION_START_TIME', '17:00'),
        'batch_duration' => env('REGISTRATION_BATCH_DURATION', 5),
        'gap' => env('REGISTRATION_GAP', 2),
    ],

    'breaks' => [
        ['start' => env('REGISTRATION_BREAK_START', '18:30'), 'end' => env('REGISTRATION_BREAK_END', '19:15')],
    ],

    'room_start' => env('REGISTRATION_ROOM_START', 201),

];
