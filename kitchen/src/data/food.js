import biryaniImg from '../assets/images/biryani.jpg';
import paneerImg from '../assets/images/paneer.jpeg';
import pastaImg from '../assets/images/pasta.jpg';
import mashroom from '../assets/images/mashroom.jpg'
import aaloo from '../assets/images/aaloo.jpg'
import fish from '../assets/images/fish.jpg'
import mutton from '../assets/images/mutton.jpg'

const foods = [
  {
    id: 1,
    title: 'Biryani',
    description: 'Spicy rice with chicken',
    price: 150,
    rating: 4.8,
    image: biryaniImg,
    deliveryDay: 'Sunday',
  },
  {
    id: 2,
    title: 'Paneer Curry', 
    description: 'Creamy paneer masala',
    price: 120,
    rating: 4.5,
    image: paneerImg,
    deliveryDay: 'Monday',
  },
  {
    id: 3,
    title: 'Pasta',
    description: 'Italian delight',
    price: 100,
    rating: 4.2,
    image: pastaImg,
    deliveryDay: 'Tuesday', 
  },
  {
    id: 4,
    title: 'Mashroom',
    description: 'North Indian',
    price: 129,
    rating: 4.5,
    image: mashroom,
    deliveryDay: 'Wednesday', 
  },
  {
    id: 5,
    title: 'Aaloo',
    description: 'Delhi Special',
    price: 199,
    rating: 4.2,
    image: aaloo,
    deliveryDay: 'Thursday', 
  },
  {
    id: 6,
    title: 'Fish',
    description: 'Bengali Speacial',
    price: 565,
    rating: 4.7,
    image: fish,
    deliveryDay: 'Friday', 
  },
  {
    id: 7,
    title: 'Mutton',
    description: 'Kashmiri Dish',
    price: 1000,
    rating: 4.5,
    image: mutton,
    deliveryDay: 'Saturday'
  },
];

export default foods;