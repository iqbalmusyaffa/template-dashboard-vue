<script setup lang="ts">
import AppPageHeader from '../../components/common/AppPageHeader.vue';
import AppCard from '../../components/common/AppCard.vue';
import AppButton from '../../components/common/AppButton.vue';
import AppAvatar from '../../components/common/AppAvatar.vue';
import { Network, Plus, ShieldCheck } from 'lucide-vue-next';

interface TeamItem {
  id: string;
  name: string;
  lead: string;
  membersCount: number;
  description: string;
  projectsCount: number;
}

const teams: TeamItem[] = [
  {
    id: 'team-1',
    name: 'Core Infrastructure & Cloud',
    lead: 'Marcus Vance',
    membersCount: 8,
    description: 'Kubernetes orchestration, multi-cloud failover, and zero-trust IAM governance.',
    projectsCount: 14
  },
  {
    id: 'team-2',
    name: 'Distributed Platform APIs',
    lead: 'Elena Rostova',
    membersCount: 12,
    description: 'High-throughput microservices, edge caching, and real-time streaming pipelines.',
    projectsCount: 22
  },
  {
    id: 'team-3',
    name: 'Security & Compliance Engineering',
    lead: 'Julian Sterling',
    membersCount: 5,
    description: 'SOC2 Type II verification, cryptographic key life-cycles, and vulnerability triage.',
    projectsCount: 9
  },
  {
    id: 'team-4',
    name: 'Customer Experience & UX',
    lead: 'Sarah Chen-Morrison',
    membersCount: 7,
    description: 'Product design systems, usability research, and frontend enterprise analytics.',
    projectsCount: 11
  }
];
</script>

<template>
  <div class="space-y-6 text-left">
    <AppPageHeader
      title="Teams & Organizational Structure"
      description="Manage cross-functional engineering teams, permission boundaries, and project ownership."
      :breadcrumbs="[{ label: 'Dashboard', to: '/dashboard' }, { label: 'Teams & Org' }]"
    >
      <template #actions>
        <AppButton variant="primary" size="md">
          <template #prefix>
            <Plus class="w-4 h-4" />
          </template>
          Create New Team
        </AppButton>
      </template>
    </AppPageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AppCard
        v-for="team in teams"
        :key="team.id"
        :title="team.name"
      >
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-md bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 flex items-center justify-center">
              <Network class="w-4 h-4" />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary">
                {{ team.name }}
              </h3>
              <p class="text-xs text-light-text-muted dark:text-dark-text-muted">
                {{ team.membersCount }} members &bull; {{ team.projectsCount }} active services
              </p>
            </div>
          </div>
        </template>

        <p class="text-xs text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
          {{ team.description }}
        </p>

        <div class="pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <AppAvatar :name="team.lead" size="xs" />
            <span class="text-light-text-muted dark:text-dark-text-muted">
              Lead: <span class="font-medium text-light-text-primary dark:text-dark-text-primary">{{ team.lead }}</span>
            </span>
          </div>
          <span class="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck class="w-3.5 h-3.5" /> Enforced RBAC
          </span>
        </div>
      </AppCard>
    </div>
  </div>
</template>
