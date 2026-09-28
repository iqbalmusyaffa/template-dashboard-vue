<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import { useThemeStore } from '../../stores/theme';
import { REVENUE_DATA } from '../../data/dummyData';
import { formatCurrency } from '../../utils/formatters';

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

  // Area Gradient for Revenue
  const revGradient = ctx.createLinearGradient(0, 0, 0, 240);
  revGradient.addColorStop(0, isDark ? 'rgba(99, 102, 241, 0.4)' : 'rgba(79, 70, 229, 0.2)');
  revGradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: REVENUE_DATA.map(d => d.period),
      datasets: [
        {
          label: 'Revenue',
          data: REVENUE_DATA.map(d => d.revenue),
          borderColor: '#4f46e5',
          backgroundColor: revGradient,
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: '#4f46e5'
        },
        {
          label: 'Expenses',
          data: REVENUE_DATA.map(d => d.expenses),
          borderColor: '#94a3b8',
          borderDash: [4, 4],
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 5,
          pointBackgroundColor: '#94a3b8'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            font: { family: 'Inter, sans-serif', size: 12 },
            boxWidth: 12,
            boxHeight: 12,
            useBorderRadius: true,
            borderRadius: 3
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#1e222b' : '#ffffff',
          titleColor: isDark ? '#f1f5f9' : '#0f172a',
          bodyColor: isDark ? '#94a3b8' : '#475569',
          borderColor: isDark ? '#2a303b' : '#e2e8f0',
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y ?? 0)}`
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
            callback: (val) => formatCurrency(Number(val))
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
