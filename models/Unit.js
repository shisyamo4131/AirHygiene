import FireModel from './FireModel'

const props = {
  props: {
    code: { type: String, default: '', required: false },
    name: { type: String, default: '', required: false },
    abbr: { type: String, default: '', required: false },
    editable: { type: Boolean, default: true, required: false },
    deletable: { type: Boolean, default: true, required: false },
  },
}
export { props }

/**
 * ## Unit
 *
 * @author shisyamo4131
 */
export default class Unit extends FireModel {
  constructor(context, item) {
    super(context, item)
    this.collection = `Units`
    this.tokenFields = ['abbr']
    this.hasMany = [
      {
        collection: `RouteCollectionResults`,
        field: 'unitId',
        condition: '==',
        type: 'collection',
      },
      {
        collection: `CollectionResults`,
        field: 'unitId',
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
