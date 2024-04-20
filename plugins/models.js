import Customer from '../models/Customer'

export default (context, inject) => {
  inject('Customer', (item) => new Customer(context, item))
}
