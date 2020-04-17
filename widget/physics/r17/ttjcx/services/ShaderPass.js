/**
 * @author alteredq / http://alteredqualia.com/
 */
var THREE1 = require('./three')
THREE1.ShaderPass = function ( shader, textureID ) {

    THREE1.Pass.call( this );

	this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

	if ( shader instanceof THREE1.ShaderMaterial ) {

		this.uniforms = shader.uniforms;

		this.material = shader;

	} else if ( shader ) {

		this.uniforms = THREE1.UniformsUtils.clone( shader.uniforms );

		this.material = new THREE1.ShaderMaterial( {

			defines: Object.assign( {}, shader.defines ),
			uniforms: this.uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader

		} );

	}

	this.camera = new THREE1.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene = new THREE1.Scene();

	this.quad = new THREE1.Mesh( new THREE1.PlaneBufferGeometry( 2, 2 ), null );
	this.quad.frustumCulled = false; // Avoid getting clipped
	this.scene.add( this.quad );

};

THREE1.ShaderPass.prototype = Object.assign( Object.create( THREE1.Pass.prototype ), {

	constructor: THREE1.ShaderPass,

	render: function( renderer, writeBuffer, readBuffer, delta, maskActive ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		this.quad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.render( this.scene, this.camera );

		} else {

			renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		}

	}

} );
