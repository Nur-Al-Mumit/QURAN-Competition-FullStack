<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SubscriptionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Visible improvement',
                'slug' => 'visible-improvement',
                'description' => null,
                'price_monthly' => 4.99,
                'price_quarterly' => 14.99,
                'price_yearly' => null,
                'lifetime' => null,
                'order_price' => 14.99,
                'trial_days' => null,
                'is_default' => false,
                'apple_id' => 6746231713,
                'apple_product_id' => 'app.thetestosterone.quarterly',
                'max_credits' => null,
                'is_active' => 'price_quarterly',
            ],
            [
                'name' => 'Full transformation',
                'slug' => 'full-transformation',
                'description' => null,
                'price_monthly' => 2.49,
                'price_quarterly' => null,
                'price_yearly' => 29.99,
                'lifetime' => null,
                'order_price' => 29.99,
                'trial_days' => 7,
                'is_default' => true,
                'apple_id' => 6746234580,
                'apple_product_id' => 'app.thetestosterone.yearly',
                'max_credits' => null,
                'is_active' => 'price_yearly',
            ],
            [
                'name' => 'Become a patron',
                'slug' => 'become-patron',
                'description' => null,
                'price_monthly' => null,
                'price_quarterly' => null,
                'price_yearly' => null,
                'lifetime' => 149.99,
                'order_price' => 149.99,
                'trial_days' => null,
                'is_default' => false,
                'apple_id' => 6746234613,
                'apple_product_id' => 'app.thetestosterone.lifetime',
                'max_credits' => null,
                'is_active' => 'lifetime',
            ],
        ];

        foreach ($plans as $plan) {
            SubscriptionPlan::create($plan);
        }
    }
}
