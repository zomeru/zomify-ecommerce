import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../utils/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then(c => {
      setName(c.data.name);
    });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is updated.`);
        history.push('/admin/category');
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
            <h4>Update category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
