<template functional>
  <FaIcon v-if="!props.loading" v-bind="props" v-on="listeners" />
  <FaLayers
    v-else
    class="opacity-50 cursor-not-allowed"
    :class="{ [`fa-${props.size}`]: props.size }"
  >
    <FaIcon icon="circle" />
    <FaIcon
      icon="spinner"
      class="text-tertiary-darkest"
      transform="shrink-6"
      spin
    />
  </FaLayers>
</template>
