<template functional>
  <button
    class="text-white font-bold py-2 px-4 rounded"
    :class="`bg-${props.kind} hover:bg-${props.kind}-dark`"
    v-bind="props"
    v-on="listeners"
  >
    <slot />
  </button>
</template>
