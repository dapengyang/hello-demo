<template>
          <treeselect
                  :multiple="true"
                  :default-expand-level="1"
    :options="options"
    :value-consists-of="valueConsistsOf"
    v-model="value"
                  sortValueBy="LEVEL"
    ></treeselect>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
//import menu from '../config/menu.js'

export default {
  name: '',
  components:{
  Treeselect
  },
  data() {
    return {
      value: [ 'team-i' ],
    valueConsistsOf: 'BRANCH_PRIORITY',
    options:[ {
        id: 'team-i',
        label: 'Team I 👥',
        children: [ {
          id: 'person-a',
          label: 'Person A 👱',
        }, {
          id: 'person-b',
          label: 'Person B 🧔',
        } ],
      }, {
        id: 'team-ii',
        label: 'Team II 👥',
        children: [ {
          id: 'person-c',
          label: 'Person C 👳',
        }, {
          id: 'person-d',
          label: 'Person D 👧',
        } ],
      }, {
        id: 'person-e',
        label: 'Person E 👩',
      } ]
    }
  },
  created() {
  },
  methods: {
    
  },
  computed: {
    
  },
  watch: {
    
  }
}
</script>

<style lang="scss" scoped>

</style>
