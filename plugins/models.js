import Autonumber from '../models/Autonumber'
import Customer from '../models/Customer'
import Site from '../models/Site'

export default (context, inject) => {
  inject('Autonumber', (item) => new Autonumber(context, item))
  inject('Customer', (item) => new Customer(context, item))
  inject('Site', (item) => new Site(context, item))
}
