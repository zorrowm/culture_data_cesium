import { defineStore } from 'pinia';

export const markdownStore = defineStore('markdown', {
  state: () => ({
    toc: [],
    title: '',
    activeToc: '',
  }),
});
