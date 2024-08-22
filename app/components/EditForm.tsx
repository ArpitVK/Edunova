import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
type User = {
  image: string;
  name: string;
  username: string;
  gender: string;
  status: 'Active' | 'Inactive';
  role: string;
  email: string;
  teams: [];
};


type EditFormProps = {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
  onRemovePhoto: () => void;
};

const EditForm = ({
  user,
  onSave,
  onCancel,
  onRemovePhoto,
}: EditFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: user,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(user.image);

  const onSubmit = (data: User) => {
    onSave({ ...data, image: selectedImage || '' });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden mr-4 mb-2">
          <Image
            src={selectedImage || user.image}
            alt="Profile"
            className="w-full h-full object-cover"
            width={80}
            height={80}
          />
        </div>
        <div className="flex gap-2">
          <label
            htmlFor="image-upload"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            Change Photo
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            onClick={onRemovePhoto}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Remove Photo
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        {...register('name', { required: 'Name is required' })}
        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
    </div>
  </div>
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Role</label>
      <select
        {...register('role', { required: 'Role is required' })}
        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select a role</option>
        <option value="Product Designer">Product Designer</option>
        <option value="Product Manager">Product Manager</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="UX Designer">UX Designer</option>
        <option value="UX Copywriter">UX CopyWriter</option>
        <option value="FullStack Developer">FullStack Developer</option>
        {/* Add more role options here */}
      </select>
      {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Status</label>
      <select
        {...register('status', { required: 'Status is required' })}
        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select a status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      {errors.status && <span className="text-red-500 text-sm">{errors.status.message}</span>}
    </div>
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Teams</label>
    <div className="flex flex-wrap gap-2 mt-1 border border-gray-300 rounded-lg p-2">
      {['Design', 'Product', 'Marketing', 'Finance'].map((team) => (
        <span key={team} className="bg-purple-100 text-purple-500 rounded-full px-3 py-1 text-sm flex items-center gap-1">
          {team}
          <button type="button" className="text-gray-400 hover:text-gray-600 focus:outline-none">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </span>
      ))}
    </div>
  </div>
  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2 bg-gray-300 rounded-lg"
    >
      Cancel
    </button>
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
      Save
    </button>
  </div>
</form>

    </div>
  </div>
);
};

export default EditForm;