  <template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../../assets/css/core.css';
import '../../assets/css/layout.css';
import h_button from '../ui/button.vue';
import vueSlider from '../ui/vue2-slider.vue';
const _ = require('lodash');


export default Vue.extend({
    name: 'ExerciseLayout',
    props: {
        width: {
            type: [Number, String],
            default: 'auto'
        },
        height: {
            type: [Number, String],
            default: 6
        },
        exercise: {
            type: [Object]
        },
        resizeCall: {
            type: [Function]
        }

    },
    data() {
        return{

        };
    },

    components: {
        vueSlider, h_button,

    },

    created() {
//       new vConsole();
    },
    mounted() {
    },
    computed: {
    },
    watch: {
    },
    methods: {

    }
});
</script>

<style scoped="scoped">


</style>
