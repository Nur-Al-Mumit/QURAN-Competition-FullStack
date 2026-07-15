<?php

namespace Database\Seeders;

use App\Models\ProgressStage;
use App\Models\TimelineEvent;
use Illuminate\Database\Seeder;

class DashboardSettingsSeeder extends Seeder
{
    /**
     * Seed the dashboard tables with the values that were previously
     * hardcoded in the student dashboard page so the UI stays identical.
     */
    public function run(): void
    {
        // ---------- Timeline events ----------
        $timeline = [
            [
                'title'                 => 'রেজিস্ট্রেশন সমাপ্তি',
                'description'           => 'রাত ১১:৫৯ মিনিটের মধ্যে রেজিস্ট্রেশন সম্পন্ন করুন',
                'banner_message'        => 'রেজিস্ট্রেশনের শেষ সময়',
                'status_message'        => 'রেজিস্ট্রেশন চলমান। তাড়াতাড়ি নিবন্ধন সম্পন্ন করুন!',
                'status_message_upcoming' => null,
                'image_name'            => 'Users',
                'start_date'            => null,
                'end_date'              => '2026-07-20 23:59:59',
                'show_in_timeline'      => true,
                'sort_order'            => 1,
            ],
            [
                'title'                 => 'প্রাথমিক বাছাই পর্ব',
                'description'           => '২১ জুলাই রেজিস্ট্রেশন কার্ডে উল্লিখিত ভেনুতে প্রাথমিক বাছাই অনুষ্ঠিত হবে',
                'banner_message'        => 'প্রাথমিক বাছাই পর্ব চলছে',
                'status_message'        => 'প্রাথমিক বাছাই পর্ব চলছে। সফল হলে পরবর্তী ধাপের জন্য প্রস্তুত থাকুন।',
                'status_message_upcoming' => 'SMS এর জন্য অপেক্ষা করুন। আগামীকাল আপনার বাছাই পর্বের তথ্য পাবেন।',
                'image_name'            => 'BookOpen',
                'start_date'            => '2026-07-21 00:00:00',
                'end_date'              => '2026-07-21 23:59:59',
                'show_in_timeline'      => true,
                'sort_order'            => 2,
            ],
            [
                'title'                 => 'বিশেষ প্রশিক্ষণ',
                'description'           => '৫ দিনব্যাপী ফ্রি তিলাওয়াত প্রশিক্ষণ',
                'banner_message'        => 'বিশেষ প্রশিক্ষণ পর্ব চলছে',
                'status_message'        => 'প্রশিক্ষণ পর্ব চলছে। নিয়মিত অংশগ্রহণ করুন।',
                'status_message_upcoming' => null,
                'image_name'            => 'BookOpen',
                'start_date'            => '2026-07-22 00:00:00',
                'end_date'              => '2026-07-27 23:59:59',
                'show_in_timeline'      => true,
                'sort_order'            => 3,
            ],
            [
                'title'                 => 'চূড়ান্ত পর্ব',
                'description'           => 'প্রতিযোগিতার চূড়ান্ত পর্ব অনুষ্ঠিত হবে',
                'banner_message'        => 'চূড়ান্ত পর্ব',
                'status_message'        => 'চূড়ান্ত পর্ব! সর্বোচ্চ চেষ্টা করুন।',
                'status_message_upcoming' => 'চূড়ান্ত পর্বের জন্য প্রস্তুতি নিন।',
                'image_name'            => 'Trophy',
                'start_date'            => '2026-07-30 00:00:00',
                'end_date'              => '2026-07-30 23:59:59',
                'show_in_timeline'      => true,
                'sort_order'            => 4,
            ],
        ];

        foreach ($timeline as $event) {
            TimelineEvent::updateOrCreate(
                ['title' => $event['title']],
                $event
            );
        }

        // ---------- Progress stages ----------
        $stages = [
            [
                'code'        => 'account_created',
                'title'       => 'Account Created',
                'description' => null,
                'image_name'  => 'CheckCircle',
                'start_date'  => null,
                'end_date'    => null,
                'is_complete' => true,
                'sort_order'  => 1,
            ],
            [
                'code'        => 'competition_registration',
                'title'       => 'Competition Registration',
                'description' => null,
                'image_name'  => 'Users',
                'start_date'  => null,
                'end_date'    => null,
                'is_complete' => null,
                'sort_order'  => 2,
            ],
            [
                'code'        => 'token_downloaded',
                'title'       => 'Registration Token Downloaded',
                'description' => null,
                'image_name'  => 'BookOpen',
                'start_date'  => null,
                'end_date'    => null,
                'is_complete' => null,
                'sort_order'  => 3,
            ],
            [
                'code'        => 'primary_round',
                'title'       => 'Primary Selecton Round',
                'description' => null,
                'image_name'  => 'Users',
                'start_date'  => null,
                'end_date'    => null,
                'is_complete' => null,
                'sort_order'  => 4,
            ],
            [
                'code'        => 'sms_received',
                'title'       => 'Eligibility SMS Received',
                'description' => null,
                'image_name'  => 'Bell',
                'start_date'  => null,
                'end_date'    => null,
                'is_complete' => null,
                'sort_order'  => 5,
            ],
            [
                'code'        => 'training',
                'title'       => 'Training Completed',
                'description' => null,
                'image_name'  => 'BookOpen',
                'start_date'  => '2026-07-22 00:00:00',
                'end_date'    => '2026-07-27 23:59:59',
                'is_complete' => null,
                'sort_order'  => 6,
            ],
            [
                'code'        => 'final_round',
                'title'       => 'Final Round',
                'description' => null,
                'image_name'  => 'Trophy',
                'start_date'  => '2026-07-30 00:00:00',
                'end_date'    => '2026-07-30 23:59:59',
                'is_complete' => null,
                'sort_order'  => 7,
            ],
        ];

        foreach ($stages as $stage) {
            ProgressStage::updateOrCreate(
                ['code' => $stage['code']],
                $stage
            );
        }
    }
}
