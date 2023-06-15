import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]); 
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [group, setGroup] = useState('RUNTEQ');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}&sort_by=${sortBy}&order=${order}&group_id=${group}`);
      setUsers(result.data);
      console.log(result.data)
    };
    fetchData();
  }, [page, sortBy, order, group]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups/for_community/1`);
      setGroups(response.data.groups); 
      // const data = response.data.groups
    };
    fetchGroups();
  }, []);
    
  return (
    <div>
      <div>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="created_at">Created At</MenuItem>
          <MenuItem value="name">ニックネーム</MenuItem>
        </Select>
        <Select value={order} onChange={(e) => setOrder(e.target.value)}>
          <MenuItem value="asc">昇順</MenuItem>
          <MenuItem value="desc">降順</MenuItem>
        </Select>
        <Select value={group} onChange={(e) => setGroup(e.target.value)}>
          <MenuItem value='RUNTEQ'>RUNTEQのみんな</MenuItem>  
          {groups.map((group) => ( // 取得したグループデータをもとに選択肢を動的に生成
            <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
          ))}
        </Select>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ニックネーム</TableCell>
              <TableCell>所属</TableCell>
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
