const WEBGL = require('../lib/WebGL');
const Viewer = require('./viewer');
const SimpleDropzone = require('simple-dropzone');
const ValidationController = require('./validation-controller');
const queryString = require('query-string');
const models = [{ 'path': '../assets/qyj/qw.gltf', 'file': { 'name': 'qw.gltf' } }, {}, {}, {}];
if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  console.error('The File APIs are not fully supported in this browser.');
} else if (!WEBGL.isWebGLAvailable()) {
  console.error('WebGL is not supported in this browser.');
}

class App {

  /**
   * @param  {Element} el
   * @param  {Location} location
   */
  constructor(el, location) {

    const hash = location.hash ? queryString.parse(location.hash) : {};
    this.options = {
      kiosk: Boolean(hash.kiosk),
      model: hash.model || '',
      preset: hash.preset || '',
      cameraPosition: hash.cameraPosition
        ? hash.cameraPosition.split(',').map(Number)
        : null
    };

    this.el = el;
    this.viewer = null;
    this.viewerEl = null;
    this.spinnerEl = el.querySelector('.spinner');
    this.dropEl = el.querySelector('.dropzone');

    this.view()

    this.validationCtrl = new ValidationController(el);

    this.createDropzone();

  }

  /**
   * Sets up the drag-and-drop controller.
   */
  createDropzone() {

  }

  /**
   * Sets up the view manager.
   * @return {Viewer}
   */
  createViewer() {
    this.viewerEl = document.createElement('div');
    this.viewerEl.classList.add('viewer');

    this.dropEl.appendChild(this.viewerEl);
    // console.log(this.options)
    this.viewer = new Viewer(this.viewerEl, this.options);
    return this.viewer;
  }

  /**
   * Loads a fileset provided by user action.
   * @param  {Map<string, File>} fileMap
   */
  load(fileMap) {
    let rootFile;
    let rootPath;
    Array.from(fileMap).forEach(([path, file]) => {
      if (file.name.match(/\.(gltf|glb)$/)) {
        rootFile = file;
        rootPath = path.replace(file.name, '');
      }
    });

    if (!rootFile) {
      this.onError('No .gltf or .glb asset found.');
    }

    this.view(rootFile, rootPath, fileMap);
  }

  /**
   * Passes a model to the viewer, given file and resources.
   * @param  {File|string} rootFile
   * @param  {string} rootPath
   * @param  {Map<string, File>} fileMap
   */
  view() {

    if (this.viewer) this.viewer.clear();

    const viewer = this.viewer || this.createViewer();
  }

  /**
   * @param  {Error} error
   */
  onError(error) {
    let message = (error || {}).message || error.toString();
    if (message.match(/ProgressEvent/)) {
      message = 'Unable to retrieve this file. Check JS console and browser network tab.';
    } else if (message.match(/Unexpected token/)) {
      message = `Unable to parse file content. Verify that this file is valid. Error: "${message}"`;
    } else if (error && error.target && error.target instanceof Image) {
      message = 'Missing texture: ' + error.target.src.split('/').pop();
    }
    window.alert(message);
    console.error(error);
  }

  showSpinner() {
    this.spinnerEl.style.display = '';
  }

  // hideSpinner() {
  //   this.spinnerEl.style.display = 'none';
  // }
}

document.addEventListener('DOMContentLoaded', () => {

  const app = new App(document.body, location);

});
