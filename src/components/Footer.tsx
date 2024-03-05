import React from 'react';
import { Typography, Link, Box } from '@mui/material';

function Footer() {
  return (
    <Box mt={4} mb={2} textAlign='center'>
      <Typography variant='body2' color='textSecondary'>
        {'Copyright © 2024 - Present, Pioneer House Programming Interest Group. All rights reserved. Inspired by '}
        <Link href='https://nusmods.com/' color='inherit' underline='none'>
          <strong>@NUSMODS</strong>
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
