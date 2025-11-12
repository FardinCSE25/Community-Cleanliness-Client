import { Trash2, Building2, Landmark, Construction } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Garbage",
      icon: <Trash2 className="w-10 h-10 text-green-600" />,
    },
    {
      name: "Illegal Construction",
      icon: <Building2 className="w-10 h-10 text-green-600" />,
    },
    {
      name: "Broken Public Property",
      icon: <Landmark className="w-10 h-10 text-green-600" />,
    },
    {
      name: "Road Damage",
      icon: <Construction className="w-10 h-10 text-green-600" />,
    },
  ];

  return (
   <div>
     <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
      <h2 className="text-3xl font-semibold mb-10 text-center dark:text-gray-200 text-black">
        Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 cursor-pointer 
                       transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-out group"
          >
            <div className="card-body flex flex-col items-center justify-center text-center p-6">
              <div className="p-4 bg-green-50 rounded-full mb-3 transition-colors group-hover:bg-green-100">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#228B22] transition-colors">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default CategoriesSection;
