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

        let cmstype = this.cmsList[type]
        this.cms = { init: () => { throw `cms type: ${type || 'undefined' } could not be initialized `} }
        if (cmstype) {
            instance.cms = new cmstype(opts)
        }
        instance.cms.init()
    }

    getPageById(id) {
        return this.cms.getPageById(id)
    }
}

export default ContentManager 
