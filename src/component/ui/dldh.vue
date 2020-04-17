<template>

    <div class="background">
        <div class="video">

        </div>

        <div class="contatiner">

        </div>

    </div>

</template>

<script lang='ts'>
    import Vue from "vue";


    export default Vue.extend({
        props: {
            value: {
                type: Number,
                default: 4
            }
        },
        methods: {},
        created() {
            console.log('--------------------------', this.value);
        }
    });
</script>

<style scoped>
    .background {
        width: 100%;
        height: 100%;
        background-color: #353435;
    }

    .video {
        position: absolute;
        top: 10%;
        left: 20%;
        width: 60%;
        height: 70%;
        background-color: white;
    }

    .contatiner {
        position: absolute;
        top: 83%;
        left: 20%;
        width: 60%;
        height: 15%;
        background-color: white;
    }

</style>
