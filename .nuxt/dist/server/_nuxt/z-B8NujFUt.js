import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
const _sfc_main = {
  __name: "z",
  __ssrInlineRender: true,
  setup(__props) {
    const questions = ref([
      {
        id: 1,
        surah: "আল-মুলক | Al-Mulk | سورة الملك",
        verses: [
          { id: 1, start: 1, end: 7 },
          { id: 2, start: 8, end: 16 },
          { id: 3, start: 17, end: 24 },
          { id: 4, start: 25, end: 30 }
        ]
      },
      {
        id: 2,
        surah: "আল-মুযযাম্মিল | Al-Muzzammil | سورة المزمل",
        verses: [
          { id: 1, start: 1, end: 11 },
          { id: 2, start: 12, end: 19 },
          { id: 3, start: 20, end: null }
        ]
      }
    ]);
    const lotteryChunks = ref([]);
    const generateLotteryChunks = () => {
      const chunks = [];
      let serialNumber = 1;
      const allVerses = [];
      questions.value.forEach((question) => {
        question.verses.forEach((verse) => {
          allVerses.push({
            surah: question.surah,
            verses: verse
          });
        });
      });
      for (let i = 0; i < 29; i++) {
        const questionIndex = i % allVerses.length;
        const selectedQuestion = allVerses[questionIndex];
        chunks.push({
          serialNumber: serialNumber++,
          surah: selectedQuestion.surah,
          verses: selectedQuestion.verses
        });
      }
      return chunks;
    };
    lotteryChunks.value = generateLotteryChunks();
    const convertToArabicNumbers = (number) => {
      const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return number.toString().split("").map((digit) => arabicNumbers[parseInt(digit)]).join("");
    };
    const convertToBanglaNumbers = (number) => {
      const banglaNumbers = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
      return number.toString().split("").map((digit) => banglaNumbers[parseInt(digit)]).join("");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-50 lottery-page"><div class="print:hidden bg-white shadow-sm border-b p-4 mb-6"><div class="max-w-7xl mx-auto"><h1 class="text-2xl font-bold text-emerald-800 mb-4"> Quran Competition Lottery Chunks Generator </h1><div class="text-gray-600 mb-4"> Total Chunks: ${ssrInterpolate(unref(lotteryChunks).length)}</div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"> 🖨️ Print Lottery Chunks </button></div></div><div class="max-w-7xl mx-auto p-4"><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(lotteryChunks), (chunk) => {
        _push(`<div class="lottery-chunk bg-white border-2 border-dashed border-emerald-300 rounded p-1 min-w-[300px]"><div class="text-center mb-1"><div class="text-xs font-bold text-emerald-800 print:text-xs leading-tight"> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা </div><div class="text-xs text-emerald-600 print:text-xs"> ১৪৪৭ হিজরি </div></div><div class="text-center mb-2"><div class="bg-emerald-100 border border-emerald-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto print:w-6 print:h-6"><span class="text-sm font-bold text-emerald-800 print:text-xs">${ssrInterpolate(chunk.serialNumber)}</span></div></div><div class="text-center mb-2"><div class="text-xs font-bold text-emerald-900 print:text-xs leading-tight">${ssrInterpolate(chunk.surah)}</div></div><div class="text-center flex justify-center items-center gap-2 font-bold text-sm text-emerald-800"><div class="">`);
        if (chunk.verses.end !== null) {
          _push(`<!--[-->${ssrInterpolate(convertToBanglaNumbers(chunk.verses.start))}-${ssrInterpolate(convertToBanglaNumbers(chunk.verses.end))}<!--]-->`);
        } else {
          _push(`<!--[-->${ssrInterpolate(convertToBanglaNumbers(chunk.verses.start))}<!--]-->`);
        }
        _push(`</div><span>|</span><div class="">`);
        if (chunk.verses.end !== null) {
          _push(`<!--[-->${ssrInterpolate(chunk.verses.start)}-${ssrInterpolate(chunk.verses.end)}<!--]-->`);
        } else {
          _push(`<!--[-->${ssrInterpolate(chunk.verses.start)}<!--]-->`);
        }
        _push(`</div><span>|</span><div class="">`);
        if (chunk.verses.end !== null) {
          _push(`<!--[-->${ssrInterpolate(convertToArabicNumbers(chunk.verses.start))}-${ssrInterpolate(convertToArabicNumbers(chunk.verses.end))}<!--]-->`);
        } else {
          _push(`<!--[-->${ssrInterpolate(convertToArabicNumbers(chunk.verses.start))}<!--]-->`);
        }
        _push(`</div></div><div class="text-center mt-2"><div class="text-xs text-red-600 font-medium print:text-xs">`);
        if (chunk.verses.end !== null) {
          _push(`<!--[--> আপনাকে ${ssrInterpolate(convertToBanglaNumbers(chunk.verses.start))}-${ssrInterpolate(convertToBanglaNumbers(chunk.verses.end))} নম্বর আয়াতসমূহ পড়তে হবে <!--]-->`);
        } else {
          _push(`<!--[--> আপনাকে শুধুমাত্র এই ${ssrInterpolate(convertToBanglaNumbers(chunk.verses.start))} নম্বর আয়াতটি পড়তে হবে <!--]-->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/z.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=z-B8NujFUt.js.map
