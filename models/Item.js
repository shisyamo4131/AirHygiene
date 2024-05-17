import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    group: { type: String, default: '', required: false },
    editable: { type: Boolean, default: true, required: false },
    deletable: { type: Boolean, default: true, required: false },
  },
}
export { props }

/**
 * ## Item
 *
 * @author shisyamo4131
 */
export default class Item extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = `Items`
    this.tokenFields = ['abbr']
    this.hasMany = [
      {
        collection: `Routes`,
        field: 'itemIds',
        condition: 'array-contains',
        type: 'collection',
      },
      {
        collection: `RouteCollectionResults`,
        field: 'itemId',
        condition: '==',
        type: 'collection',
      },
      {
        collection: `CollectionResults`,
        field: 'itemId',
        condition: '==',
        type: 'collectionGroup',
      },
    ]
  }

  initialize(item) {
    Object.keys(props.props).forEach((key) => {
      const propDefault = props.props[key].default
      this[key] =
        typeof propDefault === 'function' ? propDefault() : propDefault
    })
    super.initialize(item)
  }
}
