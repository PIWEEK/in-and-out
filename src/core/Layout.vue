<template functional>
  <div class="h-full flex flex-col bg-tertiary-darkest font-serif text-white">
    <header>
      <slot name="header" />
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
