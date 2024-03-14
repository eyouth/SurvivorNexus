// Initial Survivor list.... 
export const survivors: Survivor[] = [
  {
    name: 'Ellie Williams',
    age: 20,
    gender: 'female',
    last_location: {
      latitude: 40.753056,
      longitude: -73.983056,
    },
    inventory: [
      {
        itemid: 'Baby M16',
        quantity: 1
      },
      {
        itemid: 'First Aid Kit',
        quantity: 4
      },
      {
        itemid: 'Bottled Water',
        quantity: 1
      },
      {
        itemid: 'Helmet',
        quantity: 2
      },
      {
        itemid: 'Tent',
        quantity: 2
      }
    ],
    infected: false,
    date_added: new Date('2021-12-21')
  },
  {
    name: 'Joel Miller',
    age: 30,
    gender: 'male',
    last_location: {
      latitude: 40.753056,
      longitude: -73.983056,
    },
    inventory: [
      {
        itemid: 'Shotgun Baby',
        quantity: 1
      },
      {
        itemid: 'First Aid Kit',
        quantity: 1
      },
      {
        itemid: 'Bottled Water',
        quantity: 5
      },
      {
        itemid: 'Helmet',
        quantity: 1
      },
      {
        itemid: 'Canned Foods',
        quantity: 1
      }
    ],
    infected: false,
    date_added: new Date('2022-10-15')
  },
  {
    name: 'Tommy Hilfiger',
    age: 40,
    gender: 'male',
    last_location: {
      latitude: 40.753056,
      longitude: -73.983056,
    },
    inventory: [
      {
        itemid: 'Sewing Kit',
        quantity: 1
      },
      {
        itemid: 'First Aid Kit',
        quantity: 1
      },
      {
        itemid: 'Bottled Milk',
        quantity: 5
      },
      {
        itemid: 'Helmet',
        quantity: 1
      },
      {
        itemid: 'Canned Foods',
        quantity: 1
      }
    ],
    infected: false,
    date_added: new Date('2023-02-22')
  },
  {
    name: 'Abby Nako',
    age: 34,
    gender: 'female',
    last_location: {
      latitude: 40.753056,
      longitude: -73.983056,
    },
    inventory: [
      {
        itemid: 'Food Pack',
        quantity: 1
      },
      {
        itemid: 'Helmet',
        quantity: 1
      },
      {
        itemid: 'Canned Foods',
        quantity: 1
      }
    ],
    infected: false,
    date_added: new Date('2023-04-05')
  },
  {
    name: 'Chong Chang',
    age: 34,
    gender: 'female',
    last_location: {
      latitude: 40.753056,
      longitude: -73.983056,
    },
    inventory: [
      {
        itemid: 'Food Pack',
        quantity: 0
      },
    ],
    infected: true,
    date_added: new Date('2022-03-01')
  }
];