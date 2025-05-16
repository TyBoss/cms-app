import { before, describe, it, mock } from 'node:test'
import assert from 'node:assert'

import COSMIC_CMS from './cosmic.mjs'

describe('Cosmic - CMS', () => {
    const createBucketClient = mock.fn()
    before(() => {
        
    })

    it('init should create a cosmic client', () => {
      let sut = new COSMIC_CMS({readKey: 'readPlease!', writeKey: 'writePlease!', bucketSlug: 'snails!'}, { createBucketClient })
      sut.init()
      assert.strictEqual(createBucketClient.mock.callCount(), 1)
    }) 

    it('init will throw if readkey is not defined', () => {
        let sut = new COSMIC_CMS({}, { createBucketClient })
        assert.throws(() => sut.init(), /readKey is not defined/, 'Expected error for readKey')
    })

    it('init will throw if writeKey is not defined', () => {
        let sut = new COSMIC_CMS({readKey: 'readPlease!'}, { createBucketClient })
        assert.throws(() => sut.init(), /writeKey is not defined/, 'Expected error for writeKey')
    })

    it('init will throw if bucketSlug is not defined', () => {
        let sut = new COSMIC_CMS({readKey: 'readPlease!', writeKey: 'writePlease!'}, { createBucketClient })
        assert.throws(() => sut.init(), /bucketSlug is not defined/, 'Expected error for bucketSlug')
    })
})

