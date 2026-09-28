<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import { useThemeStore } from '../../stores/theme';
import { WEEKLY_ACTIVITY } from '../../data/dummyData';
import { formatNumber } from '../../utils/formatters';

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
  const gridColor = isDark ? '#2a303b' : '#f1f5f9';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: WEEKLY_ACTIVITY.map(d => d.day),
      datasets: [
        {
          label: 'Daily Active Users',
          data: WEEKLY_ACTIVITY.map(d => d.activeUsers),
          backgroundColor: '#3b82f6',
          hoverBackgroundColor: '#2563eb',
          borderRadius: 4,
          borderSkipped: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#1e222b' : '#ffffff',
          titleColor: isDark ? '#f1f5f9' : '#0f172a',
          bodyColor: isDark ? '#94a3b8' : '#475569',
          borderColor: isDark ? '#2a303b' : '#e2e8f0',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: (ctx) => ` Active: ${formatNumber(ctx.parsed.y ?? 0)} users`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: textColor,
            font: { family: 'Inter, sans-serif', size: 11 }
          }
        },
        y: {
          grid: {
            color: gridColor
          },
          ticks: {
            color: textColor,
            font: { family: 'Inter, sans-serif', size: 11 },
            callback: (val) => formatNumber(Number(val))
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
  <div class="w-full h-72 relative">
    <canvas ref="canvasRef" class="w-full h-full" />
  </div>
</template>
