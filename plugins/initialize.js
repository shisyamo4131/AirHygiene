const autonumbers = [
  { collectionId: 'Customers', current: 0, length: 4, field: 'code' },
  { collectionId: 'Sites', current: 0, length: 8, field: 'code' },
]

export default async (context) => {
  await createAutonumbers(context.app)
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
