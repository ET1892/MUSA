import React, { useEffect, useState } from 'react'
import FlowNavBar from './FlowNavBar'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import {CircularProgress, Box} from '@mui/material';
async function fetchImages() {
  
  try{
     const response = await fetch('https://musa.ocathain.ie/images');
     const json = await response.json();
     return json;
  }
  catch (error: any) {
    console.log(error)
  }
 
}
const PicOfDay = () => {
  
  const [data, setData] = useState<{ url: string }[] | null>(null);
  useEffect(() => {
    
    fetchImages().then((data) => setData(data));


  }, []);

  if (!data) {
    return (
      <div>
      <header>
        <FlowNavBar />
      </header>
      <body  className="h-screen flex flex-col justify-center items-center space-evenly space-y-10  bg-black">
            <div className="h-screen flex flex-col items-center justify-center p-5"> 
            <h1 className="uppercase text-xl font-bold text-white p-5">Error fetching data from server</h1>
            <Box sx={{ display: 'flex'}}>
                <CircularProgress />
            </Box>
            </div>
        <div>
        </div>
      </body>
      </div>
    )
  }
const itemData = [
  {
    img: (data as { url: string,}[])[0].url,
    title: (data as { url: string, title: string }[])[0].title,
    author: (data as { url: string, title: string, date: string}[])[0].date,
    explanation: (data as { url: string, title: string, date: string, explanation: string}[])[0].explanation,
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: (data as { url: string,}[])[1].url,
    title: (data as { url: string, title: string }[])[1].title,
    author: (data as { url: string, title: string, date: string}[])[1].date,
  },
  {
    img: (data as { url: string,}[])[2].url,
    title: (data as { url: string, title: string }[])[2].title,
    author: (data as { url: string, title: string, date: string}[])[2].date,
  },
  {
    img: (data as { url: string,}[])[3].url,
    title: (data as { url: string, title: string }[])[3].title,
    author: (data as { url: string, title: string, date: string}[])[3].date,
    cols: 2,
  },
  {
    img: (data as { url: string,}[])[4].url,
    title: (data as { url: string, title: string }[])[4].title,
    author: (data as { url: string, title: string, date: string}[])[4].date,
    cols: 2,
  },
  {
    img: (data as { url: string,}[])[5].url,
    title: (data as { url: string, title: string }[])[5].title,
    author: (data as { url: string, title: string, date: string}[])[5].date,
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: (data as { url: string,}[])[6].url,
    title: (data as { url: string, title: string }[])[6].title,
    author: (data as { url: string, title: string, date: string}[])[6].date,
  },
];

    return (
        <div className='bg-black'>
            <header>
                <FlowNavBar />
            </header>
            <body className="flex flex-col justify-center items-center space-evenly space-y-10 p-12">
                <div className='mt-12 text-white '>
                    <h1 className="text-6xl font-bold text-white">Picture of the Day</h1>
                    <br />
                    <p>
                    One of the most popular websites at NASA is the Astronomy <a href='https://apod.nasa.gov/apod/astropix.html' className='underline text-blue-500'>Picture of the Day.</a> In fact, this website is one of the <a href='https://analytics.usa.gov' className='underline text-blue-500'>most popular websites</a> across all federal agencies. 
                    It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. 
                    In addition, if the concept_tags parameter is set to True, then keywords derived from the image explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds; but generally help with discoverability of relevant imagery.
                    </p>
                    <br />
                    <p>
                    The full documentation for this API can be found in the <a href='https://github.com/nasa/apod-api'  className='underline text-blue-500'>APOD API Github repository.</a>
                    </p>
                </div>
                <div>
                
                <ImageList sx={{ width: 1500, height: 1000, border:2, borderColor: 'text.primary'}}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div"></ListSubheader>
                    </ImageListItem>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} className='border border-color: rgb(255 255 255) p-2'>
                        <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about ${item.title}`}
                            >
                            <InfoIcon />
                            </IconButton>
                            }
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
                </div>
            </body>
            <footer></footer>
        </div>
    )
}

export default PicOfDay









