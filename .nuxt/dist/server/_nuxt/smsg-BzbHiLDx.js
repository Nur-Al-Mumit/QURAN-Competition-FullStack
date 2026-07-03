import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from "vue/server-renderer";
const _sfc_main = {
  __name: "smsg",
  __ssrInlineRender: true,
  setup(__props) {
    const banglaMonths = {
      January: "জানুয়ারী",
      February: "ফেব্রুয়ারী",
      March: "মার্চ",
      April: "এপ্রিল",
      May: "মে",
      June: "জুন",
      July: "জুলাই",
      August: "আগস্ট",
      September: "সেপ্টেম্বর",
      October: "অক্টোবর",
      November: "নভেম্বর",
      December: "ডিসেম্বর"
    };
    const banglaDays = {
      Monday: "সোমবার",
      Tuesday: "মঙ্গলবার",
      Wednesday: "বুধবার",
      Thursday: "বৃহস্পতিবার",
      Friday: "জুমু‘আ-বার",
      Saturday: "শনিবার",
      Sunday: "রবিবার"
    };
    const surahs = [
      {
        id: 1,
        name_en: "Al-Fatihah",
        name_ar: "الفاتحة",
        name_bn: "আল-ফাতিহা",
        verses: 7,
        juz: "1"
      },
      {
        id: 2,
        name_en: "Al-Baqarah",
        name_ar: "البقرة",
        name_bn: "আল-বাকারা",
        verses: 286,
        juz: "1-3"
      },
      {
        id: 3,
        name_en: "Aal-E-Imran",
        name_ar: "آل عمران",
        name_bn: "আলে ইমরান",
        verses: 200,
        juz: "3-4"
      },
      {
        id: 4,
        name_en: "An-Nisa",
        name_ar: "النساء",
        name_bn: "আন-নিসা",
        verses: 176,
        juz: "4-6"
      },
      {
        id: 5,
        name_en: "Al-Ma'idah",
        name_ar: "المائدة",
        name_bn: "আল-মায়িদা",
        verses: 120,
        juz: "6-7"
      },
      {
        id: 6,
        name_en: "Al-An'am",
        name_ar: "الأنعام",
        name_bn: "আল-আনআম",
        verses: 165,
        juz: "7-8"
      },
      {
        id: 7,
        name_en: "Al-A'raf",
        name_ar: "الأعراف",
        name_bn: "আল-আ’রাফ",
        verses: 206,
        juz: "8-9"
      },
      {
        id: 8,
        name_en: "Al-Anfal",
        name_ar: "الأنفال",
        name_bn: "আল-আনফাল",
        verses: 75,
        juz: "9-10"
      },
      {
        id: 9,
        name_en: "At-Tawbah",
        name_ar: "التوبة",
        name_bn: "আত-তাওবা",
        verses: 129,
        juz: "10-11"
      },
      {
        id: 10,
        name_en: "Yunus",
        name_ar: "يونس",
        name_bn: "ইউনুস",
        verses: 109,
        juz: "11"
      },
      {
        id: 11,
        name_en: "Hud",
        name_ar: "هود",
        name_bn: "হুদ",
        verses: 123,
        juz: "11-12"
      },
      {
        id: 12,
        name_en: "Yusuf",
        name_ar: "يوسف",
        name_bn: "ইউসুফ",
        verses: 111,
        juz: "12-13"
      },
      {
        id: 13,
        name_en: "Ar-Ra'd",
        name_ar: "الرعد",
        name_bn: "আর-রাদ",
        verses: 43,
        juz: "13"
      },
      {
        id: 14,
        name_en: "Ibrahim",
        name_ar: "إبراهيم",
        name_bn: "ইব্রাহিম",
        verses: 52,
        juz: "13"
      },
      {
        id: 15,
        name_en: "Al-Hijr",
        name_ar: "الحجر",
        name_bn: "আল-হিজর",
        verses: 99,
        juz: "14"
      },
      {
        id: 16,
        name_en: "An-Nahl",
        name_ar: "النحل",
        name_bn: "আন-নাহল",
        verses: 128,
        juz: "14"
      },
      {
        id: 17,
        name_en: "Al-Isra",
        name_ar: "الإسراء",
        name_bn: "আল-ইসরা",
        verses: 111,
        juz: "15"
      },
      {
        id: 18,
        name_en: "Al-Kahf",
        name_ar: "الكهف",
        name_bn: "আল-কাহফ",
        verses: 110,
        juz: "15-16"
      },
      {
        id: 19,
        name_en: "Maryam",
        name_ar: "مريم",
        name_bn: "মারইয়াম",
        verses: 98,
        juz: "16"
      },
      {
        id: 20,
        name_en: "Ta-Ha",
        name_ar: "طه",
        name_bn: "তা-হা",
        verses: 135,
        juz: "16"
      },
      {
        id: 21,
        name_en: "Al-Anbiya",
        name_ar: "الأنبياء",
        name_bn: "আল-আম্বিয়া",
        verses: 112,
        juz: "17"
      },
      {
        id: 22,
        name_en: "Al-Hajj",
        name_ar: "الحج",
        name_bn: "আল-হাজ্জ",
        verses: 78,
        juz: "17"
      },
      {
        id: 23,
        name_en: "Al-Mu'minun",
        name_ar: "المؤمنون",
        name_bn: "আল-মুমিনুন",
        verses: 118,
        juz: "18"
      },
      {
        id: 24,
        name_en: "An-Nur",
        name_ar: "النور",
        name_bn: "আন-নূর",
        verses: 64,
        juz: "18"
      },
      {
        id: 25,
        name_en: "Al-Furqan",
        name_ar: "الفرقان",
        name_bn: "আল-ফুরকান",
        verses: 77,
        juz: "18-19"
      },
      {
        id: 26,
        name_en: "Ash-Shu'ara",
        name_ar: "الشعراء",
        name_bn: "আশ-শু’আরা",
        verses: 227,
        juz: "19"
      },
      {
        id: 27,
        name_en: "An-Naml",
        name_ar: "النمل",
        name_bn: "আন-নামল",
        verses: 93,
        juz: "19-20"
      },
      {
        id: 28,
        name_en: "Al-Qasas",
        name_ar: "القصص",
        name_bn: "আল-কাসাস",
        verses: 88,
        juz: "20"
      },
      {
        id: 29,
        name_en: "Al-'Ankabut",
        name_ar: "العنكبوت",
        name_bn: "আল-আনকাবুত",
        verses: 69,
        juz: "20-21"
      },
      {
        id: 30,
        name_en: "Ar-Rum",
        name_ar: "الروم",
        name_bn: "আর-রুম",
        verses: 60,
        juz: "21"
      },
      {
        id: 31,
        name_en: "Luqman",
        name_ar: "لقمان",
        name_bn: "লুকমান",
        verses: 34,
        juz: "21"
      },
      {
        id: 32,
        name_en: "As-Sajdah",
        name_ar: "السجدة",
        name_bn: "আস-সাজদা",
        verses: 30,
        juz: "21"
      },
      {
        id: 33,
        name_en: "Al-Ahzab",
        name_ar: "الأحزاب",
        name_bn: "আল-আহযাব",
        verses: 73,
        juz: "21-22"
      },
      {
        id: 34,
        name_en: "Saba",
        name_ar: "سبإ",
        name_bn: "সাবা",
        verses: 54,
        juz: "22"
      },
      {
        id: 35,
        name_en: "Fatir",
        name_ar: "فاطر",
        name_bn: "ফাতির",
        verses: 45,
        juz: "22"
      },
      {
        id: 36,
        name_en: "Ya-Sin",
        name_ar: "يس",
        name_bn: "ইয়া-সিন",
        verses: 83,
        juz: "22-23"
      },
      {
        id: 37,
        name_en: "As-Saffat",
        name_ar: "الصافات",
        name_bn: "আস-সাফফাত",
        verses: 182,
        juz: "23"
      },
      {
        id: 38,
        name_en: "Sad",
        name_ar: "ص",
        name_bn: "সাদ",
        verses: 88,
        juz: "23"
      },
      {
        id: 39,
        name_en: "Az-Zumar",
        name_ar: "الزمر",
        name_bn: "আয-যুমার",
        verses: 75,
        juz: "23-24"
      },
      {
        id: 40,
        name_en: "Ghafir",
        name_ar: "غافر",
        name_bn: "গাফির",
        verses: 85,
        juz: "24"
      },
      {
        id: 41,
        name_en: "Fussilat",
        name_ar: "فصلت",
        name_bn: "ফুসসিলাত",
        verses: 54,
        juz: "24-25"
      },
      {
        id: 42,
        name_en: "Ash-Shura",
        name_ar: "الشورى",
        name_bn: "আশ-শুরা",
        verses: 53,
        juz: "25"
      },
      {
        id: 43,
        name_en: "Az-Zukhruf",
        name_ar: "الزخرف",
        name_bn: "আয-যুখরুফ",
        verses: 89,
        juz: "25"
      },
      {
        id: 44,
        name_en: "Ad-Dukhan",
        name_ar: "الدخان",
        name_bn: "আদ-দুখান",
        verses: 59,
        juz: "25"
      },
      {
        id: 45,
        name_en: "Al-Jathiyah",
        name_ar: "الجاثية",
        name_bn: "আল-জাসিয়া",
        verses: 37,
        juz: "25"
      },
      {
        id: 46,
        name_en: "Al-Ahqaf",
        name_ar: "الأحقاف",
        name_bn: "আল-আহকাফ",
        verses: 35,
        juz: "26"
      },
      {
        id: 47,
        name_en: "Muhammad",
        name_ar: "محمد",
        name_bn: "মুহাম্মদ",
        verses: 38,
        juz: "26"
      },
      {
        id: 48,
        name_en: "Al-Fath",
        name_ar: "الفتح",
        name_bn: "আল-ফাতহ",
        verses: 29,
        juz: "26"
      },
      {
        id: 49,
        name_en: "Al-Hujurat",
        name_ar: "الحجرات",
        name_bn: "আল-হুজুরাত",
        verses: 18,
        juz: "26"
      },
      {
        id: 50,
        name_en: "Qaf",
        name_ar: "ق",
        name_bn: "কাফ",
        verses: 45,
        juz: "26"
      },
      {
        id: 51,
        name_en: "Adh-Dhariyat",
        name_ar: "الذاريات",
        name_bn: "আয-যারিয়াত",
        verses: 60,
        juz: "26-27"
      },
      {
        id: 52,
        name_en: "At-Tur",
        name_ar: "الطور",
        name_bn: "আত-তুর",
        verses: 49,
        juz: "27"
      },
      {
        id: 53,
        name_en: "An-Najm",
        name_ar: "النجم",
        name_bn: "আন-নাজম",
        verses: 62,
        juz: "27"
      },
      {
        id: 54,
        name_en: "Al-Qamar",
        name_ar: "القمر",
        name_bn: "আল-কামার",
        verses: 55,
        juz: "27"
      },
      {
        id: 55,
        name_en: "Ar-Rahman",
        name_ar: "الرحمن",
        name_bn: "আর-রাহমান",
        verses: 78,
        juz: "27"
      },
      {
        id: 56,
        name_en: "Al-Waqi'a",
        name_ar: "الواقعة",
        name_bn: "আল-ওয়াকিয়া",
        verses: 96,
        juz: "27"
      },
      {
        id: 57,
        name_en: "Al-Hadid",
        name_ar: "الحديد",
        name_bn: "আল-হাদীদ",
        verses: 29,
        juz: "27"
      },
      {
        id: 58,
        name_en: "Al-Mujadilah",
        name_ar: "المجادلة",
        name_bn: "আল-মুজাদিলা",
        verses: 22,
        juz: "28"
      },
      {
        id: 59,
        name_en: "Al-Hashr",
        name_ar: "الحشر",
        name_bn: "আল-হাশর",
        verses: 24,
        juz: "28"
      },
      {
        id: 60,
        name_en: "Al-Mumtahanah",
        name_ar: "الممتحنة",
        name_bn: "আল-মুমতাহিনা",
        verses: 13,
        juz: "28"
      },
      {
        id: 61,
        name_en: "As-Saff",
        name_ar: "الصف",
        name_bn: "আস-সাফ",
        verses: 14,
        juz: "28"
      },
      {
        id: 62,
        name_en: "Al-Jumu'ah",
        name_ar: "الجمعة",
        name_bn: "আল-জুমু’আহ",
        verses: 11,
        juz: "28"
      },
      {
        id: 63,
        name_en: "Al-Munafiqun",
        name_ar: "المنافقون",
        name_bn: "আল-মুনাফিকুন",
        verses: 11,
        juz: "28"
      },
      {
        id: 64,
        name_en: "At-Taghabun",
        name_ar: "التغابن",
        name_bn: "আত-তাগাবুন",
        verses: 18,
        juz: "28"
      },
      {
        id: 65,
        name_en: "At-Talaq",
        name_ar: "الطلاق",
        name_bn: "আত-তালাক",
        verses: 12,
        juz: "28"
      },
      {
        id: 66,
        name_en: "At-Tahrim",
        name_ar: "التحريم",
        name_bn: "আত-তাহরীম",
        verses: 12,
        juz: "28"
      },
      {
        id: 67,
        name_en: "Al-Mulk",
        name_ar: "الملك",
        name_bn: "আল-মুলক",
        verses: 30,
        juz: "29"
      },
      {
        id: 68,
        name_en: "Al-Qalam",
        name_ar: "القلم",
        name_bn: "আল-কলম",
        verses: 52,
        juz: "29"
      },
      {
        id: 69,
        name_en: "Al-Haqqah",
        name_ar: "الحاقة",
        name_bn: "আল-হাক্কাহ",
        verses: 52,
        juz: "29"
      },
      {
        id: 70,
        name_en: "Al-Ma'arij",
        name_ar: "المعارج",
        name_bn: "আল-মা’আরিজ",
        verses: 44,
        juz: "29"
      },
      {
        id: 71,
        name_en: "Nuh",
        name_ar: "نوح",
        name_bn: "নূহ",
        verses: 28,
        juz: "29"
      },
      {
        id: 72,
        name_en: "Al-Jinn",
        name_ar: "الجن",
        name_bn: "আল-জিন",
        verses: 28,
        juz: "29"
      },
      {
        id: 73,
        name_en: "Al-Muzzammil",
        name_ar: "المزمل",
        name_bn: "আল-মুযযাম্মিল",
        verses: 20,
        juz: "29"
      },
      {
        id: 74,
        name_en: "Al-Muddaththir",
        name_ar: "المدثر",
        name_bn: "আল-মুদ্দাসসির",
        verses: 56,
        juz: "29"
      },
      {
        id: 75,
        name_en: "Al-Qiyamah",
        name_ar: "القيامة",
        name_bn: "আল-কিয়ামাহ",
        verses: 40,
        juz: "29"
      },
      {
        id: 76,
        name_en: "Al-Insan",
        name_ar: "الإنسان",
        name_bn: "আল-ইনসান",
        verses: 31,
        juz: "29"
      },
      {
        id: 77,
        name_en: "Al-Mursalat",
        name_ar: "المرسلات",
        name_bn: "আল-মুরসালাত",
        verses: 50,
        juz: "29"
      },
      {
        id: 78,
        name_en: "An-Naba",
        name_ar: "النبأ",
        name_bn: "আন-নাবা",
        verses: 40,
        juz: "30"
      },
      {
        id: 79,
        name_en: "An-Nazi'at",
        name_ar: "النازعات",
        name_bn: "আন-নাযি’আত",
        verses: 46,
        juz: "30"
      },
      {
        id: 80,
        name_en: "Abasa",
        name_ar: "عبس",
        name_bn: "আবাসা",
        verses: 42,
        juz: "30"
      },
      {
        id: 81,
        name_en: "At-Takwir",
        name_ar: "التكوير",
        name_bn: "আত-তাকবীর",
        verses: 29,
        juz: "30"
      },
      {
        id: 82,
        name_en: "Al-Infitar",
        name_ar: "الانفطار",
        name_bn: "আল-ইনফিতার",
        verses: 19,
        juz: "30"
      },
      {
        id: 83,
        name_en: "Al-Mutaffifin",
        name_ar: "المطففين",
        name_bn: "আল-মুতাফফিফীন",
        verses: 36,
        juz: "30"
      },
      {
        id: 84,
        name_en: "Al-Inshiqaq",
        name_ar: "الانشقاق",
        name_bn: "আল-ইনশিকাক",
        verses: 25,
        juz: "30"
      },
      {
        id: 85,
        name_en: "Al-Buruj",
        name_ar: "البروج",
        name_bn: "আল-বুরুজ",
        verses: 22,
        juz: "30"
      },
      {
        id: 86,
        name_en: "At-Tariq",
        name_ar: "الطارق",
        name_bn: "আত-তারিক",
        verses: 17,
        juz: "30"
      },
      {
        id: 87,
        name_en: "Al-A'la",
        name_ar: "الأعلى",
        name_bn: "আল-আ’লা",
        verses: 19,
        juz: "30"
      },
      {
        id: 88,
        name_en: "Al-Ghashiyah",
        name_ar: "الغاشية",
        name_bn: "আল-গাশিয়াহ",
        verses: 26,
        juz: "30"
      },
      {
        id: 89,
        name_en: "Al-Fajr",
        name_ar: "الفجر",
        name_bn: "আল-ফাজর",
        verses: 30,
        juz: "30"
      },
      {
        id: 90,
        name_en: "Al-Balad",
        name_ar: "البلد",
        name_bn: "আল-বালাদ",
        verses: 20,
        juz: "30"
      },
      {
        id: 91,
        name_en: "Ash-Shams",
        name_ar: "الشمس",
        name_bn: "আশ-শামস",
        verses: 15,
        juz: "30"
      },
      {
        id: 92,
        name_en: "Al-Layl",
        name_ar: "الليل",
        name_bn: "আল-লাইল",
        verses: 21,
        juz: "30"
      },
      {
        id: 93,
        name_en: "Ad-Duha",
        name_ar: "الضحى",
        name_bn: "আদ-দুহা",
        verses: 11,
        juz: "30"
      },
      {
        id: 94,
        name_en: "Ash-Sharh",
        name_ar: "الشرح",
        name_bn: "আশ-শারহ",
        verses: 8,
        juz: "30"
      },
      {
        id: 95,
        name_en: "At-Tin",
        name_ar: "التين",
        name_bn: "আত-তীন",
        verses: 8,
        juz: "30"
      },
      {
        id: 96,
        name_en: "Al-'Alaq",
        name_ar: "العلق",
        name_bn: "আল-আলাক",
        verses: 19,
        juz: "30"
      },
      {
        id: 97,
        name_en: "Al-Qadr",
        name_ar: "القدر",
        name_bn: "আল-কদর",
        verses: 5,
        juz: "30"
      },
      {
        id: 98,
        name_en: "Al-Bayyinah",
        name_ar: "البينة",
        name_bn: "আল-বাইয়িনাহ",
        verses: 8,
        juz: "30"
      },
      {
        id: 99,
        name_en: "Az-Zalzalah",
        name_ar: "الزلزلة",
        name_bn: "আয-যালযালাহ",
        verses: 8,
        juz: "30"
      },
      {
        id: 100,
        name_en: "Al-'Adiyat",
        name_ar: "العاديات",
        name_bn: "আল-আদিয়াত",
        verses: 11,
        juz: "30"
      },
      {
        id: 101,
        name_en: "Al-Qari'ah",
        name_ar: "القارعة",
        name_bn: "আল-কারি’আহ",
        verses: 11,
        juz: "30"
      },
      {
        id: 102,
        name_en: "At-Takathur",
        name_ar: "التكاثر",
        name_bn: "আত-তাকাসুর",
        verses: 8,
        juz: "30"
      },
      {
        id: 103,
        name_en: "Al-'Asr",
        name_ar: "العصر",
        name_bn: "আল-আসর",
        verses: 3,
        juz: "30"
      },
      {
        id: 104,
        name_en: "Al-Humazah",
        name_ar: "الهمزة",
        name_bn: "আল-হুমাযাহ",
        verses: 9,
        juz: "30"
      },
      {
        id: 105,
        name_en: "Al-Fil",
        name_ar: "الفيل",
        name_bn: "আল-ফীল",
        verses: 5,
        juz: "30"
      },
      {
        id: 106,
        name_en: "Quraysh",
        name_ar: "قريش",
        name_bn: "কুরাইশ",
        verses: 4,
        juz: "30"
      },
      {
        id: 107,
        name_en: "Al-Ma'un",
        name_ar: "الماعون",
        name_bn: "আল-মা’উন",
        verses: 7,
        juz: "30"
      },
      {
        id: 108,
        name_en: "Al-Kawthar",
        name_ar: "الكوثر",
        name_bn: "আল-কাওসার",
        verses: 3,
        juz: "30"
      },
      {
        id: 109,
        name_en: "Al-Kafirun",
        name_ar: "الكافرون",
        name_bn: "আল-কাফিরুন",
        verses: 6,
        juz: "30"
      },
      {
        id: 110,
        name_en: "An-Nasr",
        name_ar: "النصر",
        name_bn: "আন-নাসর",
        verses: 3,
        juz: "30"
      },
      {
        id: 111,
        name_en: "Al-Masad",
        name_ar: "المسد",
        name_bn: "আল-মাসাদ",
        verses: 5,
        juz: "30"
      },
      {
        id: 112,
        name_en: "Al-Ikhlas",
        name_ar: "الإخلاص",
        name_bn: "আল-ইখলাস",
        verses: 4,
        juz: "30"
      },
      {
        id: 113,
        name_en: "Al-Falaq",
        name_ar: "الفلق",
        name_bn: "আল-ফালাক",
        verses: 5,
        juz: "30"
      },
      {
        id: 114,
        name_en: "An-Nas",
        name_ar: "الناس",
        name_bn: "আন-নাস",
        verses: 6,
        juz: "30"
      }
    ];
    const selectedSurah = ref(surahs[0]);
    const ayahStart = ref(1);
    const ayahEnd = ref(7);
    const selectedJuz = ref("27");
    const selectedTimestamp = ref((/* @__PURE__ */ new Date()).toISOString().slice(0, 16));
    const juzOptions = Array.from({ length: 30 }, (_, i) => String(i + 1));
    const ayahOptions = computed(() => {
      const verses = selectedSurah.value.verses;
      return Array.from({ length: verses }, (_, i) => i + 1);
    });
    const toBangla = (num) => num.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
    const toArabic = (num) => num.toString().replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
    const generatedText = computed(() => {
      const date = new Date(selectedTimestamp.value);
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long"
      });
      const day = formattedDate.split(" ")[0];
      const month = formattedDate.split(" ")[1];
      const banglaMonth = banglaMonths[month] || month;
      const weekdayEn = date.toLocaleDateString("en-GB", { weekday: "long" });
      const weekdayBn = banglaDays[weekdayEn] || weekdayEn;
      const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      const s = selectedSurah.value;
      const ayahRange = `${ayahStart.value}-${ayahEnd.value}`;
      const ayahRangeBn = `${toBangla(ayahStart.value)}-${toBangla(
        ayahEnd.value
      )}`;
      const ayahRangeAr = `${toArabic(ayahStart.value)}-${toArabic(
        ayahEnd.value
      )}`;
      const juzDisplay = selectedJuz.value;
      const juzBn = toBangla(juzDisplay);
      const juzAr = toArabic(juzDisplay);
      return `
السلام عليكم ورحمة الله وبركاته  
إن شاء الله  

আগামী ${toBangla(
        day
      )} ${banglaMonth} / ${formattedDate} (${weekdayBn} / ${weekdayEn}) রাত ${toBangla(
        time
      )} / ${time} এ ক্লাস শুরু হবে।  

📖 ক্লাসের পড়া:  
সূরাঃ *${s.name_bn} | ${s.name_en} | ${s.name_ar} (${ayahRangeBn} | ${ayahRangeAr} | ${ayahRange})*  
সূরা / Surah: *${toBangla(s.id)} / ${toArabic(s.id)} / ${s.id}*  
পারা / Juz: *${juzBn} / ${juzAr} / ${juzDisplay}*  

বিশেষ দ্রষ্টব্য:  
অবশ্যই ক্লাসের পড়া ৩ থেকে ৫ বার অনুশীলন করে আসতে হবে যাতে সাবলীলভাবে পড়া দেয়া যায়।  
আল্লাহ আমাদের ইলমের পথে অটল রাখুন। آمين 🤲  
`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4" }, _attrs))}><div class="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8"><h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center"><span class="mr-2">📜</span> ক্লাস নোটিশ জেনারেটর </h2><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2"> সূরা নির্বাচন করুন </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(surahs, (s) => {
        _push(`<option${ssrRenderAttr("value", s)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSurah)) ? ssrLooseContain(unref(selectedSurah), s) : ssrLooseEqual(unref(selectedSurah), s)) ? " selected" : ""}>${ssrInterpolate(s.id)}. ${ssrInterpolate(s.name_bn)} (${ssrInterpolate(s.name_en)}) </option>`);
      });
      _push(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> শুরু আয়াত </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(unref(ayahOptions), (ayah) => {
        _push(`<option${ssrRenderAttr("value", ayah)}${ssrIncludeBooleanAttr(Array.isArray(unref(ayahStart)) ? ssrLooseContain(unref(ayahStart), ayah) : ssrLooseEqual(unref(ayahStart), ayah)) ? " selected" : ""}>${ssrInterpolate(toBangla(ayah))} (${ssrInterpolate(ayah)}) </option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> শেষ আয়াত </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(unref(ayahOptions), (ayah) => {
        _push(`<option${ssrRenderAttr("value", ayah)}${ssrIncludeBooleanAttr(ayah < unref(ayahStart)) ? " disabled" : ""}${ssrIncludeBooleanAttr(Array.isArray(unref(ayahEnd)) ? ssrLooseContain(unref(ayahEnd), ayah) : ssrLooseEqual(unref(ayahEnd), ayah)) ? " selected" : ""}>${ssrInterpolate(toBangla(ayah))} (${ssrInterpolate(ayah)}) </option>`);
      });
      _push(`<!--]--></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> পারা (Juz) </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(unref(juzOptions), (juz) => {
        _push(`<option${ssrRenderAttr("value", juz)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedJuz)) ? ssrLooseContain(unref(selectedJuz), juz) : ssrLooseEqual(unref(selectedJuz), juz)) ? " selected" : ""}>${ssrInterpolate(toBangla(juz))} (${ssrInterpolate(juz)}) </option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> তারিখ ও সময় </label><input${ssrRenderAttr("value", unref(selectedTimestamp))} type="datetime-local" class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></div></div><div class="mb-6"><div class="flex justify-between items-center mb-2"><h3 class="text-lg font-medium text-gray-700">📝 Generated Text</h3><button class="bg-blue-500 text-whites px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy </button></div><textarea style="${ssrRenderStyle({ "height": "300px", "width": "100%" })}" class="border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-800 resize-none focus:ring-2 focus:ring-blue-500">${ssrInterpolate(unref(generatedText))}</textarea></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/smsg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=smsg-BzbHiLDx.js.map
