export class InjectParameter {
  viewConfig = (process.env.component as any).config;
  getIsEcryotion: Function;
  constructor() {
    this.getIsEcryotion = function() {
      return this.viewConfig.isEncryption === true || this.viewConfig.isEncryption === undefined;
    };
  }
}
