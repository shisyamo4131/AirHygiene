import Autonumber from '../models/Autonumber'
import Customer from '../models/Customer'

export default (context, inject) => {
  inject('Autonumber', (item) => new Autonumber(context, item))
  inject('Customer', (item) => new Customer(context, item))
}
