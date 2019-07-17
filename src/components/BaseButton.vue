<template functional>
  <button
    class="font-bold py-2 px-4 rounded"
    :class="{
      [`text-white bg-${props.kind} hover:bg-${props.kind}-dark`]: !props.outline,
      [`bg-transparent hover:bg-${props.kind} text-${props.kind} hover:text-white
        border border-${props.kind} hover:border-transparent`]: props.outline,
      [`opacity-50 cursor-not-allowed`]: props.disabled,
    }"
    v-bind="props"
    v-on="listeners"
  >
    <slot />
  </button>
</template>
