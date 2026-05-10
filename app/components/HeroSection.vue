<template>
  <section class="relative pt-32 pb-20 overflow-hidden">
    <!-- Background Accents -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary-600/20 blur-[120px] -z-10 rounded-full">
    </div>

    <div class="max-w-7xl mx-auto px-6 text-center">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-8 animate-fade-in">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        NEW VERSION 4.0 IS OUT
      </div>

      <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-slide-up">
        Blogs <br />
        <span
          class="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-500 bg-clip-text text-transparent bg-gradient-x">
          Tech
        </span>
      </h1>

      <p
        class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up [animation-delay:200ms] opacity-0">
        Experience the next generation of web development with our high-performance,
        premium-designed components and architecture.
      </p>

    </div>
  </section>
</template>

<style scoped>
.opacity-0 {
  opacity: 0;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
