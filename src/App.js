import "./App.css";
import Chat from "./Chat";

const ImageCard = ({ image, title, description }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full h-40 object-cover" src={image} alt={title} />
    <div className="px-6 py-2"> {/* Adjusted the height from py-4 to py-2 */}
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  </div>
);



const imageCards = [
  {
    image: 'https://assets.bonappetit.com/photos/62f5674caf9bae430097be0f/1:1/w_1920,c_limit/0810-no-fail-roast-chicken-v2.jpg',
    title: 'Chicken',
    description: 'Chicken Masala is a flavorful Indian dish that combines tender pieces of chicken with a rich blend of aromatic spices, creating a mouthwatering and spicy culinary experience.',
  },
  {
    image: 'https://feastwithsafiya.com/wp-content/uploads/2021/08/Baked-fish-masala-recipe.jpg',
    title: 'Fish',
    description: 'Fish Masala is a delectable seafood dish featuring fish marinated in a vibrant mix of spices and herbs, resulting in a tantalizing flavor profile that perfectly complements the tender texture of the fish.',
  },
  {
    image: 'https://thevegconnection.com/wp-content/uploads/2023/01/Potato-Cauliflower-Tikka-Masala-22-Edit-720x720.jpg',
    title: 'Vegetable',
    description: 'Vegetable Masala is a vegetarian delight, showcasing a medley of fresh vegetables cooked in a fragrant blend of spices, offering a hearty and wholesome dish bursting with savory and aromatic goodness.',
  },
];

function App() {
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <div className="mb-8 flex flex-col items-center">
          <img src="https://media.licdn.com/dms/image/C4E0BAQFeP_7jSb8obw/company-logo_200_200/0/1630581217006/kaz_software_limited_logo?e=2147483647&v=beta&t=gWbv3PZCuDII8jjEkVFnif_TrDTy5pWvxAHwyZyVv7I" alt="Logo" className="rounded-full mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Lunch Subscription Service</h1>
          <p className="text-gray-600">Enjoy delightful meals delivered to your door!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {imageCards.map((card, index) => (
            <ImageCard key={index} {...card} />
          ))}
        </div>
      </div>

      <Chat />
    </div>
  );
}

export default App;
