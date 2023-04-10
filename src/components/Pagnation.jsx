import React from 'react'
import { Box, Pagination } from '@mui/material';

const Pagnation = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    const handleClick = (e,p) =>{
     paginate(p)
    }
  return (
    <nav>
        <Box>
            
            <Pagination className='ml-7 mt-[370px]'
            count={20}
              onChange={(e,p)=>paginate(p)}
            />
        </Box>
    </nav>
  )
}

export default Pagnation
