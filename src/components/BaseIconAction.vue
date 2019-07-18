<template functional>
  <FaIcon
    v-if="!props.loading"
    size="4x"
    :class="{
      'opacity-50 cursor-not-allowed': props.disabled,
      'cursor-pointer': !props.disabled,
    }"
    :icon="props.icon"
    @click="props.disabled || listeners.click()"
  />
  <FaLayers v-else class="opacity-50 cursor-not-allowed fa-4x">
    <FaIcon icon="circle" />
    <FaIcon
      icon="spinner"
      class="text-tertiary-darkest"
      transform="shrink-6"
      spin
    />
  </FaLayers>
</template>
