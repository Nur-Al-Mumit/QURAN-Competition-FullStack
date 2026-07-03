<template>
  <section>
    <div :class="['flex justify-center', digits === 4 ? 'gap-3' : 'gap-2']">
      <input
        v-for="(digit, index) in otpInputs"
        :key="index"
        ref="otpInput"
        type="number"
        required
        maxlength="1"
        v-model="otpInputs[index]"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index)"
        @paste="handlePaste($event)"
        :class="[
          'border-2 rounded-[12px] text-center font-semibold appearance-none outline-none focus:outline-none',
          isIncorrectOTP
            ? 'text-red-500 border-red-500 focus:border-red-500 bg-white-1'
            : otpInputs[index]
            ? 'text-primary border-primary bg-blue-1'
            : 'border-white-5 bg-white-3',
          !isIncorrectOTP ? ' focus:border-primary' : '',
          digits === 4
            ? 'w-16 h-20 text-[40px]'
            : 'w-10 h-12 text-[30px] sm:w-14 sm:h-18 sm:text-[40px]',
        ]"
      />
    </div>
    <!-- <p
      v-if="isIncorrectOTP"
      class="base-trans pt-4 text-center text-red-500 text-[13px] leading-[15.86px] font-medium"
    >
      Incorrect PIN. Please enter again
    </p> -->
  </section>
</template>

<script setup>
  const emit = defineEmits(["update:modelValue"]);
  const props = defineProps({
    isIncorrectOTP: {
      type: Boolean,
      default: false,
    },
    digits: {
      type: Number,
      default: 4,
    },
  });

  let otpInputs = ref(Array(props.digits).fill(""));
  let otpInput = ref([]);
  let otp = computed(() => otpInputs.value.join(""));

  function handleInput(index, event) {
    let value = event.target.value;

    if (value.length > 1) {
      value = value.slice(-1); // Keep only the last character
    }

    if (value.match(/^[0-9]$/)) {
      otpInputs.value[index] = value;

      if (index < otpInputs.value.length - 1) {
        otpInput.value[index + 1].focus();
      }
    } else {
      event.target.value = "";
    }
  }

  function handleKeydown(index) {
    if (
      event.key === "Backspace" &&
      otpInputs.value[index] === "" &&
      index > 0
    ) {
      otpInput.value[index - 1].focus();
    }
  }

  function handlePaste(event) {
    const paste = event.clipboardData.getData("text");
    const digits = paste.split("").filter((char) => /^[0-9]$/.test(char));

    if (digits.length === otpInputs.value.length) {
      otpInputs.value.forEach((_, index) => {
        otpInputs.value[index] = digits[index];
      });

      otpInput.value[otpInputs.value.length - 1].focus();
      event.preventDefault();
    }
  }

  onMounted(() => {
    otpInput.value[0]?.focus();
  });

  watch(
    () => otp.value,
    () => {
      emit("update:modelValue", otp.value);
    }
  );
</script>

<style scoped>
  /* Custom CSS for even wider browser support */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    @apply appearance-none;
    margin: 0;
  }

  input[type="number"] {
    @apply appearance-none;
    -moz-appearance: textfield; /* Firefox */
  }
</style>
