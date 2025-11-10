import { use, useState } from "react";
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

const AddIssue = () => {
    const { user } = use(AuthContext);
    const [issues, setIssues] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value
        const location = e.target.location.value
        const image = e.target.image.value
        const amount = e.target.amount.value;
        const email = e.target.email.value;
        const description = e.target.description.value;
        console.log(title, category, location, image, name, email, amount, description);

        toast.success("Issue Report Submitted Successfully!");

        const newIssue = {
            title: title,
            category: category,
            location: location,
            description: description,
            image: image,
            status : "ongoing",
            amount: amount,
            email: email,
            date: new Date().toLocaleDateString(),
        }

        fetch("http://localhost:5000/issues", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newIssue)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                     Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "New Issue Added!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset()
                    newIssue._id = data.insertedId;
                    const newIss = [...issues, newIssue];
                    setIssues(newIss);
                }

            })
        
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-base-200 rounded-xl shadow-lg my-10">
            <h2 className="text-2xl font-bold text-center mb-6">Add a New Issue</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="label"><span className="label-text">Issue Title</span></label>
                    <input type="text" name="title" 
                        className="input input-bordered w-full" required />
                </div>

                {/* Category */}
                <div>
                    <label className="label"><span className="label-text">Category</span></label>
                    <select name="category"
                        className="select select-bordered w-full" required>
                        <option value="">Select Category</option>
                        <option value="Garbage">Garbage</option>
                        <option value="Illegal Construction">Illegal Construction</option>
                        <option value="Broken Public Property">Broken Public Property</option>
                        <option value="Road Damage">Road Damage</option>
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label className="label"><span className="label-text">Location</span></label>
                    <input type="text" name="location"
                        className="input input-bordered w-full" required />
                </div>

                {/* Description */}
                <div>
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea name="description"
                        className="textarea textarea-bordered w-full" required />
                </div>

                {/* Image */}
                <div>
                    <label className="label"><span className="label-text">Image</span></label>
                    <input type="text" name="image"
                        className="input input-bordered w-full" required />
                </div>

                {/* Amount */}
                <div>
                    <label className="label"><span className="label-text">Amount</span></label>
                    <input type="number" name="amount"
                        className="input input-bordered w-full" required />
                </div>

                {/* Email (Read-only) */}
                <div>
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="text" name="email" readOnly defaultValue={user?.email}
                        className="input input-bordered w-full bg-gray-100" />
                </div>

                {/* Hidden Fields */}
                <input type="hidden" name="status" />
                <input type="hidden" name="date" />

                {/* Submit */}
                <button className="btn btn-primary w-full mt-4 text-white">Submit</button>

            </form>
        </div>
    );
};

export default AddIssue;
