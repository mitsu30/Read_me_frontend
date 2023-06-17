import { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, IconButton, Grid } from '@mui/material';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Avatar } from '@mui/material'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]); 
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('created_at_desc');
  // const [order, setOrder] = useState('asc');
  const [group, setGroup] = useState('RUNTEQ');
  const [searchName, setSearchName] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // const toggleOrder = () => {
  //   setOrder(order === 'asc' ? 'desc' : 'asc');
  // };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}&sort_by=${sortBy}&order=${order}&group_id=${group}&name=${searchName}`);
      setUsers(result.data);
      console.log(result.data)
    };
    fetchData();
  }, [page, sortBy, order, group, searchName]);

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
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <Typography 
          component="h1" 
          variant="h1" 
          fontWeight="bold" 
          style={{ 
            transform: 'scaleX(1.3)',
            fontSize: isSmallScreen ? '5rem' : '7.0rem',  // 画面幅に応じてフォントサイズを変更
          }}
        >
          RUNTEQ
        </Typography>
      </Box>
      <Grid container justifyContent="center" style={{ margin: '1em 0' }}>
        <Grid item xs={12} sm={"auto"}>
          <TextField
            label="なまえで検索！"
            value={searchName}
            size="small"
            onChange={(e) => setSearchName(e.target.value)}
            style={{ backgroundColor: '#f0f0f0' }}
          />
        </Grid>
      <Grid item xs={12} sm={"auto"}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <Select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{backgroundColor: '#f0f0f0' }}
          >
            <MenuItem value="created_at_desc">新着順</MenuItem>
            <MenuItem value="name_asc">名前順</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={"auto"}>
        <FormControl sx={{minWidth: 120 }} size="small">
          <Select 
            value={group} 
            onChange={(e) => setGroup(e.target.value)}
            style={{backgroundColor: '#f0f0f0' }}
          >
            <MenuItem value='RUNTEQ'>みんな</MenuItem>  
            {groups.map((group) => ( // 取得したグループデータをもとに選択肢を動的に生成
              <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
      </Grid>

      <div>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>まえ</Button>
        <Button onClick={() => setPage(page + 1)}>つぎ</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ height: '10px'}}>
              <TableCell align="center" style={{ width: '20%', height: '10px', borderBottom: '1px solid #808080' }}></TableCell>
              <TableCell align="center" style={{ width: '20%', height: '10px', borderBottom: '1px solid #808080' }}>
                なまえ
                {/* <IconButton onClick={toggleOrder} size="small">
                  {order === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton> */}
              </TableCell>
              <TableCell align="center" style={{ width: '20%', height: '10px', borderBottom: '1px solid #808080' }}>所属</TableCell>
              <TableCell align="center" style={{ width: isSmallScreen ? '30%' : '40%', height: '10px', display: isSmallScreen ? 'none' : 'table-cell', borderBottom: '1px solid #808080' }}>みんなにひとこと！</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell style={{ width: '20%' }}>
                <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80 }}/> 
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.group}</TableCell>
                <TableCell align="center" style={{ display: isSmallScreen ? 'none' : 'table-cell' }}>{user.greeting}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>まえ</Button>
        <Button onClick={() => setPage(page + 1)}>つぎ</Button>
      </div>
    </div>
  );
};

export default Users;
