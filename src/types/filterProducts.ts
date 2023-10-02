export interface FilterListProps {
  sortBy:
    | 'default'
    | 'popularity'
    | 'average'
    | 'newness'
    | 'lowPrice'
    | 'highPrice'
  price: 'default' | '50' | '100' | '150' | '200' | 'high'
  color: 'black' | 'blue' | 'gray' | 'green' | 'red' | 'white' | 'default'
  tag: 'promotion' | 'lifestyle' | 'cargo' | 'crafts' | 'streetstyle' | null
}
