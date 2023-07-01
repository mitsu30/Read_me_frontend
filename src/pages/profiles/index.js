import { useState, useEffect } from 'react';
import { Card, CardMedia, Dialog, DialogContent, DialogActions, Button, Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Skeleton } from '@mui/material';

  const StyledCard = styled(Card)(({ theme }) => ({
    width: 280, 
    margin: theme.spacing(1), 
    padding: theme.spacing(1), 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    transition: 'transform 0.3s', 
    boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)', 
    backgroundColor: '#f9f9f9', 
    border: '1px solid #ddd', 
    '&:hover': {
      transform: 'scale(1.05) rotate(3deg)', 
    },
  }));

  const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    width: 250, 
    objectFit: 'contain', 
  }));

const DesignTemplates = ({ templates }) => {
  const [open, setOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [localTemplates, setLocalTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = nookies.get();
      const config = {
        headers: { authorization: `Bearer ${cookies.token}` },
      };

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates`, config);
      setLocalTemplates(res.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleClickOpen = (template) => {
    setCurrentTemplate(template);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    window.location.href = currentTemplate.next_path;
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
    <Typography 
      component="h1" 
      variant="h1" 
      fontWeight="bold" 
      style={{ 
        fontSize: isSmallScreen ? '2.4rem' : '3.65rem',  // 画面幅に応じてフォントサイズを変更
      }}
    >
      デザインをえらぼう
    </Typography>
  </Box>

    <Grid container  justify="center"> 
    {isLoading ? (
      <Skeleton variant="rectangular" width={280} height={280} />
    ) : (
      localTemplates.map((template) => (
        <Grid item xs={12} sm={6} md={4} key={template.id} onClick={() => handleClickOpen(template)}>
          <Box display="flex" justifyContent="center">
            <StyledCard>
              {template.name}
              <StyledCardMedia
                component="img" 
                image={template.image_path}
              />
            </StyledCard>
          </Box>
        </Grid>
      ))
    )}

    <Dialog open={open} onClose={handleClose} maxWidth="md"> 
          <DialogContent>
            {currentTemplate && <img src={currentTemplate.image_path} alt="template" style={{objectFit: 'contain', maxHeight: isSmallScreen ? '15vh' : '35vh'}} />}  
          </DialogContent>
          <DialogActions>
            <Button onClick={handleButtonClick} style={{ fontSize: '1.0rem', alignSelf: 'center' }}>これにする</Button>
            <Button onClick={handleClose} style={{ fontSize: '1.0rem', alignSelf: 'center' }}>えらびなおす</Button> 
          </DialogActions>
        </Dialog>
      </Grid>
    </>
    );
  };  

export default DesignTemplates;
