import { useState, useContext } from 'react';
import GitHubContext from '../../context/gitHub/GitHubContext';
import AlertContext from '../../context/alert/AlertContext';

const UsersSearch = () => {
  const [text, setText] = useState('');

  const { users, fetchUsers, dispatchReducer } = useContext(GitHubContext);
  const { alert, setAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      fetchUsers(text);
      setText('');
    }
  };

  const clearCLickHandler = () => {
    dispatchReducer({ type: 'CLEAR_USERS', payload: [] });
  };

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grids-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form action='' className='form-control' onSubmit={handleSubmit}>
          <div className='relative'>
            <input
              className='w-full pr-40 bg-gray-200 input input-lg text-black'
              placeholder='Search'
              value={text}
              onChange={handleChange}
            />
            <button
              type='Submit'
              className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
            >
              Go
            </button>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={clearCLickHandler}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersSearch;
