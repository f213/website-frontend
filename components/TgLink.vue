<template>
  <a class="tg-link" href="tg://resolve?domain=pmdaily" v-metrika="'subscribe-telegram'">
    <slot>
      <i class="fa fa-paper-plane-o tg-link__icon" v-if="withIcon" />
      <span class="tg-link__label" :class="labelClass">{{ label }}</span>
    </slot>
  </a>
</template>
<script>
export default {
  props: {
    withIcon: { type: Boolean, default: false },
    label: { type: String, default: 'Подписаться на телеграм' },
    labelClass: { type: String, default: () => '' },
  },
};
</script>

<style scoped>
.tg-link {
  white-space: nowrap;

  &__icon {
    opacity: .9;
    color: var(--link-color);
  }

  @media (width > 768px) {
    &:hover, &:hover &__icon {
      color: var(--link-hover);
    }
  }

  &:not(:hover) &__icon {
    transition: color .5s ease
  }

  &__label {
    white-space: nowrap;
  }
}
</style>
