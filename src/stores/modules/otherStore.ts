import { defineStore } from 'pinia';
export const otherStore = defineStore('otherStore', {
  state: () => ({
    currentRoute:'/bigscreen/index',
    map3DRoute:'/bigscreen/index',
    map2DRoute:'/bigscreen/map2d'
  }),

  getters: {
    getCurrentRoute(state) {
      return state.currentRoute;
    },
  },

  actions: {
    /**
     * 二三维切换
     */
    toggleMapRoute(router:any)
    {
        // const router=useRouter();

        if(this.currentRoute===this.map2DRoute)
            this.currentRoute=this.map3DRoute;
        else
            this.currentRoute=this.map2DRoute;
        if(router)
        router.push({path:this.currentRoute});
    }
  },
});
