import ContentManagementSystem from '../content-management-system.mjs'
class CosmicJS extends ContentManagementSystem {
    constructor (config, sdk) {
        super(config)
        this.sdk = sdk
        this.bucketSlug = config.bucketSlug
    }

    init() {
        if (!this.readKey) { throw 'readKey is not defined' }
        if (!this.writeKey) { throw 'writeKey is not defined' }
        if (!this.bucketSlug) { throw 'bucketSlug is not defined' }

        this.client = this.sdk.createBucketClient({
            readKey: this.readKey,
            writeKey: this.writeKey,
            bucketSlug: this.bucketSlug
        })
    }

    getPageById () {
        return []
    }
}

export default CosmicJS
