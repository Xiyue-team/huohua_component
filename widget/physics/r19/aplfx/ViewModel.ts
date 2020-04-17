import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {AplfxViewHandler} from './services/AplfxViewHandler';

@Component
export class ViewModel extends Vue {

    created() {
        ViewController.getInstance(new AplfxViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }


}

