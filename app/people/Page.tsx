import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image'
import { useState } from 'react';
import { FiSearch, FiPlus, FiFilter, FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditForm from '../components/EditForm';
import FilterComponent from '../components/FilterComponents';
import UserDetails from '../components/UserDetails';


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Team = 'Design' | 'Product' | 'Marketing'; // Define a union type for the teams

type User = {
  image: string;  
  name: string;
  username: string;
  gender: string,
  status: 'Active' | 'Inactive'; // Assuming status can be either 'Active' or 'Inactive'
  role: string;
  email: string;
  teams: Team[]; // Array of Team types
};

const newUserTemplate: User = {
  image: '',
  name: '',
  username: '',
  gender:'',
  status: 'Active',
  role: '',
  email: '',
  teams: [],
};

const Page=() => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  

  const [userData, setUserData] = useState<User[]>([
    {
      image:'/images/first lady.jpg',
      name: 'Olivia Rhye',
      username: '@olivia',
      gender:'female',
      status: 'Active',
      role: 'Product Designer',
      email: 'olivia@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
    },
    {
      image:'/images/first.jpg',
      name: 'Pheonix Baker',
      username: '@phoenix',
      gender:'Male',
      status: 'Active',
      role: 'Product Manager',
      email: 'phoenix@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
    },
    {
      image:'/images/second.jpg',
      name: 'Drew Cano',
      username: '@drew',
      gender:'Male',
      status: 'Active',
      role: 'UX Copywriter',
      email: 'drew@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
    },
    {
      image:'/images/second lady.jpg',
      name: 'Lana  Steiner',
      username: '@lana',
      gender:'female',
      status: 'Active',
      role: 'Frontend Developer',
      email: 'lana@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
    },
    {
      image:'/images/third lady.jpg',
      name: 'Demi  Wilkinson',
      username: '@Demi',
      gender:'female',
      status: 'Active',
      role: 'Backend Developer',
      email: 'Demi@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
    },
    {
      image:'/images/fourth lady.jpg',
      name: 'Candice  Wu',
      username: '@candice',
      gender:'female',
      status: 'Active',
      role: 'FullStack Developer',
      email: 'candice@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
    },
    {
      image:'/images/fifth lady.jpg',
      name: 'Natali  craig',
      username: '@natali',
      gender:'female',
      status: 'Active',
      role: 'UX Designer',
      email: 'natali@untitledui.com',
      teams: ['Design', 'Product', 'Marketing'],
    },
    // Add other team members here
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const [filters, setFilters] = useState([
    {
      label: 'Roles',
      options: ['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer']
    },
    {
      label: 'Teams',
      options: ['Design', 'Product', 'Marketing', 'Technology']
    }
  ]);

  const [filteredUserData, setFilteredUserData] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const handleDelete = (userToDelete: User) => {
    setUserData(userData.filter(user => user.email !== userToDelete.email));
  };
  
  const handleEdit = (userToEdit: User) => {
    setEditingUser(userToEdit);
  };
  const handleAddMember = () => {
    setEditingUser(newUserTemplate);
  };
  
  const handleSaveEdit = (editedUser: User) => {
    setUserData(userData.map(user => user.email === editedUser.email ? editedUser : user));
    setEditingUser(null);
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    
    // Update the URL only if the component is mounted
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('query', query);
    window.history.pushState(null, '', `?${newSearchParams.toString()}`);
  };

  const handleFilterChange = (filterLabel: string, selectedOptions: string[]) => {
    const newFilteredData = userData.filter(user => {
      if (filterLabel === 'Roles') {
        return selectedOptions.length === 0 || selectedOptions.includes(user.role);
      } else if (filterLabel === 'Teams') {
        return selectedOptions.length === 0 || user.teams.some(team => selectedOptions.includes(team));
      }
      return true;
    });
    setFilteredUserData(newFilteredData);
  };


  useEffect(() => {
    // Filter the userData based on the search query
    const filtered = userData.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUserData(filtered);
  }, [searchQuery, userData]);

  useEffect(() => {
    // Get the initial search query from the URL
    const query = searchParams.get('query');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const columnHelper = createColumnHelper<User>(); 

const columns = [
  columnHelper.accessor('name', {
    cell: info => (
      <div className="flex items-center">
        <Image src={info.row.original.image} alt="" className="rounded-full mr-2" height={32} width={32} />
        <div>
          <div>{info.getValue()}</div>
          <div className="text-sm text-gray-500">{info.row.original.username}</div>
        </div>
      </div>
    ),
    header: 'Name',
  }),
  columnHelper.accessor('status', {
    cell: info => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        info.getValue() === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {info.getValue()}
      </span>
    ),
    header: 'Status',
  }),
  columnHelper.accessor('role', {
    cell: info => info.getValue(),
    header: 'Role',
  }),
  columnHelper.accessor('email', {
    cell: info => info.getValue(),
    header: 'Email address',
  }),
  columnHelper.accessor('teams', {
    cell: info => (
      <div className="flex flex-wrap gap-1">
        {info.getValue().map((team, index) => (
          <span key={index} className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
            {team}
          </span>
        ))}
        {info.getValue().length > 3 && (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
            +{info.getValue().length - 3}
          </span>
        )}
      </div>
    ),
    header: 'Teams',
  }),
  columnHelper.display( {
    id:'actions',
    cell: info => (
      <div className="flex gap-2">
        <button 
          className="p-1 text-gray-500 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(info.row.original)}}
        >
          <FiTrash2 size={16} />
        </button>
        <button 
          className="p-1 text-gray-500 hover:text-blue-500"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(info.row.original)}}
        >
          <FiEdit2 size={16} />
        </button>
      </div>
    ),
    header: '',
  }),
]


const table = useReactTable({
  data: filteredUserData,
  columns,
  getCoreRowModel: getCoreRowModel(),
})

  return(
    <div className="m-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className=" mt-5  mx-5  text-xl font-bold">
          Team members <span className="text-sm px-2 py-1 font-normal text-indigo-600 bg-purple-100 rounded-full">100 users</span>
        </h2>
        <div className="flex gap-2 mt-5">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="border rounded-lg px-3 py-2 pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FiSearch className="absolute left-2  top-1/2 transform -translate-y-4 text-gray-400" />
          </div>
          {/* Add filter button */}
          <FilterComponent filters={filters} onFilterChange={handleFilterChange} />
          
          <button className="bg-indigo-600 text-white px-4 py-2 mr-4 rounded-lg flex items-center gap-2" onClick={handleAddMember} >
            <FiPlus /> ADD MEMBER
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border border-x-0 min-w-fit'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-left p-3 border-b text-sm font-medium text-gray-500">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr 
              key={row.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(row.original)}
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-3 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UserDetails 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)} 
        />
      )}
      {editingUser && (
        <EditForm
          user={editingUser} 
          onSave={handleSaveEdit} 
          onCancel={() => setEditingUser(null)} 
          onRemovePhoto={() => {
            // Implement the photo removal logic here
            console.log("Photo removed");}}/>
      )}
    </div>
  )
}
export default Page
