import Autonumber from '../models/Autonumber'
import Customer from '../models/Customer'
import Site from '../models/Site'
import Item from '../models/Item'
import Unit from '../models/Unit'
import UnitPrice from '../models/UnitPrice'
import CollectionResult from '../models/CollectionResult'
import IndustrialContract from '../models/IndustrialContract'
import MunicipalContract from '../models/MunicipalContract'
import SiteRootContract from '../models/SiteRootContract'

export default (context, inject) => {
  inject('Autonumber', (item) => new Autonumber(context, item))
  inject('Customer', (item) => new Customer(context, item))
  inject('Site', (item) => new Site(context, item))
  inject('Item', (item) => new Item(context, item))
  inject('Unit', (item) => new Unit(context, item))
  inject('UnitPrice', (item) => new UnitPrice(context, item))
  inject(
    'CollectionResult',
    (siteId, item) => new CollectionResult(context, siteId, item)
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
    'SiteRootContract',
    (siteId, item) => new SiteRootContract(context, siteId, item)
  )
}
