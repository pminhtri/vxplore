<script setup lang="ts">
import { Center, Container } from '@/uiComponents';
import { getYear } from 'date-fns';

const currentYear = getYear(new Date());
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col"
  >
    <!-- Hero Section -->
    <Container class="grow">
      <Center
        class="w-full flex-col justify-between p-6 md:p-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/60"
      >
        <Center>
          <div class="text-center space-y-6">
            <div
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium"
            >
              <span>✨ New</span>
              <span>Your amazing app is ready</span>
            </div>

            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600"
            >
              Welcome to
              <span class="text-indigo-600">Nexus</span>
            </h1>

            <p
              class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              A modern, responsive, and beautifully crafted landing page to
              kickstart your next big idea.
            </p>

            <div class="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
              <button
                class="px-8 py-3.5 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                Learn More
              </button>
            </div>

            <div class="text-sm text-gray-500">
              More features coming soon! Stay tuned for updates.
            </div>
          </div>
        </Center>
        <!-- Footer (optional) -->
        <footer class="py-6 text-center text-gray-500 text-sm">
          © {{ currentYear }} Your Company. All rights reserved.
        </footer>
      </Center>
    </Container>
  </div>
</template>
