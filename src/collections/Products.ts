import { CollectionConfig } from 'payload/types';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'Title',
  },
  access: {
    read: () => true,
    create: () => true,
   update: async ({req: {user, params, payload}}) => { 
    const result = await payload.find({
      collection: 'products',
      where: {
        id:{equals: params.id}
      }
    })
    console.log(result?.docs[0]?.owner.id === user.id)
    return result?.docs[0]?.owner.id === user.id
  }
  },
  fields: [
    {
      name: 'owner', 
      type: 'relationship', 
      relationTo: 'users', 
      hasMany: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media'
    },
    {
			name: 'Title',
			type: 'text', 
		},
    {
			name: 'Price',
			type: 'number', 
		},
    {
			name: 'Quantity',
			type: 'number', 
		},
    {
			name: 'Description',
			type: 'richText', 
		},
  ],
};

export default Products;