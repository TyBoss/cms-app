import sdk from '@cosmicjs/sdk'

import COSMIC_CMS from './content-managers/cosmic.mjs'
import CMS_TYPES from './content-manager-types.mjs'

export default {
    [CMS_TYPES.COSMIC]: function create (opts) {
        return new COSMIC_CMS(opts, sdk)
    }
}



