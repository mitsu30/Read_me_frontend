import { useState } from 'react';
import { Card, CardMedia, Dialog, DialogContent, DialogActions, Button, Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: 300, // カードの幅を固定
  margin: theme.spacing(6), // カードの周りの余白を設定
  padding: theme.spacing(1), // カードの内側の余白を設定
  display: 'flex', // カードの内容をフレックスボックスとして扱う
  flexDirection: 'column', // カードの方向をカラム（垂直）に設定
  alignItems: 'center', // カードの内容を中央に配置
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 156, // 画像の高さを固定
  width: '100%', // 画像の幅を100%に設定
  objectFit: 'contain', // 画像を全体が見えるように配置
}));

const DesignTemplates = ({ templates }) => {
  const [open, setOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        fontSize: isSmallScreen ? '2.5rem' : '4.5rem',  // 画面幅に応じてフォントサイズを変更
      }}
    >
      デザインをえらぼう
    </Typography>
  </Box>

    <Grid container spacing={2} justify="center"> 
      {templates.map((template) => (
        <Grid item key={template.id} onClick={() => handleClickOpen(template)}>
          <StyledCard>
            {template.name}
            <StyledCardMedia
              component="img" 
              image={template.image_path}
            />
          </StyledCard>
        </Grid>
      ))}
  
      <Dialog open={open} onClose={handleClose} maxWidth="md"> 
        <DialogContent>
          {currentTemplate && <img src={currentTemplate.image_path} alt="template" style={{objectFit: 'contain', maxHeight: isSmallScreen ? '15vh' : '35vh'}} />}  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleButtonClick} style={{ fontSize: '1.5rem', alignSelf: 'center' }}>これにする</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  </>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const config = {
  headers: { authorization: `Bearer ${cookies.token}` },
  };

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates`, config);
  console.log(res.data)
  return { props: { templates: res.data} };
}

export default DesignTemplates;
