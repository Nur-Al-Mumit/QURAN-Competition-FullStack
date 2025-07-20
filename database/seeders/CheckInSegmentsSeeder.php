<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CheckInSegmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('check_in_segments')->insert([
            ['name' => 'Morning', 'title' => '☀️ Morning est.', 'start_time' => '05:00:00', 'weight' => 1.70, 'end_time' => '11:59:59'],
            ['name' => 'Afternoon', 'title' => '🌤️ Afternoon est.', 'start_time' => '12:00:00', 'weight' => 1.02, 'end_time' => '16:59:59'],
            ['name' => 'Evening', 'title' => '🌤️ Evening est.', 'start_time' => '17:00:00', 'weight' => 0.95, 'end_time' => '20:59:59'],
            ['name' => 'Night', 'title' => '🌘 Night est.', 'start_time' => '21:00:00', 'weight' => 0.89, 'end_time' => '04:59:59'],
        ]);
    }
}
