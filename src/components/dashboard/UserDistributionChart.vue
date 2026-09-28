<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import { useThemeStore } from '../../stores/theme';
import { STATUS_DISTRIBUTION } from '../../data/dummyData';

const themeStore = useThemeStore();
const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

function renderChart() {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  const isDark = themeStore.isDark;
  const textColor = isDark ? '#94a3b8' : '#64748b';

  // Palette: Active, Inactive, Pending, Suspended
  const colors = ['#10b981', '#94a3b8', '#f59e0b', '#f43f5e'];

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: STATUS_DISTRIBUTION.map(s => s.status),
      datasets: [
        {
          data: STATUS_DISTRIBUTION.map(s => s.count),
          backgroundColor: colors,
          borderColor: isDark ? '#171a21' : '#ffffff',
          borderWidth: 2,
          hoverOffset: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            font: { family: 'Inter, sans-serif', size: 12 },
            boxWidth: 10,
            boxHeight: 10,
            useBorderRadius: true,
            borderRadius: 2
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1e222b' : '#ffffff',
          titleColor: isDark ? '#f1f5f9' : '#0f172a',
          bodyColor: isDark ? '#94a3b8' : '#475569',
          borderColor: isDark ? '#2a303b' : '#e2e8f0',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed} users`
          }
        }
      }
    }
  });
}

onMounted(() => {
  renderChart();
});

watch(() => themeStore.isDark, () => {
  renderChart();
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<template>
  <div class="w-full h-72 relative flex items-center justify-center">
    <canvas ref="canvasRef" class="w-full h-full" />
  </div>
</template>
