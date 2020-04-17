import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {Pmgl1ViewHandler} from './services/Pmgl1ViewHandler';

@Component
export class ViewModel extends Vue {
    buttonControl = false;
    created() {
        ViewController.getInstance(new Pmgl1ViewHandler(this));
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }



}

