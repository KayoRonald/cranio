import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import NavHero from '../components/nav'
import axios from '../api/'
import Slider from 'react-slick'
import CardTeam from '../components/CardTeam'
import { Box } from '@chakra-ui/react'

type IAds = {
  id: number;
  title?: string;
  description?: string;
  image: string;
  data: []
}
const settings = {
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 2,
  arrows: false,
  autoplay: true,
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<IAds>('/ad/active')
  return {
    props: {
      data: data
    }
  }
}

const Home: NextPage<IAds> = (data) => {
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key) {
      console.log(e.key)
    }
  };
  return (
    <div onKeyDown={handleInputKeyPress}>
      <Head>
        <title>Crânio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHero />
      <Box mt={20}>
        <Slider {...settings}>
          {data.data?.map((data: IAds, index: number) => {
            return (
              <>
                <CardTeam {...data} key={index} />
              </>
            )
          })}
        </Slider>
      </Box>
    </div>
  )
}
export default Home;