<template>
  <!--
    Competition notice page (single page). Pure Tailwind.
    Top: competition name centered.
    Bottom: org footer (logo + org name) like /admin/training-id-card.
    id="competition-notice" is the print/export target.
  -->
  <div
    id="competition-notice"
    class="w-[820px] max-w-[96vw] min-h-[1080px] bg-white border border-gray-200 rounded-xl shadow-[0_16px_40px_rgba(27,67,50,0.12)] flex flex-col overflow-hidden font-[Hind_Siliguri,kalpurush,sans-serif] text-emerald-900 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
  >
    <!-- ===== HEADER: competition name centered at top ===== -->
    <header
      class="text-center pt-6 px-6 bg-gradient-to-b from-emerald-50/40 to-white"
    >
      <p
        class="text-[30px] font-bold text-emerald-700 m-0 leading-tight tracking-wide"
      >
        বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা
      </p>
      <p
        class="text-lg font-semibold text-emerald-700 mt-1.5 m-0 tracking-wide"
      >
        ১৪৪৮ হিজরী
      </p>
    </header>

    <!-- ===== BODY: the notice content ===== -->
    <main class="flex-1 px-12 pt-5 pb-7">
      <p class="text-center text-[19px] font-bold text-emerald-800 mt-0 mb-5">
        📢 প্রতিযোগিতা সংক্রান্ত জরুরি নোটিশ
      </p>

      <!-- SCHEDULE -->
      <h2
        class="text-xl font-bold text-emerald-800 mt-1.5 mb-3.5 pb-1.5 inline-block border-b-2 border-emerald-500"
      >
        ⏰ সময়সূচী ও লটারি
      </h2>
      <ul class="list-none p-0 m-0 mb-6 flex flex-col gap-[11px]">
        <li
          class="flex gap-2.5 items-start text-base leading-relaxed text-emerald-900"
        >
          <span class="text-emerald-500 text-[13px] mt-1 shrink-0">◆</span>
          <span>
            <b class="text-emerald-800">উপস্থিতির সময় (Reporting Time): </b>
            <b class="text-red-500">সকাল ১১:১৫ মিনিট।</b>
          </span>
        </li>
        <li
          class="flex gap-2.5 items-start text-base leading-relaxed text-emerald-900"
        >
          <span class="text-emerald-500 text-[13px] mt-1 shrink-0">◆</span>
          <span>
            <b class="text-emerald-800">প্রতিযোগিতা শুরুর সময়:</b>
            সকাল ১১:৩০ মিনিট।
          </span>
        </li>
        <li
          class="flex gap-2.5 items-start text-base leading-relaxed text-emerald-900"
        >
          <span class="text-emerald-500 text-[13px] mt-1 shrink-0">◆</span>
          <span>
            <b class="text-emerald-800">সিরিয়াল লটারি:</b>
            পরীক্ষা শুরুর ১৫ মিনিট আগে প্রতিযোগীদের নিজ নিজ সিরিয়ালের জন্য
            লটারি অনুষ্ঠিত হবে।
          </span>
        </li>
        <li
          class="flex gap-2.5 items-start text-base leading-relaxed text-emerald-900"
        >
          <span class="text-emerald-500 text-[13px] mt-1 shrink-0">◆</span>
          <span>
            <b class="text-emerald-800">প্রশ্নের লটারি:</b>
            নিজ নিজ পরীক্ষা শুরু হওয়ার ঠিক ৫ মিনিট আগে 'অজানা প্রশ্ন' (Unknown
            Question)-এর লটারি হবে।
          </span>
        </li>
        <li
          class="flex gap-2.5 items-start text-base leading-relaxed text-emerald-900"
        >
          <span class="text-emerald-500 text-[13px] mt-1 shrink-0">◆</span>
          <span>
            <b class="text-emerald-800">পর্ব বিভাজন:</b>
            চূড়ান্ত প্রতিযোগিতাটি ২টি পর্বে (১ম পর্ব ও ২য় পর্ব) অনুষ্ঠিত হবে।
          </span>
        </li>
      </ul>

      <h2
        class="text-xl font-bold text-emerald-800 mt-1.5 mb-3.5 pb-1.5 inline-block border-b-2 border-emerald-500"
      >
        📌 প্রতিযোগীদের জন্য বিশেষ নির্দেশাবলী
      </h2>
      <p class="font-bold text-red-500">
        মুসহাফ/কুরআন সংক্রান্ত: সকল প্রতিযোগীকে অবশ্যই নিজ নিজ মুসহাফ (কুরআন
        মাজীদ) সাথে নিয়ে আসতে হবে।
      </p>

      <!-- ROUND 1 -->
      <h2
        class="text-xl font-bold text-emerald-800 mt-6 mb-3.5 pb-1.5 inline-block border-b-2 border-emerald-500"
      >
        ১ম পর্ব (Elimination Round) 
      </h2>
      <ol class="list-none p-0 m-0 mb-2.5 [counter-reset:round-item]">
        <li
          class="relative pl-9 mb-4 text-base leading-relaxed text-emerald-900 [&:before]:[counter-increment:round-item] [&:before]:content-[counter(round-item)] [&:before]:absolute [&:before]:left-0 [&:before]:top-0.5 [&:before]:w-[25px] [&:before]:h-[25px] [&:before]:bg-gradient-to-br [&:before]:from-emerald-400 [&:before]:to-emerald-700 [&:before]:text-white [&:before]:rounded-full [&:before]:text-sm [&:before]:font-bold [&:before]:flex [&:before]:items-center [&:before]:justify-center"
        >
          এই পর্ব থেকে পারফরম্যান্সের ভিত্তিতে সেরা
          <b class="text-emerald-800">৫–৭ জনকে</b>
          পরবর্তী পর্বের জন্য নির্বাচিত করা হবে।
        </li>
        <li
          class="relative pl-9 mb-4 text-base leading-relaxed text-emerald-900 [&:before]:[counter-increment:round-item] [&:before]:content-[counter(round-item)] [&:before]:absolute [&:before]:left-0 [&:before]:top-0.5 [&:before]:w-[25px] [&:before]:h-[25px] [&:before]:bg-gradient-to-br [&:before]:from-emerald-400 [&:before]:to-emerald-700 [&:before]:text-white [&:before]:rounded-full [&:before]:text-sm [&:before]:font-bold [&:before]:flex [&:before]:items-center [&:before]:justify-center"
        >
          <span class="block font-bold text-emerald-800 mb-1">
            প্রশ্নের নিয়মাবলী (মোট ২টি প্রশ্ন):
          </span>
          <ul class="list-none p-0 mt-1.5 flex flex-col gap-2">
            <li
              class="relative pl-[22px] text-[15.5px] leading-relaxed before:content-['›'] before:absolute before:left-1 before:-top-0.5 before:text-emerald-700 before:font-bold before:text-[17px]"
            >
              <b class="text-emerald-800">জানা প্রশ্ন (Known Question):</b>
              শেষ ১৫ পারা (সূরা আল-কাহফ থেকে সূরা আন-নাস) থেকে প্রতিযোগী তাঁর
              পছন্দের যেকোনো স্থান থেকে সর্বোচ্চ ১ পৃষ্ঠা অথবা ৩ মিনিট তিলওয়াত
              করতে পারবেন।
            </li>
            <li
              class="relative pl-[22px] text-[15.5px] leading-relaxed before:content-['›'] before:absolute before:left-1 before:-top-0.5 before:text-emerald-700 before:font-bold before:text-[17px]"
            >
              <b class="text-emerald-800">অজানা প্রশ্ন (Unknown Question):</b>
              পরীক্ষা শুরুর ৫ মিনিট আগে লটারির মাধ্যমে নির্ধারিত স্থান থেকে
              বিচারকদের নির্বাচিত অংশ (সর্বোচ্চ ১ পৃষ্ঠা) পাঠ করতে হবে।
            </li>
          </ul>
        </li>
      </ol>

      <!-- ROUND 2 -->
      <h2
        class="text-xl font-bold text-emerald-800 mt-6 mb-3.5 pb-1.5 inline-block border-b-2 border-emerald-500"
      >
        🏆 ২য় পর্ব (Final Round)
      </h2>
      <ol class="list-none p-0 m-0 mb-2.5 [counter-reset:round-item]">
        <li
          class="relative pl-9 mb-4 text-base leading-relaxed text-emerald-900 [&:before]:[counter-increment:round-item] [&:before]:content-[counter(round-item)] [&:before]:absolute [&:before]:left-0 [&:before]:top-0.5 [&:before]:w-[25px] [&:before]:h-[25px] [&:before]:bg-gradient-to-br [&:before]:from-emerald-400 [&:before]:to-emerald-700 [&:before]:text-white [&:before]:rounded-full [&:before]:text-sm [&:before]:font-bold [&:before]:flex [&:before]:items-center [&:before]:justify-center"
        >
          ১ম পর্ব থেকে উত্তীর্ণ প্রতিযোগীদের মধ্য থেকে চূড়ান্ত সেরা
          <b class="text-emerald-800">৩ জন</b>
          বিজয়ী নির্বাচন করা হবে।
        </li>
        <li
          class="relative pl-9 mb-4 text-base leading-relaxed text-emerald-900 [&:before]:[counter-increment:round-item] [&:before]:content-[counter(round_item)] [&:before]:absolute [&:before]:left-0 [&:before]:top-0.5 [&:before]:w-[25px] [&:before]:h-[25px] [&:before]:bg-gradient-to-br [&:before]:from-emerald-400 [&:before]:to-emerald-700 [&:before]:text-white [&:before]:rounded-full [&:before]:text-sm [&:before]:font-bold [&:before]:flex [&:before]:items-center [&:before]:justify-center"
        >
          <span class="block font-bold text-emerald-800 mb-1">
            প্রশ্নের নিয়মাবলী:
          </span>
          <ul class="list-none p-0 mt-1.5 flex flex-col gap-2">
            <li
              class="relative pl-[22px] text-[15.5px] leading-relaxed before:content-['›'] before:absolute before:left-1 before:-top-0.5 before:text-emerald-700 before:font-bold before:text-[17px]"
            >
              এই পর্বে শুধুমাত্র
              <b class="text-emerald-800">অজানা প্রশ্ন (Unknown Question)</b>
              থাকবে।
            </li>
            <li
              class="relative pl-[22px] text-[15.5px] leading-relaxed before:content-['›'] before:absolute before:left-1 before:-top-0.5 before:text-emerald-700 before:font-bold before:text-[17px]"
            >
              বিচারকমণ্ডলী শেষ ১৫ পারার যেকোনো ১টি অথবা ২টি স্থান থেকে তিলাওয়াত
              করতে বলবেন।
            </li>
          </ul>
        </li>
      </ol>
    </main>

    <!-- ===== FOOTER: logo + org name (like training-id-card) ===== -->
    <footer
      class="flex items-center justify-center gap-2.5 border-t border-gray-100 px-6 py-4"
    >
      <img
        src="~/assets/imgs/logo.png"
        alt="এসো কুরআন শিখি লোগো"
        class="w-[38px] h-[38px] object-contain shrink-0"
      />
      <span class="text-xl font-bold text-emerald-700 whitespace-nowrap">
        এসো কুরআন শিখি
      </span>
    </footer>
  </div>
</template>

<script setup></script>
