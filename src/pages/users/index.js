import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem, IconButton, Grid, Skeleton } from '@mui/material';
import { Avatar } from '@mui/material'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import nookies from "nookies"
import ReactPaginate from 'react-paginate';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, per_page: 10 });
  const [groups, setGroups] = useState([]); 
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('created_at_desc');
  const [group, setGroup] = useState('RUNTEQ');
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const NUM_surroundingPages = 1; 
  

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const cookies = nookies.get(null);
      const config = {
        headers: { authorization: `Bearer ${cookies.token}` },
      };

      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?page=${page}&sort_by=${sortBy}&group_id=${group}&name=${searchName}`, config);
      // console.log(result.data)
      setUsers(result.data.users);
      setPagination(result.data.pagination); 

      setIsLoading(false);
    };
    fetchData();
  }, [page, sortBy, group, searchName]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/groups/for_community/1`);
      setGroups(response.data.groups); 
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
            fontSize: isSmallScreen ? '2.2rem' : '4.25rem',  
          }}
        >
          スクールのなかま
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ height: '10px'}}>
              <TableCell align="center" style={{ width: '10%', height: '10px', borderBottom: '1px solid #808080' }}></TableCell>
              <TableCell align="center" style={{ width: '30%', height: '10px', borderBottom: '1px solid #808080' }}>
                なまえ
              </TableCell>
              <TableCell align="center" style={{ width: '25%', height: '10px', borderBottom: '1px solid #808080' }}>所属</TableCell>
              <TableCell align="center" style={{ width: isSmallScreen ? '30%' : '40%', height: '10px', display: isSmallScreen ? 'none' : 'table-cell', borderBottom: '1px solid #808080' }}>みんなにひとこと！</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <Skeleton variant="circle" width={80} height={80} />
                </TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
                <TableCell><Skeleton variant="text" /></TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} style={{ cursor: 'pointer' }} onClick={() => router.push(`/users/${user.id}`)}>
                  <TableCell>
                    <Avatar src={user.avatar} alt={user.name} sx={{ width: 80, height: 80 }}/> 
                  </TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.group}</TableCell>
                  <TableCell align="center" style={{ display: isSmallScreen ? 'none' : 'table-cell' }}>{user.greeting}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap', 
          '& .pagination': { 
            display: 'flex',
            justifyContent: 'space-around',
            listStyle: 'none',
            padding: 2,
            '& li': {
              margin: 1,
              padding: 1,
              borderRadius: 1,
              cursor: 'pointer',
              '&.active': {
                backgroundColor: '#ffaf95',
              },
            },
          },
        }}
      >
        <ReactPaginate
          previousLabel={'まえ'}
          nextLabel={'つぎ'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pagination.total_pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={(data) => setPage(data.selected + 1)} 
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </Box>
    </div>
  );
};

export default Users;
