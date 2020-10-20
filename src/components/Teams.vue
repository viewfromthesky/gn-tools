<template>
  <div v-for="(team, i) in teams" :key="`team-${i}`">
    <h3>Team {{ i + 1 }}</h3>
    <ul :class="['team', { 'warning': team.length <= 1 }]">
      <li v-for="(player, i) in team" :key="`player-${i}`">
        <template v-if="advanced">
          {{ player.name }} <Badge :value="`${ player.handicap }`" color="dark" dark />
        </template>
        <template v-else>
          {{ player }}
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import Badge from '@/components/Badge';

export default {
  components: { Badge },
  props: {
    teams: {
      type: Array,
      default: () => ([])
    },
    advanced: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
ul.team {
  border-radius: 12px;
  background-color: #ddd;
  list-style: none;
  padding: 12px;
}

ul.team.warning {
  background-color: #f7390e;
}

ul.team li {
  background-color: rgba(255,255,255,0.4);
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 4px 12px;
}

ul.team.warning li {
  color: #fff;
}

ul.team li:last-of-type {
  margin: 0;
}
</style>