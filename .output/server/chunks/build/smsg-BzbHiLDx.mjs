import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = {
  __name: "smsg",
  __ssrInlineRender: true,
  setup(__props) {
    const banglaMonths = {
      January: "\u099C\u09BE\u09A8\u09C1\u09AF\u09BC\u09BE\u09B0\u09C0",
      February: "\u09AB\u09C7\u09AC\u09CD\u09B0\u09C1\u09AF\u09BC\u09BE\u09B0\u09C0",
      March: "\u09AE\u09BE\u09B0\u09CD\u099A",
      April: "\u098F\u09AA\u09CD\u09B0\u09BF\u09B2",
      May: "\u09AE\u09C7",
      June: "\u099C\u09C1\u09A8",
      July: "\u099C\u09C1\u09B2\u09BE\u0987",
      August: "\u0986\u0997\u09B8\u09CD\u099F",
      September: "\u09B8\u09C7\u09AA\u09CD\u099F\u09C7\u09AE\u09CD\u09AC\u09B0",
      October: "\u0985\u0995\u09CD\u099F\u09CB\u09AC\u09B0",
      November: "\u09A8\u09AD\u09C7\u09AE\u09CD\u09AC\u09B0",
      December: "\u09A1\u09BF\u09B8\u09C7\u09AE\u09CD\u09AC\u09B0"
    };
    const banglaDays = {
      Monday: "\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0",
      Tuesday: "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0",
      Wednesday: "\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0",
      Thursday: "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0",
      Friday: "\u099C\u09C1\u09AE\u09C1\u2018\u0986-\u09AC\u09BE\u09B0",
      Saturday: "\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0",
      Sunday: "\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0"
    };
    const surahs = [
      {
        id: 1,
        name_en: "Al-Fatihah",
        name_ar: "\u0627\u0644\u0641\u0627\u062A\u062D\u0629",
        name_bn: "\u0986\u09B2-\u09AB\u09BE\u09A4\u09BF\u09B9\u09BE",
        verses: 7,
        juz: "1"
      },
      {
        id: 2,
        name_en: "Al-Baqarah",
        name_ar: "\u0627\u0644\u0628\u0642\u0631\u0629",
        name_bn: "\u0986\u09B2-\u09AC\u09BE\u0995\u09BE\u09B0\u09BE",
        verses: 286,
        juz: "1-3"
      },
      {
        id: 3,
        name_en: "Aal-E-Imran",
        name_ar: "\u0622\u0644 \u0639\u0645\u0631\u0627\u0646",
        name_bn: "\u0986\u09B2\u09C7 \u0987\u09AE\u09B0\u09BE\u09A8",
        verses: 200,
        juz: "3-4"
      },
      {
        id: 4,
        name_en: "An-Nisa",
        name_ar: "\u0627\u0644\u0646\u0633\u0627\u0621",
        name_bn: "\u0986\u09A8-\u09A8\u09BF\u09B8\u09BE",
        verses: 176,
        juz: "4-6"
      },
      {
        id: 5,
        name_en: "Al-Ma'idah",
        name_ar: "\u0627\u0644\u0645\u0627\u0626\u062F\u0629",
        name_bn: "\u0986\u09B2-\u09AE\u09BE\u09DF\u09BF\u09A6\u09BE",
        verses: 120,
        juz: "6-7"
      },
      {
        id: 6,
        name_en: "Al-An'am",
        name_ar: "\u0627\u0644\u0623\u0646\u0639\u0627\u0645",
        name_bn: "\u0986\u09B2-\u0986\u09A8\u0986\u09AE",
        verses: 165,
        juz: "7-8"
      },
      {
        id: 7,
        name_en: "Al-A'raf",
        name_ar: "\u0627\u0644\u0623\u0639\u0631\u0627\u0641",
        name_bn: "\u0986\u09B2-\u0986\u2019\u09B0\u09BE\u09AB",
        verses: 206,
        juz: "8-9"
      },
      {
        id: 8,
        name_en: "Al-Anfal",
        name_ar: "\u0627\u0644\u0623\u0646\u0641\u0627\u0644",
        name_bn: "\u0986\u09B2-\u0986\u09A8\u09AB\u09BE\u09B2",
        verses: 75,
        juz: "9-10"
      },
      {
        id: 9,
        name_en: "At-Tawbah",
        name_ar: "\u0627\u0644\u062A\u0648\u0628\u0629",
        name_bn: "\u0986\u09A4-\u09A4\u09BE\u0993\u09AC\u09BE",
        verses: 129,
        juz: "10-11"
      },
      {
        id: 10,
        name_en: "Yunus",
        name_ar: "\u064A\u0648\u0646\u0633",
        name_bn: "\u0987\u0989\u09A8\u09C1\u09B8",
        verses: 109,
        juz: "11"
      },
      {
        id: 11,
        name_en: "Hud",
        name_ar: "\u0647\u0648\u062F",
        name_bn: "\u09B9\u09C1\u09A6",
        verses: 123,
        juz: "11-12"
      },
      {
        id: 12,
        name_en: "Yusuf",
        name_ar: "\u064A\u0648\u0633\u0641",
        name_bn: "\u0987\u0989\u09B8\u09C1\u09AB",
        verses: 111,
        juz: "12-13"
      },
      {
        id: 13,
        name_en: "Ar-Ra'd",
        name_ar: "\u0627\u0644\u0631\u0639\u062F",
        name_bn: "\u0986\u09B0-\u09B0\u09BE\u09A6",
        verses: 43,
        juz: "13"
      },
      {
        id: 14,
        name_en: "Ibrahim",
        name_ar: "\u0625\u0628\u0631\u0627\u0647\u064A\u0645",
        name_bn: "\u0987\u09AC\u09CD\u09B0\u09BE\u09B9\u09BF\u09AE",
        verses: 52,
        juz: "13"
      },
      {
        id: 15,
        name_en: "Al-Hijr",
        name_ar: "\u0627\u0644\u062D\u062C\u0631",
        name_bn: "\u0986\u09B2-\u09B9\u09BF\u099C\u09B0",
        verses: 99,
        juz: "14"
      },
      {
        id: 16,
        name_en: "An-Nahl",
        name_ar: "\u0627\u0644\u0646\u062D\u0644",
        name_bn: "\u0986\u09A8-\u09A8\u09BE\u09B9\u09B2",
        verses: 128,
        juz: "14"
      },
      {
        id: 17,
        name_en: "Al-Isra",
        name_ar: "\u0627\u0644\u0625\u0633\u0631\u0627\u0621",
        name_bn: "\u0986\u09B2-\u0987\u09B8\u09B0\u09BE",
        verses: 111,
        juz: "15"
      },
      {
        id: 18,
        name_en: "Al-Kahf",
        name_ar: "\u0627\u0644\u0643\u0647\u0641",
        name_bn: "\u0986\u09B2-\u0995\u09BE\u09B9\u09AB",
        verses: 110,
        juz: "15-16"
      },
      {
        id: 19,
        name_en: "Maryam",
        name_ar: "\u0645\u0631\u064A\u0645",
        name_bn: "\u09AE\u09BE\u09B0\u0987\u09DF\u09BE\u09AE",
        verses: 98,
        juz: "16"
      },
      {
        id: 20,
        name_en: "Ta-Ha",
        name_ar: "\u0637\u0647",
        name_bn: "\u09A4\u09BE-\u09B9\u09BE",
        verses: 135,
        juz: "16"
      },
      {
        id: 21,
        name_en: "Al-Anbiya",
        name_ar: "\u0627\u0644\u0623\u0646\u0628\u064A\u0627\u0621",
        name_bn: "\u0986\u09B2-\u0986\u09AE\u09CD\u09AC\u09BF\u09DF\u09BE",
        verses: 112,
        juz: "17"
      },
      {
        id: 22,
        name_en: "Al-Hajj",
        name_ar: "\u0627\u0644\u062D\u062C",
        name_bn: "\u0986\u09B2-\u09B9\u09BE\u099C\u09CD\u099C",
        verses: 78,
        juz: "17"
      },
      {
        id: 23,
        name_en: "Al-Mu'minun",
        name_ar: "\u0627\u0644\u0645\u0624\u0645\u0646\u0648\u0646",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09AE\u09BF\u09A8\u09C1\u09A8",
        verses: 118,
        juz: "18"
      },
      {
        id: 24,
        name_en: "An-Nur",
        name_ar: "\u0627\u0644\u0646\u0648\u0631",
        name_bn: "\u0986\u09A8-\u09A8\u09C2\u09B0",
        verses: 64,
        juz: "18"
      },
      {
        id: 25,
        name_en: "Al-Furqan",
        name_ar: "\u0627\u0644\u0641\u0631\u0642\u0627\u0646",
        name_bn: "\u0986\u09B2-\u09AB\u09C1\u09B0\u0995\u09BE\u09A8",
        verses: 77,
        juz: "18-19"
      },
      {
        id: 26,
        name_en: "Ash-Shu'ara",
        name_ar: "\u0627\u0644\u0634\u0639\u0631\u0627\u0621",
        name_bn: "\u0986\u09B6-\u09B6\u09C1\u2019\u0986\u09B0\u09BE",
        verses: 227,
        juz: "19"
      },
      {
        id: 27,
        name_en: "An-Naml",
        name_ar: "\u0627\u0644\u0646\u0645\u0644",
        name_bn: "\u0986\u09A8-\u09A8\u09BE\u09AE\u09B2",
        verses: 93,
        juz: "19-20"
      },
      {
        id: 28,
        name_en: "Al-Qasas",
        name_ar: "\u0627\u0644\u0642\u0635\u0635",
        name_bn: "\u0986\u09B2-\u0995\u09BE\u09B8\u09BE\u09B8",
        verses: 88,
        juz: "20"
      },
      {
        id: 29,
        name_en: "Al-'Ankabut",
        name_ar: "\u0627\u0644\u0639\u0646\u0643\u0628\u0648\u062A",
        name_bn: "\u0986\u09B2-\u0986\u09A8\u0995\u09BE\u09AC\u09C1\u09A4",
        verses: 69,
        juz: "20-21"
      },
      {
        id: 30,
        name_en: "Ar-Rum",
        name_ar: "\u0627\u0644\u0631\u0648\u0645",
        name_bn: "\u0986\u09B0-\u09B0\u09C1\u09AE",
        verses: 60,
        juz: "21"
      },
      {
        id: 31,
        name_en: "Luqman",
        name_ar: "\u0644\u0642\u0645\u0627\u0646",
        name_bn: "\u09B2\u09C1\u0995\u09AE\u09BE\u09A8",
        verses: 34,
        juz: "21"
      },
      {
        id: 32,
        name_en: "As-Sajdah",
        name_ar: "\u0627\u0644\u0633\u062C\u062F\u0629",
        name_bn: "\u0986\u09B8-\u09B8\u09BE\u099C\u09A6\u09BE",
        verses: 30,
        juz: "21"
      },
      {
        id: 33,
        name_en: "Al-Ahzab",
        name_ar: "\u0627\u0644\u0623\u062D\u0632\u0627\u0628",
        name_bn: "\u0986\u09B2-\u0986\u09B9\u09AF\u09BE\u09AC",
        verses: 73,
        juz: "21-22"
      },
      {
        id: 34,
        name_en: "Saba",
        name_ar: "\u0633\u0628\u0625",
        name_bn: "\u09B8\u09BE\u09AC\u09BE",
        verses: 54,
        juz: "22"
      },
      {
        id: 35,
        name_en: "Fatir",
        name_ar: "\u0641\u0627\u0637\u0631",
        name_bn: "\u09AB\u09BE\u09A4\u09BF\u09B0",
        verses: 45,
        juz: "22"
      },
      {
        id: 36,
        name_en: "Ya-Sin",
        name_ar: "\u064A\u0633",
        name_bn: "\u0987\u09DF\u09BE-\u09B8\u09BF\u09A8",
        verses: 83,
        juz: "22-23"
      },
      {
        id: 37,
        name_en: "As-Saffat",
        name_ar: "\u0627\u0644\u0635\u0627\u0641\u0627\u062A",
        name_bn: "\u0986\u09B8-\u09B8\u09BE\u09AB\u09AB\u09BE\u09A4",
        verses: 182,
        juz: "23"
      },
      {
        id: 38,
        name_en: "Sad",
        name_ar: "\u0635",
        name_bn: "\u09B8\u09BE\u09A6",
        verses: 88,
        juz: "23"
      },
      {
        id: 39,
        name_en: "Az-Zumar",
        name_ar: "\u0627\u0644\u0632\u0645\u0631",
        name_bn: "\u0986\u09AF-\u09AF\u09C1\u09AE\u09BE\u09B0",
        verses: 75,
        juz: "23-24"
      },
      {
        id: 40,
        name_en: "Ghafir",
        name_ar: "\u063A\u0627\u0641\u0631",
        name_bn: "\u0997\u09BE\u09AB\u09BF\u09B0",
        verses: 85,
        juz: "24"
      },
      {
        id: 41,
        name_en: "Fussilat",
        name_ar: "\u0641\u0635\u0644\u062A",
        name_bn: "\u09AB\u09C1\u09B8\u09B8\u09BF\u09B2\u09BE\u09A4",
        verses: 54,
        juz: "24-25"
      },
      {
        id: 42,
        name_en: "Ash-Shura",
        name_ar: "\u0627\u0644\u0634\u0648\u0631\u0649",
        name_bn: "\u0986\u09B6-\u09B6\u09C1\u09B0\u09BE",
        verses: 53,
        juz: "25"
      },
      {
        id: 43,
        name_en: "Az-Zukhruf",
        name_ar: "\u0627\u0644\u0632\u062E\u0631\u0641",
        name_bn: "\u0986\u09AF-\u09AF\u09C1\u0996\u09B0\u09C1\u09AB",
        verses: 89,
        juz: "25"
      },
      {
        id: 44,
        name_en: "Ad-Dukhan",
        name_ar: "\u0627\u0644\u062F\u062E\u0627\u0646",
        name_bn: "\u0986\u09A6-\u09A6\u09C1\u0996\u09BE\u09A8",
        verses: 59,
        juz: "25"
      },
      {
        id: 45,
        name_en: "Al-Jathiyah",
        name_ar: "\u0627\u0644\u062C\u0627\u062B\u064A\u0629",
        name_bn: "\u0986\u09B2-\u099C\u09BE\u09B8\u09BF\u09DF\u09BE",
        verses: 37,
        juz: "25"
      },
      {
        id: 46,
        name_en: "Al-Ahqaf",
        name_ar: "\u0627\u0644\u0623\u062D\u0642\u0627\u0641",
        name_bn: "\u0986\u09B2-\u0986\u09B9\u0995\u09BE\u09AB",
        verses: 35,
        juz: "26"
      },
      {
        id: 47,
        name_en: "Muhammad",
        name_ar: "\u0645\u062D\u0645\u062F",
        name_bn: "\u09AE\u09C1\u09B9\u09BE\u09AE\u09CD\u09AE\u09A6",
        verses: 38,
        juz: "26"
      },
      {
        id: 48,
        name_en: "Al-Fath",
        name_ar: "\u0627\u0644\u0641\u062A\u062D",
        name_bn: "\u0986\u09B2-\u09AB\u09BE\u09A4\u09B9",
        verses: 29,
        juz: "26"
      },
      {
        id: 49,
        name_en: "Al-Hujurat",
        name_ar: "\u0627\u0644\u062D\u062C\u0631\u0627\u062A",
        name_bn: "\u0986\u09B2-\u09B9\u09C1\u099C\u09C1\u09B0\u09BE\u09A4",
        verses: 18,
        juz: "26"
      },
      {
        id: 50,
        name_en: "Qaf",
        name_ar: "\u0642",
        name_bn: "\u0995\u09BE\u09AB",
        verses: 45,
        juz: "26"
      },
      {
        id: 51,
        name_en: "Adh-Dhariyat",
        name_ar: "\u0627\u0644\u0630\u0627\u0631\u064A\u0627\u062A",
        name_bn: "\u0986\u09AF-\u09AF\u09BE\u09B0\u09BF\u09DF\u09BE\u09A4",
        verses: 60,
        juz: "26-27"
      },
      {
        id: 52,
        name_en: "At-Tur",
        name_ar: "\u0627\u0644\u0637\u0648\u0631",
        name_bn: "\u0986\u09A4-\u09A4\u09C1\u09B0",
        verses: 49,
        juz: "27"
      },
      {
        id: 53,
        name_en: "An-Najm",
        name_ar: "\u0627\u0644\u0646\u062C\u0645",
        name_bn: "\u0986\u09A8-\u09A8\u09BE\u099C\u09AE",
        verses: 62,
        juz: "27"
      },
      {
        id: 54,
        name_en: "Al-Qamar",
        name_ar: "\u0627\u0644\u0642\u0645\u0631",
        name_bn: "\u0986\u09B2-\u0995\u09BE\u09AE\u09BE\u09B0",
        verses: 55,
        juz: "27"
      },
      {
        id: 55,
        name_en: "Ar-Rahman",
        name_ar: "\u0627\u0644\u0631\u062D\u0645\u0646",
        name_bn: "\u0986\u09B0-\u09B0\u09BE\u09B9\u09AE\u09BE\u09A8",
        verses: 78,
        juz: "27"
      },
      {
        id: 56,
        name_en: "Al-Waqi'a",
        name_ar: "\u0627\u0644\u0648\u0627\u0642\u0639\u0629",
        name_bn: "\u0986\u09B2-\u0993\u09DF\u09BE\u0995\u09BF\u09DF\u09BE",
        verses: 96,
        juz: "27"
      },
      {
        id: 57,
        name_en: "Al-Hadid",
        name_ar: "\u0627\u0644\u062D\u062F\u064A\u062F",
        name_bn: "\u0986\u09B2-\u09B9\u09BE\u09A6\u09C0\u09A6",
        verses: 29,
        juz: "27"
      },
      {
        id: 58,
        name_en: "Al-Mujadilah",
        name_ar: "\u0627\u0644\u0645\u062C\u0627\u062F\u0644\u0629",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u099C\u09BE\u09A6\u09BF\u09B2\u09BE",
        verses: 22,
        juz: "28"
      },
      {
        id: 59,
        name_en: "Al-Hashr",
        name_ar: "\u0627\u0644\u062D\u0634\u0631",
        name_bn: "\u0986\u09B2-\u09B9\u09BE\u09B6\u09B0",
        verses: 24,
        juz: "28"
      },
      {
        id: 60,
        name_en: "Al-Mumtahanah",
        name_ar: "\u0627\u0644\u0645\u0645\u062A\u062D\u0646\u0629",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09AE\u09A4\u09BE\u09B9\u09BF\u09A8\u09BE",
        verses: 13,
        juz: "28"
      },
      {
        id: 61,
        name_en: "As-Saff",
        name_ar: "\u0627\u0644\u0635\u0641",
        name_bn: "\u0986\u09B8-\u09B8\u09BE\u09AB",
        verses: 14,
        juz: "28"
      },
      {
        id: 62,
        name_en: "Al-Jumu'ah",
        name_ar: "\u0627\u0644\u062C\u0645\u0639\u0629",
        name_bn: "\u0986\u09B2-\u099C\u09C1\u09AE\u09C1\u2019\u0986\u09B9",
        verses: 11,
        juz: "28"
      },
      {
        id: 63,
        name_en: "Al-Munafiqun",
        name_ar: "\u0627\u0644\u0645\u0646\u0627\u0641\u0642\u0648\u0646",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09A8\u09BE\u09AB\u09BF\u0995\u09C1\u09A8",
        verses: 11,
        juz: "28"
      },
      {
        id: 64,
        name_en: "At-Taghabun",
        name_ar: "\u0627\u0644\u062A\u063A\u0627\u0628\u0646",
        name_bn: "\u0986\u09A4-\u09A4\u09BE\u0997\u09BE\u09AC\u09C1\u09A8",
        verses: 18,
        juz: "28"
      },
      {
        id: 65,
        name_en: "At-Talaq",
        name_ar: "\u0627\u0644\u0637\u0644\u0627\u0642",
        name_bn: "\u0986\u09A4-\u09A4\u09BE\u09B2\u09BE\u0995",
        verses: 12,
        juz: "28"
      },
      {
        id: 66,
        name_en: "At-Tahrim",
        name_ar: "\u0627\u0644\u062A\u062D\u0631\u064A\u0645",
        name_bn: "\u0986\u09A4-\u09A4\u09BE\u09B9\u09B0\u09C0\u09AE",
        verses: 12,
        juz: "28"
      },
      {
        id: 67,
        name_en: "Al-Mulk",
        name_ar: "\u0627\u0644\u0645\u0644\u0643",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09B2\u0995",
        verses: 30,
        juz: "29"
      },
      {
        id: 68,
        name_en: "Al-Qalam",
        name_ar: "\u0627\u0644\u0642\u0644\u0645",
        name_bn: "\u0986\u09B2-\u0995\u09B2\u09AE",
        verses: 52,
        juz: "29"
      },
      {
        id: 69,
        name_en: "Al-Haqqah",
        name_ar: "\u0627\u0644\u062D\u0627\u0642\u0629",
        name_bn: "\u0986\u09B2-\u09B9\u09BE\u0995\u09CD\u0995\u09BE\u09B9",
        verses: 52,
        juz: "29"
      },
      {
        id: 70,
        name_en: "Al-Ma'arij",
        name_ar: "\u0627\u0644\u0645\u0639\u0627\u0631\u062C",
        name_bn: "\u0986\u09B2-\u09AE\u09BE\u2019\u0986\u09B0\u09BF\u099C",
        verses: 44,
        juz: "29"
      },
      {
        id: 71,
        name_en: "Nuh",
        name_ar: "\u0646\u0648\u062D",
        name_bn: "\u09A8\u09C2\u09B9",
        verses: 28,
        juz: "29"
      },
      {
        id: 72,
        name_en: "Al-Jinn",
        name_ar: "\u0627\u0644\u062C\u0646",
        name_bn: "\u0986\u09B2-\u099C\u09BF\u09A8",
        verses: 28,
        juz: "29"
      },
      {
        id: 73,
        name_en: "Al-Muzzammil",
        name_ar: "\u0627\u0644\u0645\u0632\u0645\u0644",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09AF\u09AF\u09BE\u09AE\u09CD\u09AE\u09BF\u09B2",
        verses: 20,
        juz: "29"
      },
      {
        id: 74,
        name_en: "Al-Muddaththir",
        name_ar: "\u0627\u0644\u0645\u062F\u062B\u0631",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09A6\u09CD\u09A6\u09BE\u09B8\u09B8\u09BF\u09B0",
        verses: 56,
        juz: "29"
      },
      {
        id: 75,
        name_en: "Al-Qiyamah",
        name_ar: "\u0627\u0644\u0642\u064A\u0627\u0645\u0629",
        name_bn: "\u0986\u09B2-\u0995\u09BF\u09DF\u09BE\u09AE\u09BE\u09B9",
        verses: 40,
        juz: "29"
      },
      {
        id: 76,
        name_en: "Al-Insan",
        name_ar: "\u0627\u0644\u0625\u0646\u0633\u0627\u0646",
        name_bn: "\u0986\u09B2-\u0987\u09A8\u09B8\u09BE\u09A8",
        verses: 31,
        juz: "29"
      },
      {
        id: 77,
        name_en: "Al-Mursalat",
        name_ar: "\u0627\u0644\u0645\u0631\u0633\u0644\u0627\u062A",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09B0\u09B8\u09BE\u09B2\u09BE\u09A4",
        verses: 50,
        juz: "29"
      },
      {
        id: 78,
        name_en: "An-Naba",
        name_ar: "\u0627\u0644\u0646\u0628\u0623",
        name_bn: "\u0986\u09A8-\u09A8\u09BE\u09AC\u09BE",
        verses: 40,
        juz: "30"
      },
      {
        id: 79,
        name_en: "An-Nazi'at",
        name_ar: "\u0627\u0644\u0646\u0627\u0632\u0639\u0627\u062A",
        name_bn: "\u0986\u09A8-\u09A8\u09BE\u09AF\u09BF\u2019\u0986\u09A4",
        verses: 46,
        juz: "30"
      },
      {
        id: 80,
        name_en: "Abasa",
        name_ar: "\u0639\u0628\u0633",
        name_bn: "\u0986\u09AC\u09BE\u09B8\u09BE",
        verses: 42,
        juz: "30"
      },
      {
        id: 81,
        name_en: "At-Takwir",
        name_ar: "\u0627\u0644\u062A\u0643\u0648\u064A\u0631",
        name_bn: "\u0986\u09A4-\u09A4\u09BE\u0995\u09AC\u09C0\u09B0",
        verses: 29,
        juz: "30"
      },
      {
        id: 82,
        name_en: "Al-Infitar",
        name_ar: "\u0627\u0644\u0627\u0646\u0641\u0637\u0627\u0631",
        name_bn: "\u0986\u09B2-\u0987\u09A8\u09AB\u09BF\u09A4\u09BE\u09B0",
        verses: 19,
        juz: "30"
      },
      {
        id: 83,
        name_en: "Al-Mutaffifin",
        name_ar: "\u0627\u0644\u0645\u0637\u0641\u0641\u064A\u0646",
        name_bn: "\u0986\u09B2-\u09AE\u09C1\u09A4\u09BE\u09AB\u09AB\u09BF\u09AB\u09C0\u09A8",
        verses: 36,
        juz: "30"
      },
      {
        id: 84,
        name_en: "Al-Inshiqaq",
        name_ar: "\u0627\u0644\u0627\u0646\u0634\u0642\u0627\u0642",
        name_bn: "\u0986\u09B2-\u0987\u09A8\u09B6\u09BF\u0995\u09BE\u0995",
        verses: 25,
        juz: "30"
      },
      {
        id: 85,
        name_en: "Al-Buruj",
        name_ar: "\u0627\u0644\u0628\u0631\u0648\u062C",
        name_bn: "\u0986\u09B2-\u09AC\u09C1\u09B0\u09C1\u099C",
        verses: 22,
        juz: "30"
      },
      {
        id: 86,
        name_en: "At-Tariq",
        name_ar: "\u0627\u0644\u0637\u0627\u0631\u0642",
        name_bn: "\u0986\u09A4-\u09A4\u09BE\u09B0\u09BF\u0995",
        verses: 17,
        juz: "30"
      },
      {
        id: 87,
        name_en: "Al-A'la",
        name_ar: "\u0627\u0644\u0623\u0639\u0644\u0649",
        name_bn: "\u0986\u09B2-\u0986\u2019\u09B2\u09BE",
        verses: 19,
        juz: "30"
      },
      {
        id: 88,
        name_en: "Al-Ghashiyah",
        name_ar: "\u0627\u0644\u063A\u0627\u0634\u064A\u0629",
        name_bn: "\u0986\u09B2-\u0997\u09BE\u09B6\u09BF\u09DF\u09BE\u09B9",
        verses: 26,
        juz: "30"
      },
      {
        id: 89,
        name_en: "Al-Fajr",
        name_ar: "\u0627\u0644\u0641\u062C\u0631",
        name_bn: "\u0986\u09B2-\u09AB\u09BE\u099C\u09B0",
        verses: 30,
        juz: "30"
      },
      {
        id: 90,
        name_en: "Al-Balad",
        name_ar: "\u0627\u0644\u0628\u0644\u062F",
        name_bn: "\u0986\u09B2-\u09AC\u09BE\u09B2\u09BE\u09A6",
        verses: 20,
        juz: "30"
      },
      {
        id: 91,
        name_en: "Ash-Shams",
        name_ar: "\u0627\u0644\u0634\u0645\u0633",
        name_bn: "\u0986\u09B6-\u09B6\u09BE\u09AE\u09B8",
        verses: 15,
        juz: "30"
      },
      {
        id: 92,
        name_en: "Al-Layl",
        name_ar: "\u0627\u0644\u0644\u064A\u0644",
        name_bn: "\u0986\u09B2-\u09B2\u09BE\u0987\u09B2",
        verses: 21,
        juz: "30"
      },
      {
        id: 93,
        name_en: "Ad-Duha",
        name_ar: "\u0627\u0644\u0636\u062D\u0649",
        name_bn: "\u0986\u09A6-\u09A6\u09C1\u09B9\u09BE",
        verses: 11,
        juz: "30"
      },
      {
        id: 94,
        name_en: "Ash-Sharh",
        name_ar: "\u0627\u0644\u0634\u0631\u062D",
        name_bn: "\u0986\u09B6-\u09B6\u09BE\u09B0\u09B9",
        verses: 8,
        juz: "30"
      },
      {
        id: 95,
        name_en: "At-Tin",
        name_ar: "\u0627\u0644\u062A\u064A\u0646",
        name_bn: "\u0986\u09A4-\u09A4\u09C0\u09A8",
        verses: 8,
        juz: "30"
      },
      {
        id: 96,
        name_en: "Al-'Alaq",
        name_ar: "\u0627\u0644\u0639\u0644\u0642",
        name_bn: "\u0986\u09B2-\u0986\u09B2\u09BE\u0995",
        verses: 19,
        juz: "30"
      },
      {
        id: 97,
        name_en: "Al-Qadr",
        name_ar: "\u0627\u0644\u0642\u062F\u0631",
        name_bn: "\u0986\u09B2-\u0995\u09A6\u09B0",
        verses: 5,
        juz: "30"
      },
      {
        id: 98,
        name_en: "Al-Bayyinah",
        name_ar: "\u0627\u0644\u0628\u064A\u0646\u0629",
        name_bn: "\u0986\u09B2-\u09AC\u09BE\u0987\u09DF\u09BF\u09A8\u09BE\u09B9",
        verses: 8,
        juz: "30"
      },
      {
        id: 99,
        name_en: "Az-Zalzalah",
        name_ar: "\u0627\u0644\u0632\u0644\u0632\u0644\u0629",
        name_bn: "\u0986\u09AF-\u09AF\u09BE\u09B2\u09AF\u09BE\u09B2\u09BE\u09B9",
        verses: 8,
        juz: "30"
      },
      {
        id: 100,
        name_en: "Al-'Adiyat",
        name_ar: "\u0627\u0644\u0639\u0627\u062F\u064A\u0627\u062A",
        name_bn: "\u0986\u09B2-\u0986\u09A6\u09BF\u09DF\u09BE\u09A4",
        verses: 11,
        juz: "30"
      },
      {
        id: 101,
        name_en: "Al-Qari'ah",
        name_ar: "\u0627\u0644\u0642\u0627\u0631\u0639\u0629",
        name_bn: "\u0986\u09B2-\u0995\u09BE\u09B0\u09BF\u2019\u0986\u09B9",
        verses: 11,
        juz: "30"
      },
      {
        id: 102,
        name_en: "At-Takathur",
        name_ar: "\u0627\u0644\u062A\u0643\u0627\u062B\u0631",
        name_bn: "\u0986\u09A4-\u09A4\u09BE\u0995\u09BE\u09B8\u09C1\u09B0",
        verses: 8,
        juz: "30"
      },
      {
        id: 103,
        name_en: "Al-'Asr",
        name_ar: "\u0627\u0644\u0639\u0635\u0631",
        name_bn: "\u0986\u09B2-\u0986\u09B8\u09B0",
        verses: 3,
        juz: "30"
      },
      {
        id: 104,
        name_en: "Al-Humazah",
        name_ar: "\u0627\u0644\u0647\u0645\u0632\u0629",
        name_bn: "\u0986\u09B2-\u09B9\u09C1\u09AE\u09BE\u09AF\u09BE\u09B9",
        verses: 9,
        juz: "30"
      },
      {
        id: 105,
        name_en: "Al-Fil",
        name_ar: "\u0627\u0644\u0641\u064A\u0644",
        name_bn: "\u0986\u09B2-\u09AB\u09C0\u09B2",
        verses: 5,
        juz: "30"
      },
      {
        id: 106,
        name_en: "Quraysh",
        name_ar: "\u0642\u0631\u064A\u0634",
        name_bn: "\u0995\u09C1\u09B0\u09BE\u0987\u09B6",
        verses: 4,
        juz: "30"
      },
      {
        id: 107,
        name_en: "Al-Ma'un",
        name_ar: "\u0627\u0644\u0645\u0627\u0639\u0648\u0646",
        name_bn: "\u0986\u09B2-\u09AE\u09BE\u2019\u0989\u09A8",
        verses: 7,
        juz: "30"
      },
      {
        id: 108,
        name_en: "Al-Kawthar",
        name_ar: "\u0627\u0644\u0643\u0648\u062B\u0631",
        name_bn: "\u0986\u09B2-\u0995\u09BE\u0993\u09B8\u09BE\u09B0",
        verses: 3,
        juz: "30"
      },
      {
        id: 109,
        name_en: "Al-Kafirun",
        name_ar: "\u0627\u0644\u0643\u0627\u0641\u0631\u0648\u0646",
        name_bn: "\u0986\u09B2-\u0995\u09BE\u09AB\u09BF\u09B0\u09C1\u09A8",
        verses: 6,
        juz: "30"
      },
      {
        id: 110,
        name_en: "An-Nasr",
        name_ar: "\u0627\u0644\u0646\u0635\u0631",
        name_bn: "\u0986\u09A8-\u09A8\u09BE\u09B8\u09B0",
        verses: 3,
        juz: "30"
      },
      {
        id: 111,
        name_en: "Al-Masad",
        name_ar: "\u0627\u0644\u0645\u0633\u062F",
        name_bn: "\u0986\u09B2-\u09AE\u09BE\u09B8\u09BE\u09A6",
        verses: 5,
        juz: "30"
      },
      {
        id: 112,
        name_en: "Al-Ikhlas",
        name_ar: "\u0627\u0644\u0625\u062E\u0644\u0627\u0635",
        name_bn: "\u0986\u09B2-\u0987\u0996\u09B2\u09BE\u09B8",
        verses: 4,
        juz: "30"
      },
      {
        id: 113,
        name_en: "Al-Falaq",
        name_ar: "\u0627\u0644\u0641\u0644\u0642",
        name_bn: "\u0986\u09B2-\u09AB\u09BE\u09B2\u09BE\u0995",
        verses: 5,
        juz: "30"
      },
      {
        id: 114,
        name_en: "An-Nas",
        name_ar: "\u0627\u0644\u0646\u0627\u0633",
        name_bn: "\u0986\u09A8-\u09A8\u09BE\u09B8",
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
    const toBangla = (num) => num.toString().replace(/[0-9]/g, (d) => "\u09E6\u09E7\u09E8\u09E9\u09EA\u09EB\u09EC\u09ED\u09EE\u09EF"[d]);
    const toArabic = (num) => num.toString().replace(/[0-9]/g, (d) => "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669"[d]);
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
\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645 \u0648\u0631\u062D\u0645\u0629 \u0627\u0644\u0644\u0647 \u0648\u0628\u0631\u0643\u0627\u062A\u0647  
\u0625\u0646 \u0634\u0627\u0621 \u0627\u0644\u0644\u0647  

\u0986\u0997\u09BE\u09AE\u09C0 ${toBangla(
        day
      )} ${banglaMonth} / ${formattedDate} (${weekdayBn} / ${weekdayEn}) \u09B0\u09BE\u09A4 ${toBangla(
        time
      )} / ${time} \u098F \u0995\u09CD\u09B2\u09BE\u09B8 \u09B6\u09C1\u09B0\u09C1 \u09B9\u09AC\u09C7\u0964  

\u{1F4D6} \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09AA\u09DC\u09BE:  
\u09B8\u09C2\u09B0\u09BE\u0983 *${s.name_bn} | ${s.name_en} | ${s.name_ar} (${ayahRangeBn} | ${ayahRangeAr} | ${ayahRange})*  
\u09B8\u09C2\u09B0\u09BE / Surah: *${toBangla(s.id)} / ${toArabic(s.id)} / ${s.id}*  
\u09AA\u09BE\u09B0\u09BE / Juz: *${juzBn} / ${juzAr} / ${juzDisplay}*  

\u09AC\u09BF\u09B6\u09C7\u09B7 \u09A6\u09CD\u09B0\u09B7\u09CD\u099F\u09AC\u09CD\u09AF:  
\u0985\u09AC\u09B6\u09CD\u09AF\u0987 \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09AA\u09A1\u09BC\u09BE \u09E9 \u09A5\u09C7\u0995\u09C7 \u09EB \u09AC\u09BE\u09B0 \u0985\u09A8\u09C1\u09B6\u09C0\u09B2\u09A8 \u0995\u09B0\u09C7 \u0986\u09B8\u09A4\u09C7 \u09B9\u09AC\u09C7 \u09AF\u09BE\u09A4\u09C7 \u09B8\u09BE\u09AC\u09B2\u09C0\u09B2\u09AD\u09BE\u09AC\u09C7 \u09AA\u09A1\u09BC\u09BE \u09A6\u09C7\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964  
\u0986\u09B2\u09CD\u09B2\u09BE\u09B9 \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u0987\u09B2\u09AE\u09C7\u09B0 \u09AA\u09A5\u09C7 \u0985\u099F\u09B2 \u09B0\u09BE\u0996\u09C1\u09A8\u0964 \u0622\u0645\u064A\u0646 \u{1F932}  
`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4" }, _attrs))}><div class="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8"><h2 class="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center"><span class="mr-2">\u{1F4DC}</span> \u0995\u09CD\u09B2\u09BE\u09B8 \u09A8\u09CB\u099F\u09BF\u09B6 \u099C\u09C7\u09A8\u09BE\u09B0\u09C7\u099F\u09B0 </h2><div class="mb-6"><label class="block text-sm font-medium text-gray-700 mb-2"> \u09B8\u09C2\u09B0\u09BE \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8 </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(surahs, (s) => {
        _push(`<option${ssrRenderAttr("value", s)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSurah)) ? ssrLooseContain(unref(selectedSurah), s) : ssrLooseEqual(unref(selectedSurah), s)) ? " selected" : ""}>${ssrInterpolate(s.id)}. ${ssrInterpolate(s.name_bn)} (${ssrInterpolate(s.name_en)}) </option>`);
      });
      _push(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> \u09B6\u09C1\u09B0\u09C1 \u0986\u09DF\u09BE\u09A4 </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(unref(ayahOptions), (ayah) => {
        _push(`<option${ssrRenderAttr("value", ayah)}${ssrIncludeBooleanAttr(Array.isArray(unref(ayahStart)) ? ssrLooseContain(unref(ayahStart), ayah) : ssrLooseEqual(unref(ayahStart), ayah)) ? " selected" : ""}>${ssrInterpolate(toBangla(ayah))} (${ssrInterpolate(ayah)}) </option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> \u09B6\u09C7\u09B7 \u0986\u09DF\u09BE\u09A4 </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(unref(ayahOptions), (ayah) => {
        _push(`<option${ssrRenderAttr("value", ayah)}${ssrIncludeBooleanAttr(ayah < unref(ayahStart)) ? " disabled" : ""}${ssrIncludeBooleanAttr(Array.isArray(unref(ayahEnd)) ? ssrLooseContain(unref(ayahEnd), ayah) : ssrLooseEqual(unref(ayahEnd), ayah)) ? " selected" : ""}>${ssrInterpolate(toBangla(ayah))} (${ssrInterpolate(ayah)}) </option>`);
      });
      _push(`<!--]--></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"><div><label class="block text-sm font-medium text-gray-700 mb-2"> \u09AA\u09BE\u09B0\u09BE (Juz) </label><select class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"><!--[-->`);
      ssrRenderList(unref(juzOptions), (juz) => {
        _push(`<option${ssrRenderAttr("value", juz)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedJuz)) ? ssrLooseContain(unref(selectedJuz), juz) : ssrLooseEqual(unref(selectedJuz), juz)) ? " selected" : ""}>${ssrInterpolate(toBangla(juz))} (${ssrInterpolate(juz)}) </option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2"> \u09A4\u09BE\u09B0\u09BF\u0996 \u0993 \u09B8\u09AE\u09DF </label><input${ssrRenderAttr("value", unref(selectedTimestamp))} type="datetime-local" class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"></div></div><div class="mb-6"><div class="flex justify-between items-center mb-2"><h3 class="text-lg font-medium text-gray-700">\u{1F4DD} Generated Text</h3><button class="bg-blue-500 text-whites px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy </button></div><textarea style="${ssrRenderStyle({ "height": "300px", "width": "100%" })}" class="border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-800 resize-none focus:ring-2 focus:ring-blue-500">${ssrInterpolate(unref(generatedText))}</textarea></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/smsg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=smsg-BzbHiLDx.mjs.map
