import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

function InformationModal({ modalOpen, handleModalClose, modalTitle, modalContent }) {
  return (
    <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
    >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h4" component="h2">
            {modalTitle}
          </Typography>
          <Typography id="modal-description" variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
        </Box>
      </Modal>
  );
}

export default InformationModal;
