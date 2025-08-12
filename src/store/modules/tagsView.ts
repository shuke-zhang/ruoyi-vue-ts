export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<RouteRecordRaw[]>([])
  const cachedViews = ref<string[]>([])
  const iframeViews = ref<RouteRecordRaw[]>([])

  function addVisitedView(view) {

  }
})
