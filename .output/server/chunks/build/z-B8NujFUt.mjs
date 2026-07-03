import { ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = {
  __name: "z",
  __ssrInlineRender: true,
  setup(__props) {
    const questions = ref([
      {
        id: 1,
        surah: "\u0986\u09B2-\u09AE\u09C1\u09B2\u0995 | Al-Mulk | \u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0643",
        verses: [
          { id: 1, start: 1, end: 7 },
          { id: 2, start: 8, end: 16 },
          { id: 3, start: 17, end: 24 },
          { id: 4, start: 25, end: 30 }
        ]
      },
      {
        id: 2,
        surah: "\u0986\u09B2-\u09AE\u09C1\u09AF\u09AF\u09BE\u09AE\u09CD\u09AE\u09BF\u09B2 | Al-Muzzammil | \u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0632\u0645\u0644",
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
      const arabicNumbers = ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"];
      return number.toString().split("").map((digit) => arabicNumbers[parseInt(digit)]).join("");
    };
    const convertToBanglaNumbers = (number) => {
      const banglaNumbers = ["\u09E6", "\u09E7", "\u09E8", "\u09E9", "\u09EA", "\u09EB", "\u09EC", "\u09ED", "\u09EE", "\u09EF"];
      return number.toString().split("").map((digit) => banglaNumbers[parseInt(digit)]).join("");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-50 lottery-page"><div class="print:hidden bg-white shadow-sm border-b p-4 mb-6"><div class="max-w-7xl mx-auto"><h1 class="text-2xl font-bold text-emerald-800 mb-4"> Quran Competition Lottery Chunks Generator </h1><div class="text-gray-600 mb-4"> Total Chunks: ${ssrInterpolate(unref(lotteryChunks).length)}</div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"> \u{1F5A8}\uFE0F Print Lottery Chunks </button></div></div><div class="max-w-7xl mx-auto p-4"><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(lotteryChunks), (chunk) => {
        _push(`<div class="lottery-chunk bg-white border-2 border-dashed border-emerald-300 rounded p-1 min-w-[300px]"><div class="text-center mb-1"><div class="text-xs font-bold text-emerald-800 print:text-xs leading-tight"> \u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE </div><div class="text-xs text-emerald-600 print:text-xs"> \u09E7\u09EA\u09EA\u09ED \u09B9\u09BF\u099C\u09B0\u09BF </div></div><div class="text-center mb-2"><div class="bg-emerald-100 border border-emerald-300 rounded-full w-8 h-8 flex items-center justify-center mx-auto print:w-6 print:h-6"><span class="text-sm font-bold text-emerald-800 print:text-xs">${ssrInterpolate(chunk.serialNumber)}</span></div></div><div class="text-center mb-2"><div class="text-xs font-bold text-emerald-900 print:text-xs leading-tight">${ssrInterpolate(chunk.surah)}</div></div><div class="text-center flex justify-center items-center gap-2 font-bold text-sm text-emerald-800"><div class="">`);
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
          _push(`<!--[--> \u0986\u09AA\u09A8\u09BE\u0995\u09C7 ${ssrInterpolate(convertToBanglaNumbers(chunk.verses.start))}-${ssrInterpolate(convertToBanglaNumbers(chunk.verses.end))} \u09A8\u09AE\u09CD\u09AC\u09B0 \u0986\u09DF\u09BE\u09A4\u09B8\u09AE\u09C2\u09B9 \u09AA\u09DC\u09A4\u09C7 \u09B9\u09AC\u09C7 <!--]-->`);
        } else {
          _push(`<!--[--> \u0986\u09AA\u09A8\u09BE\u0995\u09C7 \u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u098F\u0987 ${ssrInterpolate(convertToBanglaNumbers(chunk.verses.start))} \u09A8\u09AE\u09CD\u09AC\u09B0 \u0986\u09DF\u09BE\u09A4\u099F\u09BF \u09AA\u09DC\u09A4\u09C7 \u09B9\u09AC\u09C7 <!--]-->`);
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

export { _sfc_main as default };
//# sourceMappingURL=z-B8NujFUt.mjs.map
