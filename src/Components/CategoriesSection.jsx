import { Trash2, Building2, Landmark } from "lucide-react";

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
      icon: <Landmark className="w-10 h-10 text-green-600" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-sm hover:shadow-md border cursor-pointer transition-all"
          >
            <div className="card-body items-center text-center">
              {category.icon}
              <h3 className="mt-3 text-sm font-medium">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
