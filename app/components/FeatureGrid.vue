<template>
  <section class="py-24 bg-slate-900/50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
        <p class="text-slate-400 max-w-xl mx-auto">
          Powerful features designed to help you build faster, scale easier, and deliver better experiences.
        </p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index" 
             class="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 hover:border-primary-500/50 transition-all group">
          <div class="w-12 h-12 rounded-2xl bg-primary-600/10 flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
            <component :is="feature.icon" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
          <p class="text-slate-400 leading-relaxed text-sm">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    title: 'Modern Architecture',
    description: 'Built with the latest technologies including Nuxt 3 and Tailwind CSS for maximum performance.',
    icon: 'div' // Placeholder for icons
  },
  {
    title: 'Premium Design',
    description: 'Every component is carefully crafted to provide a high-end feel and exceptional user experience.',
    icon: 'div'
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized for speed at every level, ensuring your application feels responsive and fluid.',
    icon: 'div'
  }
]
</script>
