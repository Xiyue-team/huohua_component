/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/7/26 13:42
 */

export class BrowserApiUtil {


    static isSupportWebGl(): boolean {
        try {

            const canvas = document.createElement( 'canvas' );
            return !! ( (window as any).WebGLRenderingContext && ( canvas.getContext( 'webgl' ) ||
                canvas.getContext( 'experimental-webgl' ) ) );

        } catch ( e ) {

            return false;

        }
    }
}
