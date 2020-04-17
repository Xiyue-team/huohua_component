pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.className = 'loading';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var loadingDiv = document.createElement('div');
        loadingDiv.className = 'ui-flex justify-center center';
        splash.appendChild(loadingDiv);

    };

    var hideSplash = function () {
        var splash = document.querySelector('.loading');
        splash.parentElement.removeChild(splash);
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #ffffff;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #ffffff;',
            '}',

            '.rotate_animate {',
            '    -webkit-animation:zq 1.2s linear  infinite;',
            '    animation:zq 1.2s linear  infinite;',
            '}',

            '@keyframes zq{',
            ' from{transform:rotate(0deg);}',
            'to{transform:rotate(360deg);}',
            '}',
            '@-webkit-keyframes zq{',
            'from{-webkit-transform:rotate(0deg);}',
            'to{-webkit-transform:rotate(360deg);}',
            '}',

            '.loading{',
            'position: absolute;',
            'z-index: 999;',
            'width: 100%;',
            'height: 100%;',
            'background: #FFFFFF;',
            'margin: 0;',
            'padding: 0;',
            '}',

            '.ui-flex{',
            '    display: -webkit-box !important;',
            '    display: -webkit-flex !important;',
            '    display: -ms-flexbox !important;',
            '    display: flex !important;',
            '    -webkit-flex-wrap: wrap;',
            '    -ms-flex-wrap: wrap;',
            '   flex-wrap: wrap;',
            '}',

            '.ui-flex.justify-center {',
            '  -webkit-box-pack: center;',
            '  -webkit-justify-content: center;',
            '  -ms-flex-pack: center;',
            '  justify-content: center',
            '}',

            '.ui-flex.center {',
            '  -webkit-box-pack: center;',
            '  -ms-flex-pack: center;',
            '  justify-content: center;',
            '  -webkit-box-align: center;',
            '  -webkit-align-items: center;',
            '  -ms-flex-align: center;',
            '  align-items: center;',
            '}',

        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();
    app.on('start', hideSplash);
});
