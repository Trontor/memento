/**
 * Interface is used for Dataloader pattern, which batches
 * and caches GraphQL requests.
 *
 * Efficient for resolving nested GraphQL queries.
 */
export interface IDataLoader<K, V> {
  load(id: K): Promise<V>;
}
