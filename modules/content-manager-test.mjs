import { describe, it } from 'node:test'
import assert from 'node:assert'

import TYPES from './content-manager-types.mjs'
import ContentManager from './content-manager.mjs'
import ContentManagementSystem  from './content-management-system.mjs'

describe('ContactManager test', () => {
    it('creates a manager for cosmic', () => {
        const contentManager = new ContentManager({ [TYPES.COSMIC]: {}  })
        assert.ok(contentManager !== undefined, 'Content manager does not exist.')
    })

    it('clears instance for cosmic', () => {
        const contentManager = new ContentManager({ [TYPES.COSMIC]: {} })
        ContentManager.resetInstance()
        assert.equal(contentManager.getInstance , null, 'instance is still available')
    })

    it('initialize cms', (ctx) => {
        const testCallback = ctx.mock.fn()
        class TestManagementSystem extends ContentManagementSystem {
            init(opts) {
                testCallback(opts)
            }
        }

        ContentManager.resetInstance()
        const contentManager = new ContentManager({ [TYPES.COSMIC]: (opts) => new TestManagementSystem(opts) })
        contentManager.init(TYPES.COSMIC, { key: 'test-key', write: true })
        assert.strictEqual(testCallback.mock.callCount(), 1);
    })

    it('init will throw if cms has no create function', () => {
        const contentManager = new ContentManager({ [TYPES.COSMIC]: {}  })
        let blah = `value of cms type: "${TYPES.COSMIC}" must be a function that instantiates the cms`
        assert.throws(
            () => contentManager.init(TYPES.COSMIC, { key: 'test-key', write: true }),
            new RegExp(blah),
        )
    })
})


/*


ContentManager

  Types:
    COSMIC
    WordPress

  functions:
    getObjectsByType
    findObjectByName

*/