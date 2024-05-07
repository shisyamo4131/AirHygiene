import { collection, getDocs, query, where } from 'firebase/firestore'

const DefaultItems = require('../assets/defaultItems.json')
const DefaultUnits = require('../assets/defaultUnits.json')

const autonumbers = [
  { collectionId: 'Customers', current: 0, length: 4, field: 'code' },
  { collectionId: 'Sites', current: 0, length: 8, field: 'code' },
]

export default async (context) => {
  await createAutonumbers(context.app)
  await createDefaultItems(context.app)
  await createDefaultUnits(context.app)
}

const createAutonumbers = async (app) => {
  for (const item of autonumbers) {
    const model = app.$Autonumber()
    await model.fetch(item.collectionId)
    if (!model.docId) {
      model.initialize(item)
      await model.create()
    }
  }
}

const createDefaultItems = async (app) => {
  const existItems = []
  const docIds = DefaultItems.map(({ docId }) => docId)
  const chunked = docIds.flatMap((_, i, a) =>
    i % 30 ? [] : [docIds.slice(i, i + 30)]
  )
  const colRef = collection(app.$firestore, 'Items')
  for (const arr of chunked) {
    const q = query(colRef, where('docId', 'in', arr))
    const querySnapshot = await getDocs(q)
    existItems.push(...querySnapshot.docs.map((doc) => doc.data()))
  }
  const unregists = DefaultItems.filter(
    ({ docId }) => !existItems.some((item) => item.docId === docId)
  )
  const promises = unregists.map((item) => app.$Item(item).create(item.docId))
  await Promise.all(promises)
}

const createDefaultUnits = async (app) => {
  const existUnits = []
  const docIds = DefaultUnits.map(({ docId }) => docId)
  const chunked = docIds.flatMap((_, i, a) =>
    i % 30 ? [] : [docIds.slice(i, i + 30)]
  )
  const colRef = collection(app.$firestore, 'Units')
  for (const arr of chunked) {
    const q = query(colRef, where('docId', 'in', arr))
    const querySnapshot = await getDocs(q)
    existUnits.push(...querySnapshot.docs.map((doc) => doc.data()))
  }
  const unregists = DefaultUnits.filter(
    ({ docId }) => !existUnits.some((item) => item.docId === docId)
  )
  const promises = unregists.map((item) => app.$Unit(item).create(item.docId))
  await Promise.all(promises)
}
