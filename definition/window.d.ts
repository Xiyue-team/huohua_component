import {Environment} from '../src/core/Environment';
import {ViewHandler, ViewOption} from '../src/core/CoreInterface';


declare global {
  interface Window {
    env: Environment;
    viewOption: ViewOption;
    viewHandler: ViewHandler;
    userId: any;
    clientToken: any;
  }
}
