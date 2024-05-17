import Autonumber from '../models/Autonumber'
import Customer from '../models/Customer'
import Site from '../models/Site'
import Item from '../models/Item'
import Unit from '../models/Unit'
import UnitPrice from '../models/UnitPrice'
import Route from '../models/Route'
import ItemUnit from '../models/ItemUnit'
import CollectionResult from '../models/CollectionResult'
import RouteCollectionResult from '../models/RouteCollectionResult'
import IndustrialContract from '../models/IndustrialContract'
import MunicipalContract from '../models/MunicipalContract'
import SiteRouteContract from '../models/SiteRouteContract'

export default (context, inject) => {
  inject('Autonumber', (item) => new Autonumber(context, item))
  inject('Customer', (item) => new Customer(context, item))
  inject('Site', (item) => new Site(context, item))
  inject('Item', (item) => new Item(context, item))
  inject('Unit', (item) => new Unit(context, item))
  inject('UnitPrice', (item) => new UnitPrice(context, item))
  inject('Route', (item) => new Route(context, item))
  inject('ItemUnit', (item) => new ItemUnit(context, item))
  inject(
    'CollectionResult',
    (siteId, item) => new CollectionResult(context, siteId, item)
  )
  inject(
    'RouteCollectionResult',
    (item) => new RouteCollectionResult(context, item)
  )
  inject(
    'IndustrialContract',
    (siteId, item) => new IndustrialContract(context, siteId, item)
  )
  inject(
    'MunicipalContract',
    (siteId, item) => new MunicipalContract(context, siteId, item)
  )
  inject(
    'SiteRouteContract',
    (siteId, item) => new SiteRouteContract(context, siteId, item)
  )
}
