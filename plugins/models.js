import Autonumber from '../models/Autonumber'
import Customer from '../models/Customer'
import Site from '../models/Site'
import Item from '../models/Item'
import Unit from '../models/Unit'
import IndustrialContract from '../models/IndustrialContract'
import MunicipalContract from '../models/MunicipalContract'
import SiteUnitPrice from '../models/SiteUnitPrice'

export default (context, inject) => {
  inject('Autonumber', (item) => new Autonumber(context, item))
  inject('Customer', (item) => new Customer(context, item))
  inject('Site', (item) => new Site(context, item))
  inject('Item', (item) => new Item(context, item))
  inject('Unit', (item) => new Unit(context, item))
  inject(
    'IndustrialContract',
    (siteId, item) => new IndustrialContract(context, siteId, item)
  )
  inject(
    'MunicipalContract',
    (siteId, item) => new MunicipalContract(context, siteId, item)
  )
  inject(
    'SiteUnitPrice',
    (siteId, item) => new SiteUnitPrice(context, siteId, item)
  )
}
