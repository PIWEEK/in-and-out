import rdf from 'rdflib'

// Convert a uri string to a RDF NamedNode
export function uriToNode (uri) {
  return rdf.sym(uri)
}

// Load a graph from a NamedNode
export async function loadNode (node) {
  const graph = rdf.graph()
  const fetcher = new rdf.Fetcher(graph)
  return fetcher.load(node.uri)
}

// Convert a literal node into a value
export function nodeToValue (node) {
  return node ? node.value : null
}

// Convert a literal node with a value of type date into a Date object
export function nodeToDate (node) {
  return node ? new Date(node.value) : null
}

// Search the graph for a statement with the given subject and predicate,
// and if found return the converted value of the the object
export function extractValue (graph, subject, predicate, converter = nodeToValue) {
  return converter(graph.any(subject, predicate))
}
