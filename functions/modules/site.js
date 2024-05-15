const { getFirestore } = require('firebase-admin/firestore')
const { onDocumentDeleted } = require('firebase-functions/v2/firestore')
const firestore = getFirestore()

exports.deleted = onDocumentDeleted('Sites/{docId}', async (event) => {
  const docId = event.params.docId
  const promises = [
    deleteMunicipalContracts(docId),
    deleteIndustrialContracts(docId),
    deleteSiteRouteContracts(docId),
  ]
  await Promise.all(promises)
})

/**
 * Delete all documents from MunicipalContracts specified by site-id.
 * @param {string} siteId
 */
async function deleteMunicipalContracts(siteId) {
  const colRef = firestore.collection(`Sites/${siteId}/MunicipalContracts`)
  const snapshot = await colRef.get()
  const promises = snapshot.docs.map((doc) => doc.ref.delete())
  await Promise.all(promises)
}

/**
 * Delete all documents from IndustrialContracts specified by site-id.
 * @param {string} siteId
 */
async function deleteIndustrialContracts(siteId) {
  const colRef = firestore.collection(`Sites/${siteId}/IndustrialContracts`)
  const snapshot = await colRef.get()
  const promises = snapshot.docs.map((doc) => doc.ref.delete())
  await Promise.all(promises)
}

/**
 * Delete all documents from SiteRouteContracts specified by site-id.
 * @param {string} siteId
 */
async function deleteSiteRouteContracts(siteId) {
  const colRef = firestore.collection(`Sites/${siteId}/SiteRouteContracts`)
  const snapshot = await colRef.get()
  const promises = snapshot.docs.map((doc) => doc.ref.delete())
  await Promise.all(promises)
}
