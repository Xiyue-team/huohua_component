/**
 *图片工具类
 *@since 2.0
 *@author zhiguo
 *@Date 18-10-30 下午3:50
 *
 */
export  class ImageUtil {

    static loadImages(srcs: any): Promise<Object> {
        const images = {};
        let imagen = srcs.length;
        return new Promise<Object>(( resolve , reject) => {
            for ( let i = 0; i < srcs.length; i++) {
                const image = new Image();
                image.onload = image.onerror = function() {
                    imagen --;
                    if (imagen === 0) {
                        resolve(images);
                    }
                };
                image.src = srcs[i].src;
                images[srcs[i].id] = image ;
            }

           /* for (let i = 0; i < Object.keys(srcs).length; i++) {
            }*/
        });

    }

}
