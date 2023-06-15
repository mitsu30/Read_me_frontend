import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}&sort_by=${sortBy}&order=${order}`);
      setUsers(result.data);
      console.log(result.data)
    };
    fetchData();
  }, [page, sortBy, order]);

  return (
    <div>
      <div>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="created_at">Created At</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
        <Select value={order} onChange={(e) => setOrder(e.target.value)}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell><img src={user.avatar} alt={user.name} /></TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.group}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default Users;
