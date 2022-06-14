
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import classes from './index.module.css';
import React from "react";
import getConfig from 'next/config'

function HomePage(props)
{ 
  
   const joke_data = props['data']; 
   const image_path =  "/images/jokes/" +  handleImages(props['image_data']['images']);
      
  return(
    <div className={classes.item}>
      <div className={classes.content}>
        <h1>{joke_data.joke}</h1>
        <div className={classes.image}>
        <img  src={image_path} />
        </div>
      </div>
    </div>
  );
}

function handleImages(images)
{
  const index = Math.floor(Math.random() * images.length);
  const image = images[index].name;
  return image; 
}

export async function getStaticProps(){
  const res = await fetch('http://localhost:3001')
  const data = await res.json()
  const filePath = path.join(process.cwd(), 'data', 'image_names.json');
  const jsonData = await fs.readFile(filePath);
  const image_data = JSON.parse(jsonData);
  const images = image_data["images"]
  return { props: { data, image_data } }
}
export default HomePage;