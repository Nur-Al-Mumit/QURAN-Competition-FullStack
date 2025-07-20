<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DailyCheckInFormSeeder extends Seeder
{
    public function run(): void
    {
        $stepOptions = json_encode([
            ["id" => "1", "name" => "Option 1", "weight" => 15],
            ["id" => "2", "name" => "Option 2", "weight" => -8],
            ["id" => "3", "name" => "Option 3", "weight" => 12],
            ["id" => "4", "name" => "Option 4", "weight" => -10],
            ["id" => "5", "name" => "Option 5", "weight" => 14],
            ["id" => "6", "name" => "Option 6", "weight" => 16],
            ["id" => "7", "name" => "Option 7", "weight" => -11],
            ["id" => "8", "name" => "Option 8", "weight" => 9],
            ["id" => "9", "name" => "Option 9", "weight" => -13],
            ["id" => "10", "name" => "Option 10", "weight" => 17],
        ]);

        $stepsWithCategories = [
            'sleep' => 'Lifestyle',
            'sunlight' => 'Lifestyle',
            'step-count' => 'Lifestyle',
            'workout' => 'Lifestyle',
            'diet' => 'Nutrition',
            'hydration' => 'Nutrition',
            'vitamin' => 'Nutrition',
            'sugar' => 'Nutrition',
            'fasting' => 'Nutrition',
            'cold-exposure' => 'Lifestyle',
            'stress' => 'Lifestyle',
            'focus' => 'Lifestyle',
            'plastic' => 'Habits',
            'polyester' => 'Habits',
            'grooming-product' => 'Habits',
            'screen-time' => 'Habits',
            'adult-content' => 'Habits',
            'alcohol' => 'Habits',
            'competition' => 'Habits',
            'breathing' => 'Habits',
        ];

        $stepNumber = 1;

        foreach ($stepsWithCategories as $stepName => $category) {
            DB::table('daily_check_in_forms')->insert([
                'step' => $stepNumber++,
                'step_name' => $stepName,
                'step_options' => $stepOptions,
                'category' => $category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}