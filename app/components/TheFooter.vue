<template>
  <footer class="py-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-primary-600 rounded flex items-center justify-center font-bold text-white text-xs">
            A
          </div>
          <span class="font-bold tracking-tight">Antigravity</span>
        </div>
        
        <div class="flex gap-8 text-sm text-slate-400">
          <a href="#" class="hover:text-white transition-colors">Privacy</a>
          <a href="#" class="hover:text-white transition-colors">Terms</a>
          <a href="#" class="hover:text-white transition-colors">GitHub</a>
          <a href="#" class="hover:text-white transition-colors">Twitter</a>
        </div>
        
        <div class="text-sm text-slate-500">
          © {{ new Date().getFullYear() }} Antigravity Inc.
        </div>
      </div>
    </div>
  </footer>
</template>
