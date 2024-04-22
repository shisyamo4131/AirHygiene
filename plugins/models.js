import Autonumber from '../models/Autonumber'
import Customer from '../models/Customer'
import Site from '../models/Site'
import MunicipalContract from '../models/MunicipalContract'

export default (context, inject) => {
  inject('Autonumber', (item) => new Autonumber(context, item))
  inject('Customer', (item) => new Customer(context, item))
  inject('Site', (item) => new Site(context, item))
  inject(
    'MunicipalContract',
    (siteId, item) => new MunicipalContract(context, siteId, item)
  )
}
