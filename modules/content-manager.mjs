import CMS_LIST from './content-manager-list.mjs'
let instance

class ContentManager {
    constructor(cmsList) {
        this.cmsList = cmsList
        if (!instance) {
            return instance = this
        }
    }

    static getInstance () {
        return instance
    }

    static resetInstance () {
        instance = null
    }

    init (type, opts) {
        if (!this.cmsList) { throw `no list of cms provided` }

        let create = this.cmsList[type]
        this.cms = { init: () => { throw `cms type: ${type || 'undefined' } could not be initialized `} }
        if (typeof create === 'function') {
            instance.cms = create(opts)
            return instance.cms.init()
        }
        throw `value of cms type: "${type}" must be a function that instantiates the cms`
    }

    getPageById(id) {
        return this.cms.getPageById(id)
    }
}

const getContentManager = () => {
    return new ContentManager(CMS_LIST)
}

export default ContentManager 

export { getContentManager }
