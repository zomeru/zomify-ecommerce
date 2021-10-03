import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../utils/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // step 1
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => getCategories().then(c => setCategories(c.data));

  const { user } = useSelector(state => ({ ...state }));

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created.`);
        loadCategories();
      })
      .catch(error => {
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleRemove = async slug => {
    if (window.confirm('Are you sure you want to delete?')) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then(res => {
          setLoading(false);
          toast.error(`${res.data.name} deleted.`);
          loadCategories();
        })
        .catch(error => {
          if (error.response.status === 400) {
            setLoading(false);
            toast.error(error.response.data);
          }
        });
    }
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <button className='btn btn-outline-primary'>Save</button>
      </div>
    </form>
  );

  // Step 3
  const handleSearchChange = e => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase()); //
  };

  // Step 4
  // const searched = keyword => c => c.name.toLowerCase().includes(keyword);

  const searched = keyword => {
    return c => c.name.toLowerCase().includes(keyword);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <br />
          {/* step 2 */}
          <input
            type='search'
            placeholder='Filter'
            value={keyword}
            onChange={handleSearchChange}
            className='form-control mb-4'
          />
          <hr />
          {/* step 5 */}
          {categories.filter(searched(keyword)).map(c => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className='btn btn-sm float-end'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className='btn btn-sm float-end'>
                  <EditOutlined className='text-warning' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
