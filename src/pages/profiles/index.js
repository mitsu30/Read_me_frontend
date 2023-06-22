import { useState } from 'react';
import { Card, CardMedia, Dialog, DialogContent, DialogActions, Button, Box, Grid  } from '@mui/material';
import { styled } from '@mui/system';
import nookies from "nookies";
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 450, // カードの最大幅を設定
  margin: theme.spacing(10) // カードの周りの余白を設定
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: '52.36%', // 1.91:1
  margin: theme.spacing(2),// 画像とカードの間の余白を設定
}));


const DesignTemplates = ({ templates }) => {
  const [open, setOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);

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
    <Grid container spacing={2}>
      {templates.map((template) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={template.id} onClick={() => handleClickOpen(template)}>
          <StyledCard>
            {template.name}
            <StyledCardMedia
              image={template.image_path}
            />
          </StyledCard>
        </Grid>
      ))}
  
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {currentTemplate && <img src={currentTemplate.image_path} alt="template" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleButtonClick}>次へ</Button>
        </DialogActions>
      </Dialog>
    </Grid>
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
