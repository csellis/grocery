import { Loading, Empty, Failure, Success } from './ItemSearchCell'

export const loading = () => {
  return Loading ? <Loading /> : null
}

export const empty = () => {
  return Empty ? <Empty /> : null
}

export const failure = () => {
  return Failure ? <Failure error={new Error('Oh no')} /> : null
}

export const success = () => {
  return Success ? <Success itemSearch={{ mock: 'data' }} /> : null
}

export default { title: 'Cells/ItemSearchCell' }
