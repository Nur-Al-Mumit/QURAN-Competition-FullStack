<?php

namespace Database\Seeders;

use App\Models\TLevelRange;
use Illuminate\Database\Seeder;

class TLevelRangeSeeder extends Seeder
{
    public function run()
    {
        $levels = [
            [
                'name' => 'Alarmingly Low',
                'description' => '180 to 400 ng/dL',
                'min_level' => 180,
                'max_level' => 400,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Below Average',
                'description' => '400 to 550 ng/dL',
                'min_level' => 401,
                'max_level' => 550,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Average Man',
                'description' => '550 to 700 ng/dL',
                'min_level' => 551,
                'max_level' => 700,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Optimal Zone',
                'description' => '700 to 950 ng/dL',
                'min_level' => 701,
                'max_level' => 950,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ultimate Peak',
                'description' => '950 to 1250 ng/dL',
                'min_level' => 951,
                'max_level' => 1250,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        TLevelRange::insert($levels);
    }
}