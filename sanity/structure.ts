import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('AssaSSinShopZONE')
    .items([
     
      S.documentTypeListItem('category').title('Categories'),
     
      S.divider(),
       S.documentTypeListItem('author').title('Authors'),
      // S.documentTypeListItem('post').title('Posts'),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author'].includes(item.getId()!),
      ),
    ])
