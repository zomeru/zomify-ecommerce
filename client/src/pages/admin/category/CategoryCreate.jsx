import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../utils/category';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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
      })
      .catch(error => {
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
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
          {categoryForm()}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
