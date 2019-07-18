<template functional>
  <FaIcon
    v-if="!props.loading && props.icon !== 'resume-circle'"
    size="4x"
    :class="{
      'opacity-50 cursor-not-allowed': props.disabled,
      'cursor-pointer': !props.disabled,
    }"
    :icon="props.icon"
    @click="props.disabled || listeners.click()"
  />
  <FaLayers
    v-else-if="!props.loading"
    :class="{
      'opacity-50 cursor-not-allowed': props.disabled,
      'cursor-pointer': !props.disabled,
    }"
    class="fa-4x"
    @click="props.disabled || listeners.click()"
  >
    <FaIcon icon="circle" />
    <FaIcon icon="redo-alt" class="text-tertiary-darkest" transform="shrink-6" />
  </FaLayers>
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
