/**
 * A regionalised container for all the commercial tags.
 */
define([
    'Promise',
    'common/utils/config',
    'common/utils/mediator',
    'common/modules/commercial/third-party-tags/audience-science-gateway',
    'common/modules/commercial/third-party-tags/imr-worldwide',
    'common/modules/commercial/third-party-tags/remarketing',
    'common/modules/commercial/third-party-tags/krux',
    'common/modules/commercial/third-party-tags/outbrain'
], function (
    Promise,
    config,
    mediator,
    audienceScienceGateway,
    imrWorldwide,
    remarketing,
    krux,
    outbrain
) {

    function init() {

        if (config.page.contentType === 'Identity' || config.page.section === 'identity') {
            return false;
        }

        switch (config.page.edition.toLowerCase()) {
            case 'uk':
                audienceScienceGateway.load();
                break;
        }

        if (config.switches.thirdPartiesLater) {
            var timeout = setTimeout(loadOther, 1000);
            // Load third parties after first ad was rendered
            mediator.once('modules:commercial:dfp:rendered', function () {
                loadOther();
                clearTimeout(timeout);
            });
        } else {
            loadOther();
        }

        return Promise.resolve(null);
    }

    function loadOther() {
        imrWorldwide.load();
        remarketing.load();
        outbrain.load();
        krux.load();
    }

    return {
        init: init
    };
});
