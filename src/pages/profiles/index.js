import { useState } from 'react';
import { Card, CardMedia, Dialog, DialogContent, DialogActions, Button } from '@mui/material'
import nookies from "nookies";
import axios from 'axios';

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
        window.location.href = currentTemplate.nextUrl;
    };

    return (
        <div>
            {templates.map((template) => (
                <Card key={template.id} onClick={() => handleClickOpen(template)}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={template.imageUrl}
                    />
                </Card>
            ))}

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    {currentTemplate && <img src={currentTemplate.imageUrl} alt="template" />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleButtonClick}>次へ</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const config = {
    headers: { authorization: `Bearer ${cookies.token}` },
  };

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/templates`, config);
  console.log(res)
  return { props: { template: res.data.data } };
}


export default DesignTemplates;
